'use strict';

describe('Main Controller', function(){

	beforeEach(angular.mock.module('DEMOapp'));

	var $rootScope,
	$location,
	$controller,
	mainController;

	beforeEach(inject(function(_$rootScope_, _$location_, _$controller_){
		$rootScope = _$rootScope_;
		$location = _$location_;
		$controller = _$controller_;

		mainController = $controller('mainController', {'$rootScope':$rootScope, '$location':$location});		

		spyOn($location, 'path');
	}));

	it('should have a mainController controller', function() {
		expect(mainController).toBeDefined();
	});

	it('should call logout path on route error of not_logged_in', function() {	    
	    $rootScope.$broadcast('$routeChangeError', null, null, 'not_logged_in');
	    expect($location.path).toHaveBeenCalledWith('logout');
	});

	it('should call logout path on route error of session_expired', function() {
	    $rootScope.$broadcast('$routeChangeError', null, null, 'session_expired');
	    expect($location.path).toHaveBeenCalledWith('logout');
	});

});