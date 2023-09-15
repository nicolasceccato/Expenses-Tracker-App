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
        { id: 1, description: 'food', amount: 10, date: '2023-09-01' },
        { id: 2, description: 'tickets', amount: 11, date: '2023-09-02' },
        { id: 3, description: 'food', amount: 12, date: '2023-09-02' },
        { id: 4, description: 'phone credit', amount: 10, date: '2023-09-01' },
        { id: 5, description: 'bills', amount: 13, date: '2023-09-03' },
        { id: 6, description: 'food', amount: 15, date: '2023-09-04' }
    ];

    service.save = function (entry) {
        service.entries.push(entry);
    };
    return service;
});

app.controller('ExpensesViewController', ['$scope', 'Expenses', function ($scope, Expenses) {
    $scope.expenses = Expenses.entries;
}]);

app.controller('ExpenseViewController', ['$scope', '$routeParams', '$location', 'Expenses', function ($scope, $routeParams, $location, Expenses) {
    if (!$routeParams.id) {
        $scope.expense = { id: 7, description: 'something', amount: 10, date: new Date() };
    }
    $scope.save = function () {
        Expenses.save($scope.expense);
        $location.path('/');
    }
}]);