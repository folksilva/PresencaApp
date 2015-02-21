var app = angular.module("PresencaApp", ['ngMaterial', 'ngRoute']);

app.config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryColor('indigo')
        .accentColor('red')
        .warnColor('amber')
        .backgroundColor('grey', {'default': '50'});
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/presenca', {
        templateUrl: 'views/presenca.html',
        controller: 'PresencaCtrl'
    })
    .when('/alunos', {
        templateUrl: 'views/alunos.html',
        controller: 'AlunosCtrl'
    })
    .when('/alunos/novo', {
        templateUrl: 'views/novo-aluno.html',
        controller: 'NovoAlunoCtrl'
    })
    .when('/alunos/:alunoId', {
        templateUrl: 'views/ver-aluno.html',
        controller: 'VerAlunoCtrl'
    })
    .when('/professores', {
        templateUrl: 'views/professores.html',
        controller: 'ProfessoresCtrl'
    })
    .when('/professores/novo', {
        templateUrl: 'views/novo-aluno.html',
        controller: 'NovoProfessorCtrl'
    })
    .when('/professores/:professorId', {
        templateUrl: 'views/ver-professor.html',
        controller: 'VerProfessorCtrl'
    })
    .when('/turmas', {
        templateUrl: 'views/turmas.html',
        controller: 'TurmasCtrl'
    })
    .when('/turmas/novo', {
        templateUrl: 'views/novo-turma.html',
        controller: 'NovoTurmaCtrl'
    })
    .when('/turmas/:turmaId', {
        templateUrl: 'views/ver-turma.html',
        controller: 'VerTurmaCtrl'
    })
    .otherwise({redirectTo: '/presenca'});
}]);

/**
 * Controle principal da aplicação
 */
app.controller('AppCtrl', ['$scope', '$mdSidenav', '$mdDialog', function($scope, $mdSidenav, $mdDialog) {
    var chave = 'Presenca2015';
    $scope.title = 'Iniciando...';
    $scope.chave = null;
    $scope.liberado = false;
    $scope.toggleNav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
    $scope.setTitle = function (title){
        $scope.title = title;
    };

    $mdDialog.show({
        controller: 'UnlockCtrl',
        templateUrl: 'views/unlock.html',
        clickOutsideToClose: false,
        escapeToClose: false
    }).then(function(c) {
        if (c === chave) {
            $scope.liberado = true;
        }
    }, null);
}]);

app.controller('UnlockCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
    $scope.unlock = function () {
        $mdDialog.hide($scope.chave);
    }
}]);
