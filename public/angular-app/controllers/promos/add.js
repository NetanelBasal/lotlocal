module.exports = ['$scope', '$modalInstance', 'promoService', '$timeout','$upload',
function($scope, $modalInstance, promoService, $timeout,$upload) {
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
    $scope.promo = {};
    $scope.file = [];
    $scope.onFileSelect = function($files) {
        for (var i = 0; i < $files.length; i++) {
            $scope.file.push($files[i]);
        }
    }
    $scope.loader = '0';

    $scope.addNewPromo = function() {
        $scope.upload = $upload.upload({
            url: 'promo',
            method: 'POST',
            data: $scope.promo,
            file: $scope.file
        }).success(function(res) {
           $scope.saved = true;
           $timeout(function() {
            $modalInstance.close(res);
            $scope.promo = {};
            $scope.saved = false;
        }, 1000);

       });
    }

}
]