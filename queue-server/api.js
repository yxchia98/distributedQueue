const { toArray, update } = require("lodash");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = class API {
  constructor(db, grpc) {
    this.db = db;
    this.grpc = grpc;
  }

  enqueueCustomer = async (call, callback) => {
    console.log("enqueueing customer");
    const queue = this.db.collection("queues");
    let customer = {
      ipaddr: call.request.ipaddr,
      sessionId: call.request.sessionId,
      phonenum: call.request.phonenum,
      token: "",
      inqueue: true,
      inTime: new Date(),
      outTime: null,
    };
    queue
      .find({ phonenum: call.request.phonenum })
      .toArray()
      .then((phonenums) => {
        if (phonenums.length > 0) {
          console.log("duplicate customer");
          callback(null, { status: "unauthorized" });
        } else {
          queue
            .find({ ipaddr: call.request.ipaddr })
            .toArray()
            .then((ipaddrs) => {
              if (ipaddrs.length > 0) {
                const sameSessId = ipaddrs.filter(
                  (element) => element.sessionId == call.request.sessionId
                );
                if (sameSessId.length > 0) {
                  console.log("duplicate customer");
                  callback(null, { status: "unauthorized" });
                } else {
                  queue.insertOne(customer).then((r) => {
                    callback(null, { status: "added to queue" });
                  });
                }
              } else {
                queue
                  .find({ sessionId: call.request.sessionId })
                  .toArray()
                  .then((sessionIds) => {
                    if (sessionIds.length == 0) {
                      queue.insertOne(customer).then((r) => {
                        callback(null, { status: "added to queue" });
                      });
                    } else {
                      callback(null, { status: "unauthorized" });
                    }
                  });
              }
            });
        }
      });
  };

  waitQueue = async (call, callback) => {
    console.log(
      `streaming for queue status for ${call.request.ipaddr}, ${call.request.sessionId}, ${call.request.phonenum}`
    );
    const queue = this.db.collection("queues");
    let checking = true;
    while (checking) {
      const query = {
        ipaddr: call.request.ipaddr,
        sessionId: call.request.sessionId,
        phonenum: call.request.phonenum,
        inqueue: false,
      };
      queue
        .find(query)
        .toArray()
        .then(async (results) => {
          let res = {
            ipaddr: call.request.ipaddr,
            sessionId: call.request.sessionId,
            phonenum: call.request.phonenum,
            token: "",
            url: "",
            selected: false,
          };
          if (results.length > 0) {
            let selected = results[0];
            res = {
              ipaddr: selected.ipaddr,
              sessionId: selected.sessionId,
              phonenum: selected.phonenum,
              token: selected.token,
              url: process.env.ENDPOINT_URL,
              selected: true,
            };
          }
          call.write(res);
          if (res.selected) {
            console.log(
              `selected ${call.request.ipaddr}, ${call.request.sessionId}, ${call.request.phoenum}, streaming back and closing...`
            );
            call.end();
          }
        });
      await sleep(5000);
    }
  };

  dequeueFirstCustomer = async (call, callback) => {
    console.log("dequeueing first customer");
    const queue = this.db.collection("queues");
    queue
      .find({ inqueue: true })
      .sort({ inTime: 1 })
      .toArray()
      .then(async (results) => {
        if (results.length == 0) {
          console.log("no customers to dequeue");
          callback(null, this.nullCustomer());
        } else {
          let selected = results[0];
          const filter = { _id: selected._id };
          const options = { upsert: false };
          const token = crypto.createHash('sha256').update(selected.ipaddr.concat(selected.sessionId).concat(selected.phonenum)).digest('base64');  // hashing for token
          const updateDoc = {
            $set: { inqueue: false, outTime: new Date(), token: token },
          };
          queue.updateOne(filter, updateDoc, options).then((r) => {
            if (r.acknowledged) {
              let result = {
                ipaddr: selected.ipaddr,
                sessionId: selected.sessionId,
                phonenum: selected.phonenum,
                token: token,
                inTime: selected.inTime.toISOString(),
                outTime: updateDoc.$set.outTime.toISOString(),
              };
              console.log(result);
              callback(null, result);
            } else {
              console.log("error dequeueing customer, try again");
              callback(null, this.nullCustomer);
            }
          });
        }
      });
  };

  dequeueRandomCustomer = async (call, callback) => {
    console.log("dequeueing random customer");
    const queue = this.db.collection("queues");
    queue
      .find({ inqueue: true })
      .toArray()
      .then(async (results) => {
        if (results.length == 0) {
          console.log("no customers to dequeue");
          callback(null, this.nullCustomer);
        } else {
          let selected =
            results.length > 1
              ? results[Math.floor(Math.random() * results.length)]
              : results[0]; // randomly select a person in queue
          const filter = { _id: selected._id };
          const options = { upsert: false };
          const token = crypto.createHash('sha256').update(selected.ipaddr.concat(selected.sessionId).concat(selected.phonenum)).digest('base64');  // hashing for token

          const updateDoc = {
            $set: { inqueue: false, outTime: new Date(), token: token },
          };
          queue.updateOne(filter, updateDoc, options).then((r) => {
            if (r.acknowledged) {
              let result = {
                ipaddr: selected.ipaddr,
                sessionId: selected.sessionId,
                phonenum: selected.phonenum,
                token: token,
                inTime: selected.inTime.toISOString(),
                outTime: updateDoc.$set.outTime.toISOString(),
              };
              callback(null, result);
            } else {
              console.log("error dequeueing customer, try again");
              callback(null, this.nullCustomer);
            }
          });
        }
      });
  };

  validateToken = (call, callback) => {
    console.log("validating token");
    const queue = this.db.collection("queues");
    let query = {
      inqueue: false,
      token: call.request.token,
    };
    let res = {
      token: call.request.token,
      validated: false,
    };
    queue
      .find(query)
      .toArray()
      .then((results) => {
        if (results.length == 0) {
          console.log("token is invalid!");
          callback(null, res);
        } else {
          res = {
            token: call.request.token,
            validated: true,
          };
          callback(null, res);
        }
      });
  };

  nullCustomer = () => {
    console.log("enqueue/dequeue aborted, replacing with nulls");
    return {
      ipaddr: null,
      sessionId: null,
      phonenum: null,
      inTime: null,
      outTime: null,
    };
  };
};
