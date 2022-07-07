FROM python:3.9
WORKDIR /app
ADD . /app
COPY ./requirements.txt /app
COPY ./storage /app
COPY ./safe_entry_server.py /app
COPY ./safe_entry_client.py /app
COPY ./safe_entry_remote_access.py /app
COPY ./safe_entry_pb2.py /app
COPY ./safe_entry_pb2_grpc.py /app

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt --no-dependencies
EXPOSE 50051
ENTRYPOINT ["python", "safe_entry_client.py"]