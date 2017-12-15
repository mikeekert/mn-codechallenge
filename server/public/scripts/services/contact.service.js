myApp
    .factory('ContactService', function (vcRecaptchaService, $http) {
        return {
            formsend: (user) => {
                var post_data = { //prepare payload for request
                    'fName': user.fName,
                    'lName': user.lName,
                    'phone': user.phone,
                    'address': user.address,
                    'email': user.email,
                    'comments': user.comments,
                    'g-recaptcha-response': vcRecaptchaService.getResponse()
                };
                console.log(post_data);

                $http
                    .post('/contact/', post_data)
                    .then((response) => {
                        console.log(response);
                    });
            }
        };
    });