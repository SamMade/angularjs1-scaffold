'use strict';

/**
 * @ngdoc controller
 * @name Component.controller:employeesListController
 * @description
 * Employee List Component Controller that obtains the list of Employees
 */

angular.module('Component').controller('employeesListController', 
    ['$scope', '$location', 'underscore', 'flashAPIRequest', 'session',
    function ($scope, $location, _, flashAPIRequest, Session) {

        flashAPIRequest.get('/employee').then(
            function(data){
                // Remove current user from list
                $scope.employees = _.reject(data.response.employees, function(emp){
                    return emp.username === Session.getProfileProperty('username');
                });
            }, function(error) {
        });

        $scope.goToEmployee = function(employee) {
        	$location.path("#/employee/"+employee.username);
        };

    }]
);
