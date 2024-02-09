const cloudinary = require('../config/cloudinary');

exports.upload = async (req, res) => {
	try {
		let currentDate = Date.now();
		let result = await cloudinary.uploader.upload(req.body.image, {
			public_id     : `${currentDate}`,
			resource_type : 'auto',
		});
		res.json({
			public_id : result.public_id,
			url       : result.secure_url,
		});
	} catch (err) {
		// refactor
		res.status(400).json(err);
	}
};

exports.remove = async (req, res) => {
	try {
		let image_id = req.body.public_id;
		await cloudinary.uploader.destroy(image_id);
		res.json('Image successfully removed');
	} catch (err) {
		// refactor
		res.status(400).json(err);
	}
};
