'use strict';

/**
 * @ngdoc controller
 * @name DEMOapp.controller:headerFooter
 * @description
 * Controller for both the header and footer directives
 */

angular.module('DEMOapp').controller('headerFooter', 
	['$rootScope', '$scope', '$location', '$anchorScroll', 'content', 'session', 'accountManagement', 
	function ($rootScope, $scope, $location, $anchorScroll, Content, Session, AccountManagement) {

		Content.getContent('configs/headerfooter.json').then(function(data){
			var lang = Session.getProfileProperty('language') || 'en';
			$scope.t = data[lang];
			$scope.primaryNav = data.primaryNav;
		});
		$scope.showMainMenu = false;

        $rootScope.$on('loggedin', function(){
            $scope.isLoggedIn = true;
        	$scope.firstName = Session.getProfileProperty('firstName') || Session.getProfileProperty('username');
        });
        $rootScope.$on('loggedout', function(){
            $scope.isLoggedIn = false;
        });

		
		/**
		 * @ngdoc method
		 * @name mainToggle
		 * @methodOf DEMOapp.controller:headerFooter
		 * @description
		 * Toggle the Menu
		 *
		 * @param {event} Event of the ng-click
		 * @returns {boolean} For showMainMenu
		 */
        $scope.mainToggle = function(event) {
            $scope.showMainMenu = $scope.showMainMenu === false ? true: false;
        };
		
		/**
		 * @ngdoc method
		 * @name isActive
		 * @methodOf DEMOapp.controller:headerFooter
		 * @description
		 * Find the active page in the menu
		 *
		 * @param {string} Path of the menu item
		 * @returns {boolean} If matches $location
		 */
		$scope.isActive = function (viewLocation) { 
	        return viewLocation === $location.path();
	    };
	   
		/**
		 * @ngdoc method
		 * @name scrollTo
		 * @methodOf DEMOapp.controller:headerFooter
		 * @description
		 * Anchor Jump to function
		 *
		 * @param {string} DOM element ID to jump to
		 * @returns {event} click event
		 */
	    $scope.scrollTo = function(id, event) {	      	
		   	var origid = $location.hash();
		    $location.hash(id);
		    $anchorScroll();
		    $location.hash(origid);
	   	};

	}] // End
);
