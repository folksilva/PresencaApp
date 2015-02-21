app.controller('ProfessoresCtrl', ['$scope', '$mdToast', 'Professor', function ($scope, $mdToast, Professor) {
    $scope.$parent.setTitle('Professores');
    $scope.professores = [];
    var query = new Parse.Query(Professor);
    query.find({
        success: function (r) {
            $scope.professores = r;
            $scope.$apply();
        },
        error: function () {
            var toast = $mdToast.simple()
            .content('Opss! Algo deu errado ao carregar os professores, tente novamente')
            .hideDelay(6 * 1000)
            .position('bottom left');
            $mdToast.show(toast);
        }
    });
}]);

app.controller('NovoProfessorCtrl', ['$scope', 'Professor', function ($scope, Professor) {
    $scope.$parent.setTitle('Novo Professor');
    $scope.professor = {nome:null, inscricao:null};
    $scope.save = function () {
        var professor = new Professor();
        professor.set('nome', $scope.professor.nome);
        professor.set('inscricao', $scope.professor.inscricao);
        professor.save(null, {
            success: function (professor) {
                $scope.professor = {nome:null, inscricao:null};
                $scope.$apply();
                window.location = '#/professores/' + professor.id;
            },
            error: function () {
                var toast = $mdToast.simple()
                .content('Opss! Algo deu errado ao cadastrar o professor, tente novamente')
                .hideDelay(6 * 1000)
                .position('bottom left');
                $mdToast.show(toast);
            }
        });
    };
}]);

app.controller('VerProfessorCtrl', ['$scope', '$routeParams', 'Professor', function ($scope, $routeParams, Professor) {
    $scope.$parent.setTitle('Ver Professor');
    $scope.professor = {nome:null, inscricao:null};
    var query = new Parse.Query(Professor), professor;
    console.log($routeParams.professorId);
    query.get($routeParams.professorId, {
        success: function (a) {
            professor = a;
            $scope.professor.nome = professor.get('nome');
            $scope.professor.inscricao = professor.get('inscricao');
            $scope.$parent.setTitle($scope.professor.nome);
            $scope.$apply();
        },
        error: function () {
            var toast = $mdToast.simple()
            .content('Opss! Algo deu errado ao exibir o professor, tente novamente')
            .hideDelay(6 * 1000)
            .position('bottom left');
            $mdToast.show(toast);
        }
    });
    $scope.save = function () {
        professor.set('nome', $scope.professor.nome);
        professor.set('inscricao', $scope.professor.inscricao);
        professor.save();
    };
    $scope.destroy = function () {
        if(confirm('Confirma a exclusão do Professor?')){
            professor.destroy({
                success: function () {
                    window.location = '#/professores';
                },
                error: function () {
                    var toast = $mdToast.simple()
                    .content('Opss! Algo deu errado ao excluir o professor, tente novamente')
                    .hideDelay(6 * 1000)
                    .position('bottom left');
                    $mdToast.show(toast);
                }
            });
        }
    };
}]);
