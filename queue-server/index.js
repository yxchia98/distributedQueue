const { MongoClient } = require("mongodb");
const API = require("./api");
require("dotenv").config();

const PROTO_PATH = __dirname + process.env.PROTO_PATH;
const DB_URL = `mongodb://${process.env.ADMINUSERNAME}:${process.env.ADMINPASSWORD}@${process.env.DB_URL}:27017/?authSource=admin`;
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
  server.addService(waitingroom_proto.WaitingRoom.service, {
    enqueueCustomer: api.enqueueCustomer,
    waitQueue: api.waitQueue,
  });
  server.addService(waitingroom_proto.Dequeue.service, {
    dequeueRandomCustomer: api.dequeueRandomCustomer,
    dequeueFirstCustomer: api.dequeueFirstCustomer,
  });
  server.addService(waitingroom_proto.Validator.service, {
    validateToken: api.validateToken,
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
