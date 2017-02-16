'use strict';

var Content = angular.module('Content');


/**
 * @ngdoc service
 * @name Content.service:content
 * @description
 * Grabs content file and passes data along. Data is temporarly stored after first request and deleted when session is over.
 */

Content.factory('content', ['$http', '$q', 'underscore', 'helper', 'selfHostedRequest', function ($http, $q, _, Helper, selfHostedRequest) {

    var privateContent = {};

    var content = {};



    /**
     * @ngdoc method
     * @name getContent
     * @methodOf Content.service:content
     * @description
     * Grabs content either using applicable request method or if locally stored will re-use that object. 
     *
     * @param {string} Path of the file
     * @returns {promise} The content data
     */
    content.getContent = function (path) {

        if(_.isEmpty(path)) {
            var deferred = $q.defer();
            deferred.reject('Path Not Set');
            return deferred.promise;
        }

        if (_.has(privateContent, path)) {
            return Helper.promiseFromObject(privateContent[path]);
        } else {
            return selfHostedRequest.get(path)
                .then(
                    function (data) {
                        privateContent[path] = data;
                        return data;
                    }, function () {
                    });
        }
            
    };


    return content;
}]);