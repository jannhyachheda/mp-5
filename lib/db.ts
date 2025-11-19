import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;
const DB_NAME = "shortenerDatabase";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default async function getCollection(name: string) {
    const connectedClient = await clientPromise;
    return connectedClient.db(DB_NAME).collection(name);
}
