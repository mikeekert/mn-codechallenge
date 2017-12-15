myApp
    .factory('ContactService', function (vcRecaptchaService, $http) {
        return {
            userObject: userObject, 

            formsend: (user) => { // send user data to server
                userObject.capchaMessage = ''; // clear capcha message on send
                const post_data = { //prepare payload
                    'fName': user.fName,
                    'lName': user.lName,
                    'phone': user.phone,
                    'address': user.address,
                    'email': user.email,
                    'comments': user.comments,
                    'g-recaptcha-response': vcRecaptchaService.getResponse() // grab token from form
                };

                $http 
                    .post('/contact/', post_data) // post to server API
                    .then((response) => {
                        console.log(response.data.responseDesc);
                        userObject.capchaMessage = response.data.responseDesc; // return captcha json message
                    });
            }
        };
    });