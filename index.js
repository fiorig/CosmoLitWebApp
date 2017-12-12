var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.load();

var _ = require('underscore');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));
var Product = require('./models/Product');

http.listen(3000, function() {
    console.log('FBI Listening in Port 3000!');
});

mongoose.connect(process.env.MONGODB,
 {'useMongoClient': true}
);

mongoose.connection.on('error', function(error) {
    console.log(error);
    process.exit(1);
});

 app.get('/', function(req, res) {
      Product.find({}, function(err, products) {
          if (err) throw err;
          return res.render('list', {
              products: products
          });
      });
  });

app.get('/product', function(req,res) {
  return res.render('form', {
  });
});

app.get('/api/product', function(req, res) {
     Product.find({}, function(err, products) {
         if (err) throw err;
         return res.json(products);
     });
 });

 app.post('/', function(req, res) {
     // Create new product
     var name = req.body.name;
     var type = req.body.type;
     var rating = parseInt(req.body.rating);
     var cost = parseInt(req.body.cost);
     var description = req.body.description;
     var skin_type = req.body.skin_type;
     var duration = parseInt(req.body.duration);

     var product = new Product({
       name: name,
       type: type,
       rating: rating,
       cost: cost,
       description: description,
       skin_type: skin_type,
       duration: duration
     });
     // Save product to database
     product.save(function(err) {
         if (err) throw err;
         io.emit('new product', product);
         return res.send('Succesfully inserted.');
     });
 });

 app.delete('/product/remove/:id', function(req, res) {
  Product.findByIdAndRemove(req.params.id, function(err, product) {
         if (err) throw err;
         if (!product) {
             return res.send('No product found with that id.');
         }
         res.send('Product deleted!');
     });
 });
 app.get('/alphabetical', function(req, res) {
      Product.find({}, function(err, products) {
          if (err) throw err;
        var idk = products.slice(0);
        idk.sort (function(a,b) {
            var x =  a.name.toLowerCase();
            var y =  b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
          });
          return res.render('alphabetical', {
              products: idk
          });
      });
  });

app.get('/duration', function(req, res) {
  Product.find({}, function(err, products) {
      if (err) throw err;
      var sproducts = products.sort(function(a,b) {
        return a.duration - b.duration;
      });
      return res.render('duration', {
          products: sproducts
      });
  });
 });

 app.get('/ratings', function(req, res) {
      Product.find({}, function(err, products) {
          if (err) throw err;
          var sproducts = products.sort(function(a,b) {
            return b.rating - a.rating;
          });
          return res.render('ratings', {
              products: sproducts
          });
      });
  });

  app.get('/cost', function(req, res) {
       Product.find({}, function(err, products) {
           if (err) throw err;
           var sproducts = products.sort(function(a,b) {
             return a.cost - b.cost;
           });
           return res.render('cost', {
               products: sproducts
           });
       });
   });

   app.get('/random', function(req, res) {
        Product.find({}, function(err, products) {
            if (err) throw err;
            var arr = Object.keys(products);
            var inte = Math.floor(Math.random() * arr.length);
            var randomItem = products[inte];
            return res.render('random', {
                item: randomItem
            });
        });
    });
