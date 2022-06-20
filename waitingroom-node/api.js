const { toArray, update } = require("lodash");

const ObjectId = require("mongodb").ObjectId;

module.exports = class API {
  constructor(db, grpc) {
    this.db = db;
    this.grpc = grpc;
  }

  enqueueCustomer = (call, callback) => {
    console.log("enqueueing customer");
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
                const sameMac = ipaddrs.filter(
                  (element) => element.macaddr == call.request.macaddr
                );
                if (sameMac.length > 0) {
                  console.log("duplicate customer");
                  callback(null, { status: "unauthorized" });
                } else {
                  queue.insertOne(customer).then((r) => {
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
                    } else {
                      callback(null, { status: "unauthorized" });
                    }
                  });
              }
            });
        }
      });
  };

  dequeueFirstCustomer = (call, callback) => {
    console.log("dequeueing first customer");
    const queue = this.db.collection("queues");
    queue
      .find({ inqueue: true })
      .sort({ inTime: 1 })
      .toArray()
      .then((results) => {
        if (results.length == 0) {
          console.log("no customers to dequeue");
          callback(null, this.nullCustomer());
        } else {
          let selected = results[0];
          const filter = { _id: selected._id };
          const options = { upsert: false };
          const updateDoc = { $set: { inqueue: false, outTime: new Date() } };
          queue.updateOne(filter, updateDoc, options).then((r) => {
            if (r.acknowledged) {
              let result = {
                ipaddr: selected.ipaddr,
                macaddr: selected.macaddr,
                phonenum: selected.phonenum,
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

  dequeueRandomCustomer = (call, callback) => {
    console.log("dequeueing random customer");
    const queue = this.db.collection("queues");
    queue
      .find({ inqueue: true })
      .toArray()
      .then((results) => {
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
          const updateDoc = { $set: { inqueue: false, outTime: new Date() } };
          queue.updateOne(filter, updateDoc, options).then((r) => {
            if (r.acknowledged) {
              let result = {
                ipaddr: selected.ipaddr,
                macaddr: selected.macaddr,
                phonenum: selected.phonenum,
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

  nullCustomer = () => {
    console.log("enqueue/dequeue aborted, replacing with nulls");
    return {
      ipaddr: null,
      macaddr: null,
      phonenum: null,
      inTime: null,
      outTime: null,
    };
  };
};
