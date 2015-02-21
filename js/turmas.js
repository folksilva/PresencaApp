app.controller('TurmasCtrl', ['$scope', '$mdToast', 'Turma', function ($scope, $mdToast, Turma) {
    $scope.$parent.setTitle('Turmas');
    $scope.turmas = [];
    var query = new Parse.Query(Turma);
    query.find({
        success: function (r) {
            $scope.turmas = r;
            $scope.$apply();
        },
        error: function () {
            var toast = $mdToast.simple()
            .content('Opss! Algo deu errado ao carregar os turmas, tente novamente')
            .hideDelay(6 * 1000)
            .position('bottom left');
            $mdToast.show(toast);
        }
    });
}]);

app.controller('NovoTurmaCtrl', ['$scope', 'Turma', function ($scope, Turma) {
    $scope.$parent.setTitle('Novo Turma');
    $scope.turma = {nome:null, inscricao:null};
    $scope.save = function () {
        var turma = new Turma();
        turma.set('nome', $scope.turma.nome);
        turma.set('inscricao', $scope.turma.inscricao);
        turma.save(null, {
            success: function (turma) {
                $scope.turma = {nome:null, inscricao:null};
                $scope.$apply();
                window.location = '#/turmas/' + turma.id;
            },
            error: function () {
                var toast = $mdToast.simple()
                .content('Opss! Algo deu errado ao cadastrar o turma, tente novamente')
                .hideDelay(6 * 1000)
                .position('bottom left');
                $mdToast.show(toast);
            }
        });
    };
}]);

app.controller('VerTurmaCtrl', ['$scope', '$routeParams', 'Turma', function ($scope, $routeParams, Turma) {
    $scope.$parent.setTitle('Ver Turma');
    $scope.turma = {nome:null, inscricao:null};
    var query = new Parse.Query(Turma), turma;
    console.log($routeParams.turmaId);
    query.get($routeParams.turmaId, {
        success: function (a) {
            turma = a;
            $scope.turma.nome = turma.get('nome');
            $scope.turma.inscricao = turma.get('inscricao');
            $scope.$parent.setTitle($scope.turma.nome);
            $scope.$apply();
        },
        error: function () {
            var toast = $mdToast.simple()
            .content('Opss! Algo deu errado ao exibir o turma, tente novamente')
            .hideDelay(6 * 1000)
            .position('bottom left');
            $mdToast.show(toast);
        }
    });
    $scope.save = function () {
        turma.set('nome', $scope.turma.nome);
        turma.set('inscricao', $scope.turma.inscricao);
        turma.save();
    };
    $scope.destroy = function () {
        if(confirm('Confirma a exclusão do Turma?')){
            turma.destroy({
                success: function () {
                    window.location = '#/turmas';
                },
                error: function () {
                    var toast = $mdToast.simple()
                    .content('Opss! Algo deu errado ao excluir o turma, tente novamente')
                    .hideDelay(6 * 1000)
                    .position('bottom left');
                    $mdToast.show(toast);
                }
            });
        }
    };
}]);
