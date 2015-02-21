app.factory('Presenca', function () {
    return Parse.Object.extend("Presenca");
});

app.factory('Aluno', function () {
    return Parse.Object.extend("Aluno");
});

app.factory('Professor', function () {
    return Parse.Object.extend("Professor");
});

app.factory('Turma', function () {
    return Parse.Object.extend("Turma");
});
