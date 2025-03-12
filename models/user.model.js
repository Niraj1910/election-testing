const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			trim: true,
		},
		role: {
			type: String,
			enum: ["user", "admin", "superadmin"],
			default: "user",
		},
		allowedConstituencies: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "constituencies",
			validate: {
				validator: function(value) {
					return this.role === "user" || !value || value.length === 0;
				},
				message: "Only users can have allowedConstituencies",
			},
		},
	},
	{ timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
