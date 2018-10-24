var mongo = require('mongodb');
var mongodbClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const http = require('http');
var express = require("express");
// var script = require("./scripts.js");
// '@import scripts.js';
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 

// const server = http.createServer((req,res)=>{
//     if(req.url === '/'){
//         res.sendFile('index.html');
//         res.end();
//     }
//     if(req.url === '/app/json'){
//         res.write(JSON.stringify([1,2,3]));
//         res.end();
//     }
// });

// server.listen(3000);

app.get('/', function (req, res) {
    console.log('function app.get()');

    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});

//Get Stock Details
app.get('/stock/', function (req, res) {
    console.log('getting stock details');
    mongodbClient.connect(url, function (err, db) {
        console.log('mongodbClient');
        if (err) throw err;
        var dbo = db.db("chandu");
        dbo.collection("product").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.send(JSON.stringify(result));

        });

    });
});

//Add Sale/purchase Entry Details
app.post('/add_entry/', function (req, res) {
    console.log('getting Product details');
    var customer = req.body.customer;
    var product = req.body.product;
    var quantity = req.body.quantity;
    var price = req.body.price;
    var date = req.body.date;
    var optradio = req.body.optradio;
    
    //console.log(Name + " " + Phone + " " + Address + " " + Bfdue + " " + Bfcredit);
    mongodbClient.connect(url, function (err, db) {
        console.log('mongodbClient');
        if (err) throw err;
        var dbo = db.db("chandu");
        var myobj = { customer:customer, product:product,quantity: quantity, price: price, date: date, traxtype: optradio };
        dbo.collection("product").insertOne(myobj,function(err,res){
            if(err) {
                res.send(JSON.stringify({status:"Failure"}));
                throw err;
                
            }
            console.log("1 Document inserted!");
            db.close();
            
        });
        res.send(JSON.stringify({status:"Success"}));

    });
});


//Get Customer Details
app.get('/customer/', function (req, res) {
    console.log('getting Customer details');
    mongodbClient.connect(url, function (err, db) {
        console.log('mongodbClient');
        if (err) throw err;
        var dbo = db.db("chandu");
        dbo.collection("customers").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.send(JSON.stringify(result));

        });

    });
});

//Add Customer Details
app.post('/addcustomer/', function (req, res) {
    console.log('getting Customer details');
    var Name = req.body.username;
    var Phone = req.body.phone;
    var Address = req.body.address;
    var Bfdue = req.body.bfdue;
    var Bfcredit = req.body.bfcredit;
    
    console.log(Name + " " + Phone + " " + Address + " " + Bfdue + " " + Bfcredit);
    mongodbClient.connect(url, function (err, db) {
        console.log('mongodbClient');
        if (err) throw err;
        var dbo = db.db("chandu");
        var myobj = {  name:Name,phone: Phone, address: Address, bfdue: Bfdue, bfcredit: Bfcredit };
        dbo.collection("customers").insertOne(myobj,function(err,res){
            if(err) {
                res.send(JSON.stringify({status:"Failure"}));
                throw err;
                
            }
            console.log("1 Document inserted!");
            db.close();
            
        });
        res.send(JSON.stringify({status:"Success"}));

    });
});




//   app.get('/about',function(req,res){
//     res.sendFile(path.join(__dirname+'/about.html'));
//   });

//   app.get('/sitemap',function(req,res){
//     res.sendFile(path.join(__dirname+'/sitemap.html'));
//   });

app.listen(3000);
console.log('Listening on port 3000......');

// mongodbClient.connect(url, function (err, db) {
//     console.log('mongodbClient');
//     if (err) throw err;
//     var dbo = db.db("chandu");
    // //create collection.
    // dbo.createCollection("customers",function(err,res){
    //     if(err)throw err;
    //     console.log("Collection Created!");
    //     db.close();
    // });
    // // insert one document.
    // var myobj = {name:'Apple',address:'Steve Jobs Theatre'};
    // dbo.collection("customers").insertOne(myobj,function(err,res){
    //     if(err) throw err;
    //     console.log("1 Document inserted!");
    //     db.close();
    // });
    //retrieve data.
    //dbo.collection("customers").find({},{ projection: { _id: 0, name: 1, address: 1 } }).toArray(function(err,result){
    // dbo.collection("customers").find({}).toArray(function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });

    //    var query = {address:"Silicon Valley"};
    //    dbo.collection("customers").find(query).toArray(function(err,result){
    //     if(err) throw err;   
    //     console.log(result);
    //        db.close();
    //    });
    //   
    // var query = { name: /^A/ };
    // dbo.collection("customers").find(query).toArray(function(err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    //   });
    // var mysort = { name: 1 };
    // dbo.collection("customers").find().sort(mysort).toArray(function(err, result) {
    //   if (err) throw err;
    //   console.log(result);
    //   db.close();
    // });
    //     var myquery = { address: 'Mountain 21' };
    //   dbo.collection("customers").deleteOne(myquery, function(err, obj) {
    //     if (err) throw err;
    //     console.log("1 document deleted");
    //     db.close();
    //   });
    // var myquery = { address: /^O/ };
    //   dbo.collection("customers").deleteMany(myquery, function(err, obj) {
    //     if (err) throw err;
    //     console.log(obj.result.n + " document(s) deleted");
    //     db.close();
    //   });
    // var myquery = { address: "Steve Jobs Theatre" };
    //   var newvalues = { $set: {name: "Apple", address: "Canyon 123" } };
    //   dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    //     if (err) throw err;
    //     console.log("1 document updated");
    //     db.close();
    //   });
// });


