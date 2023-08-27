import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
	email: {
		type: String,
		require: [true, "Email is required"],
		unique: [true, "Email already exists!"],
	},
	image: {
		type: String,
	},
});

export const User = models.User || model("User", UserSchema);
