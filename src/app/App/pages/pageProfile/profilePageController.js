'use strict';

/**
 * @ngdoc controller
 * @name DEMOapp.controller:homepageController
 * @description
 * Controller that grabs content for the Homepage Page
 */

angular.module('DEMOapp').controller('profilePageController', ['$scope', 'content', 'session', function ($scope, Content, Session) {
/*
	Content.getContent('configs/pageProfile.json').then(function(data){
		var lang = Session.getProfileProperty('language') || 'en';
		$scope.t = data[lang];
	});
*/
}]);
