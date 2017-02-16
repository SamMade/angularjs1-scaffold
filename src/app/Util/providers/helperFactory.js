'use strict';

var Util = angular.module('Util');

/**
 * Helper Util Factory
 *
 * Random miscellanious Utility Functions
 *
 */
Util.factory('helper', ['$q', 'underscore', function($q, _) {

	var helper = {};

    helper.promiseFromObject = function (obj, message){
		if (_.isNull(obj) || _.isEmpty(obj) ) {
			return $q.reject(message);
		} else {
			return $q.when(obj);
		}
    };

    return helper; 
}]);