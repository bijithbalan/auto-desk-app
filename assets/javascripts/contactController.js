var app = angular.module('contactDetailsController', []);
app.controller('contactController', function($scope, $timeout, contactService) {

    /* Declaring scope variables */
    $scope.contactDetails = {};
    $scope.serviceResponseMessage = '';

    /* Setting the ui grid otpions */
    $scope.gridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        showGridFooter: true,
        multiSelect: false,
        rowTemplate: "<div ng-click=\"grid.appScope.getContactDetails(row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.uid\" class=\"ui-grid-cell\"  ui-grid-cell></div>",
        columnDefs: [
            { field: 'employeeID', displayName: 'Employee ID' },
            { field: 'firstName', displayName: 'Name', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.firstName}} {{row.entity.lastName}}</div>' },
            { field: 'department', displayName: 'Department' },
            { field: 'homeNumber', displayName: 'Phone Number' }
        ]
    };

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        $scope.gridApi = gridApi;
    };

    /* Get the list of contacts */
    $scope.getContactList = function() {
        contactService.getContactList('http://localhost:3000/contacts').then(function(response) {
            // Populate the grid with the contact list data
            $scope.gridOptions.data = response[0];
            console.log(response);
            console.log(response.data[0]);
        });
    };

    /* Get the details of a specific contact */
    $scope.getContactDetails = function(row) {
        if (row.entity !== null) {
            contactService.getContactDetails('http://localhost:3000/contacts/' + row.entity._id).then(function(response) {
                $scope.contactDetails = response[0];
            });
        }
    };

    /* Add a new contact */
    $scope.addContactDetails = function() {
        if ($scope.contactDetails.employeeID !== null) {
            var request = {};
            request = $scope.contactDetails;
            var reqHeaders = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8;'
                }
            };
            contactService.addContactDetails('http://localhost:3000/contacts/', request, reqHeaders).then(function(response) {
                $scope.serviceResponseMessage = response;
            });
        }
        /* Call the contact list service after 1 second to refresh the grid with the updated data */
        $timeout(function() {
            $scope.getContactList();
        }, 1000);
    };

    /* Update an existing contact */
    $scope.updateContactDetails = function() {
        if ($scope.contactDetails.employeeID !== null) {
            var request = {};
            request = $scope.contactDetails;
            var reqHeaders = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8;'
                }
            };
            contactService.updateContactDetails('http://localhost:3000/contacts/' + $scope.contactDetails._id, request, reqHeaders).
            then(function(response) {
                $scope.serviceResponseMessage = response;
            });
        }
        /* Call the contact list service after 1 second to refresh the grid with the updated data */
        $timeout(function() {
            $scope.getContactList();
        }, 1000);
    };

    /* Delete an existing contact */
    $scope.deleteContactDetails = function() {
        if ($scope.contactDetails.employeeID !== null) {
            contactService.deleteContactDetails('http://localhost:3000/contacts/' + $scope.contactDetails._id).then(function(response) {
                $scope.serviceResponseMessage = response;
            });
        }
        /* Call the contact list service after 1 second to refresh the grid with the updated data */
        $timeout(function() {
            $scope.getContactList();
        }, 1000);
    };

});
