'use strict';

var app = angular.module('DEMOapp', [
    'ngRoute',
    'ngSanitize',
    'Session',
    'Util',
    'Content',
    'Component',
    'WebRequest'
]);


/**
 * @ngdoc overview
 * @name DEMOapp
 * @description
 * Main app controller.
 */

// Route Resolve Rejects handled by DEMOapp.controller:mainController
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'app/App/pages/pageHome/homePageView.html',
        controller: 'homePageController'
    }).
    when('/login', {
        templateUrl: 'app/App/pages/pageLogin/loginPageView.html'
    }).
    when('/logout', {
        resolve: {
            logout: ['accountManagement',function(accountManagement) { 
                accountManagement.logout();
            }]
        },
        redirectTo: '/' 
    }).
    when('/dashboard', {
        templateUrl: 'app/App/pages/pageDashboard/dashboardPageView.html',
        controller: 'dashboardPageController',
        resolve: {
            loggedin: ['accountManagement',function(accountManagement) { 
                return accountManagement.isLoggedIn();
            }]
        }
    }).
    when('/employees', {
        templateUrl: 'app/App/pages/pageEmployees/employeesPageView.html',
        controller: 'employeesPageController',
        resolve: {
            loggedin: ['accountManagement',function(accountManagement) { 
                return accountManagement.isLoggedIn();
            }]
        }
    }).
    when('/employee', {
        redirectTo: '/employees'
    }).
    when('/employee/:userId', {
        templateUrl: 'app/App/pages/pageProfile/profilePageView.html',
        resolve: {
            loggedin: ['accountManagement',function(accountManagement) { 
                return accountManagement.isLoggedIn();
            }]
        }
    }).
    otherwise({
        redirectTo: '/'
    });

}]);

app.run(['$rootScope', function($rootScope) {
    $rootScope.defaultLanguage = 'en';
}]);