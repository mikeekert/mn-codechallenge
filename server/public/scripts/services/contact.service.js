myApp
    .factory('ContactService', function (vcRecaptchaService, $http) {
        return {
            formsend: (user) => {

                console.log(user);

                var post_data = { //prepare payload for request
                    'fName': user.fName,
                    'lName': user.lName,
                    'phone': user.phone,
                    'address': user.address,
                    'email': user.email,
                    'comments': user.comments,
                    'g-recaptcha-response': vcRecaptchaService.getResponse() //send g-captcah-reponse to our server
                };

                $http
                    .post('/contact/', post_data)
                    .then((response) => {

                    });
            }
        };
    });