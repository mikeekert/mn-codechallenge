myApp
    .controller('ContactController', function (ContactService, vcRecaptchaService) {
        var vm = this;
        vm.service = ContactService; // bind controller/service
        vm.userObject = ContactService.userObject; // bind controller/service properties
        vm.userObject.complete=false; // variable controlling form on load
        vm.user = ContactService.userObject.user;

        vm.isActive = () => {
            $scope.activeButton = () => {
              $scope.isActive = !$scope.isActive;
            };
        };

        vm.district = () => {
            vm.userObject.districtList = vm.userObject.array;
            vm.districts = vm.userObject.districtList[0];
        };
    });