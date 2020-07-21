var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Order = require('../models/order');
var History = require('../models/history');
var flash = require('connect-flash');

router.use(flash());

router.get('/', isLoggedIn,function(req, res, next) {
  var successMsg = req.flash('test')[0];
    //var successMsg = req.flash('success')[1];
    res.render('admin/configuration', {title: 'Shopping Cart', successMsg: successMsg, noMessages: !successMsg});
});

router.post('/update', isLoggedIn, function(req, res, next) {
    var currentDiscount=parseInt(req.body.discountup);
    Product.find(function (err, docs) {
      let price;
      let total;
      for (var i=0, j=docs.length; i<j; i++) {
      
        price=docs[i].price;
        price=price*(currentDiscount/100);
        total= docs[i].price - price;
        Product.updateMany({ price: docs[i].price }, { discount: parseInt(req.body.discountup), priceDiscount : total }, function(
            err,
            result
          ) {
            if (err) {
              console.log(err);
            } else {
              //console.log((result));
            }
          });
        }
    })
   
    res.redirect('/admin');
});

router.post('/history', function(req, res, next) {
  Order.find(function (err, docs) {
    let listDates = [];
    for (var i=0, j=docs.length; i<j; i++) {
      listDates.push(docs[i].date.getTime());
    }

    let resultado = listDates.filter((el, index) => listDates.indexOf(el) === index);
    resultado =resultado.sort((a, b) => a - b )
  
    function test (item) {
      let listSales=[];
      let totalSales;
      for (var i = 0; i < docs.length; i ++)
      {
       if(item == docs[i].date.getTime()) {
        listSales.push(docs[i].cart.totalQty); 
        }
      }
      totalSales = listSales.reduce(function(a, b){return a + b});
      return totalSales;
    }

    resultado.forEach(element => {
      History.findOneAndUpdate({ date: element }, { total: test(element) }, {useFindAndModify: false} ,
        function( err,result) {
          if (err) {
            console.log(err);
          } else {
            if (result == null) {
              var history = new History({ 
                date: element, 
                total: test(element)
              })
              history.save();
            }
          }
        });
      });
    res.redirect('/admin/history');
  });
  //req.flash('test', 'Historial actualizado');
});

router.get('/history',isLoggedIn, function(req, res, next) {
  History.find(function (err, docs) {
    let listSales=[]
    let listDates=[]

    for(var i=0, j=docs.length; i<j; i++) {
        listDates.push(docs[i].date.getUTCDate());
        listSales.push(docs[i].total);   
    }


    res.render('admin/history', {title: 'Shopping Cart', totalSales: listSales, date: listDates});
  }); 
});


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { 
    if (req.user.rol== "admin") { 
      return next();    
    }    
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}