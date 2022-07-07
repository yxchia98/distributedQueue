from datetime import datetime
import logging
import grpc
import requests
import asyncio
import json
import os

import waitingroom_pb2
import waitingroom_pb2_grpc


GRPC_SERVER_URL = os.environ['GRPC_SERVER_URL']
FINAL_PAGE_SERVER_URL = os.environ['FINAL_PAGE_SERVER_URL']


async def run_parallel(*functions):
    await asyncio.gather(*functions)


def validator(token):
    with grpc.insecure_channel(GRPC_SERVER_URL) as channel:
        stub = waitingroom_pb2_grpc.ValidatorStub(channel)
        response = stub.ValidateToken(waitingroom_pb2.ValidateTokenRequest(token=token))
        print(response)
        return True if response.validated == "true" else False


def dequeue(type):
    with grpc.insecure_channel(GRPC_SERVER_URL) as channel:
        stub = waitingroom_pb2_grpc.DequeueStub(channel)

        if type == 0:
            print("deququing la")
            response = stub.DequeueFirstCustomer(
                waitingroom_pb2.DequeueCustomerRequest()
            )
            print(response)
        else:
            response = stub.DequeueRandomCustomer(
                waitingroom_pb2.DequeueCustomerRequest()
            )
        dequeue_reply = {
            "ipaddr": response.ipaddr,
            "macaddr": response.macaddr,
            "phonenum": response.phonenum,
            "inTime": response.inTime,
            "outTime": response.outTime,
        }
        print(dequeue_reply)
        return dequeue_reply


async def health_check():
    # TODO: REST request to final website to check for status (availabilty and pending tokens to be validated)
    # if there are pending tokens:
    #   connect as grpc client to queue server to validate
    # if there are available slots from final website:
    #   connect as grpc client to queue server to allow for dequeuing
    while True:
        await asyncio.sleep(2)
        try:
            req = requests.get(f"{FINAL_PAGE_SERVER_URL}/sendtoken")
            req_json = json.loads(req.text)
            pending_unvalidated_tokens = req_json[0]
            max_cap = int(req_json[1])
            current_in_store = int(req_json[2])
            dequeue_type = int(req_json[3])  # 0: first come first serve 1: random
            print(f"health check from final webpage: {req_json}")

            can_process = []
            to_requeue = []

            for token in pending_unvalidated_tokens:
                print(f"validating: {token}")
                if validator(token):
                    if len(can_process) <= max_cap - current_in_store:
                        can_process.append(token)
                        print(f"{token} can process")
                    else:
                        to_requeue.append(token)
                        print(f"{token} needs to requeue")
                else:
                    print(f"{token} invalid token")

            # send back
            req_result = requests.post(
                f"{FINAL_PAGE_SERVER_URL}/validatetoken",
                json=json.dumps({"can_process": can_process, "to_requeue": to_requeue}),
            )
            print(f"reply from final web page: {req_result.text}")

            print(can_process, to_requeue)

            dequeue_count = (
                max_cap - current_in_store - len(can_process) - len(to_requeue)
            )

            print(f"dequeuing total: {dequeue_count}")
            # to send dequeue request to gRPC server
            for q in range(dequeue_count):
                print(f"dequeue #{q} type: {dequeue_type}")
                dequeue(dequeue_type)
        except:
            print("error")
            pass


async def function_1():
    while True:
        await asyncio.sleep(5)
        print("async background func")


async def main():
    await run_parallel(function_1(), health_check())


if __name__ == "__main__":
    logging.basicConfig()
    asyncio.run(main())
    # validator()
