let app = angular.module('expensesApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/expenses.html',
            controller: 'ExpensesViewController'
        })
        .when('/expenses', {
            templateUrl: 'views/expenses.html',
            controller: 'ExpensesViewController'
        })
        .when('/expenses/new', {
            templateUrl: 'views/expenseForm.html',
            controller: 'ExpenseViewController'
        })
        .when('/expenses/edit/:id', {
            templateUrl: 'views/expenseForm.html',
            controller: 'ExpenseViewController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('HomeViewController', ['$scope', function ($scope) {
    $scope.appTitle = "Simple Expenses Tracker";
}]);

app.factory('Expenses', function () {
    let service = {};

    service.entries = [
        { description: 'food', amount: 10, date: '2023-09-01' },
        { description: 'tickets', amount: 11, date: '2023-09-02' },
        { description: 'food', amount: 12, date: '2023-09-02' },
        { description: 'phone credit', amount: 10, date: '2023-09-01' },
        { description: 'bills', amount: 13, date: '2023-09-03' },
        { description: 'food', amount: 15, date: '2023-09-04' }
    ];

    return service;
});

app.controller('ExpensesViewController', ['$scope', 'Expenses', function ($scope, Expenses) {
    $scope.expenses = Expenses.entries;
}]);

app.controller('ExpenseViewController', ['$scope', '$routeParams', 'Expenses', function ($scope, $routeParams, Expenses) {
    $scope.someText = 'The world is round. ID = ' + $routeParams.id + '. The first entry is: ' + Expenses.entries[0].description;
}]);