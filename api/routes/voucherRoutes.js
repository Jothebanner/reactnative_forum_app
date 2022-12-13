'use strict';

module.exports = function(app) {
    const controls = require('../controllers/voucherController.js');

    app.route('/')
    .get(function(req, res) {
        res.send('Hello World');
    });

    app.route('/partytime')
    .get(function(req, res) {
        res.send('Party Time!');
    });

    app.route('/posts')
    .get(controls.list_all_posts)
    .post(controls.create_post);

    app.route('/posts/:postId')
    .get(controls.read_post)
    .put(controls.update_post)
    .delete(controls.delete_post);

    app.route('/create-voucher')
    .get(controls.create_voucher_object);

    app.route('/increment-vouchers')
    .put(controls.increment_vouchers);

    app.route('/decrement-vouchers')
    .put(controls.decrement_vouchers);

    // Probably not needed for this project lol but imma keep it cuz im lazy
    // app.route('/users')
    // .get(controls.list_all_users)
    // .post(controls.create_a_user);
}