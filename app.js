let app = angular.module('expensesApp', ['ngRoute']);

app.controller('HomeViewController', ['$scope', function ($scope) {
    $scope.appTitle = "Simple Expenses Tracker";
}]);

app.controller('ExpensesViewController', ['$scope', function ($scope) {
    $scope.expenses = [
        { description: 'food', amount: 10, date: '2023-09-01' },
        { description: 'tickets', amount: 11, date: '2023-09-02' },
        { description: 'food', amount: 12, date: '2023-09-02' },
        { description: 'phone credit', amount: 10, date: '2023-09-01' },
        { description: 'bills', amount: 13, date: '2023-09-03' },
        { description: 'food', amount: 15, date: '2023-09-04' }
    ];
}]);
