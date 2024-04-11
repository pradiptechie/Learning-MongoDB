// this file is used to Connect to Cloud MongoDB Atlas

require('dotenv').config();
const { MongoClient } = require("mongodb");                                                                                                                                    
const url = process.env.dburl;

// Connect to your Atlas cluster
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);