myApp
    .controller('ContactController', function (ContactService, vcRecaptchaService) {
        var vm = this;
        vm.service = ContactService; // bind controller/service
        vm.userObject = ContactService.userObject; // bind controller/service properties

        vm.district = () => {
            vm.userObject.districtList = vm.userObject.array;
            vm.districts = vm.userObject.districtList[0];
        };

    });