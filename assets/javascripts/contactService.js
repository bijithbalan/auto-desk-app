var app = angular.module('contactDetailsService', []);
app.service('contactService', function($http) {

    /* Service call to get the list of contacts */
    this.getContactList = function(url) {
        return $http({
            method: 'GET',
            url: url,
            headers: { 'Content-Type': 'application/json; charset=utf-8;' }
        }).success(function(data) {
            return data;
        }).error(function() {
            return null;
        });
    };

    /* Service call to get the details of a specific contact */
    this.getContactDetails = function(url) {
        return $http({
            method: 'GET',
            url: url,
            headers: { 'Content-Type': 'application/json; charset=utf-8;' }
        }).success(function(data) {
            return data;
        }).error(function() {
            return null;
        });
    };

    /* Service call to add a new contact */
    this.addContactDetails = function(url, request, reqHeaders, successCallBack) {
        return $http.post(url, request, reqHeaders).success(function(data) {
            return data;
        }).error(function() {
            return null;
        });
    };

    /* Service call to update an existing contact */
    this.updateContactDetails = function(url, request, reqHeaders, successCallBack) {
        return $http.put(url, request, reqHeaders).success(function(data) {
            return data;
        }).error(function() {
            return null;
        });
    };

    /* Service call to delete an existing contact */
    this.deleteContactDetails = function(url, successCallBack) {
        return $http.delete(url).success(function(data) {
            return data;
        }).error(function() {
            return null;
        });
    };

});
