const { MongoClient } = require("mongodb");
const API = require("./api");
require("dotenv").config();

const PROTO_PATH = __dirname + process.env.PROTO_PATH;
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const waitingroom_proto =
  grpc.loadPackageDefinition(packageDefinition).waitingroom;

const dbClient = new MongoClient(DB_URL, {
  useUnifiedTopology: true,
});
let api = null;

async function connectDB() {
  try {
    await dbClient.connect();
    let db = await dbClient.db("waitingroom");
    db.command({ ping: 1 });
    console.log("Connected successfully to mongo server");

    // Init api
    api = new API(db, grpc);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Starts an RPC server that receives requests for the service at the
 * sample server port
 */
async function main() {
  // connect to mongoDB
  await connectDB().catch(console.dir);

  // setup GRPC
  var server = new grpc.Server();
  server.addService(waitingroom_proto.Enqueue.service, {
    enqueueCustomer: api.enqueueCustomer,
  });
  server.addService(waitingroom_proto.Dequeue.service, {
    dequeueRandomCustomer: api.dequeueRandomCustomer,
    dequeueFirstCustomer: api.dequeueFirstCustomer,
  });
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
