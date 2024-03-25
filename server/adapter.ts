import { MongoClient } from "mongodb"
import env from "dotenv"

if (
    process.env.BOT_TOKEN === undefined ||
    process.env.MONGODB_TEST_URI === undefined
  )
    env.config();

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI

let client
let clientPromise: Promise<MongoClient>
client = new MongoClient(uri, {
    readPreference: "primaryPreferred",
    authSource: "$external",
    authMechanism: "MONGODB-X509",
    tlsCertificateKeyFile: process.env.keyPath
})
clientPromise = client.connect()

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise