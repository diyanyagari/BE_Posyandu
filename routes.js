'use strict';

module.exports = function (app) {
    var todoList = require('./controller');

    app.use(function (req, res, next) {
        // res.header("Access-Control-Allow-Origin", "*");

        res.header('Access-Control-Allow-Origin: *');
        res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, X-Auth-Token');
        // res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


    app.route('/')
        .get(todoList.index);

    app.route('/insert_balita')
        .post(todoList.insertBalita);

    app.route('/insert_ibu_hamil')
        .post(todoList.insertIbuHamil);

    app.route('/countBalita')
        .get(todoList.countDataBalita);

    app.route('/countIbuHamil')
        .get(todoList.countDataIbuHamil);

    app.route('/viewBalita')
        .get(todoList.viewDataBalita);

    app.route('/viewIbuHamil')
        .get(todoList.viewDataIbuHamil);

    app.route('/register')
        .post(todoList.register);

    app.route('/login')
        .post(todoList.login);

    app.route('/viewJenisKunjungan')
        .get(todoList.viewJenisKunjungan);

    app.route('/insertKunjungan')
        .post(todoList.insertKunjungan);

    app.route('/searchKunjungan')
        .post(todoList.searchKunjungan);

    app.route('/updateKunjungan')
        .post(todoList.updateKunjungan);

    app.route('/viewKunjunganBalita')
        .post(todoList.viewKunjunganBalita);
};