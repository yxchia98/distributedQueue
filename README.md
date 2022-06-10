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
