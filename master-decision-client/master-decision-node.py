from datetime import datetime
import logging
import re
import grpc
import requests
import asyncio
import json

import waitingroom_pb2
import waitingroom_pb2_grpc


GRPC_SERVER_URL = "127.0.0.1:50051"
FINAL_PAGE_SERVER_URL = "http://127.0.0.1:5000"


async def run_parallel(*functions):
    await asyncio.gather(*functions)


def validator(token):
    with grpc.insecure_channel(GRPC_SERVER_URL) as channel:
        stub = waitingroom_pb2_grpc.ValidatorStub(channel)
        response = stub.ValidateToken(waitingroom_pb2.ValidateTokenRequest(token=token))
        print(response.validated)
        return response.validated


def dequeue():
    with grpc.insecure_channel(GRPC_SERVER_URL) as channel:
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


async def health_check():
    # TODO: REST request to final website to check for status (availabilty and pending tokens to be validated)
    # if there are pending tokens:
    #   connect as grpc client to queue server to validate
    # if there are available slots from final website:
    #   connect as grpc client to queue server to allow for dequeuing
    while True:
        await asyncio.sleep(1)
        try:
            req = requests.get(f"{FINAL_PAGE_SERVER_URL}/sendtoken")
            req_json = json.loads(req.text)
            print(f"health check from final webpage: {req_json}")
            for token in req_json:
                print(f"validating: {token}")
                req_result = requests.post(
                    f"{FINAL_PAGE_SERVER_URL}/validatetoken",
                    json=json.dumps({"token": token, "result": validator(token)}),
                )
                print(req_result.text)
        except:
            print("error")
            pass


async def function_1():
    while True:
        await asyncio.sleep(5)
        print("HELLO WORLD from func 1")


async def main():
    await run_parallel(function_1(), health_check())


if __name__ == "__main__":
    logging.basicConfig()
    asyncio.run(main())
    # validator()
