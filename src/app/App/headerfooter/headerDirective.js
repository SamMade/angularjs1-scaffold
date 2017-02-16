'use strict';

/**
     * @ngdoc directive
     * @name DEMOapp.directive:header
     * @scope
     * @restrict A
     *
     * @description
     * Header + Main Nav Container
     *
     */

angular.module('DEMOapp').directive('header', function () {

    return {
        replace: true,
        restrict: 'A',
        controller: 'headerFooter',
        templateUrl: 'app/App/headerfooter/headerView.html'
    };
});
