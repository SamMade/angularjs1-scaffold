'use strict';

/**
 * @ngdoc controller
 * @name Component.controller:loginController
 * @description
 * Login Component Controller that sends off the login request
 */

angular.module('Component').controller('loginController', 
    ['$rootScope', '$scope', 'accountManagement', 'underscore', 
    function ($rootScope, $scope, AccountManagement, _) {

        $scope.loginData = {}; // Initialize ng model
        $scope.form = {}; // Initialize form in scope

        /**
         * @ngdoc method
         * @name login
         * @methodOf Component.controller:loginController
         * @description
         * Logs User in by sending request.  Assuming profile data is returned from the request and will set that into the session.
         *
         * @param {object} Requires username and password in Object
         * 
         */
        $scope.login = function() {

            var copy = _.clone($scope.loginData); // Shallow copy
            $scope.loginData.password = ''; // remove password from field
            $scope.form.loginForm.password.$setPristine(); // Don't error because we removed password
            $scope.isLoading = true;
            $scope.error = false;

            // Send the actual login request expect username returned
            AccountManagement.login(copy).then(function() {
            
                $scope.user = AccountManagement.getUser();

            }, function(error) {

                $scope.error = true;
                $scope.errorMessage = error;
                
            }).finally(function(){
                
                $scope.isLoading = false;
                
            });
        };

        $rootScope.$on('loggedin', function(){
            $scope.user = AccountManagement.getUser();
            $scope.isLoggedIn = true;
        });
        $rootScope.$on('loggedout', function(){
            $scope.user = AccountManagement.user;
            $scope.isLoggedIn = false;
        });

    }]
);
