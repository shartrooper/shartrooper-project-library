const mongoose = require('mongoose');

const bookSchema = mongoose.Schema
({
    
});

issueSchema.set('toJSON', {
transform: (document, returnedObject) => {
//returnedObject.id = returnedObject._id.toString();
//delete returnedObject._id;
delete returnedObject.__v;
},
});

module.exports = mongoose.model('Book', bookSchema);
