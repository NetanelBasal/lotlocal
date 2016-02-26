module.exports = ['$http',
    function($http) {
        this.items = {
            singles: [],
            groups: [],
            singleGroup: []
        };
        this.addToCart = function(type, item) {
            this.items[type].push(item);
            return this.saveItemsToSession(this.items);
        };
        this.getItemsInCart = function() {
            var itemsInCart = [];
            for (var type in this.items) {
                angular.forEach(this.items[type], function(item) {
                    item.common = {
                        price: item.price
                    }
                    if (item.type == 'singles' || item.type == 'singleGroup') {
                        item.common.name = item.lottery.name;
                        item.common.id = item.lottery.id;
                    }else {
                        item.common.id = item.id;
                        var names = _.pluck(item.lotteries, 'name');
                        item.common.name = names.join(',');
                    }
                    itemsInCart.push(item);
                });
            }
            return itemsInCart;
        }
        this.delItem = function(item, type) {
            var index = this.items[type].indexOf(item);
            this.items[type].splice(index, 1);
        }
        this.saveItemsToSession = function(items) {
            return $http.post('cart', {
                items: items
            });
        };
        this.clearItems = function() {
            this.items = {
                singles: [],
                groups: [],
                singleGroup: []
            };
            return $http.delete('cart/1');
        };
    }
]