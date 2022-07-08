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

const envoyIP = "http://localhost:9090";

let client = new WaitingRoomClient(envoyIP, null, null);

function App() {
    const captchaRef = useRef(null);
    const isInitialMount = useRef(true);
    const [ip, setIP] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const [phoneNum, setPhoneNum] = useState(null);
    const [queuedUp, setQueuedUp] = useState(null);

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
                let token = res.getToken()
                window.location.assign(res.getUrl() + "/gettoken?token=" + token);
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

            client.enqueueCustomer(request, {}, (err, response) => {
                if (response == null) {
                    console.log(err);
                } else {
                    let responseMessage = response.getStatus();
                    console.log(responseMessage);
                    if (responseMessage === "added to queue") {
                        setQueuedUp(true);
                        startGrpcStream();
                    }
                }
            });
        }
    };

    const onChangeHandler = (event) => {
        setPhoneNum(event.target.value);
        console.log(phoneNum);
    };

    const stressCalls = async () => {
        let client = new WaitingRoomClient(envoyIP, null, null);
        for (let i = 0; i < 10000; i++) {
            const request = new EnqueueCustomerRequest();
            let val = i.toString();
            request.setIpaddr(val);
            request.setSessionid(val);
            request.setPhonenum(val);
            client.enqueueCustomer(request, {}, async (err, response) => {
                console.log("sent!");
                if (response == null) {
                    console.log(err);
                } else {
                    let responseMessage = response.getStatus();
                    // console.log(responseMessage);
                }
            });
            // await sleep(100);
        }
    };
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    return (
        <div className="App">
            {/* <button onClick={stressCalls}>Activate Lasers</button> */}
            <header className="App-header">
                {!queuedUp ? (
                    <form onSubmit={startQueue}>
                        <label htmlFor="phoneNum">Phone Number: </label>
                        <input
                            type="text"
                            id="phoneNum"
                            className="input"
                            onChange={onChangeHandler}
                        />
                        <ReCAPTCHA
                            sitekey="6Ld-ecUgAAAAAKttkbASYR7ll4n--Q5-dNe2_ZUt"
                            ref={captchaRef}
                        />
                        <button>Submit</button>
                    </form>
                ) : (
                    <div>
                        <div class="loader">
                            <svg class="circular-loader" viewBox="25 25 50 50">
                                <circle
                                    class="loader-path"
                                    cx="50"
                                    cy="50"
                                    r="20"
                                    fill="none"
                                    stroke="#70c542"
                                    stroke-width="2"
                                />
                            </svg>
                        </div>
                        <h1>You're in queue!</h1>
                        <h2>Please wait to be redirected.</h2>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
