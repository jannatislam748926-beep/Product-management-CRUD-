import mongoose from "mongoose";

const Dbconnection = () => {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((error) => {
        console.log("MongoDB connection error:", error.message);
      });
    
}

export default Dbconnection;