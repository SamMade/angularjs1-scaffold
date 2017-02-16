'use strict';

/**
     * @ngdoc directive
     * @name DEMOapp.directive:footer
     * @scope
     * @restrict A
     *
     * @description
     * Footer Container
     *
     */

angular.module('DEMOapp').directive('footer', function () {

    return {
        replace: true,
        restrict: 'A',
        controller: 'headerFooter',
        templateUrl: 'app/App/headerfooter/footerView.html'
    };
});
