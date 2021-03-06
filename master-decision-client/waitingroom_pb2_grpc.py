# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import waitingroom_pb2 as waitingroom__pb2


class WaitingRoomStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.EnqueueCustomer = channel.unary_unary(
                '/waitingroom.WaitingRoom/EnqueueCustomer',
                request_serializer=waitingroom__pb2.EnqueueCustomerRequest.SerializeToString,
                response_deserializer=waitingroom__pb2.EnqueueCustomerReply.FromString,
                )
        self.WaitQueue = channel.unary_stream(
                '/waitingroom.WaitingRoom/WaitQueue',
                request_serializer=waitingroom__pb2.WaitQueueRequest.SerializeToString,
                response_deserializer=waitingroom__pb2.WaitQueueReply.FromString,
                )


class WaitingRoomServicer(object):
    """Missing associated documentation comment in .proto file."""

    def EnqueueCustomer(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def WaitQueue(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_WaitingRoomServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'EnqueueCustomer': grpc.unary_unary_rpc_method_handler(
                    servicer.EnqueueCustomer,
                    request_deserializer=waitingroom__pb2.EnqueueCustomerRequest.FromString,
                    response_serializer=waitingroom__pb2.EnqueueCustomerReply.SerializeToString,
            ),
            'WaitQueue': grpc.unary_stream_rpc_method_handler(
                    servicer.WaitQueue,
                    request_deserializer=waitingroom__pb2.WaitQueueRequest.FromString,
                    response_serializer=waitingroom__pb2.WaitQueueReply.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'waitingroom.WaitingRoom', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class WaitingRoom(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def EnqueueCustomer(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/waitingroom.WaitingRoom/EnqueueCustomer',
            waitingroom__pb2.EnqueueCustomerRequest.SerializeToString,
            waitingroom__pb2.EnqueueCustomerReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def WaitQueue(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_stream(request, target, '/waitingroom.WaitingRoom/WaitQueue',
            waitingroom__pb2.WaitQueueRequest.SerializeToString,
            waitingroom__pb2.WaitQueueReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)


class DequeueStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.DequeueRandomCustomer = channel.unary_unary(
                '/waitingroom.Dequeue/DequeueRandomCustomer',
                request_serializer=waitingroom__pb2.DequeueCustomerRequest.SerializeToString,
                response_deserializer=waitingroom__pb2.DequeueCustomerReply.FromString,
                )
        self.DequeueFirstCustomer = channel.unary_unary(
                '/waitingroom.Dequeue/DequeueFirstCustomer',
                request_serializer=waitingroom__pb2.DequeueCustomerRequest.SerializeToString,
                response_deserializer=waitingroom__pb2.DequeueCustomerReply.FromString,
                )


class DequeueServicer(object):
    """Missing associated documentation comment in .proto file."""

    def DequeueRandomCustomer(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def DequeueFirstCustomer(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_DequeueServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'DequeueRandomCustomer': grpc.unary_unary_rpc_method_handler(
                    servicer.DequeueRandomCustomer,
                    request_deserializer=waitingroom__pb2.DequeueCustomerRequest.FromString,
                    response_serializer=waitingroom__pb2.DequeueCustomerReply.SerializeToString,
            ),
            'DequeueFirstCustomer': grpc.unary_unary_rpc_method_handler(
                    servicer.DequeueFirstCustomer,
                    request_deserializer=waitingroom__pb2.DequeueCustomerRequest.FromString,
                    response_serializer=waitingroom__pb2.DequeueCustomerReply.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'waitingroom.Dequeue', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class Dequeue(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def DequeueRandomCustomer(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/waitingroom.Dequeue/DequeueRandomCustomer',
            waitingroom__pb2.DequeueCustomerRequest.SerializeToString,
            waitingroom__pb2.DequeueCustomerReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def DequeueFirstCustomer(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/waitingroom.Dequeue/DequeueFirstCustomer',
            waitingroom__pb2.DequeueCustomerRequest.SerializeToString,
            waitingroom__pb2.DequeueCustomerReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)


class ValidatorStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.ValidateToken = channel.unary_unary(
                '/waitingroom.Validator/ValidateToken',
                request_serializer=waitingroom__pb2.ValidateTokenRequest.SerializeToString,
                response_deserializer=waitingroom__pb2.ValidateTokenReply.FromString,
                )


class ValidatorServicer(object):
    """Missing associated documentation comment in .proto file."""

    def ValidateToken(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_ValidatorServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'ValidateToken': grpc.unary_unary_rpc_method_handler(
                    servicer.ValidateToken,
                    request_deserializer=waitingroom__pb2.ValidateTokenRequest.FromString,
                    response_serializer=waitingroom__pb2.ValidateTokenReply.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'waitingroom.Validator', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class Validator(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def ValidateToken(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/waitingroom.Validator/ValidateToken',
            waitingroom__pb2.ValidateTokenRequest.SerializeToString,
            waitingroom__pb2.ValidateTokenReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
