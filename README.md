# distributedQueue

Start / Stop Minikube:

```
minikube start
minikube stop
```

Deploy Kubernetes Dashboard (http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/):

```
kubectl apply -f .\dashboard\dashboard.yaml
kubectl apply -f .\dashboard\dashboard-acc.yaml
kubectl apply -f .\dashboard\dashboard-clusterrolebinding.yaml
kubectl -n kubernetes-dashboard create token admin-user
# copy the generated token
kubectl proxy
```

To provision MongoDB Deployment:

```
kubectl create -f ./mongo-k8s/mongo-pvc.yaml
kubectl create -f ./mongo-k8s/mongo-secrets.yaml
kubectl create -f ./mongo-k8s/mongo-deployment.yaml
kubectl create -f ./mongo-k8s/mongo-nodeport-service.yaml
```

To provision MongoDB-Express GUI Deployment:

```
kubectl create -f ./mongo-express-k8s/mongo-configmap.yaml
kubectl create -f ./mongo-express-k8s/mongoexpress-deployment.yaml
kubectl create -f ./mongo-express-k8s/mongoexpress-nodeport-service.yaml
```

To provision Waitingroom Nodejs GRPC server Deployment:

```
kubectl create -f ./waitingroom-node-k8s/waitingroom-node-deployment.yaml
kubectl create -f ./waitingroom-node-k8s/waitingroom-node-nodeport-service.yaml
```

To get external endpoint for service:

```
minikube service mongo-nodeport-service --url
minikube service mongoexpress-nodeport-service --url
minikube service waitingroom-node-nodeport-service --url
```

Tearing down cluster:

```
kubectl delete deployment mongo mongo-express
kubectl delete service mongo-nodeport-service mongoexpress-nodeport-service
kubectl delete pvc mongo-data
kubectl delete secret mongo-creds
kubectl delete configmap mongo-configmap
kubectl delete deployment waitingroom-node
kubectl delete service waitingroom-node-nodeport-service
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
