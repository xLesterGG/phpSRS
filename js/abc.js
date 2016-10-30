/*global angular*/

var app = angular.module("myApp",[]);

app.controller("myCtrl", function ($scope, $http) {
	'use strict';    
    console.log('atrcl');
    $scope.IDu = '';
    
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

                    
                    //console.log(response.data);
                    
                    console.log(response.data);
                }
            }, function (response)
            {  
                
            });
    };
    
    $scope.accGet();
  
    
});




