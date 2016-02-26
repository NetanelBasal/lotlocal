module.exports = [
    function() {

        this.hasPaymentMethod = false;


        this.user = null;

        this.setHasPaymentMethod = function(payment) {
            this.hasPaymentMethod = payment;
        }

    }
];