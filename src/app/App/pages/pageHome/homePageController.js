'use strict';

/**
 * @ngdoc controller
 * @name DEMOapp.controller:homepageController
 * @description
 * Controller that grabs content for the Homepage Page
 */

angular.module('DEMOapp').controller('homePageController', ['$scope', 'content', 'session', function ($scope, Content, Session) {

	Content.getContent('configs/pageHomepage.json').then(function(data){
		var lang = Session.getProfileProperty('language') || 'en';
		$scope.t = data[lang];
	});

}]);
