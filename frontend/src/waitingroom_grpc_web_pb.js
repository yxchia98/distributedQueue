/**
 * @fileoverview gRPC-Web generated client stub for waitingroom
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.waitingroom = require('./waitingroom_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.waitingroom.WaitingRoomClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.waitingroom.WaitingRoomPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.waitingroom.EnqueueCustomerRequest,
 *   !proto.waitingroom.EnqueueCustomerReply>}
 */
const methodDescriptor_WaitingRoom_EnqueueCustomer = new grpc.web.MethodDescriptor(
  '/waitingroom.WaitingRoom/EnqueueCustomer',
  grpc.web.MethodType.UNARY,
  proto.waitingroom.EnqueueCustomerRequest,
  proto.waitingroom.EnqueueCustomerReply,
  /**
   * @param {!proto.waitingroom.EnqueueCustomerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.waitingroom.EnqueueCustomerReply.deserializeBinary
);


/**
 * @param {!proto.waitingroom.EnqueueCustomerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.waitingroom.EnqueueCustomerReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.waitingroom.EnqueueCustomerReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.waitingroom.WaitingRoomClient.prototype.enqueueCustomer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/waitingroom.WaitingRoom/EnqueueCustomer',
      request,
      metadata || {},
      methodDescriptor_WaitingRoom_EnqueueCustomer,
      callback);
};


/**
 * @param {!proto.waitingroom.EnqueueCustomerRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.waitingroom.EnqueueCustomerReply>}
 *     Promise that resolves to the response
 */
proto.waitingroom.WaitingRoomPromiseClient.prototype.enqueueCustomer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/waitingroom.WaitingRoom/EnqueueCustomer',
      request,
      metadata || {},
      methodDescriptor_WaitingRoom_EnqueueCustomer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.waitingroom.WaitQueueRequest,
 *   !proto.waitingroom.WaitQueueReply>}
 */
const methodDescriptor_WaitingRoom_WaitQueue = new grpc.web.MethodDescriptor(
  '/waitingroom.WaitingRoom/WaitQueue',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.waitingroom.WaitQueueRequest,
  proto.waitingroom.WaitQueueReply,
  /**
   * @param {!proto.waitingroom.WaitQueueRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.waitingroom.WaitQueueReply.deserializeBinary
);


/**
 * @param {!proto.waitingroom.WaitQueueRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.waitingroom.WaitQueueReply>}
 *     The XHR Node Readable Stream
 */
proto.waitingroom.WaitingRoomClient.prototype.waitQueue =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/waitingroom.WaitingRoom/WaitQueue',
      request,
      metadata || {},
      methodDescriptor_WaitingRoom_WaitQueue);
};


/**
 * @param {!proto.waitingroom.WaitQueueRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.waitingroom.WaitQueueReply>}
 *     The XHR Node Readable Stream
 */
proto.waitingroom.WaitingRoomPromiseClient.prototype.waitQueue =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/waitingroom.WaitingRoom/WaitQueue',
      request,
      metadata || {},
      methodDescriptor_WaitingRoom_WaitQueue);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.waitingroom.DequeueClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.waitingroom.DequeuePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.waitingroom.DequeueCustomerRequest,
 *   !proto.waitingroom.DequeueCustomerReply>}
 */
const methodDescriptor_Dequeue_DequeueRandomCustomer = new grpc.web.MethodDescriptor(
  '/waitingroom.Dequeue/DequeueRandomCustomer',
  grpc.web.MethodType.UNARY,
  proto.waitingroom.DequeueCustomerRequest,
  proto.waitingroom.DequeueCustomerReply,
  /**
   * @param {!proto.waitingroom.DequeueCustomerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.waitingroom.DequeueCustomerReply.deserializeBinary
);


/**
 * @param {!proto.waitingroom.DequeueCustomerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.waitingroom.DequeueCustomerReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.waitingroom.DequeueCustomerReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.waitingroom.DequeueClient.prototype.dequeueRandomCustomer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/waitingroom.Dequeue/DequeueRandomCustomer',
      request,
      metadata || {},
      methodDescriptor_Dequeue_DequeueRandomCustomer,
      callback);
};


/**
 * @param {!proto.waitingroom.DequeueCustomerRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.waitingroom.DequeueCustomerReply>}
 *     Promise that resolves to the response
 */
proto.waitingroom.DequeuePromiseClient.prototype.dequeueRandomCustomer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/waitingroom.Dequeue/DequeueRandomCustomer',
      request,
      metadata || {},
      methodDescriptor_Dequeue_DequeueRandomCustomer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.waitingroom.DequeueCustomerRequest,
 *   !proto.waitingroom.DequeueCustomerReply>}
 */
const methodDescriptor_Dequeue_DequeueFirstCustomer = new grpc.web.MethodDescriptor(
  '/waitingroom.Dequeue/DequeueFirstCustomer',
  grpc.web.MethodType.UNARY,
  proto.waitingroom.DequeueCustomerRequest,
  proto.waitingroom.DequeueCustomerReply,
  /**
   * @param {!proto.waitingroom.DequeueCustomerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.waitingroom.DequeueCustomerReply.deserializeBinary
);


/**
 * @param {!proto.waitingroom.DequeueCustomerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.waitingroom.DequeueCustomerReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.waitingroom.DequeueCustomerReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.waitingroom.DequeueClient.prototype.dequeueFirstCustomer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/waitingroom.Dequeue/DequeueFirstCustomer',
      request,
      metadata || {},
      methodDescriptor_Dequeue_DequeueFirstCustomer,
      callback);
};


/**
 * @param {!proto.waitingroom.DequeueCustomerRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.waitingroom.DequeueCustomerReply>}
 *     Promise that resolves to the response
 */
proto.waitingroom.DequeuePromiseClient.prototype.dequeueFirstCustomer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/waitingroom.Dequeue/DequeueFirstCustomer',
      request,
      metadata || {},
      methodDescriptor_Dequeue_DequeueFirstCustomer);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.waitingroom.ValidatorClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.waitingroom.ValidatorPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.waitingroom.ValidateTokenRequest,
 *   !proto.waitingroom.ValidateTokenReply>}
 */
const methodDescriptor_Validator_ValidateToken = new grpc.web.MethodDescriptor(
  '/waitingroom.Validator/ValidateToken',
  grpc.web.MethodType.UNARY,
  proto.waitingroom.ValidateTokenRequest,
  proto.waitingroom.ValidateTokenReply,
  /**
   * @param {!proto.waitingroom.ValidateTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.waitingroom.ValidateTokenReply.deserializeBinary
);


/**
 * @param {!proto.waitingroom.ValidateTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.waitingroom.ValidateTokenReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.waitingroom.ValidateTokenReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.waitingroom.ValidatorClient.prototype.validateToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/waitingroom.Validator/ValidateToken',
      request,
      metadata || {},
      methodDescriptor_Validator_ValidateToken,
      callback);
};


/**
 * @param {!proto.waitingroom.ValidateTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.waitingroom.ValidateTokenReply>}
 *     Promise that resolves to the response
 */
proto.waitingroom.ValidatorPromiseClient.prototype.validateToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/waitingroom.Validator/ValidateToken',
      request,
      metadata || {},
      methodDescriptor_Validator_ValidateToken);
};


module.exports = proto.waitingroom;

