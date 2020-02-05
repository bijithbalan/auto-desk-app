var express = require('express');
var router = express.Router();
var Contacts = require('../assets/models/contacts');

/* GET Contacts home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET Contacts table data using mongodb. */
/*router.get('/contactlist', function(req, res, next) {
    var db = req.db;
    var collection = db.get('contactcollection');
    collection.find({}, {}, function(e, docs) {
        res.json(docs);
    });
});*/

/* Service calls to get the list of contacts and to add a new contact using mongoose */
router.route('/contacts')
    // Create a contact (accessed at POST http://localhost:3000/contacts)
    .post(function(req, res) {
        var contact = new Contacts(); // Create a new instance of the Contacts model
        // Set the values from request
        contact.employeeID = req.body.employeeID;
        contact.firstName = req.body.firstName;
        contact.lastName = req.body.lastName;
        contact.department = req.body.department;
        contact.address.streetAddress = req.body.address.streetAddress;
        contact.address.city = req.body.address.city;
        contact.address.state = req.body.address.state;
        contact.address.postalCode = req.body.address.postalCode;
        contact.homeNumber = req.body.homeNumber;
        contact.faxNumber = req.body.faxNumber;
        contact.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Contact created!' });
        });
    })
    // Get all the contacts (accessed at GET http://localhost:3000/contacts)
    .get(function(req, res) {
        Contacts.find(function(err, contacts) {
            if (err)
                res.send(err);
            res.json(contacts);
        });
    });

/* Service calls to get the details of a specific contact, update and existing contact and delete an exisiting contact using mongoose */
router.route('/contacts/:contact_id')
    // Get the contact details with the _id attribute
    .get(function(req, res) {
        if (req.params.contact_id) {
            Contacts.findById(req.params.contact_id, function(err, contact) {
                if (err)
                    res.send(err);
                res.json(contact);
            });
        }
    })
    // Update the contact with the _id attribute
    .put(function(req, res) {
        Contacts.findById(req.params.contact_id, function(err, contact) {
            if (err)
                res.send(err);
            contact.employeeID = req.body.employeeID;
            contact.firstName = req.body.firstName;
            contact.lastName = req.body.lastName;
            contact.department = req.body.department;
            contact.address.streetAddress = req.body.address.streetAddress;
            contact.address.city = req.body.address.city;
            contact.address.state = req.body.address.state;
            contact.address.postalCode = req.body.address.postalCode;
            contact.homeNumber = req.body.homeNumber;
            contact.faxNumber = req.body.faxNumber;
            contact.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Contact updated!' });
            });

        });
    })
    // Delete the contact with the _id attribute
    .delete(function(req, res) {
        Contacts.remove({
            _id: req.params.contact_id
        }, function(err, contact) {
            if (err)
                res.send(err);
            res.json({ message: 'Contact deleted!' });
        });
    });

module.exports = router;
