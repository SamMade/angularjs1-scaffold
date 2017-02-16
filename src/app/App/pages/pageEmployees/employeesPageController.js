'use strict';

/**
 * @ngdoc controller
 * @name DEMOapp.controller:homepageController
 * @description
 * Controller that grabs content for the Homepage Page
 */

angular.module('DEMOapp').controller('employeesPageController', ['$scope', 'content', 'session', function ($scope, Content, Session) {

	Content.getContent('configs/pageEmployees.json').then(function(data){
		var lang = Session.getProfileProperty('language') || 'en';
		$scope.t = data[lang];
	});

}]);
