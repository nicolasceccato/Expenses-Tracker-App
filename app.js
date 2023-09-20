let app = angular.module('expensesApp', ['ngRoute']);

let myHelpers = {
    dateObjToString: function (dateObj) {
        let year, month, day;
        year = String(dateObj.getFullYear());
        month = String(dateObj.getMonth());
        if (month.length == 1) {
            month = "0" + 1;
        }
        day = String(dateObj.getDate());
        if (day.length == 1) {
            day = "0" + 1;
        }
        return year + "-" + month + "-" + day;
    },
    stringToDateObj: function (string) {
        return new Date(string.substring(0, 4), string.substring(5, 7) - 1, string.substring(8, 10));
    }
};

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

    service.entries.forEach(function (element) {
        element.date = myHelpers.stringToDateObj(element.date);
    });

    service.getNewId = function () {
        if (service.newId) {
            service.newId++;
            return service.newId;
        } else {
            let entryMaxId = _.max(service.entries, function (entry) {
                return entry.id;
            });
            service.newId = entryMaxId.id + 1;
            return service.newId;
        }
    };

    service.save = function (entry) {
        entry.id = service.getNewId();
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