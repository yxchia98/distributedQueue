import logo from "./logo.svg";
import "./App.css";

const { WaitingRoomClient } = require("./waitingroom_grpc_web_pb.js");

const {
  EnqueueCustomerRequest,
  EnqueueCustomerReply,
  WaitQueueRequest,
  WaitQueueReply,
} = require("./waitingroom_pb.js");

let client = new WaitingRoomClient("http://localhost:49334", null, null);

function App() {
  let startGrpcStream = () => {
    const request = new WaitQueueRequest();

    request.setIpaddr("Test");
    request.setMacaddr("Test");
    request.setPhonenum("Test");

    let stream = client.waitQueue(request);

    stream.on("data", function (res) {
      let status = res.getSelected();
      if (status == true) {
        window.location.assign("http://" + res.getUrl());
      }
    });
  };

  let callGrpcService = () => {
    const request = new EnqueueCustomerRequest();
    request.setIpaddr("Test");
    request.setMacaddr("Test");
    request.setPhonenum("Test");

    client.enqueueCustomer(request, {}, (err, response) => {
      if (response == null) {
        console.log(err);
      } else {
        console.log(response.getStatus());
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button style={{ padding: 10 }} onClick={callGrpcService}>
          Click for grpc request
        </button>
        <button style={{ padding: 10 }} onClick={startGrpcStream}>
          Click for grpc stream
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
