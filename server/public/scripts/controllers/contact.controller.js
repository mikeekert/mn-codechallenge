myApp
    .controller('ContactController', function (ContactService, vcRecaptchaService, ngToast, $scope) {
        const vm = this;
        vm.service = ContactService; // bind controller/service

        vm.userObject = ContactService.userObject; // bind controller/service properties
        vm.user = ContactService.userObject.user;

        vm.userform = ContactService.userObject.userform;

        vm.userObject.complete = false; // variable controlling form on load
        vm.userObject.btn = true; // submit btn enabled on load

        vm.submit = (target) => {
            vm
                .service
                .formsend(target);

            vm.user = {}; // clear form
            vm.Chk = {};
        };

        vm.district = () => {
            vm.userObject.districtList = vm.userObject.array;
            vm.districts = vm.userObject.districtList[0];
        };
    });