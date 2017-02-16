'use strict';

var Session = angular.module('Session');


 /**
 * @ngdoc service
 * @name Session.service:session
 * @description
 * Stores application session data, ie. user profile & history.
 */

Session.factory('session', 
    ['$rootScope', 'underscore', 'selfHostedRequest', 
    function ($rootScope, _, selfHostedRequest) {

    /**
     * Constructor
     *
     * @constructor
     */
    var session = {};

    /**
     * @ngdoc property
     * @name data
     * @propertyOf Session.service:session
     * @description
     * Session object currenly holding profile data
     *
     */
    session.data = {
        'profile': {},
        'history': []
    };

    session.token = {
    };

    /**
     * @ngdoc method
     * @name pushToHistory
     * @methodOf Session.service:session
     * @description
     * Adds a history block to the stack
     *
     * @param {object} History object
     */
    session.pushToHistory = function (history) {
        if (!_.isObject(history)) {
            return;
        }

        this.data.history.push(history);
    };

    /**
     * @ngdoc method
     * @name popFromHistory
     * @methodOf Session.service:session
     * @description
     * Removes the last entered history object from stack and returns the removed object.
     *
     * @returns {object} History object
     */
    session.popFromHistory = function () {
        return this.data.history.pop(history);
    };

    /**
     * @ngdoc method
     * @name hasHistory
     * @methodOf Session.service:session
     * @description
     * Sees if history object has anything in it.
     *
     * @returns {boolean} True or False
     */
    session.hasHistory = function () {
        return this.data.history.length > 0;
    };

    /**
     * @ngdoc method
     * @name getHistory
     * @methodOf Session.service:session
     * @description
     * Returns the entire history stack
     *
     * @returns {object} History Stack
     */
    session.getHistory = function () {
        return this.data.history;
    };

    /**
     * @ngdoc method
     * @name setProfile
     * @methodOf Session.service:session
     * @description
     * Takes all profile data and stores it in the session
     *
     * @param {object} Profile Data
     */
    session.setProfile = function (obj) {
        this.data.profile = obj;
    };

    /**
     * @ngdoc method
     * @name getProfile
     * @methodOf Session.service:session
     * @description
     * Returns a copy of the entire session profile data
     *
     * @returns {object} Profile Data
     */
    session.getProfile = function () {
        return angular.copy(this.data.profile);
    };

    /**
     * @ngdoc method
     * @name hasProfile
     * @methodOf Session.service:session
     * @description
     * Checks to see if there is anything in the profile session.
     *
     * @returns {boolean} True or False
     */
    session.hasProfile = function () {
        return !_.isEmpty(this.data.profile);
    };

    /**
     * @ngdoc method
     * @name getProfileProperty
     * @methodOf Session.service:session
     * @description
     * Get a property from the Session Profile
     *
     * @param {string} Property Key to find in the Session Profile
     * @returns {any} Value in Session Profile by key
     */
    session.getProfileProperty = function (property) {
        var value;

        if (this.hasProfileProperty(property)) {
            value = this.data.profile[property];
        }

        return value;
    };

    /**
     * @ngdoc method
     * @name setProfileProperty
     * @methodOf Session.service:session
     * @description
     * Adds a property to the Session Profile
     *
     * @param {string} Key name to store 'value' in the Session Profile
     * @param {any} Property value to store in the Session Profile
     */
    session.setProfileProperty = function (property, value) {
        if (_.isString(property)) {
            this.data.profile[property] = value;
        }
    };

    /**
     * @ngdoc method
     * @name hasProfileProperty
     * @methodOf Session.service:session
     * @description
     * Checks to see if a property exist in the Session Profile
     *
     * @param {string} Property key to find inside Session Profile object
     * @returns {boolean} True or False if property is found
     */
    session.hasProfileProperty = function (property) {
        return _.has(this.data.profile, property);
    };

    /**
     * @ngdoc method
     * @name storeToken
     * @methodOf Session.service:session
     * @description
     * Stores a token by key
     *
     * @param {string} key that stores the token
     * @param {string} token string
     */
    session.storeToken = function (key, token) {
        this.token[key] = token;
    };

    /**
     * @ngdoc method
     * @name getToken
     * @methodOf Session.service:session
     * @description
     * Returns the token from the given key
     *
     * @param {string} key associated with the token
     */
    session.getToken = function (key) {
        return this.token[key];
    };

    /**
     * @ngdoc method
     * @name destroy
     * @methodOf Session.service:session
     * @description
     * Destroys the Session Data Object
     *
     */
    session.destroy = function() {
        delete this.data; //ensure deleted
        this.data = {
            'profile': {},
            'history': []
        };

        delete this.token; //ensure deleted
        this.token = {};
    };


    return session;
}]);