'use strict';

const test = require('mongoose').Schema.Types;

const mongoose = require('mongoose'),
	//User = mongoose.model('User'),
    Post = mongoose.model('Post');
    Vouchers = mongoose.model('Vouchers');
    
    Vouchers().save();


exports.create_post = function(req, res) {
	const new_post = new Post(req.body);
	new_post.save(function(err, post) {
		if (err)
			res.send(err);
		res.json(post);
	});
};

exports.read_post = function(req, res) {
	Post.findById(req.params.postId, function(err, post) {
		if (err)
			res.send(err);
		res.json(post);
	});
};


exports.list_all_posts = function(req, res) {
	Post.find({}, null, {sort: {createdDate: -1}}, function(err, post) {
		if (err)
			res.send(err);
		res.json(post);
	});
};

exports.update_post = function(req, res) {
	Post.findOneAndUpdate({_id: req.params.postId}, req.body, {new: true}, function(err, post){
		if (err)
			res.send(err);
		res.json(post);
	});
};

exports.delete_post = function(req, res) {
	Post.deleteOne({_id: req.params.postId}, function(err, post) {
		if (err)
			res.send(err);
		res.json({message: 'Post Successfully Deleted'});
	});
};

exports.create_voucher_object = function(req, res) {
    const new_voucher = new Vouchers({remainingVouchers: 0});
	new_voucher.save(function(err, post) {
		if (err)
			res.send(err);
		res.json(post);
	});
};

exports.increment_vouchers = function(req, res) {
    Vouchers.findOneAndUpdate(null, {$inc : {'remainingVouchers' : 1}}, function(err, post) {
        if (err)
            res.json(err);
        res.json(post);
    });
};

exports.decrement_vouchers = function(req, res) {
    Vouchers.findOneAndUpdate(null, {$inc : {'remainingVouchers' : -1}}, function(err, post) {
        if (err)
            res.json(err);
        res.json(post);
    });
};


// Probably not needed
// exports.create_a_user = function(req, res) {
// 	const new_user = new User(req.body);
// 	new_user.save(function(err, user) {
// 		if (err)
// 			res.send(err);
// 		res.json(user);
// 	});
// };

// exports.list_all_users = function(req, res) {
// 	User.find({}, function(err, user) {
// 		if (err)
// 			res.send(err);
// 		res.json(user);
// 	});
// };

