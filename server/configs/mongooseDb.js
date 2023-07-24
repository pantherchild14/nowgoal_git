import mongoose from "mongoose";


const connectDb = async() => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected:", connect.connection.host, connect.connection.name);
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
};


export default connectDb;