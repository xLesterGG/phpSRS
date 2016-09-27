/*global angular*/

var app = angular.module("myApp", ['ui.router']);	


app.controller("myCtrl", function ($scope, $http) {
	'use strict';
	
	
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
        .state('test1', {
			url: '/home',
			templateUrl: "test2.html"
		
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
    
		/*.state('addactivities', {
			url: '/addactivities',
			templateUrl: "addactivity.html"
		
		})
		.state('managechat', {
			url: '/managechat',
			templateUrl: "chatmanagement.html"
		
		})	
		.state('manageevent', {
			url: '/manageevent:id',
			templateUrl: "eventmanagement.html"
		
		})
		.state('manageactivity', {
			url: '/manageactivity',
			templateUrl: "activitymanagement.html"
		
		})
		.state('manageactivity.update', {
			url: '/update/:id',
			templateUrl: "updateactivity.html"			
		
		})
		.state('login', {
			url: '/login',
			templateUrl: "login.html"			
		
		});*/
	
});



