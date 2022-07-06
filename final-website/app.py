from flask import Flask, render_template, url_for, redirect, request, jsonify
import random
import time
import json
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)

tokenlist=[3,32,6,1]
tokenlist1 =[]
selected_user=[ 1, 6, 3, 5, 3, 4 ]
max_cap =5
approved=[]
invalid=[]
randomnum = random.randint(0,4)
# @app.route("/")
# def home():
#     return render_template("main.html"), {"Refresh": "3; redirect"}
@app.route("/success/<int:score>")
def option1():
    return render_template("success.html",)

@app.route("/invalid/<int:score>")
def option2():
    return render_template("invalid.html")

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
    # tokenlist1 =tokenlist
    tokenlist.clear()
    return jsonify(data)


# validate token
@app.route("/validatetoken", methods=["POST"])
def validate():
    #retrieving data from brandon, commented because i m using dummy data
    # request_data = json.loads(request.get_json())
    # print(request_data)
    # token = request_data["token"]
    # tokenlist.append(token)
    # global result
    # result = request_data["result"]
    # selected_user = request_data["choosen"]
    for x in range(len(tokenlist)):
        # time.sleep(1)
        if tokenlist1[x] in selected_user:
            print("token "+ str(tokenlist1[x])+" valid")
            approved.append(tokenlist1[x])
        else:
            print("token "+str(tokenlist1[x])+" invalid")
            invalid.append(tokenlist1[x])
    return jsonify(approved)

# still testing dis part
# @app.route('/redirect/<int:token>')
# def results(token):
#     result=""
#     if token in approved:
#         result='success'
#     else:
#         result='fail'
#     return redirect(url_for(result,token=token))

# def checkout_user():
#     selected_user.pop(randomnum) if selected_user else None


# sched = BackgroundScheduler(daemon=True)
# sched.add_job(options,'interval',seconds=3)
# sched.start()


app.run(debug=True)
