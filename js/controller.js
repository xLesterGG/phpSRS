/*global angular*/

var app = angular.module("myApp", ['ui.router']);	


app.controller("myCtrl", function ($scope, $http) {
	'use strict';
	$scope.invenMode = 'add';
    $scope.salesMode = 'add';
	
    $scope.chngInvenMode  = function () {
        $scope.invenMode = 'edit';
    };
    
    $scope.chngSalesMode  = function () {
        $scope.salesMode = 'edit';
    };
});


//routing for ui-router
app.config(function ($stateProvider, $urlRouterProvider) {
	'use strict';
	$urlRouterProvider.otherwise("/");

	
	$stateProvider
		.state('/', {
			url: '/',
			templateUrl: "test.html"
		
		})        
        
        .state('SalesMan', {
			url: '/SalesManagement',
			templateUrl: "sales.html"
		
		})	
    
        .state('InvenMan', {
			url: '/InvenManagement',
			templateUrl: "inven.html"
		
		})
	
});



