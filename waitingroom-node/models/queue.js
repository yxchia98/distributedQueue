const mongoose = require("mongoose");

const queueSchema = mongoose.Schema(
  {
    ipaddr: {
      type: String,
      required: true,
    },
    macaddr: {
      type: String,
      required: true,
    },
    phonenum: {
      type: String,
      required: true,
    },
    inqueue: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);
queueSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

queueSchema.set("toJSON", {
  virtuals: true,
});

exports.Queue = mongoose.model("queue", queueSchema);
