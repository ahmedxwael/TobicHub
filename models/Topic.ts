import { Schema, model, models } from "mongoose";

const TopicSchema = new Schema({
	title: {
		type: String,
		required: [true, "Title is required"],
	},
	description: {
		type: String,
		required: [true, "Description is required"],
	},
});

export const Topic = models.Topic || model("Topic", TopicSchema);
