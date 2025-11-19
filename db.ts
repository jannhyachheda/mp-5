import { MongoClient, Collection } from "mongodb";

const uri = process.env.MONGO_URI!;
const DB_NAME = "shortenerDatabase";

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient, clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default async function getCollection<T = any>(
    name: string
): Promise<Collection<T>> {
    const client = await clientPromise;
    return client.db(DB_NAME).collection<T>(name);
}
