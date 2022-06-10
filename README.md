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
