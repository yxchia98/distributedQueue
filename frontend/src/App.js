import logo from "./logo.svg";
import "./App.css";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const { WaitingRoomClient } = require("./waitingroom_grpc_web_pb.js");
const {
  EnqueueCustomerRequest,
  EnqueueCustomerReply,
  WaitQueueRequest,
  WaitQueueReply,
} = require("./waitingroom_pb.js");

let client = new WaitingRoomClient("http://172.18.240.76:32010", null, null);

function App() {
  const captchaRef = useRef(null);
  const isInitialMount = useRef(true);
  const [ip, setIP] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      let storedSessionId = window.sessionStorage.getItem("queueFingerprint");

      if (storedSessionId === null) {
        if (ip != null) {
          const id =
            parseInt(ip.replaceAll(".", "")) +
            Math.random().toString(16).slice(2);
          window.sessionStorage.setItem("queueFingerprint", id);
          setSessionId(id);
        }
      }
    }
  }, [ip]);

  let startGrpcStream = () => {
    const request = new WaitQueueRequest();

    request.setIpaddr(ip);
    request.setSessionid(sessionId);
    request.setPhonenum(phoneNum);

    let stream = client.waitQueue(request);

    stream.on("data", function (res) {
      let status = res.getSelected();
      if (status == true) {
        window.location.assign("http://" + res.getUrl());
      }
    });
  };

  let startQueue = (e) => {
    e.preventDefault();
    const response = captchaRef.current.getValue();

    if (response.length == 0) {
      console.log("Not checked");
    } else {
      const request = new EnqueueCustomerRequest();
      request.setIpaddr(ip);
      request.setSessionid(sessionId);
      request.setPhonenum(e.target[0].value);

      setPhoneNum(e.target[0].value);

      client.enqueueCustomer(request, {}, (err, response) => {
        if (response == null) {
          console.log(err);
        } else {
          let responseMessage = response.getStatus();
          if (responseMessage === "added to queue") {
            startGrpcStream();
          }
        }
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={startQueue}>
          <label htmlFor="phoneNum">Phone Number: </label>
          <input type="text" id="phoneNum" className="input" />
          <ReCAPTCHA
            sitekey="6Ld-ecUgAAAAAKttkbASYR7ll4n--Q5-dNe2_ZUt"
            ref={captchaRef}
          />
          <button>Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
