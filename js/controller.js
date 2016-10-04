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
    
    $scope.addMode  = function () {
        $scope.salesMode = 'add';
    };
    
    $scope.adminCheck = function(adminID,adminPW){
    
    var url = "php/loginCheck.php";
    var data = $.param({adminID:adminID, adminPW:adminPW});
    var config = {
        headers:{
            'Content-Type':'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };
    
    $http.post(url,data,config)
    .then(
        function(response){
            if (response.data)
            {
                $scope.admin = response.data;
                console.log(response.data);
                if($scope.admin == 'Invalid Admin ID or Password')
                    $scope.adminProceed = false;
                else
                    {
                    $scope.adminProceed = true;
                    window.location.href = "home.html";

                    }
               // console.log($scope.adminProceed);
            }
        }, function (response)
        {
            
        });
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
    
   $scope.removeSales = function ($index) {
        $scope.sales.splice($index, 1);
   };
   
});

app.controller("invenCtrl",function($scope,$http){
    'use strict';
    
    $scope.inven= [
        {itemName:"Pills", "itemAmount":3, "itemDescription":"A powerful pill", "itemPrice":10.00,"UnitsOrder":1}
    ];
    
    $scope.addInven = function (itemName,itemAmount,itemDescription,itemPrice,UnitsOrder) {
        var url = "php/invenAdd.php";
        var data = $.param({itemName:itemName, itemAmount:itemAmount,itemDescription:itemDescription,itemPrice:itemPrice,UnitsOrder:UnitsOrder});
        var config = {
        headers:{
            'Content-Type':'application/x-www-form-urlencoded;charset=utf-8;'
        }
        };
    
        $http.post(url,data,config)
        .then(
        function(response){
            if (response.data)
            {
                $scope.add = response.data;
                console.log(response.data);
            }
        }, function (response)
        {
            
        });
    };
   
//    $scope.addInven = function (itemName,itemAmount,itemDescription,itemPrice,UnitsOrder) {
//
//       var input = {itemName: itemName,
//                 itemAmount:itemAmount,
//                 itemDescription:itemDescription,
//                 itemPrice:itemPrice,
//                 UnitsOrder:UnitsOrder,
//                 };       
//
//        $scope.inven.push(input);      
//
//
//        $scope.itemName ="";
//       
//   };
    
    
    
    
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



