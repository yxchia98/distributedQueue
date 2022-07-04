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
var target = "172.20.247.51:32003";
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
  let ipaddr = "127.0.0.4";
  let macaddr = "AD:GS:VD:6E:1D:A4";
  let phonenum = "92837124";
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

dequeueRandom();
// dequeueFirst();
// queueCustomer();
// main();
