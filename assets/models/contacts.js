var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Creating a schema for contacts */
var ContactDetailsSchema = new Schema({
    employeeID: Number,
    firstName: String,
    lastName: String,
    department: String,
    address: {
        streetAddress: String,
        city: String,
        state: String,
        postalCode: String
    },
    homeNumber: String,
    faxNumber: String
});

module.exports = mongoose.model('Contacts', ContactDetailsSchema);
