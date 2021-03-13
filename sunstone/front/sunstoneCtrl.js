var sultanApp = angular.module('sultanApp',[])
    .controller('sunstone',
        function ($scope, $http, $window) {

            $scope.registerItems = {};
            $scope.selectTab = 1;

            $scope.addUser = function () {
                $http.post('http://localhost:3060/sunstone/post', $scope.registerItems).then(function (response) {
                });
            }
            $scope.getListing = function () {
                $http.get('http://localhost:3060/sunstone/get').then(function (response){
                    $scope.usersListing = response.data.data;
                });
            }
            $scope.updateUserPopUp = function(email,index){
                $scope.registerItems.email = email;
                $scope.showUpdatePop = true;
            }
            $scope.updateUser = function(){
                $http.put('http://localhost:3060/sunstone/put').then(function (response){
                    $scope.showUpdatePop = false;
                });
            }
            $scope.deleteUser = function(email,index){
                $http.delete('http://localhost:3060/sunstone/delete').then(function (response){
                });
            }
            $scope.hideDialog = function () {
                $scope.registerItems = {};
                $scope.showUpdatePop = false;
            }
            $scope.imageUpload = function () {
                var files = document.getElementById('file').files[0];
                fd.append('file',files);
            }
        });