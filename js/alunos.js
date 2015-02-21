app.controller('AlunosCtrl', ['$scope', '$mdToast', 'Aluno', function ($scope, $mdToast, Aluno) {
    $scope.$parent.setTitle('Alunos');
    $scope.alunos = [];
    var query = new Parse.Query(Aluno);
    query.find({
        success: function (r) {
            $scope.alunos = r;
            $scope.$apply();
        },
        error: function () {
            var toast = $mdToast.simple()
            .content('Opss! Algo deu errado ao carregar os alunos, tente novamente')
            .hideDelay(6 * 1000)
            .position('bottom left');
            $mdToast.show(toast);
        }
    });
}]);

app.controller('NovoAlunoCtrl', ['$scope', 'Aluno', function ($scope, Aluno) {
    $scope.$parent.setTitle('Novo Aluno');
    $scope.aluno = {nome:null, inscricao:null};
    $scope.save = function () {
        var aluno = new Aluno();
        aluno.set('nome', $scope.aluno.nome);
        aluno.set('inscricao', $scope.aluno.inscricao);
        aluno.save(null, {
            success: function (aluno) {
                $scope.aluno = {nome:null, inscricao:null};
                $scope.$apply();
                window.location = '#/alunos/' + aluno.id;
            },
            error: function () {
                var toast = $mdToast.simple()
                .content('Opss! Algo deu errado ao cadastrar o aluno, tente novamente')
                .hideDelay(6 * 1000)
                .position('bottom left');
                $mdToast.show(toast);
            }
        });
    };
}]);

app.controller('VerAlunoCtrl', ['$scope', '$routeParams', 'Aluno', function ($scope, $routeParams, Aluno) {
    $scope.$parent.setTitle('Ver Aluno');
    $scope.aluno = {nome:null, inscricao:null};
    var query = new Parse.Query(Aluno), aluno;
    console.log($routeParams.alunoId);
    query.get($routeParams.alunoId, {
        success: function (a) {
            aluno = a;
            $scope.aluno.nome = aluno.get('nome');
            $scope.aluno.inscricao = aluno.get('inscricao');
            $scope.$parent.setTitle($scope.aluno.nome);
            $scope.$apply();
        },
        error: function () {
            var toast = $mdToast.simple()
            .content('Opss! Algo deu errado ao exibir o aluno, tente novamente')
            .hideDelay(6 * 1000)
            .position('bottom left');
            $mdToast.show(toast);
        }
    });
    $scope.save = function () {
        aluno.set('nome', $scope.aluno.nome);
        aluno.set('inscricao', $scope.aluno.inscricao);
        aluno.save();
    };
    $scope.destroy = function () {
        if(confirm('Confirma a exclusão do Aluno?')){
            aluno.destroy({
                success: function () {
                    window.location = '#/alunos';
                },
                error: function () {
                    var toast = $mdToast.simple()
                    .content('Opss! Algo deu errado ao excluir o aluno, tente novamente')
                    .hideDelay(6 * 1000)
                    .position('bottom left');
                    $mdToast.show(toast);
                }
            });
        }
    };
}]);
