from flask import Flask, render_template, url_for, redirect, request, jsonify
import random
import time
import json

app = Flask(__name__)

tokenlist = []


# @app.route("/")
# def home():
#     return render_template("main.html"), {"Refresh": "3; redirect"}


# GET token and save in list
@app.route("/gettoken")
def gettoken():
    # if key doesn't exist, returns None
    token = request.args.get("token")
    tokenlist.append(token)
    return render_template("main.html"), {"Refresh": "3; redirect"}
    


# send token for validation
@app.route("/sendtoken", methods=["GET"])
def starting_url():
    return jsonify(tokenlist)


# validate token
@app.route("/validatetoken", methods=["POST"])
def validate():
    request_data = json.loads(request.get_json())
    print(request_data)
    token = request_data["token"]
    global result
    result = request_data["result"]
    for elem in tokenlist:
        print(elem)
        if elem == token:
            tokenlist.remove(elem)
    return jsonify("no tokens found")


# deicde which site to redirect to
@app.route("/redirect")
def options():
    if result == "True":
        return redirect("/option1")
    else:
        return redirect("/option2")


@app.route("/option1")
def option1():
    return render_template("success.html")


@app.route("/option2")
def option2():
    return render_template("index.html")


app.run(debug=True)
