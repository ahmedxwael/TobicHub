import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		console.log("MongoDB is already connected");
		return;
	}

	const options = {
		dbName: "Rest-api",
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	try {
		await mongoose.connect(process.env.MONGODB_URI!, options);
		isConnected = true;
		console.log("MongoDB connected");
	} catch (error) {
		console.log(error);
	}
};
