const { WaitingRoomClient } = require("./src/waitingroom_grpc_web_pb.js");
const {
  EnqueueCustomerRequest,
  EnqueueCustomerReply,
  WaitQueueRequest,
  WaitQueueReply,
} = require("./src/waitingroom_pb.js");
import axios from "axios";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const stressCalls = async (num) => {
  let client = new WaitingRoomClient("http://172.20.251.92:80/", null, null);
  for (let i = 0; i < num; i++) {
    const request = new WaitQueueRequest();

    request.setIpaddr("testip");
    request.setSessionid("testSessId");
    request.setPhonenum("testNum");
    client.enqueueCustomer(request, {}, async (err, response) => {
      if (response == null) {
        console.log(err);
      } else {
        let responseMessage = response.getStatus();
        console.log(responseMessage);
      }
    });
    await sleep(250);
  }
};

stressCalls(1000);
