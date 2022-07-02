from datetime import datetime
import logging
import grpc

import waitingroom_pb2
import waitingroom_pb2_grpc


def validator():
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = waitingroom_pb2_grpc.ValidatorStub(channel)

        response = stub.ValidateToken(waitingroom_pb2.ValidateTokenRequest())
        if response.success:
            print(f"Success!: {response.message}")
        else:
            print(f"Error!: {response.message}")


if __name__ == "__main__":
    logging.basicConfig()
