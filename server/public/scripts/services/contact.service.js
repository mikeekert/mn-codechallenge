myApp
    .factory('ContactService', function (vcRecaptchaService, $http) {
        var userObject = [{}]; // create empty prop to hold service values
        return {
            userObject: userObject,

            formsend: (user) => { // send user data to server
                user['g-recaptcha-response'] = vcRecaptchaService.getResponse(); // add captcha server token to payload
                console.log(user);
                $http.post('/contact/', user) // post for mdata, along with captcha token, to server API for server-side verify
                    .then((response) => {
                    userObject.capchaMessage = response.data.responseDesc; // return captcha json message
                });
            },
            retrieve: () => {
                $http.get('/contact') // get district/sen list from db
                    .then((response) => {
                    userObject.array = response.data;
                });
            }
        };
    });