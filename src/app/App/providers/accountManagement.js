'use strict';

var app = angular.module('DEMOapp');


/**
 * @ngdoc service
 * @name DEMOapp.service:accountManagement
 * @description
 * Service that deals with everything from login, logout, user roles, and account information
 * 
 * It serves as the middle man from views and their controllers to the actual $http protocols
 */

app.factory('accountManagement', 
    ['$rootScope', '$location', '$http', '$q', 'underscore', 'helper', 'flashAPIRequest', 'session',
    function ($rootScope, $location, $http, $q, _, Helper, flashAPIRequest, Session) {

        /**
         * @ngdoc property
         * @name user
         * @propertyOf DEMOapp.service:accountManagement
         * @returns {object} with properties name, username, accounttype
         * @private
         * @description
         * Basic object that should hold more account data of the user (where session holds more profile data)
         *
         */
         var _user = {
            'username': null,
            'accounttype': null
         };

         /**
         * @ngdoc property
         * @name _isLoggedIn
         * @propertyOf DEMOapp.service:accountManagement
         * @returns {boolean} if user is logged in
         * @private
         * @description
         * Set when user logs in
         *
         */
         var _isLoggedIn = false;


         /**
         * @ngdoc property
         * @name _hasToken
         * @propertyOf DEMOapp.service:accountManagement
         * @returns {boolean} if user token set
         * @private
         * @description
         * Set when user has token
         *
         */
         var _hasToken = false;


        var AccountManagement = {};


        /**
         * @ngdoc method
         * @name getUser
         * @methodOf DEMOapp.service:accountManagement
         * @description
         * Returns User properties and information

         * @returns {object} User Object
         *
         */
        AccountManagement.getUser = function() {
            return _user;
        };


        /**
         * @ngdoc method
         * @name login
         * @methodOf DEMOapp.service:accountManagement
         * @description
         * Logout the user to all webServices + destroy the session + put default settings back
         *
         * @param {object} properties required: username + password
         * @returns {promise} Promise of the request
         *
         */
        AccountManagement.login = function(loginData) {
            console.log('Begin Login');
            
            // Login should set necessary tokens
            return flashAPIRequest.login(loginData).then(function(data){

                _isLoggedIn = true;
                _hasToken = true;
                _user.username = loginData.username;

                // Now logged in, we should get User's information
                return flashAPIRequest.get('/employee').then(function(employees){

                    // Set properties
                    var me = _.findWhere(employees.response.employees, {"username": loginData.username});
                    if (_.isUndefined(me)) {
                        Session.setProfileProperty('username', loginData.username);
                    } else {
                        Session.setProfile(me);
                    }

                    return Session.getProfileProperty('username');

                },function(message){
                    Session.setProfileProperty('username', loginData.username);
                }).finally(function(){

                    // Go to page
                    $location.path('dashboard');

                    // Set Logged In flag
                    $rootScope.$emit('loggedin');

                });

            }, function(message){
                return $q.reject(message);
            });

        };


        /**
         * @ngdoc method
         * @name logout
         * @methodOf DEMOapp.service:accountManagement
         * @description
         * Logout the user to all webServices + destroy the session + put default settings back
         *
         */
        AccountManagement.logout = function() {
            console.log('Begin Logout');

            $rootScope.$emit('loggedout');
            return flashAPIRequest.logout().then(function(){
                Session.destroy();
                AccountManagement.destroy();               
            }, function(message){
                return $q.reject(message);
            });
        };

        /**
         * @ngdoc method
         * @name isLoggedIn
         * @methodOf DEMOapp.service:accountManagement
         * @description
         * Checks if the user's token is still valid
         *
         * As of now, it will also renew the token if it is valid
         *
         * @returns {boolean} Promise of the request, will reject if there's a problem
         */
        AccountManagement.isLoggedIn = function() {

            // do you have a token?
            if (_hasToken) {

                // Check if expired, if not go ahead and renew
                return flashAPIRequest.renew().then(function(data){
                    _isLoggedIn = true;
                    return true;
                }, function(message) {
                    _isLoggedIn = false;
                    return $q.reject("session_expired");
                });

            } else {
                // User was never logged in the first place
                return $q.reject("not_logged_in");
            }

        };

        /**
         * @ngdoc method
         * @name isActive
         * @methodOf DEMOapp.service:accountManagement
         * @description
         * Determine if session is still active for webservices (timed out?)
         *
         */
        AccountManagement.isActive = function() {
            
        };

        /**
         * @ngdoc method
         * @name isUser
         * @methodOf DEMOapp.service:accountManagement
         * @description
         * Determine if session is a valid user of the app
         *
         */
        AccountManagement.isUser = function() {
            
        };

        /**
         * @ngdoc method
         * @name isAdmin
         * @methodOf DEMOapp.service:accountManagement
         * @description
         * Determine if user is an admin
         *
         */
        AccountManagement.isAdmin = function() {
            
        };


        /**
         * @ngdoc method
         * @name destroy
         * @methodOf DEMOapp.service:accountManagement
         * @description
         * Destroy and reset properties to default
         *
         */
        AccountManagement.destroy = function() {            
            _user = {
                'username': null,
                'accounttype': null
            };

            _isLoggedIn = false;
        };

        return AccountManagement;

    }] // end
);