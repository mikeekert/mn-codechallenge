myApp
    .factory('ContactService', function (vcRecaptchaService, $http, ngToast) {
        let userObject = [{}]; // create empty prop to hold service values
        return {
            userObject: userObject,
            formsend: (user) => { // send user data to server
                user['g-recaptcha-response'] = vcRecaptchaService.getResponse(); // add captcha server token to payload
                userObject.btn = false;
                $http.post('/contact/', user) // post for mdata, along with captcha token, to server API for server-side verify
                    .then((response) => {
                    // return captcha json message to DOM
                    userObject.capchaMessage = response.data.responseDesc;

                    // if (response.data.responseCode == 1) { // halt on error code
                    //     userObject.btn = true;
                    //     return;
                    // }
                    ngToast.create({className: 'success', content: 'Message Sent', horizontalPosition: 'center', verticalPosition: 'top'});

                });
            },
            retrieve: () => {
                $http.get('/contact') // get district/sen list from db on page load
                    .then((response) => {
                    userObject.array = response.data; // assign response to controller
                });
            }
        };
    });