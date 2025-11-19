import { MongoClient, Collection, Document } from "mongodb";

const uri = process.env.MONGO_URI!;
const DB_NAME = "shortenerDatabase";

if (!uri) {
    throw new Error("Please add your MONGO_URI to .env.local");
}

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

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

export default async function getCollection<T extends Document = Document>(
    name: string
): Promise<Collection<T>> {
    const connectedClient = await clientPromise;
    return connectedClient.db(DB_NAME).collection<T>(name);
}
