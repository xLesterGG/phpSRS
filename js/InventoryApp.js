/*jslint white:true */
/*global angular */
/*
 * Solution for error message: 'angular' was used before it was defined by JSlint
 *  http://stackoverflow.com/questions/31390428/error-angular-was-used-before-it-was-defined-but-online-editors-able-to-outpu
 *
 */
var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope) {
    "use strict";
    $scope.mode='add';
    $scope.item='';
    $scope.itemAmount;
//    $scope.strVar = "sample";
//    $scope.numVar    = 0;
//    
//    $scope.addValue  = function (num2add) {
//        $numVar = $numVar + num2add;
//    };
//    
//    $scope.incNum    = function () {
//        $numVar += 1;
//    };
//    
//    $scope.isNumEven = function () {
//        return (($numVar % 2) === 0);
//    };
//    
//    $scope.$watch ("strVar", function (newValue, oldValue){
//            $scope.anotherVar += 1;
//        }
//    );

});
