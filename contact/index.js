//calling express server
const express = require('express');
const port = 8000;

//getting path
const path = require('path');

//conncting to database
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('views'));

//midelware 1
// app.use(function (req, res, next) {
//     req.MyName = "Arpan";
//     console.log('midelware 1 called');
//     next();

// });
// //Midelware 2
// app.use(function (req, res, next) {
//     console.log(req.MyName);
//     console.log('midelware 2 called');
//     next();

// });

// let contacts = [
//     {
//         name: "Piyush",
//         phone: 137894892425
//     },
//     {
//         name: "nikhil",
//         phone: 2349742308
//     },
//     {
//         name: "shrikant",
//         phone: 08312090981
//     },

//     {
//         name: "savan",
//         phone: 082340890913
//     }
// ]


app.get('/', function (req, res) {
    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log('getting error in fetching data');
            return;
        }

        return res.render('home.ejs', {
            title: "My contact list",
            contact_list: contacts
        });
    })

})

app.post('/create-contact', function (req, res) {
    // contacts.push(req.body);
    // return res.redirect('/');

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log('error in creating contact');
            return;
        }
        console.log('**********', newContact);
        return res.redirect('/');
    });



});

app.listen(port, function (err) {
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
});

//for deleting contacts
app.get('/delete-contact/', function (req, res) {
    // console.log(req.query);
    // let phone = req.query

    // let contactindex = contacts.findIndex((body) => body == phone)
    // console.log(contactindex);
    // if (contactindex != -1) {
    //     contacts.splice(contactindex, 1);
    // }

    // return res.redirect('back');

    let id = req.query.id;
    console.log(id);
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('error in deleting contact');
            return;
        };
    });
    return res.redirect('/');
});
