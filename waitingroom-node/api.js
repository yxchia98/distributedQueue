const { toArray } = require("lodash");

const ObjectId = require("mongodb").ObjectId;

module.exports = class API {
  constructor(db, grpc) {
    this.db = db;
    this.grpc = grpc;
  }

  enqueueCustomer = (call, callback) => {
    const queue = this.db.collection("queues");
    let customer = {
      ipaddr: call.request.ipaddr,
      macaddr: call.request.macaddr,
      phonenum: call.request.phonenum,
      inqueue: true,
      inTime: new Date(),
      outTime: null,
    };
    queue
      .find({ ipaddr: call.request.ipaddr })
      .toArray()
      .then((ipaddrs) => {
        if (ipaddrs.length > 0) {
          const sameMac = ipaddrs.filter(
            (element) => element.macaddr == call.request.macaddr
          );
          if (sameMac.length > 0) {
            console.log("duplicate customer");
            callback(null, { status: "unauthorized" });
          } else {
            queue
              .insertOne(customer)
              .toArray()
              .then((r) => {
                callback(null, { status: "added to queue" });
              });
          }
        } else {
          queue
            .find({ macaddr: call.request.macaddr })
            .toArray()
            .then((macaddrs) => {
              if (macaddrs.length == 0) {
                queue.insertOne(customer).then((r) => {
                  callback(null, { status: "added to queue" });
                });
              }
            });
        }
      });
  };

  dequeueFirstCustomer = (call, callback) => {};

  dequeueRandomCustomer = (call, callback) => {};
};
