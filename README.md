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

Inject Linkerd to all applications:

```
kubectl get deploy -o yaml | linkerd inject - | kubectl apply -f -
linkerd viz dashboard
```

Uninstall Linkerd:

```
kubectl get deploy -o yaml | linkerd uninject - | kubectl apply -f -
linkerd viz uninstall | kubectl delete -f -
```

To provision Kubernetes Dashboard and Metrics-Server:

```
kubectl apply -k ./dashboard
```

To provision MongoDB StatefulSet:

```
kubectl apply -k ./mongo-k8s
```

To provision MongoDB-Express GUI Deployment:

```
kubectl apply -k ./mongo-express-k8s
```

To provision Queue Server Deployment:

```
kubectl apply -k ./queue-server-k8s
```

To get external endpoint for service:

```
minikube service mongo-nodeport-service --url
minikube service mongoexpress-nodeport-service --url
minikube service waitingroom-node-nodeport-service --url
```
