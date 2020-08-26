**FreeCodeCamp**- Information Security and Quality Assurance
------------------------------------------------------------

Project Personal Library

1) Copy `- Copy.env` file content into `.env`, then set MONGODB_URI to your mongo connection string.

2) Add your MongoDB connection string to .env without quotes as db. Don't replace `<dbname>`, only add your user's password. 
`example: mongodb+srv://userA:1235@mongomarko-gzrof.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority`.

3) <dbname> is edited in `utils\config.js`

4) `npm start` for production, test run included. 

5) `npm run watch` or `npm run test` for development without testing or development with testing respectively. 

6) All created routes within `routes/api.js`.

7) All security features with Helmetjs, prevent website to be cached with `nocache` measure to `server.js`.

8) All 6 functional tests in `tests/2_functional-tests.js` done.


