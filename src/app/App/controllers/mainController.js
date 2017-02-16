'use strict';

/**
 * @ngdoc controller
 * @name DEMOapp.controller:mainController
 * @description
 * Controller that all controllers will inherit
 */

angular.module('DEMOapp').controller('mainController', ['$rootScope', '$location', function ($rootScope, $location) {

	$rootScope.$on('$routeChangeError', function(event,current,previous,rejection){

		if((rejection === 'not_logged_in') || (rejection === 'session_expired')){
			//DO SOMETHING
			$location.path('logout');

		} else if (rejection === 'bad_rights'){

		} else {
			//OR DO SOMETHING ELSE
		}
		
	});

}]
);
