/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

var expect = require('chai').expect;

// ============NOT NEEDED BECAUSE MONGOOSE IS USED AND CONFIG THROUGH SERVER.JS .======================================
//var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectId;
//const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});
// ============NOT NEEDED BECAUSE MONGOOSE IS USED IN SERVER.JS AND CONFIG THROUGH SERVER.JS.==========================

const Book = require('../model/books');
const BookHandler = require('../controllers/bookHandler');

module.exports = function (app) {

    app.route('/api/books')
    .get(async function (req, res) {
        //response will be array of book objects
        //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
        const bookHandler = new BookHandler();
        try {
            const fetchCollection = await Book.find({});
            res.json(bookHandler.mapBookCollection(fetchCollection));
        } catch (err) {
            console.error(err);
            res.send(`Couldn't get collection`);
        }
    })

    .post(async function (req, res) {
        var title = req.body.title;
        //response will contain new book object including atleast _id and title
        if (!title)
            return res.send('Missing title.');
        try {
            const bookTitle = new Book({
                title
            });
            const savedBook = await bookTitle.save();
            return res.json(savedBook);
        } catch (err) {
            console.error(err);
            return res.send(`Couldn't add new Book to library`);
        }
    })

    .delete(async function (req, res) {
        //if successful response will be 'complete delete successful'
        try {
            await Book.deleteMany({});
            return res.send('complete delete successful');
        } catch (err) {
            return console.error(err);
        }
    });

    app.route('/api/books/:id')
    .get(async function (req, res) {
        var bookid = req.params.id;
        //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

        try {
            const fetchBook = await Book.findById(bookid);
            return !fetchBook ? res.send('no book exists') : res.json(fetchBook);
        } catch (err) {
            console.error(err);
            return res.send(`DB connection failed or invalid ID`);
        }
    })

    .post(async function (req, res) {
        var bookid = req.params.id;
        var comment = req.body.comment;
        //json res format same as .get
        const bookHandler = new BookHandler();
        if (!comment)
            return res.send(`Empty Comment content`);
        try {
            const fetchBook = await Book.findById(bookid);

            let commentCollection = bookHandler.addComment(fetchBook.comments, comment);
            const addedComment = await Book.findByIdAndUpdate(bookid, {
                comments: commentCollection
            }, {
                new: true
            });

            return res.json(addedComment);
        } catch (err) {
            console.log(err);
            return res.send(`Couldn't add new comment`);
        }
    })

    .delete(async function (req, res) {
        var bookid = req.params.id;
        //if successful response will be 'delete successful'
        const regex = /^[0-9a-fA-F]{24}$/

            if (!bookid)
                return res.send('no id');
            else if (!
                regex.test(bookid)) {
                return res.send('Invalid id');
            }

            try {
                const deletedBook = await Book.findByIdAndDelete(bookid);
                return !deletedBook ? res.send('no book exists') : res.send('delete successful');
            } catch (err) {
                console.error(err);
                return res.send(`couldn't delete ${bookid}`)
            }
    });

};
