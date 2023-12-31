let app = angular.module('expensesApp', ['ngRoute']);

let myHelpers = {
    dateObjToString: function (dateObj) {
        let year, month, day;
        year = String(dateObj.getFullYear());
        month = String(dateObj.getMonth());
        if (month.length == 1) {
            month = "0" + month;
        }
        day = String(dateObj.getDate());
        if (day.length == 1) {
            day = "0" + day;
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

    service.getById = function (id) {
        return _.find(service.entries, function (entry) {
            return entry.id == id;
        })
    };

    service.save = function (entry) {

        let toUpdate = service.getById(entry.id);

        if (toUpdate) {
            _.extend(toUpdate, entry);
        } else {
            entry.id = service.getNewId();
            service.entries.push(entry);
        }
    };

    service.remove = function (entry) {
        service.entries = _.reject(service.entries, function (element) {
            return element.id == entry.id;
        })
    };

    return service;
});



app.controller('ExpensesViewController', ['$scope', 'Expenses', function ($scope, Expenses) {
    $scope.expenses = Expenses.entries;

    $scope.remove = function (expense) {
        Expenses.remove(expense);
    };
    $scope.$watch(function () {
        return Expenses.entries
    },
        function (entries) {
            $scope.expenses = entries;
        });
}]);

app.controller('ExpenseViewController', ['$scope', '$routeParams', '$location', 'Expenses', function ($scope, $routeParams, $location, Expenses) {
    if (!$routeParams.id) {
        $scope.expense = { date: new Date() };
    } else {
        $scope.expense = _.clone(Expenses.getById($routeParams.id));
    }
    $scope.save = function () {
        Expenses.save($scope.expense);
        $location.path('/');
    };
}]);

app.directive('zvaExpenses', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/expense.html'
    };
});