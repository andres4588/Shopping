var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
var flash = require('connect-flash');

router.use(flash());

router.get('/', function(req, res, next) {
    Order.find(function (err, docs) {
        var t =[];
        var arr=[];
        t=docs;
        for (var i = 0; i < t.length; i ++) {
            arr.push(t[i].cart)     
        }
        res.render('shop/admin', {title: 'Shopping Cart', totalPrice: arr});
    })    
});


router.post('/update', function(req, res, next) {
    var dis;
    Product.find(function (err, docs) {
        var t =[];
        t=docs;
        dis=t[0].discount
        Product.updateMany({ discount: dis }, { discount: parseInt(req.body.discountup) }, function(
            err,
            result
          ) {
            if (err) {
              console.log(err);
            } else {
              //console.log((result));
            }
          });
    })
   
  
   
    res.redirect('/admin');
});


module.exports = router;