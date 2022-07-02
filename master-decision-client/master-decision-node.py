from datetime import datetime
import logging
import grpc
import requests

import waitingroom_pb2
import waitingroom_pb2_grpc


def validator():
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = waitingroom_pb2_grpc.ValidatorStub(channel)
        # TODO: change token request type to just a random string (base64?)
        response = stub.ValidateToken(waitingroom_pb2.ValidateTokenRequest())
        if response.success:
            print(f"Success!: {response.message}")
        else:
            print(f"Error!: {response.message}")


def dequeue():
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = waitingroom_pb2_grpc.DequeueStub(channel)

        response = stub.DequeueRandomCustomer(waitingroom_pb2.DequeueCustomerRequest())
        # response = stub.DequeueFirstCustomer(waitingroom_pb2.DequeueCustomerRequest())
        return {
            "ipaddr": response.ipaddr,
            "macaddr": response.macaddr,
            "phonenum": response.phonenum,
            "inTime": response.inTime,
            "outTime": response.outTime,
        }


def health_check():
    # TODO: REST request to final website to check for status (availabilty and pending tokens to be validated)
    # if there are pending tokens:
    #   connect as grpc client to queue server to validate
    # if there are available slots from final website:
    #   connect as grpc client to queue server to allow for dequeuing
    pass


if __name__ == "__main__":
    logging.basicConfig()
