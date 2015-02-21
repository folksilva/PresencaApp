app.controller('PresencaCtrl', ['$scope', '$mdToast', 'Presenca', function ($scope, $mdToast, Presenca) {
    $scope.$parent.setTitle('Presencas');
    $scope.presencas = [];
    var query = new Parse.Query(Presenca);
    query.find({
        success: function (r) {
            $scope.presencas = r;
            $scope.$apply();
        },
        error: function () {
            var toast = $mdToast.simple()
            .content('Opss! Algo deu errado ao carregar os presencas, tente novamente')
            .hideDelay(6 * 1000)
            .position('bottom left');
            $mdToast.show(toast);
        }
    });
}]);

app.controller('NovoPresencaCtrl', ['$scope', 'Presenca', function ($scope, Presenca) {
    $scope.$parent.setTitle('Novo Presenca');
    $scope.presenca = {nome:null, inscricao:null};
    $scope.save = function () {
        var presenca = new Presenca();
        presenca.set('nome', $scope.presenca.nome);
        presenca.set('inscricao', $scope.presenca.inscricao);
        presenca.save(null, {
            success: function (presenca) {
                $scope.presenca = {nome:null, inscricao:null};
                $scope.$apply();
                window.location = '#/presencas/' + presenca.id;
            },
            error: function () {
                var toast = $mdToast.simple()
                .content('Opss! Algo deu errado ao cadastrar o presenca, tente novamente')
                .hideDelay(6 * 1000)
                .position('bottom left');
                $mdToast.show(toast);
            }
        });
    };
}]);

app.controller('VerPresencaCtrl', ['$scope', '$routeParams', 'Presenca', function ($scope, $routeParams, Presenca) {
    $scope.$parent.setTitle('Ver Presenca');
    $scope.presenca = {nome:null, inscricao:null};
    var query = new Parse.Query(Presenca), presenca;
    console.log($routeParams.presencaId);
    query.get($routeParams.presencaId, {
        success: function (a) {
            presenca = a;
            $scope.presenca.nome = presenca.get('nome');
            $scope.presenca.inscricao = presenca.get('inscricao');
            $scope.$parent.setTitle($scope.presenca.nome);
            $scope.$apply();
        },
        error: function () {
            var toast = $mdToast.simple()
            .content('Opss! Algo deu errado ao exibir o presenca, tente novamente')
            .hideDelay(6 * 1000)
            .position('bottom left');
            $mdToast.show(toast);
        }
    });
    $scope.save = function () {
        presenca.set('nome', $scope.presenca.nome);
        presenca.set('inscricao', $scope.presenca.inscricao);
        presenca.save();
    };
    $scope.destroy = function () {
        if(confirm('Confirma a exclusão do Presenca?')){
            presenca.destroy({
                success: function () {
                    window.location = '#/presencas';
                },
                error: function () {
                    var toast = $mdToast.simple()
                    .content('Opss! Algo deu errado ao excluir o presenca, tente novamente')
                    .hideDelay(6 * 1000)
                    .position('bottom left');
                    $mdToast.show(toast);
                }
            });
        }
    };
}]);
