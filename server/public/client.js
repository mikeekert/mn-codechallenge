const myApp = angular
    .module('myApp', ['vcRecaptcha'])
    .directive('toggleClass', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element
                    .bind('click', function () {
                        element.toggleClass(attrs.toggleClass);
                    });
            }
        };
    });