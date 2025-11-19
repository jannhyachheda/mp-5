import { MongoClient, Db, Collection } from 'mongodb';

const CONNECTION_STRING = process.env.DB_CONN_STRING as string;
if (!CONNECTION_STRING) {
    throw new Error("Database connection string is missing.");
}

const DATABASE_LABEL = "shortenerDatabase";
export const LINK_COLLECTION = "shortenedLinks";

let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;

async function establishConnection(): Promise<Db> {
    if (!mongoClient) {
        mongoClient = new MongoClient(CONNECTION_STRING);
        await mongoClient.connect();
    }
    return mongoClient.db(DATABASE_LABEL);
}

export async function accessCollection(collection: string): Promise<Collection> {
    if (!mongoDb) {
        mongoDb = await establishConnection();
    }
    return mongoDb.collection(collection);
}
