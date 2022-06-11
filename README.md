# distributedQueue

Start / Stop Minikube:

```
minikube start
minikube stop
```

To provision MongoDB Deployment:

```
kubectl create -f ./mongo/mongo-pvc.yaml
kubectl create -f ./mongo/mongo-secrets.yaml
kubectl create -f ./mongo/mongo-deployment.yaml
kubectl create -f ./mongo/mongo-nodeport-service.yaml
```

To provision MongoDB-Express GUI Deployment:

```
kubectl create -f ./mongo-express/mongo-configmap.yaml
kubectl create -f ./mongo-express/mongoexpress-deployment.yaml
kubectl create -f ./mongo-express/mongoexpress-nodeport-service.yaml
```

To get external endpoint for service:

```
minikube service mongo-nodeport-service --url
minikube service mongoexpress-nodeport-service --url
```

Tearing down cluster:

```
kubectl delete deployment mongo mongo-express
kubectl delete service mongo-nodeport-service mongoexpress-nodeport-service
kubectl delete pvc mongo-data
kubectl delete secret mongo-creds
kubectl delete configmap mongo-configmap
```

Setup docker containers for dev environment (mongo and mongo-express):

```
docker run --name mongo -d -p 27017:27017 --network bridge -e MONGO_INITDB_ROOT_USERNAME=adminuser -e MONGO_INITDB_ROOT_PASSWORD=csc3004 mongo
docker run --name mongo-express -d --rm -p 8081:8081 --network bridge -e ME_CONFIG_MONGODB_SERVER=host.docker.internal -e ME_CONFIG_MONGODB_ADMINUSERNAME=adminuser -e ME_CONFIG_MONGODB_ADMINPASSWORD=csc3004 mongo-express
```
