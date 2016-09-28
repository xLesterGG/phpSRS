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

app.controller("salesCtrl",function($scope){
    'use strict';
    
     $scope.sales= [
        {"sID":"1", itemName:"Pills", "itemUnit":"1", "clientName":"????", "clientContact":"123","uID":"1","sDate":"11-11-1111"}
    ];
    

    
   
    $scope.addSales = function (itemName,itemUnit,clientName,clientContact,sDate) {
        
    $scope.currentID = parseInt($scope.sales[$scope.sales.length-1].sID) + 1;

       var input = {"sID": $scope.currentID,
                 itemName: itemName,
                 itemUnit:itemUnit,
                 clientName:clientName,
                 clientContact:clientContact,
                 uID:"1",
                 sDate:sDate };       

        $scope.sales.push(input);      


        $scope.itemName ="";
       
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



