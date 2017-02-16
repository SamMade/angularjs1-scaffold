'use strict';

var WebRequest = angular.module('WebRequest');


/**
 * @ngdoc service
 * @name WebRequest.service:selfHostedRequest
 * @description
 * Configure requests for our own server's requirements
 */

WebRequest.service('selfHostedRequest', ['$q', '$http', '$location', 'underscore', 'helper', function($q, $http, $location, _, Helper) {
    
    // Basic GET call
    this.get = function(url, config){

        var _self = this;

    	var defaultConfig = {};
    	defaultConfig.headers = {};

       	// No Cache
      	defaultConfig.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      	defaultConfig.headers.Pragma = 'no-cache';

		var separator = url.indexOf('?') === -1 ? '?' : '&';
		var urlNoCache = url+separator+'noCache=' + new Date().getTime();

        // Insert custom configurations
        var configNoCache = _.extend(defaultConfig, config);
		
    	return $http.get(urlNoCache, configNoCache).then(
    		function(request){ 
                return request.data; 
            },
    		function(error){}
    	);
    };
    this.post = function(url, data, config){
    };
	this.login = function(){    
        return Helper.promiseFromObject('Success');
    };
    this.logout = function(){
        return Helper.promiseFromObject('Success');
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

