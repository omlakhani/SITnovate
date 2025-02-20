import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		if (!process.env.MONGO_DB_URI) {
			throw new Error("MONGO_DB_URI is not set in environment variables.");
		}

		const conn = await mongoose.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`✅ Connected to MongoDB at ${conn.connection.host}`);
	} catch (error) {
		console.error(`❌ Error connecting to MongoDB: ${error.message}`);
		process.exit(1); // Stop the server if DB connection fails
	}
};

export default connectToMongoDB;
