/*global angular*/

var app = angular.module("myApp", ['ui.router']);	


app.controller("myCtrl", function ($scope, $http) {
	'use strict';
	$scope.mode = 'add';
	
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
        .state('SalesAdd', {
			url: '/SalesAdd',
			templateUrl: "SalesAdd.html"
		
		})
        
        .state('InvenAdd', {
			url: '/InventoryAdd',
			templateUrl: "InvenAdd.html"
		
		})
    
        .state('SalesEdit', {
			url: '/SalesEdit',
			templateUrl: "SalesEdit.html"
		
		})	
    
        .state('InvenMan', {
			url: '/InvenManagement',
			templateUrl: "inven.html"
		
		})
	
});



