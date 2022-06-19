const { MongoClient } = require("mongodb");
const { Queue } = require("./models/queue");
const API = require("./api");

const PROTO_PATH = __dirname + "/protos/waitingroom.proto";
// const DB_URL =
//   "mongodb://adminuser:csc3004@mongo-nodeport-service:27017/?authSource=admin";
const DB_URL = "mongodb://adminuser:csc3004@localhost:27017/?authSource=admin";

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

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, { message: "Hello " + call.request.name });
}

function enqueue(call, callback) {
  callback(null, queueCustomer(call.request));
}

function dequeueRandomCustomer(call, callback) {
  callback(null, dequeueRandom());
}

function dequeueFirstCustomer(call, callback) {
  callback(null, dequeueFirst());
}

const queueCustomer = async (details) => {
  console.log(details);
  try {
    // check if it is already in MongoDB
    const ipExist = await Queue.find({ ipaddr: details.ipaddr });
    const macExist = await Queue.find({ macaddr: details.macaddr });
    const phoneExist = await Queue.find({ phonenum: details.phonenum });
    if (phoneExist.length == 0) {
      console.log("here");
      if (ipExist == 0 || macExist == 0) {
        // store new queue-er into MongoDB
        const record = new Queue({
          ipaddr: details.ipaddr,
          macaddr: details.macaddr,
          phonenum: details.phonenum,
        });
        const savedRecord = await record.save();
        console.log(savedRecord);
      }
    }
  } catch (err) {
    console.log(err);
  }

  let res = {
    status: details.ipaddr + " " + details.macaddr + " " + details.phonenum,
  };
  return res;
};

const dequeueRandom = async () => {
  await Queue.find({ inqueue: true }).exec(function (err, results) {
    let selected =
      results.length > 1
        ? results[Math.floor(Math.random() * results.length)]
        : results[0]; // randomly select a person in queue
    let result = {
      ipaddr: selected.ipaddr,
      macaddr: selected.macaddr,
      phonenum: selected.phonenum,
      createdAt: selected.createdAt.toDateString(),
      updatedAt: selected.createdAt.toDateString(),
    };
    console.log(result);
    return result;
  });
};

const dequeueFirst = async () => {
  Queue.find({ inqueue: true })
    .sort([["createdAt", 1]])
    .exec(function (err, results) {
      let selected = results[0];
      console.log(selected);
    });
};

async function connectDB() {
  try {
    await dbClient.connect();
    let db = await dbClient.db(process.env.DB_NAME);
    db.command({ ping: 1 });
    console.log("Connected successfully to mongo server");
    // Create index
    await db.collection("users").createIndex({ email: 1 });

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
  // mongoose
  //   .connect(DB_URL, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     dbName: "waitingroom",
  //   })
  //   .then(() => {
  //     console.log("Database connection is ready...");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // setup GRPC
  var server = new grpc.Server();
  server.addService(waitingroom_proto.Enqueue.service, {
    enqueueCustomer: enqueue,
  });
  server.addService(waitingroom_proto.Dequeue.service, {
    dequeueRandomCustomer: dequeueRandomCustomer,
    dequeueFirstCustomer: dequeueFirstCustomer,
  });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
