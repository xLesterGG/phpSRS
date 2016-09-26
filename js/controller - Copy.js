/*global angular*/

var app = angular.module("myApp", ['ui.router']);

//to load postbox
app.directive('ngPost', function () {
	'use strict';
	
	return {
		restrict: 'A',
		templateUrl: 'postbox.html'
		
	};
	
});

//to filter ongoing events
app.filter("ongoing", function () {
	'use strict';
	return function (activity) {
		var current = new Date(), a = new Date(), b = new Date();
		
		var g = activity.ActivityDate,
			h = g.split('/'),
			d = new Date(h[2], h[1] - 1, h[0]);
		
		var s = activity.StartTime,
			parts = s.match(/(\d+)\.(\d+) (\w+)/),
			hours = /am/i.test(parts[3]) ? parseInt(parts[1], 10) : parseInt(parts[1], 10) + 12,
			minutes = parseInt(parts[2], 10);
		
		if (hours >= 24) {
			hours = hours - 12;
		}
			
		
		a.setHours(hours);
		a.setMinutes(minutes);
		
		
		var t = activity.EndTime,
			parts1 = t.match(/(\d+)\.(\d+) (\w+)/),
			hours2 = /am/i.test(parts1[3]) ? parseInt(parts1[1], 10) : parseInt(parts1[1], 10) + 12,
			minutes2 = parseInt(parts1[2], 10);
		
		if (hours2 >= 24) {
			hours2 = hours2 - 12;
			
		}
		
		
		b.setHours(hours2);
		b.setMinutes(minutes2);
		
		//console.log(a + 'is start');
		//console.log(a + 'is end');
		
		
		
		
		if ((current.getFullYear() === d.getFullYear()) && (current.getMonth() === d.getMonth()) &&  (current.getDate() === d.getDate())) {
			
			if ((current.getHours() === a.getHours() && current.getMinutes() >= a.getMinutes()) || current.getHours() > a.getHours()) { // if same hour, or after start time

				if ((current.getHours() === b.getHours() && current.getMinutes() < b.getMinutes()) || current.getHours() < b.getHours()) {
					return true;
				}

			} else {
				return false;
			}
				
		} else {
			return false;
		}
				
		
				
	};
	
	
}); 

//to filter upcoming events
app.filter("upcoming", function () {
	'use strict';
	return function (activity) {
		var current = new Date(), st = new Date();
		
		var g = activity.ActivityDate;
		var h = g.split('/');
		var d = new Date(h[2], h[1] - 1, h[0]);

		
		var s = activity.StartTime,
			parts = s.match(/(\d+)\.(\d+) (\w+)/),
			hours = /am/i.test(parts[3]) ? parseInt(parts[1], 10) : parseInt(parts[1], 10) + 12,
			minutes = parseInt(parts[2], 10);
		
		if (hours >= 24) {
			hours = hours - 12;
		}
			
		
		st.setHours(hours);
		st.setMinutes(minutes);
				
		if (current.getFullYear() < d.getFullYear()) {
			console.log('here');
			return true;

		} else if (current.getMonth() <= d.getMonth()) {
			if (current.getFullYear() > d.getFullYear()) {
				return false;
			} else if (current.getMonth() < d.getMonth()) {
				return true;
			} else if (current.getMonth() === d.getMonth()) {
				if (current.getDate() <= d.getDate()) {
					if (current.getDate() < d.getDate()) {
						return true;
					} else if (current.getDate() === d.getDate()) {
						if ((current.getHours() === st.getHours() && current.getMinutes() < st.getMinutes()) ||  current.getHours() < st.getHours()) {
							return true;
						} else {
							return false;
						}

					}
					
				}
								
			}
			
		}
						
	};
	
	
});

//to finter past events
app.filter("past", function () {
	'use strict';
	return function (activity) {
		var current = new Date(), ed = new Date();
		
		var g = activity.ActivityDate;
		var h = g.split('/');
		var d = new Date(h[2], h[1] - 1, h[0]);
		//console.log(d);
		
		var s = activity.EndTime,
			parts = s.match(/(\d+)\.(\d+) (\w+)/),
			hours = /am/i.test(parts[3]) ? parseInt(parts[1], 10) : parseInt(parts[1], 10) + 12,
			minutes = parseInt(parts[2], 10);
		
		if (hours >= 24) {
			hours = hours - 12;
			
		}
			
		
		ed.setHours(hours);
		ed.setMinutes(minutes);

		if (current.getFullYear() > d.getFullYear()) {
			return true;
			
		} else if (current.getMonth() >= d.getMonth()) {
			if (current.getFullYear() < d.getFullYear()) {
				return false;
			} else if (current.getMonth() > d.getMonth()) {
				return true;
			} else if (current.getMonth() === d.getMonth()) {
				if (current.getDate() >= d.getDate()) {
					
					if (current.getDate() > d.getDate()) {
						return true;
					} else if (current.getDate() === d.getDate()) {
						if ((current.getHours() === ed.getHours() && current.getMinutes() >= ed.getMinutes()) ||  current.getHours() > ed.getHours()) {
							return true;
						} else {
							return false;
						}
						
					}
					
				}
								
			}
			
		}
		
		
		
		
						
	};
	
	
});

//filter required for pagination
app.filter("offset", function () {
	'use strict';
	return function (input, start) {
		start = parseInt(start, 10);
		return input.slice(start);
	};
});


//controller to handle updating activity
app.controller("updateactivityMgmtCtrl", function ($scope, $stateParams, $http) {
	'use strict';
	$scope.required = true;
	$scope.activityID = $stateParams.id;  //accept id from route
	$scope.uactivity = {};

	$http.get('php/getactivity1.php')  //load unformatted values to be put into form
		.then(
			function (response) {
				$scope.data.activities = [];
				$scope.data.activities = response.data;
				$scope.eid = $scope.data.activities[0].EventID;
			},
			function (response) {
				alert(response.data);
			}
		);
	
		//to load data to the forms
	$scope.LoadData = function (aid, fname, location, desc, date, stime, etime) {
		
		$scope.aid = aid;
		$scope.uactivity.name = fname;
		$scope.uactivity.location = location;
		$scope.uactivity.desc = desc;
		$scope.uactivity.date = new Date(date);
		$scope.uactivity.stime = new Date(stime);
		$scope.uactivity.etime = new Date(etime);
		
	};
	
	$scope.Update = function () { // for form submission to update details
		var url = "php/updateactivity.php";
		var data = $.param({
			eid : $scope.eid,
			aid : $scope.aid,
			name: $scope.uactivity.name,
			location: $scope.uactivity.location,
			desc: $scope.uactivity.desc,
			sdate: $scope.uactivity.date,
			stime: $scope.uactivity.stime,
			etime : $scope.uactivity.etime
		});
		var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
		
		$http.put(url, data, config)
			.then(
				function (response) {
					$scope.msg = response.data;

				},
				function (response) {
					$scope.msg = response.data;
				}
			);
		
		
		
		
	};
		
});

//controller for activity management page
app.controller("activityMgmtCtrl", function ($scope, $http) {
	'use strict';
	
	$http.get('php/getactivity.php') // get all activities to be listed
		.then(
			function (response) {
				$scope.data.activities = [];
				$scope.data.activities = response.data;
			},
			function (response) {
				alert(response.data);
			}
		);
	 
	$scope.Remove = function (aid, eventid) { // to delete events
		var url = "php/deleteactivity.php", data = $.param({eid: eventid, aid: aid}), config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
	
		$http.put(url, data, config)
			.then(
				function (response) {
					$scope.msg = response.data;

				},
				function (response) {
					$scope.msg = response.data;
				}
			);
		
	};
	
	
	
	
});

//controller for chat management
app.controller("chatMgmtCtrl", function ($scope, $http) {
	'use strict';
	
	$http.get('php/getchatmessages.php')
		.then(
			function (response) {
				$scope.data.messages = response.data;
			},
			function (response) {
				
			}
		);
	
	$scope.Remove = function (messid, eventid) { // to delete message
		var url = "php/deletemessage.php", data = $.param({eid: eventid, mid: messid}), config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
	
		$http.put(url, data, config)
			.then(
				function (response) {
					$scope.msg = response.data;

				},
				function (response) {
					$scope.msg = response.data;
				}
			);
		
	};
	
	
});

//controller responsible on activity loading on main page.
app.controller("activityCtrl", function ($scope, $http, $interval) {
	'use strict';
	$scope.data.activities = [];

	$scope.LoadData = function () {
		$http.get('php/getactivity.php')
			.then(
				function (response) {
					$scope.data.activities = response.data;
					$scope.eid = $scope.data.activities[0].EventID;
						
					//pagination
					$scope.accPerPage = 4;
					$scope.currentPage = 0;
					$scope.range = function () {
						var rangeSize = Math.ceil($scope.data.activities.length / $scope.accPerPage), ret = [], start = $scope.currentPage, i;
						if (start > $scope.pageCount() - rangeSize) {
							start = $scope.pageCount() - rangeSize + 1;
						}

						if (start < 0) {
							start = 0;
						}

						for (i = start; i < start + rangeSize; i++) {
							ret.push(i);
						}
						return ret;
					};	

					$scope.prevPage = function () {
						if ($scope.currentPage > 0) {
							$scope.currentPage--;
						}
					};

					$scope.prevPageDisabled = function () {
						return $scope.currentPage === 0 ? "disabled" : "";
					};

					$scope.nextPage = function () {
						if ($scope.currentPage < $scope.pageCount()) {
							$scope.currentPage++;
						}
					};

					$scope.nextPageDisabled = function () {
						return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
					};
					$scope.pageCount = function () {
						return Math.ceil($scope.data.activities.length / $scope.accPerPage) - 1;
					};
				
			},
			function (response) {

			}
		);
	};
});

//controller form adding activity page
app.controller("addActivityCtrl", function ($scope, $http) {
	'use strict';
	$scope.required = true; //form validation
	$scope.CurrentDate = new Date(); 

	$http.get('php/getnexteventid.php') // to get next id
		.then(
			function (response) {
				$scope.data.activities = response.data;
				$scope.activitynextID = Number($scope.data.activities[0].ActivityID) + 1;// to get id for adding event
				
			},
			function (response) {
				alert(response.data);
			}
		);
	
	$http.get('php/getactivity.php')
		.then(
			function (response) {
				$scope.data.activities = [];
				$scope.data.activities = response.data;
			},
			function (response) {
				alert(response.data);
			}
		);
	

	$scope.submit = function () { //submit form and post to db
		var url = "php/addactivity.php", data = $.param({
			eid: $scope.eid,
			id: $scope.activitynextID,
			name: $scope.activity.name,
			location: $scope.activity.location,
			desc: $scope.activity.desc,
			sdate: $scope.activity.date,
			stime: $scope.activity.stime,
			etime : $scope.activity.etime
			
		}), config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
		
		$http.post(url, data, config)
			.then(
				function (response) {
					$scope.msg = response.data;

				},
				function (response) {
					$scope.msg = response.data;
				}
			);
				
		$scope.activitynextID += 1;
	};
	
	
	
});


app.controller("chatCtrl", function ($scope, $http) {
	'use strict';
	$scope.required = true; // form validation

	$scope.LoadData = function () {
		$http.get('php/getnextmessageid.php')
		.then(
			function (response) {
				
				$scope.data.messages = response.data;
				$scope.messageNextID = Number($scope.data.messages[0].MessageID) + 1;// to get id for message
				
			},
			function (response) {
				alert(response.data);
			}
		);
	
	$http.get('php/getchatmessages.php') // load messages
		.then(
			function (response) {
				$scope.data.messages = response.data;
				
				$scope.evid = $scope.data.messages[0].EventID;
				},
			function (response) {
				alert(response.data);
			}
		);	
	};
	

		
	$scope.Add = function (uname, msg) {
		var url = "php/postmessage.php";
		var data = $.param({
			eid : $scope.evid,
			mid: $scope.messageNextID,
			user: uname,
			message: msg,
			time: new Date()
		});
		
		var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
		
		$http.post(url, data, config)
			.then(
				function (response) {
					$scope.msg = response.data;

				},
				function (response) {
					$scope.msg = response.data;
				}
			);
		$scope.chat.message = '';
		$scope.messageNextID+=1;
		
	};
	
});

//main controller to handle some basic initialization and functions
app.controller("myCtrl", function ($scope, $http) {
	'use strict';
	$scope.eventid = 1;
	$scope.data = {};
	$scope.CurrentDate = new Date();
	$scope.isadmin = 0;	
	//$scope.admin = {};
	
	$scope.adminlogin = function (id,pw) {
		
		if(id===pw) {
			$scope.isadmin =1;
			$scope.msg1 = "Login successful";
			$scope.adminid='';
			$scope.adminpw='';
		} else {
			$scope.msg1 = "Invalid details";
			$scope.admin.id='';
			$scope.admin.pw='';
		}
		
				
		
	};
	
	$scope.logout = function() {		
		$scope.isadmin =0;
	};
	
	$http.get('php/geteventinfo.php')
		.then(
			function (response) {
				$scope.data = response.data;
				$scope.eid = $scope.data[0].EventID; // used in multiple places
				
			},
			function (response) {
			}
		);
	
});

//controller for managing the event itself
app.controller("eventMgmtCtrl", function ($scope, $http) {
	'use strict';
	$scope.ev = {};
	$scope.required = true;
	
	$scope.LoadData = function (name, desc, location) {
		$scope.ev.name = name;
		$scope.ev.desc  = desc;
		$scope.ev.location = location;

		
	};
	
	$scope.Update = function () {
		var url = "php/updateevent.php";
		var data = $.param({
			eid : $scope.eid,
			name: $scope.ev.name,
			desc: $scope.ev.desc,
			location: $scope.ev.location
			
		});
		var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
		
		$http.put(url, data, config)
			.then(
				function (response) {
					$scope.msg = response.data;

				},
				function (response) {
					$scope.msg = response.data;
				}
			);
		
		
		
		
	};
	
	
	
		
});

//routing for ui-router
app.config(function ($stateProvider, $urlRouterProvider) {
	'use strict';
	$urlRouterProvider.otherwise("/");

	
	$stateProvider
		.state('/', {
			url: '/',
			templateUrl: "events.html"
		
		})
		.state('addactivities', {
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
		
		});
	
});



