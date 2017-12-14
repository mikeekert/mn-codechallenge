myApp
.factory('ContactService', function ($http) {

    let userObject = [{}];
    userObject.sequence = [];

    return {userObject: userObject};
});