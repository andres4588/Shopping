var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://ventas:ventas@cluster0.7rfit.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var products = [
    new Product({
        imagePath: 'https://cdn11.bigcommerce.com/s-rxzabllq/images/stencil/1280x1280/products/910/18045/Kids-Plain-Poly-Fit-Quick_Dry-Tshirt-red__13799.1567089094.jpg?c=2',
        title: 'Dry Poly Sports Tshirt',
        description: ' quick drying, plain coloured sports tee for adults',
        price: 10
    }),
    new Product({
        imagePath: 'https://ehosting.be/wp-content/uploads/2015/06/5.jpg',
        title: 'T-shirt 10',
        description: 'Large, Medium, Small, XL, XS',
        price: 75
    }),
    new Product({
        imagePath: 'https://shirtsofcotton.com/en/media/catalog/product/cache/10/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/s/h/shirtsofcotton-t-shirt-soc-06-front-1200px.jpg',
        title: 'Grey V-Neck T-shirt',
        description: '95% quality cotton, 5% elastane',
        price: 20
    }),
    new Product({
        imagePath: 'https://huckberry.imgix.net/spree/products/469614/original/mMKoUUfLXv_proof_nova_series_insulated_jacket_insulated-jackets_0_original.jpg?auto=format%2Ccompress&crop=top&fit=clip&cs=tinysrgb&w=600&ixlib=react-9.0.1&h=600&w=600',
        title: 'Insulated Jacket',
        description: ' Primaloft Gold synthetic insulation, 60g',
        price: 50
    }),
    new Product({
        imagePath: 'https://cdn.shopify.com/s/files/1/0055/1242/products/EXP52BMR-ARM-0_2048x.jpg?v=1560205039',
        title: 'LIGHTWEIGHT BOMBER JACKET',
        description: 'jacket has water resistant 82gm 100% polyester fabric with a zip front closur',
        price: 41
    }),
    new Product({
        imagePath: 'https://wwws.dior.com/couture/ecommerce/media/catalog/product/cache/1/zoom_image_1/3000x2000/17f82f742ffe127f42dca9de82fb58b1/7/g/1570207502_943C449A4462_C989_E01_ZH.jpg',
        title: 'DOWN JACKET',
        description: 'Slip side pockets',
        price: 90
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}