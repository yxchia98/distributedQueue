import logo from "./logo.svg";
import "./App.css";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef, useState } from "react";

const { WaitingRoomClient } = require("./waitingroom_grpc_web_pb.js");
const {
  EnqueueCustomerRequest,
  EnqueueCustomerReply,
  WaitQueueRequest,
  WaitQueueReply,
} = require("./waitingroom_pb.js");

let client = new WaitingRoomClient("http://localhost:49334", null, null);

function App() {
  const captchaRef = useRef(null);
  const [phoneNum, setPhoneNum] = useState(null);

  let startQueue = (e) => {
    e.preventDefault();
    const response = captchaRef.current.getValue();

    if (response.length == 0) {
      console.log("Not checked");
    } else {
      const request = new EnqueueCustomerRequest();
      request.setIpaddr("Test");
      request.setSessionid("Test");
      request.setPhonenum("Test");

      client.enqueueCustomer(request, {}, (err, response) => {
        if (response == null) {
          console.log(err);
        } else {
          console.log(response.getStatus());
        }
      });
    }
  };

  let startGrpcStream = () => {
    const request = new WaitQueueRequest();

    request.setIpaddr("Test");
    request.setSessionid("Test");
    request.setPhonenum("Test");

    let stream = client.waitQueue(request);

    stream.on("data", function (res) {
      let status = res.getSelected();
      if (status == true) {
        window.location.assign("http://" + res.getUrl());
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={startQueue}>
          <label htmlFor="phoneNum">Phone Number</label>
          <input type="text" id="phoneNum" className="input" />
          <ReCAPTCHA
            sitekey="6Ld-ecUgAAAAAKttkbASYR7ll4n--Q5-dNe2_ZUt"
            ref={captchaRef}
          />
          <button>Submit</button>
        </form>
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
