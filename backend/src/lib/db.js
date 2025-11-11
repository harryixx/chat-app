import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) {
      console.error("❌ MONGO_URI is not set in .env file");
      console.error("⚠️  Server will start but database features will not work");
      return;
    }

    // Check if password placeholder is still in the connection string
    if (MONGO_URI.includes("<db_password>") || MONGO_URI.includes("<")) {
      console.error("❌ MongoDB connection failed: Please replace <db_password> with your actual MongoDB Atlas password in the .env file");
      console.error("   Current MONGO_URI:", MONGO_URI.replace(/:[^:@]+@/, ":****@"));
      console.error("⚠️  Server will start but database features will not work");
      return;
    }

    console.log("🔄 Connecting to MongoDB...");
    
    // Set connection options for better error handling
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000,
    });
    
    console.log("✅ MONGODB CONNECTED:", conn.connection.host);
  } catch (error) {
    console.error("❌ Error connecting to MONGODB:");
    console.error("   Error message:", error.message);
    
    // Provide helpful error messages
    if (error.message.includes("authentication failed")) {
      console.error("   💡 Tip: Check your MongoDB Atlas username and password");
    } else if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
      console.error("   💡 Tip: Check your MongoDB Atlas cluster URL");
    } else if (error.message.includes("IP") || error.message.includes("whitelist")) {
      console.error("   💡 Tip: Make sure your IP address is whitelisted in MongoDB Atlas Network Access");
      console.error("   💡 Go to: MongoDB Atlas → Network Access → Add IP Address");
    } else if (error.message.includes("timeout")) {
      console.error("   💡 Tip: Connection timeout - check your internet connection and MongoDB Atlas status");
    }
    
    console.error("⚠️  Server will continue running, but database features will not work");
    console.error("⚠️  Please fix the MongoDB connection and restart the server");
    // Don't exit - let the server start anyway
  }
};
