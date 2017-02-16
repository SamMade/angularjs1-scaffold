'use strict';

/**
     * @ngdoc directive
     * @name Component.directive:loginComponent
     * @scope
     * @restrict A
     *
     * @description
     * Login Component consists of a username/password form
     *
     */

angular.module('Component').directive('loginComponent', function () {

    return {
        replace: true,
        restrict: 'A',
        controller: 'loginController',
        templateUrl: 'app/Component/login/loginView.html'
    };
});
