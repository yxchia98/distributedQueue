from flask import Flask, render_template, url_for, redirect, request, jsonify
import random
import time
import json
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)

tokenlist = []
selected_user =[]
max_cap =5


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
    capacity = max_cap - len(selected_user)
    data = []
    data.append(tokenlist)
    data.append(capacity)
    tokenlist.clear()
    return jsonify(data)


# validate token
@app.route("/validatetoken", methods=["POST"])
def validate():
    request_data = json.loads(request.get_json())
    print(request_data)
    token = request_data["token"]
    tokenlist.append(token)
    global result
    result = request_data["result"]
    selected_user = request_data["choosen"]

    return jsonify("no tokens found")


# deicde which site to redirect to
# todo make changes on redirection with specific user
# @app.route("/redirect")
# def options():
#     if result == "true":
#         return redirect("/option1")
#     else:
#         return redirect("/option2")


@app.route("/option1")
def option1():
    return render_template("success.html",token=max)


@app.route("/option2")
def option2():
    return render_template("index.html")

def checkout_user():
    random = random.randint(0,4)
    selected_user.pop(random) if selected_user else None


sched = BackgroundScheduler(daemon=True)
sched.add_job(checkout_user,'interval',seconds=5)
sched.start()


app.run(debug=True)
