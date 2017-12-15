myApp
    .factory('ContactService', function ($http) {
        return {
            formsend: (blah) => {
                
                console.log(blah);

                // $http
                //     .post('/contact/', blah)
                //     .then((response) => { 
                //         console.log('sent');
                //     });
            }
        };
    });