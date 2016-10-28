/*global angular*/

var app = angular.module("myApp", ['ui.router']);



app.directive('yearDrop',function(){
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
        template: 'Year:<select class="form-control" data-ng-model="selectedYear" data-ng-options="y for y in years" data-ng-change="updateYear(selectedYear)"></select>'
    }
});

app.directive('yearDrop2',function(){
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
        template: 'Year:<select class="form-control" data-ng-model="selectedYear2" data-ng-options="y for y in years" data-ng-change="updateYear2(selectedYear2)"></select>'
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
    
    
    $scope.required = true;

    $scope.invenMode = 'add';
    $scope.salesMode = 'add';
	
    $scope.chngInvenMode  = function (id) {
        $scope.invenMode = 'edit';
        $scope.iid = id;
    };
    
    $scope.chngSalesMode  = function (id) {
        $scope.salesMode = 'edit';
        $scope.sid = id;
    };
    
    $scope.addMode  = function () {
        $scope.salesMode = 'add';
    };
    
    $scope.addMode2 = function () {
        $scope.invenMode = 'add';
    }
    
    $scope.rCode = "";
    $scope.codeIsCorrect=false;
    
    $scope.temp="";
    
    $scope.IDu = "";
    $scope.Acc = "";
    
    $scope.notifyMe = function(message) {
        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            for(var i=0;i<message.length;i++)
            {
                var diff = 5 - message[i].units;
                var notification = new Notification('Low Stock Notification', {
                icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
                body: message[i].itemName + " is below minimum amount of stock " + "for "+ diff + " units" ,
                });   
            }

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
            $scope.notifyMe($scope.lowStocks);
        },
        function(response) {
        // error handling routine
        });    
    }

    
    $scope.adminCheck = function(adminID,adminPW){
    $scope.stopSession();
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
                    if($scope.admin == 'Invalid Admin ID or Password')
                        $scope.adminProceed = false;
                    else
                        {
                        $scope.adminProceed = true;
                        $scope.IDu = $scope.admin;
                        console.log($scope.IDu);
                        $scope.adminGet(adminID);
                        window.location.href="home.html";   
                        
                        }
                   // console.log($scope.adminProceed);
                }
            }, function (response)
            {  
            });
    };
    
    $scope.adminGet = function(adminID){
    var url = "php/getAcc.php";
    var data = $.param({adminID:adminID});
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
                    
                    $scope.get = [];
                    $scope.get = response.data;
                    
                    $scope.IDu = $scope.get[0].UserID;
                    $scope.Acc = $scope.get[0].AccountType;
                    
                    
                    $scope.startSession($scope.IDu, $scope.Acc);
                    console.log($scope.get);
                    console.log($scope.IDu);
                    console.log($scope.Acc);
                }
            }, function (response)
            {  
                
            });
    };
    
        $scope.accGet = function(){
    var url = "php/getInfo.php";
    var data = null;
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
                    
                    $scope.get = [];
                    $scope.get = response.data;
                    
                    $scope.IDu = $scope.get[0].UserID;
                    $scope.Acc = $scope.get[0].AccountType;

                    
                    console.log(response.data);
                    
                    console.log($scope.IDu);
                    console.log($scope.Acc);
                }
            }, function (response)
            {  
                
            });
    };
    
    $scope.accGet();
    
    $scope.startSession = function (userID,Acc){
        var url = "php/session.php";
        var data = $.param({userID:userID, Acc:Acc});
        var config = {
        headers:{
            'Content-Type':'application/x-www-form-urlencoded;charset=utf-8;'
        }
        };
        
        $http.post(url,data,config)
            .then(
            function(response){
                if(response.data)
                {
                     $scope.temp = response.data;
                    console.log($scope.temp);
                }
            }
        )
    
    };
    
    $scope.stopSession = function(){
        var url = "php/logout.php";
        var data = null;
        var config = {
        headers:{
            'Content-Type':'application/x-www-form-urlencoded;charset=utf-8;'
        }
        };
        
        $http.post(url,data,config)
            .then(
            function(response){
                if(response.data)
                {
                     $scope.temp = response.data;
                    console.log($scope.temp);
                }
            }
        )
    
    };
    
    
    $scope.adminRegis = function (userName,password,account){
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
                    $window.location.reload();


				},
				function (response) {
					$scope.msg3 = response.data;
                           $window.location.reload();

				}
			); 
        } else{
            $scope.msg3 = "Please double check your field";
        }
        
    };
   
    $scope.logout = function(){
        window.location.href="index.html";
        $scope.stopSession();
    }
    
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
    
    $scope.addSales = function (itemName,itemUnit,clientName,clientContact,sDate, tPrice) {
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
            UserID:$scope.IDu,
            SalesDate:sDate,
            TotalPrice:tPrice
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

       // $window.location.reload();
   };
    
   $scope.getSalesQty = function(year,month){
        var url = "php/getSalesQty.php"
        
        $scope.currentID+=1;
        var data = $.param({
			Year : year,
			Month: month
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
                $scope.qtyItem = response.data;
                $scope.callPieChart($scope.qtyItem);
                console.log($scope.qtyItem);
            }
        }, function (response)
        {
            
        });
   }
    
   $scope.getSalesQtyMonth = function(year){
            var url = "php/getSalesQtyMonth.php"

            var data = $.param({
                Year : year
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
                    $scope.qtyItemMonth = response.data;
                    $scope.callLineChart($scope.qtyItemMonth);
                    console.log($scope.qtyItemMonth);
                }
            }, function (response)
            {

            });
   }

   $scope.callPieChart = function(item){
        Chart.defaults.global.responsive = true;
        // pie chart data
       
        var pieData = item;
        console.log(pieData);
        var pieOptions = {
            segmentShowStroke : false,
            animateScale : true
        }
        var salesqty= document.getElementById("totalqty").getContext("2d");
        new Chart(salesqty).Pie(pieData, pieOptions);
   }
   
   $scope.callLineChart = function(item){
       Chart.defaults.global.responsive = true;
       var datasets=[];
       function getRandomColor() {
           var letters = '0123456789ABCDEF'.split('');
           var color = '#';
           for (var i = 0; i < 6; i++ ) {
               color += letters[Math.floor(Math.random() * 16)];
           }
           return color;
       }
       
       for (var i = 0; i < item.length; i++) {
          var color = getRandomColor();
          datasets.push({});
          datasets[i].labels= item[i].name;
          datasets[i].fillColor = "rgba(172,194,132,0.4)";
          datasets[i].strokeColor = color;
          datasets[i].pointColor = color;
          datasets[i].pointStrokeColor = color;
          datasets[i].data= item[i].data;
       }
       
        var SalesData = {
            labels : ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"],
            datasets 
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
            console.log(response.data);
            
        },
        function(response) {
        // error handling routine
        });    
    }
    $scope.getInven();
    
    $scope.accGet = function(){
    var url = "php/getInfo.php";
    var data = null;
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
                    
                    $scope.get = [];
                    $scope.get = response.data;
                    
                    $scope.IDu = $scope.get[0].UserID;
                    $scope.Acc = $scope.get[0].AccountType;

                    
                    $scope.updatetemp1 = $scope.IDu;
                    $scope.updatetemp2 = $scope.Acc;
                    
                    //console.log($scope.get);
                    console.log($scope.IDu);
                    console.log($scope.Acc);
                }
            }, function (response)
            {  
                
            });
    };
    
    $scope.accGet();
    
    
    
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
    
    $scope.removeInventory = function (itemName) {
       var url = "php/removeInven.php", data = $.param({iID:itemName}), config ={
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
    
    $scope.LoadData = function(idesc,iamount,iprice,uorder){
      $scope.itemEditDesc=idesc;
      $scope.itemEditAmount=parseInt(iamount);
      $scope.itemEditPrice=parseInt(iprice);
      $scope.itemEditOrder=parseInt(uorder);
  }
    
    $scope.manageInven = function(desc,amount,price,unitorder){
      var url = "php/invenManage.php";
      var data = $.param({
          dsc : desc,
          amn : amount,
          prc : price,
          uio : unitorder,
          iID : $scope.iid
      });
      
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



