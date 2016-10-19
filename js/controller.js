/*global angular*/

var app = angular.module("myApp", ['ui.router']).directive('yearDrop',function(){
   	function getYears(offset){
        var currentYear = 1990;
        var range = new Date().getFullYear()-currentYear;
        var years = [];
        for (var i = 0; i < range + 1; i++){
            years.push(currentYear + offset + i);
        }
        return years;
    }
    return {
        link: function(scope,element,attrs){
            scope.years = getYears(+attrs.offset);
        },
        template: '<div class="col-md-2 col-xs-2"><br><select class="form-control" data-ng-model="selectedYear" data-ng-options="y for y in years" data-ng-change="updateYear(selectedYear)"></select></div>'
    }
});	

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
    
    $scope.rCode = "";
    $scope.codeIsCorrect=false;
    
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
    
    $scope.adminRegis = function (userName,password,account){
        console.log("I am here");
        if($scope.codeIsCorrect == true){
        var url = "php/register.php"
        var data = $.param({
            UserID : userName,
            UserPassword : password,
            AccountType : account
        });
        
        var config = {
        headers:{
            'Content-Type':'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        
        $http.post(url,data,config)
        .then(
				function (response) {
					$scope.msg3 = response.data;

				},
				function (response) {
					$scope.msg3 = response.data;
				}
			); 
        } else{
            $scope.msg3 = "Please double check your field";
        }
        
    };
   
    $scope.checkcode = function(input){
                         
        if(input!='' && input == $scope.rCode)
        {
            $scope.codemsg ="Your code is correct, please proceed";
            $scope.codeIsCorrect = true;
        }
        
        if(input!='' && input != $scope.rCode)
        {
            $scope.codemsg ="Your code is incorrect, please check with your supervisor";

        }
    };
	   
    $scope.getCode = function(acctype){
        $scope.inputcode ="";
        $scope.codemsg ="";
        $scope.codeIsCorrect=false;

        console.log(acctype);
        if(acctype=="Admin"){
            $http.get('php/getCode1.php')  
            .then(
                function (response) {
                    $scope.codes = [];
                    $scope.codes= response.data;
                    
                    $scope.rCode = $scope.codes[0].Code;
                    console.log($scope.rCode);
                },
                function (response) {
                    alert(response.data);
                }
            );     
            
        }
        else if (acctype == "Officer")
        {
            $http.get('php/getCode2.php')  
            .then(
                function (response) {
                    $scope.codes = [];
                    $scope.codes= response.data;
                    
                    $scope.rCode = $scope.codes[0].Code;
                    console.log($scope.rCode);

                },
                function (response) {
                    alert(response.data);
                }
            );  
            
        }
        else{
            $http.get('php/getCode3.php')  
            .then(
                function (response) {
                    $scope.codes = [];
                    $scope.codes= response.data;
                    
                    $scope.rCode = $scope.codes[0].Code;
                    console.log($scope.rCode);

                },
                function (response) {
                    alert(response.data);
                }
            ); 
        }       
        
        
    }
    
});

app.controller("salesCtrl",function($scope,$http,$window,$stateParams){
    'use strict';
    //$scope.sid = 0;
    console.log($scope.sid);
    console.log($stateParams.id);
   /* $scope.sales= [
        {"sID":"1", itemName:"Pills", "itemUnit":"1", "clientName":"????", "clientContact":"123","uID":"1","sDate":"11-11-1111"}
    ];*/

    $scope.selectedMonth="";
    $scope.filtermode="Month";
    $scope.selectedMonthFilter = function(element) {
        
        if(!$scope.selectedMonth) 
        {
            return true;
        }
        console.log($scope.selectedMonth);
        return element.SalesDate.split("-")[1] == $scope.selectedMonth;        
        
    }
    
    $scope.updateMonth = function(a) {
        $scope.selectedMonth=a;
    }
    
    $scope.selectedYearFilter = function(element) {
        
        if(!$scope.selectedYear) 
        {
            return true;
        }
        console.log($scope.selectedYear);
        return element.SalesDate.split("-")[0] == $scope.selectedYear;        
    }
    
    $scope.updateYear = function(a) {
        $scope.selectedYear=a;
    }
    
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

        $window.location.reload();
   };
    
   $scope.getSalesQty = function(){
        $http.get('php/getSalesQty.php')
        .then (
        function(response) {
            $scope.qtyItem = response.data;
        },
        function(response) {
            // $scope.msg = "Service not Exists";
        });
   }
   $scope.getSalesQty();
    
   $scope.getSalesQtyMonth = function(){
        $http.get('php/getSalesQtyMonth.php')
        .then (
        function(response) {
            $scope.qtyItemMonth = response.data;
            console.log($scope.qtyItemMonth );
        },
        function(response) {
            // $scope.msg = "Service not Exists";
        });
   }
   $scope.getSalesQtyMonth();
    
   $scope.getSalesQtyYear = function(){
        $http.get('php/getSalesQtyYear.php')
        .then (
        function(response) {
            $scope.qtyItemYear = response.data;
            console.log($scope.qtyItemYear );
        },
        function(response) {
            // $scope.msg = "Service not Exists";
        });
   }
   $scope.getSalesQtyYear();
        
   $scope.callChart = function(){
        Chart.defaults.global.responsive = true;
        // pie chart data
        $scope.getSalesQty();
       
        var pieData = $scope.qtyItem;
        var pieOptions = {
            segmentShowStroke : false,
            animateScale : true
        }
        var salesqty= document.getElementById("totalqty").getContext("2d");
        new Chart(salesqty).Pie(pieData, pieOptions);
       
        // pie chart data
        $scope.getSalesQtyMonth();
        
        var barData = {
            labels : ["Jan","Feb","Mar","Apr","May","Jun","Aug","Sep","Oct","Nov","Dec"],
            datasets : [
                {
                    fillColor : "#48A497",
                    strokeColor : "#48A4D1",
                    data :$scope.qtyItemMonth
                }
            ]
        }
        var totalqtyMonth = document.getElementById("totalqtyMonth").getContext("2d");
        new Chart(totalqtyMonth).Bar(barData);
       
        $scope.getSalesQtyYear();
        var currentyear=new Date().getFullYear();
       
        var SalesData = {
            labels : [currentyear-4,currentyear-3,currentyear-2,currentyear-1,currentyear],
            datasets : [
            {
                fillColor : "rgba(172,194,132,0.4)",
                strokeColor : "#ACC26D",
                pointColor : "#fff",
                pointStrokeColor : "#9DB86D",
                data:$scope.qtyItemYear
            }
        ]
        }
        var sales = document.getElementById('totalqtyYear').getContext('2d');
        new Chart(sales).Line(SalesData);
   }
    
    
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
    
  $scope.LoadData = function(iname,iorder,cname,ccontact,cDate){
      $scope.itemName2=iname;
      $scope.itemUnit2=parseInt(iorder);
      $scope.clientName2=cname;
      $scope.clientContact2=ccontact;
      $scope.sDate2=cDate;
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
        
        .state('SalesAnalyse', {
			url: '/SalesAnalyse',
			templateUrl: "graph.html"
		
		})	
    
        .state('InvenMan', {
			url: '/InvenManagement',
			templateUrl: "inven.html"
		
		})
	
});



