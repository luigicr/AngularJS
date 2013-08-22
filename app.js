function getDetails(index, min, max) {
    'use strict';
    var linkNames = ["Tutorial #", "Mozilla Developer Network, Learn CSS Topic #",
                        "Exercise #", "Try jQuery, Chapter", "AngularJS – Tutorial"],
        detailsLink = [],
        rango,
        z;

    rango = max - min + 1;
    z = Math.floor(Math.random() * rango) + parseFloat(min);
    for (var i = 0; i < z; i++) {
        if (index === 0) {
            detailsLink.push({'name' : linkNames[index] + " " + (index+1) + " at W3Schools"});
        } else if (index === 2) {
            detailsLink.push({'name' : linkNames[index] + " " + (index+1) + " at CodeAcademy.com"});
        } else {
            detailsLink.push({'name' : linkNames[index] + " " + (index+1)});  
        }
    };
    var details = {"details": detailsLink};
    return details;
}

var MyApp = angular.module("Workshop01", []);

MyApp.controller("getCourses", function($scope, $http, $q) {
    $scope.loadData = function () {
        var promises = [];
        $scope.data = [];
        for (var i = 1; i <= Math.floor((Math.random() * 5) + 1); i++) {
            var promise = $http.get('data/tab' + i + ".json");
            promises.push(promise);
        };

        $q.all(promises).then(function (data) { 
            angular.forEach(data, function(value, key) {
                 $scope.data.push(value.data); 
                 $.each($scope.data, function(index, valueScope) {
                    $.extend(value.data, getDetails(index, value.data.min, value.data.max));
                });   
            });
            
        });
    };
});