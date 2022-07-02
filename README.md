# distributedQueue

Start / Stop Minikube:

```
minikube start
minikube stop
```

Deploying Distributed Queue Kubernetes Cluster:

```
kubectl apply -k ./dashboard
kubectl apply -k ./mongo-k8s
kubectl apply -k ./mongo-express-k8s
kubectl apply -k ./queue-server-k8s
```

Tearing down cluster:

```
kubectl delete -k ./dashboard
kubectl delete -k ./mongo-k8s
kubectl delete -k ./mongo-express-k8s
kubectl delete -k ./queue-server-k8s
```

Deploy Kubernetes Dashboard (http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/):

```
kubectl apply -k ./dashboard
kubectl -n kubernetes-dashboard create token admin-user
# copy the generated token
kubectl proxy
```

To provision MongoDB Deployment:

```
kubectl apply -k ./mongo-k8s
```

To provision MongoDB-Express GUI Deployment:

```
kubectl apply -k ./mongo-express-k8s
```

To provision Waitingroom Nodejs GRPC server Deployment:

```
kubectl delete -k ./queue-server-k8s
```

To get external endpoint for service:

```
minikube service mongo-nodeport-service --url
minikube service mongoexpress-nodeport-service --url
minikube service waitingroom-node-nodeport-service --url
```

Setup docker containers for dev environment (mongo and mongo-express):

```
docker run --name mongo -d -p 27017:27017 --network bridge -e MONGO_INITDB_ROOT_USERNAME=adminuser -e MONGO_INITDB_ROOT_PASSWORD=csc3004 mongo
docker run --name mongo-express -d --rm -p 8081:8081 --network bridge -e ME_CONFIG_MONGODB_SERVER=host.docker.internal -e ME_CONFIG_MONGODB_ADMINUSERNAME=adminuser -e ME_CONFIG_MONGODB_ADMINPASSWORD=csc3004 mongo-express
```

Setup GRPC Docker container (waitingroom-node):

```
cd waitingroom-node
docker build --tag waitingroom-node .
docker run --network bridge -d -p 50051:50051 --env-file .\env.list --name waitingroom-node waitingroom-node
```
