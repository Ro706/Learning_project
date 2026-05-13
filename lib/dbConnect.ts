import mongoose from 'mongoose';

export async function connect() {
    try {
        // Check if we already have a connection
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });
        connection.on('error', (err) => {
            console.error('MongoDB connection error: ' + err);
            process.exit();
        });
    } catch (error) {
        console.error("Something went wrong!");
        console.error(error);
    }
}