module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.availableMoney = oldCart.availableMoney || 500;

    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0, availableMoney: 500};
        }
        if(this.availableMoney > 420) {
            storedItem.qty++;
            if (storedItem.item.discount = 0) {
                storedItem.price = storedItem.item.price * storedItem.qty;
                storedItem.availableMoney = storedItem.item.availableMoney - storedItem.price;
                this.totalPrice += storedItem.item.price;
                this.availableMoney -= storedItem.item.price;
            }else {
                storedItem.price = storedItem.item.priceDiscount * storedItem.qty;
                storedItem.availableMoney = storedItem.item.availableMoney - storedItem.price;
                this.totalPrice += storedItem.item.priceDiscount;
                this.availableMoney -= storedItem.item.priceDiscount;
            }
            this.totalQty++;
        }else {
            //console.log("bajo")
        }    
    };
    this.reduceByOne = function(id) {
        this.items[id].qty--;
        if (this.items[id].discount = 0) {
            this.items[id].price -= this.items[id].item.price;
            this.items[id].availableMoney += this.items[id].item.price;
            this.totalPrice -= this.items[id].item.price;
            this.availableMoney += this.items[id].item.price;
        } else{
            this.items[id].priceDiscount -= this.items[id].item.priceDiscount;
            this.items[id].availableMoney += this.items[id].item.priceDiscount;
            this.totalPrice -= this.items[id].item.priceDiscount;
            this.availableMoney += this.items[id].item.priceDiscount;
        } 
        this.totalQty--;        
        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        this.availableMoney += this.items[id].price
        this.availableMoney = Math.floor(this.availableMoney * 100) / 100;
        delete this.items[id];   
    };
    
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};