'use strict';

/**
     * @ngdoc directive
     * @name Component.directive:loginComponent
     * @scope
     * @restrict A
     *
     * @description
     * Login Component consists of a username/password form
     *
     */

angular.module('Component').directive('employeesListComponent', function () {

    return {
        replace: true,
        restrict: 'A',
        controller: 'employeesListController',
        templateUrl: 'app/Component/employeesList/employeesListView.html'
    };
});
