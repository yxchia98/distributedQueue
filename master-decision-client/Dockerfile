FROM python:3.9
WORKDIR /app
ADD . /app
COPY ./requirements.txt /app
COPY ./generate_stub.txt /app
COPY ./master-decision-node.py /app
COPY ./waitingroom.proto /app
COPY ./waitingroom_pb2.py /app
COPY ./waitingroom_pb2_grpc.py /app

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt --no-dependencies
EXPOSE 50051
ENTRYPOINT ["python3", "master-decision-node.py"]