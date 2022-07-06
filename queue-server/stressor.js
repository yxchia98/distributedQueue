var PROTO_PATH = __dirname + "/protos/waitingroom.proto";

var parseArgs = require("minimist");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var waitingroom_proto =
  grpc.loadPackageDefinition(packageDefinition).waitingroom;
var target = "172.20.242.97:32003";
// var target = "localhost:50051";

const ipaddr = "127.0.0.3";
const sessionId = "2C:54:91:88:C9:E3";
const phonenum = "92837123";

function main() {
  var client = new waitingroom_proto.Greeter(
    target,
    grpc.credentials.createInsecure()
  );
  var user;
  if (argv._.length > 0) {
    user = argv._[0];
  } else {
    user = "world";
  }
  client.sayHello({ name: user }, function (err, response) {
    console.log("Greeting:", response.message);
  });
}

const queueCustomer = () => {
  var client = new waitingroom_proto.WaitingRoom(
    target,
    grpc.credentials.createInsecure()
  );
  client.enqueueCustomer(
    { ipaddr: ipaddr, sessionId: sessionId, phonenum: phonenum },
    function (err, response) {
      console.log(response);
    }
  );
};

const dequeueRandom = () => {
  var client = new waitingroom_proto.Dequeue(
    target,
    grpc.credentials.createInsecure()
  );
  client.dequeueRandomCustomer({}, function (err, response) {
    console.log(response);
  });
};

const dequeueFirst = () => {
  var client = new waitingroom_proto.Dequeue(
    target,
    grpc.credentials.createInsecure()
  );
  client.dequeueFirstCustomer({}, function (err, response) {
    console.log(response);
  });
};

const randomQueues = async (num) => {
  for (let i = 0; i < num; i++) {
    var client = new waitingroom_proto.Dequeue(
      target,
      grpc.credentials.createInsecure()
    );
    client.dequeueRandomCustomer({}, async function (err, response) {
      console.log(response);
    });
    await sleep(100);
  }
};

const randomDequeues = async (num) => {
  for (let i = 0; i < num; i++) {
    var client = new waitingroom_proto.WaitingRoom(
      target,
      grpc.credentials.createInsecure()
    );
    let ipaddr = i.toString();
    let sessionId = i.toString();
    let phonenum = i.toString();
    client.enqueueCustomer(
      { ipaddr: ipaddr, sessionId: sessionId, phonenum: phonenum },
      async function (err, response) {
        console.log(response);
      }
    );
    await sleep(100);
  }
};

const subscribeNotification = async () => {
  var client = new waitingroom_proto.WaitingRoom(
    target,
    grpc.credentials.createInsecure()
  );
  let call = client.waitQueue({
    ipaddr: ipaddr,
    sessionId: sessionId,
    phonenum: phonenum,
  });
  call.on("data", function (response) {
    console.log(response.selected);
    if (response.selected) {
      console.log(response);
      console.log("Selected! Redirecting...");
    } else {
      console.log("Still in queue...");
    }
  });
  call.on("end", function () {
    console.log("stream closed!");
  });
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// randomQueues(500);
// randomDequeues(500);
dequeueRandom();
// dequeueFirst();
// queueCustomer();
// subscribeNotification()
// main();
