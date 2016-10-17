/*global angular*/

var app = angular.module("myApp", ['ui.router']);	

document.addEventListener('DOMContentLoaded', function () {
    if (!Notification) {
      alert('Desktop notifications not available in your browser. Try Chromium.'); 
      return;
    }
    if (Notification.permission !== "granted")
        Notification.requestPermission();
    });

app.controller("myCtrl", function ($scope, $http,$state) {
	'use strict';
    
    $scope.invenMode = 'add';
    $scope.salesMode = 'add';

	
    $scope.chngInvenMode  = function () {
        $scope.invenMode = 'edit';
    };
    
    $scope.chngSalesMode  = function (id) {
        $scope.salesMode = 'edit';
        $scope.sid = id;
    };
    
    $scope.addMode  = function () {
        $scope.salesMode = 'add';
    };
    
    $scope.notifyMe = function(message) {
        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            var notification = new Notification('Low Stock Notification', {
            icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
            body: message,
        });

        notification.onclick = function () {
          $state.go("InvenMan");      
        };
        }
    }
    
    $scope.checkInven = function(){
        $http.get('php/notification.php')
        .then (
        function(response) {
            $scope.lowStocks = response.data;
            if($scope.lowStocks.length>1)
            {
                $scope.message="More than 1 item is low on stock";
                $scope.notifyMe($scope.message);
            }else{
                $scope.message= $scope.lowStocks[0].itemName + " is low on stock";
                $scope.notifyMe($scope.message);
            }
        },
        function(response) {
        // error handling routine
        });    
    }

    
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
                    window.location.href="home.html";   
                    }
               // console.log($scope.adminProceed);
            }
        }, function (response)
        {  
        });
};  
   
	
    
    
});

app.controller("salesCtrl",function($scope,$http,$window,$stateParams){
    'use strict';
    //$scope.sid = 0;
    console.log($scope.sid);
    console.log($stateParams.id);
   /* $scope.sales= [
        {"sID":"1", itemName:"Pills", "itemUnit":"1", "clientName":"????", "clientContact":"123","uID":"1","sDate":"11-11-1111"}
    ];*/

    
    $scope.getSales = function(){
        $http.get('php/phpapi.php/sales')
        .then (
        function(response) {
            $scope.salesData = response.data;
            console.log(response.data);
            $scope.currentID = $scope.salesData.length;

            
        },
        function(response) {
        // error handling routine
        });    
    }
    $scope.getSales();
    
    
    $scope.getInven = function(){
        $http.get('php/phpapi.php/inventory')
        .then (
        function(response) {
            $scope.inventoryData = response.data;
            
        },
        function(response) {
        // error handling routine
        });    
    }
    $scope.getInven();
    
        //$scope.currentID = parseInt($scope.sales[$scope.sales.length-1].sID) + 1;
  //  console.log(currentID);
      
   
    $scope.addSales = function (itemName,itemUnit,clientName,clientContact,sDate) {
       var url = "php/salesAdd.php"
        console.log(itemName);
                console.log(itemUnit);


        $scope.currentID+=1;
        var data = $.param({
			SalesID : $scope.currentID,
			ItemName: itemName,
			ItemUnitsOrder: itemUnit,
			ClientName: clientName,
			ClientContact: clientContact,
            UserID:1,
            SalesDate:sDate
		});
        
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
                $scope.salesData = response.data;
                console.log("kappa");
            }
        }, function (response)
        {
            
        });
        
     /*  var input = {"sID": $scope.currentID,
                 itemName: itemName,
                 itemUnit:itemUnit,
                 clientName:clientName,
                 clientContact:clientContact,
                 uID:"1",
                 sDate:sDate };       

        $scope.sales.push(input);      */
    
    

        $window.location.reload();
       
   };
    
   $scope.removeSales = function (salesID) {
   //     $scope.sales.splice($index, 1);
       var url = "php/deleteSales.php", data = $.param({sID:salesID}), config ={
           headers : {
               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
           }
       };
       
       $http.put(url, data, config)
            .then(
                function(response){
                    $scope.msg = response.data;
                },
                function(response) {
                    $scope.msg = response.data;
                }
                         
       );
       $window.location.reload();
   };
    
  $scope.LoadData = function(iname,iorder,cname,ccontact){
      $scope.itemName2=iname;
      $scope.itemUnit2=parseInt(iorder);
      $scope.clientName2=cname;
      $scope.clientContact2=ccontact;
  }
  
  $scope.editSales = function(name,unit,client,contact){
      var url = "php/salesEdit.php";
      var data = $.param({
          snm : name,
          iord : unit,
          cnm : client,
          ccn : contact,
          sID : $scope.sid
      });
      console.log($scope.itemName2);
      var config = {
          headers : {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
      };
      
      $http.put(url, data, config)
			.then(
				function (response) {
					$scope.msg2 = response.data;

				},
				function (response) {
					$scope.msg2 = response.data;
				}
			);
      $window.location.reload();
      
  }   

   
});

app.controller("invenCtrl",function($scope,$http,$window){
    'use strict';
    $scope.getInven = function(){
        $http.get('php/phpapi.php/inventory')
        .then (
        function(response) {
            $scope.inventoryData = response.data;
            
        },
        function(response) {
        // error handling routine
        });    
    }
    $scope.getInven();
    
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
                $scope.getInven();
            }
        }, function (response)
        {
            
        });
        $window.location.reload();
    };
    
//   $scope.inven= [
//        {itemName:"Pills", "itemAmount":3, "itemDescription":"A powerful pill", "itemPrice":10.00,"UnitsOrder":1}
//    ];
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
			templateUrl: "homecontent.html"
		
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



