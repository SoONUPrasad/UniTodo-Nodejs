const mongoose = require('mongoose');
// require('dotenv').config();

const dbConnection = async (connectionVariable) => {
    try {
        const connectionInstance = await mongoose.connect(connectionVariable);
        console.log(`Database connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = { dbConnection }