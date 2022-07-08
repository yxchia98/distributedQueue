# distributedQueue

Start / Stop Minikube:

```
minikube start --extra-config=kubelet.housekeeping-interval=10s
minikube stop
```

Install Required Minikube Addons:

```
minikube addons enable metrics-server
minikube addons enable dashboard
minikube addons enable ingress

```

Start Minikube Kubernetes Dashboard (open a new terminal):

```
minikube dashboard
# if not using Minikube
kubectl apply -k ./dashboard
```

Install Linkerd Control Plane:

```
choco install linkerd2
```

```
brew install linkerd
```

Install Linkerd Service Mesh

```
linkerd install --set proxyInit.runAsRoot=true | kubectl apply -f -
linkerd viz install | kubectl apply -f -
```

Deploying Distributed Queue Kubernetes Cluster:

```
kubectl apply -k ./mongo-k8s
kubectl apply -k ./mongo-express-k8s
kubectl apply -k ./queue-server-k8s
kubectl apply -k ./envoy-k8s
```

Start Linkerd Dashboard (open a new terminal):

```
linkerd viz dashboard
```

Starting Frontend App:

```
cd frontend
npm install
npm start
```

Uninstall Linkerd:

```
kubectl get deploy -o yaml | linkerd uninject - | kubectl apply -f -
linkerd viz uninstall | kubectl delete -f -
```

Tearing down cluster:

```
kubectl delete -k ./mongo-k8s
kubectl delete -k ./mongo-express-k8s
kubectl delete -k ./queue-server-k8s
kubectl delete -k ./envoy-k8s
```

Deploy Kubernetes Dashboard without Minikube (http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/):

```
kubectl apply -k ./dashboard
kubectl -n kubernetes-dashboard create token admin-user
# copy the generated token
kubectl proxy
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

# Deploying the Master Decision Node (MDN)

Navigate into the `master-decision-client` folder.

### Generate Stub if needed

`python3 -m grpc_tools.protoc -I./ --python_out=. --grpc_python_out=. ./waitingroom.proto`

### Edit Environmental Variables
Set the IP address of the final website and queue-server. `127.0.0.1` and `localhost` is not supported, even if they are deployed on the same machine. Please use the `192.168.1.x` IP address. 
### Use Docker Compose to run
This will build the container and sets the network mode to host.
`docker-compose up --build -d`