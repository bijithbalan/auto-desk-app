var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.selection']);

app.controller('contactController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    $scope.contactDetails = {};
    $scope.serviceResponseMessage = '';
    $scope.gridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        showGridFooter: true,
        multiSelect: false,
        rowTemplate: "<div ng-click=\"grid.appScope.getContactDetails(row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.uid\" class=\"ui-grid-cell\"  ui-grid-cell></div>",
    };

    $scope.gridOptions.columnDefs = [
        { field: 'employeeID', displayName: 'Employee ID' },
        { field: 'firstName', displayName: 'Name', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.firstName}} {{row.entity.lastName}}</div>' },
        { field: 'department', displayName: 'Department' },
        { field: 'homeNumber', displayName: 'Phone Number' }
    ];

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        $scope.gridApi = gridApi;
    };

    $scope.getContactList = function() {
        $http.get('http://localhost:3000/contacts')
            .success(function(data) {
                $scope.gridOptions.data = data;
            });
    };

    $scope.getContactList();

    $scope.getContactDetails = function(row) {
        if (row.entity !== null) {
            $http.get('http://localhost:3000/contacts/' + row.entity._id)
                .success(function(data) {
                    $scope.contactDetails = data;
                });
        }
    };

    $scope.addContactDetails = function() {
        if ($scope.contactDetails.employeeID !== null) {
            var request = {};
            request = $scope.contactDetails;
            var reqHeaders = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8;'
                }
            };
            $http.post('http://localhost:3000/contacts', request, reqHeaders)
                .success(function(data) {
                    $scope.serviceResponseMessage = data;
                });
        }
        $timeout(function() {
            $scope.getContactList();
        }, 1000);
    };

    $scope.updateContactDetails = function() {
        if ($scope.contactDetails.employeeID !== null) {
            var request = {};
            request = $scope.contactDetails;
            var reqHeaders = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8;'
                }
            };
            $http.put('http://localhost:3000/contacts/' + $scope.contactDetails._id, request, reqHeaders)
                .success(function(data) {
                    $scope.serviceResponseMessage = data;
                });
        }
        $timeout(function() {
            $scope.getContactList();
        }, 1000);
    };

    $scope.deleteContactDetails = function() {
        if ($scope.contactDetails.employeeID !== null) {
            $http.delete('http://localhost:3000/contacts/' + $scope.contactDetails._id)
                .success(function(data) {
                    $scope.serviceResponseMessage = data;
                });
        }
        $timeout(function() {
            $scope.getContactList();
        }, 1000);
    };

    /*var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts"
    $sce.trustAsResourceUrl(url);

    $http.jsonp(url, { jsonpCallbackParam: 'callback' })
        .success(function(data) {
            console.log(data.found);
        });*/

}]);
