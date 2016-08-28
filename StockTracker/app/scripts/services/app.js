
var app = angular.module('app', []);

//app.service('task', ['$http', '$q', '$rootScope', '$log', function ($http, $q, $rootScope, $log) {

//	var task = this;	// service

//	task.posts = function(id) {
//		var deferred = $q.defer();		// A new instance of deferred

//		/*
//		Methods:
//		resolve(value) – resolves the derived promise with the value. If the value is a rejection constructed via $q.reject, the promise will be rejected instead.
//		reject(reason) – rejects the derived promise with the reason. This is equivalent to resolving it with a rejection constructed via $q.reject.
//		notify(value) - provides updates on the status of the promise's execution. This may be called multiple times before the promise is either resolved or rejected.
//		Properties:
//		promise – {Promise} – promise object associated with this deferred.
//		*/
//		var getPromise = $http.get($rootScope.compareEndPoint + '/posts/' + id);

//		// then also returns a promise for chaining
//		getPromise.then(function (result) {
//			deferred.resolve(result);
//		},
//			function (rejectionReason) {
//				var rejection = {
//					status: rejectionReason.status,
//					statusText: rejectionReason.statusText
//				};

//				deferred.reject(rejection);
//				$log.error(rejectionReason);
//		});
		
//		return deferred.promise;
//	};

//	return task;
//}]);

// better:
app.service('market_data', ['$http', '$q', '$rootScope', '$log', function ($http, $q, $rootScope, $log) {

	var market_data = this;	// service

	market_data.posts = function (id) {

		/*
		Methods:
		resolve(value) – resolves the derived promise with the value. If the value is a rejection constructed via $q.reject, the promise will be rejected instead.
		reject(reason) – rejects the derived promise with the reason. This is equivalent to resolving it with a rejection constructed via $q.reject.
		notify(value) - provides updates on the status of the promise's execution. This may be called multiple times before the promise is either resolved or rejected.
		Properties:
		promise – {Promise} – promise object associated with this deferred.
		*/
		var getPromise = $http.get($rootScope.compareEndPoint + '/posts/' + id);

		// then also returns a promise for chaining
		return getPromise.then(function (result) {
			return result.data; // in this case the data property contains a user object w/ userId, id, title and body properties
//			deferred.resolve(result);
		},
			function (rejectionReason) {

				// we transform the $http error to a
				// rejection object and throw it so
				// that chained promises will receive that
				// in their error methods

				var rejection = {
					status: rejectionReason.status,
					statusText: rejectionReason.statusText
				};

				$log.error(rejectionReason);
				throw rejection;		
			});

//		return getPromise;
	};

	return market_data;
}]);

app.constant('END_POINT', 'http://jsonplaceholder.typicode.com');

app.controller('controller', ['$scope', 'END_POINT', 'market_data', function ($scope, END_POINT, market_data) {
	var model = {};

	model.name = END_POINT;
	model.id = 50;

	model.post = null;
	model.error = null;

	model.posts = function (id) {
		market_data.posts(id).then(function (result) {
			model.post = result;
		},
		function(rejection) {
			model.error = rejection.status + ' ' + rejection.statusText;
		});
	};

	$scope.model = model;
	}
]);

// don't need this as END_POINT can be injected anywhere
// may want it in run so it can be configured?
app.run(function($rootScope, END_POINT) {
	$rootScope.compareEndPoint = END_POINT;
})