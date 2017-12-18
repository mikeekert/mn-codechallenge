myApp
    .factory('ContactService', function (vcRecaptchaService, $http) {

        var userObject = [{}];

        return {
            userObject: userObject,

            formsend: (user) => { // send user data to server
                userObject.capchaMessage = ''; // clear capcha message on send
                const post_data = { //prepare payload
                    'destEmail': user.destination.email,
                    'destFirstName': user.destination.first,
                    'destLastName': user.destination.last,
                    'destDistrict': user.destination.districtid,
                    'srcFirstName': user.fName,
                    'srcLastName': user.lName,
                    'srcPhone': user.phone,
                    'srcAddress': user.address,
                    'srcEmail': user.email,
                    'srcComments': user.comments,
                    'g-recaptcha-response': vcRecaptchaService.getResponse() // grab captcha token from webform
                };
                $http.post('/contact/', post_data) // post data, along with captcha token, to server API for server-side verify
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