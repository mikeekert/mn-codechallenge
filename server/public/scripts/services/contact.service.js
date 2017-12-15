myApp
    .factory('ContactService', function (vcRecaptchaService, $http) {

        var userObject = [{}];

        return {
            userObject: userObject,

            formsend: (user) => { // send user data to server
                userObject.capchaMessage = ''; // clear capcha message on send

                if (!grecaptcha.getResponse().length) { // quick client side check to alert user to use the captcha
                    userObject.capchaMessage = 'Complete the captcha before sending';
                } else {
                    const post_data = { //prepare payload
                        'to': user.recipient,
                        'fName': user.fName,
                        'lName': user.lName,
                        'phone': user.phone,
                        'address': user.address,
                        'email': user.email,
                        'comments': user.comments,
                        'g-recaptcha-response': vcRecaptchaService.getResponse() // grab captcha token from form
                    };

                    $http.post('/contact/', post_data) // post info with captcha token to server API for server-side verify
                        .then((response) => {
                        userObject.capchaMessage = response.data.responseDesc; // return captcha json message
                    });
                }
            },
            retrieve: () => {
                $http.get('/contact') // get district/sen list
                    .then((response) => {
                        console.log('resp: ', response);
                        userObject.array = response;
                    });

            }
        };
    });