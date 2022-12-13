'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	required: ['title',],
	title: {
		type: String,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	media: {
		type: String,
	},
	postText: {
		type: String,
	},
});

module.exports = mongoose.model('Post', PostSchema);

const VoucherSchema = new Schema({
    remainingVouchers: {
        type: Number,
    },
});

module.exports = mongoose.model('Vouchers', VoucherSchema);
