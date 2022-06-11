/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: "target",
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = "localhost:50051";
  }
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
  let target = "localhost:50051";
  var client = new waitingroom_proto.Enqueue(
    target,
    grpc.credentials.createInsecure()
  );
  let ipaddr = "127.0.0.1";
  let macaddr = "AD:GS:VD:WE:12:CS";
  let phonenum = "92837162";
  client.enqueueCustomer(
    { ipaddr: ipaddr, macaddr: macaddr, phonenum: phonenum },
    function (err, response) {
      console.log(response);
    }
  );
};

queueCustomer();
// main();
