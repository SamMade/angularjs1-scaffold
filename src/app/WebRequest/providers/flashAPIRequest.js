'use strict';

var WebRequest = angular.module('WebRequest');


/**
 * @ngdoc service
 * @name WebRequest.service:selfHostedRequest
 * @description
 * Configure requests for our own server's requirements
 */

WebRequest.service('flashAPIRequest', 
    ['$q', '$http', '$location', 'underscore', 'helper', 'session',
    function($q, $http, $location, _, Helper, Session) {
    
    var _baseURL = 'https://blp8ieq6fh.execute-api.us-east-1.amazonaws.com/dev';
    var _devAPIKey = 'gVifuAqLhJ5YhmNkTgj6l7MBT8hFXFbo4n45pT8P';
    var _tokenKey = 'flashAPIRequest';

    var _pathSession = '/session';

    // Basic GET call
    this.get = function(path){
        
        var completeURL = _baseURL + path;

        return $http.get(completeURL, { 
            headers: { 
                'x-api-key': _devAPIKey,
                'flash-session-token': Session.getToken(_tokenKey)
            }
        }).then(
            function(response) {

                // Reject if error response
                if (_.has(response.data, 'message')) {
                    return $q.reject(response.data.message);
                } else {
                    return response.data;
                }

            }, function(response) { 
            }
        );

    };

    this.post = function(path, data){

        var completeURL = _baseURL + _pathSession;

        return $http.post(completeURL, { 
            headers: { 
                'x-api-key': _devAPIKey,
                'flash-session-token': Session.getToken(_tokenKey)
            }
        }).then(
            function(response) {
                // Reject if error response
                if (_.has(response.data, 'message')) {
                    console.log(response);
                } 
            }, function(response) { 
            }
        );

    };

	this.login = function(data){

        var sendData = {
            "username" : data.username,
            "password" : data.password
        };

        var completeURL = _baseURL + _pathSession;


        return $http.post(completeURL, sendData, { 
			headers: { 
				'x-api-key': _devAPIKey
			}
		}).then(
			function(response) {
                // Reject if error response
                if (_.has(response.data, 'message')) {
                    return $q.reject(response.data.message);
                } else {
                    //store token in session
                    Session.storeToken(_tokenKey, response.data.response.sessionToken);

                    return response.data;
                }
			}, function(response) { 
        	}
        );
    };
    this.logout = function(){

        var completeURL = _baseURL + _pathSession;

        return $http.delete(completeURL, { 
            headers: { 
                'x-api-key': _devAPIKey,
                'flash-session-token': Session.getToken(_tokenKey)
            }
        }).then(
            function(response) {
                // Reject if error response
                if (_.has(response.data.response, 'message')) {
                    console.log(response);
                } 
            }, function(response) { 
            }
        );
    };
    
    this.renew = function(){
        
        var completeURL = _baseURL + _pathSession;

        return $http.put(completeURL,'', { 
            headers: { 
                'x-api-key': _devAPIKey,
                'flash-session-token': Session.getToken(_tokenKey)
            }
        }).then(
            function(response) {
                // Reject if error response
                if (_.has(response.data.response, 'message') && (response.data.response.message === 'Successfully extended')) {
                    console.log("token renewed");
                } else {
                    return $q.reject(response.data.message);                    
                }
            }, function(response) { 
                return response;
            }
        );

    };
    
    
    // Transforms values that are objects to multiple paramaters with the same key
    this.transform = function (obj) {
        var str = [];
        for(var p in obj)
        {
            if (typeof obj[p] === 'object' && obj[p].length>0) 
            { 
                // multi value
                for(var q in obj[p]) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p][q]) ); 
                }
            } else { 
            	str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]) );
            }
        }
        return str.join('&');
    };

}]);

