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
var target = "172.20.247.212:32003";
// var target = "localhost:50051";
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
  let ipaddr = "127.0.0.2";
  let macaddr = "AD:GS:VD:6E:1D:A2";
  let phonenum = "92837122";
  client.enqueueCustomer(
    { ipaddr: ipaddr, macaddr: macaddr, phonenum: phonenum },
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
    await sleep(500);
  }
};

const randomDequeues = async (num) => {
  for (let i = 0; i < num; i++) {
    var client = new waitingroom_proto.WaitingRoom(
      target,
      grpc.credentials.createInsecure()
    );
    let ipaddr = i.toString();
    let macaddr = i.toString();
    let phonenum = i.toString();
    client.enqueueCustomer(
      { ipaddr: ipaddr, macaddr: macaddr, phonenum: phonenum },
      async function (err, response) {
        console.log(response);
      }
    );
    await sleep(500);
  }
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

randomQueues(500);
randomDequeues(500);
// dequeueRandom();
// dequeueFirst();
// queueCustomer();
// main();
