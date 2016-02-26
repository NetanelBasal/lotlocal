'use strict'

module.exports = function() {
    return function(nums) {

        if (nums.length) {
            return nums;
        } else {
            return 'Pending'
        }

    }
}