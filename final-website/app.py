from flask import Flask, render_template, url_for, redirect, request, jsonify
import random
from apscheduler.schedulers.background import BackgroundScheduler
import json

app = Flask(__name__)

tokenlist1 = []
tokenlist = []
selected_user = []
max_cap = 3
approved = []
invalid = []
dq_method = 0

# @app.route("/")
# def home():
#     return render_template("main.html"), {"Refresh": "3; redirect"}


@app.route("/success/")
def success():
    return render_template(
        "success.html",
    )


@app.route("/fail/")
def fail():
    return render_template("invalid.html")


# GET token and save in list
@app.route("/gettoken")
def gettoken():
    token = request.args.get("token")
    tokenlist.append(token)
    url = "http://127.0.0.1:5000/redirect/" + str(token)
    print(url)
    return render_template("main.html"), {"Refresh": "5; url=%s" % (url)}


# validate and splitdata and redirection decision
@app.route("/redirect/<token>")
def results(token):
    global approved
    global invalid
    global tokenlist1
    print(tokenlist1)
    print(selected_user)
    for x in range(len(tokenlist1)):
        if tokenlist1[x] in selected_user:
            print("token " + str(tokenlist1[x]) + " valid")
            approved.append(tokenlist1[x])
        else:
            print("token " + str(tokenlist1[x]) + " invalid")
            invalid.append(tokenlist1[x])
    print(f"approved: {approved}")
    print(f"token: {token}")
    result = ""
    if token in approved:
        result = "success"
    else:
        result = "fail"
    return redirect(url_for(result))


# send token for validation
@app.route("/sendtoken", methods=["GET"])
def starting_url():
    global tokenlist
    global tokenlist1
    global selected_user
    # print(tokenlist, tokenlist1, selected_user)
    capacity = max_cap
    data = []
    tokenlist2 = tokenlist.copy()
    tokenlist1 = list(set(tokenlist1 + tokenlist.copy()))
    data.append(tokenlist2)
    data.append(capacity)
    current_no = len(selected_user)
    current_no = 0 if current_no < 0 else current_no
    data.append(current_no)
    data.append(dq_method)
    print(f"sendtoken: {data}")
    tokenlist.clear()
    print(f"sendtoken: {data}")
    return jsonify(data)


# retrieve validated data
@app.route("/validatetoken", methods=["POST"])
def validate():
    global selected_user
    # retrieving data from brandon, commented because i m using dummy data
    request_data = json.loads(request.get_json())
    print(f"requested data: {request_data}")

    token = request_data["to_requeue"]
    for t in token:
        tokenlist.append(t)
    choosen = request_data["can_process"]
    for c in choosen:
        selected_user = list(set(selected_user + [c]))
    print(f"SELECTED USER: {selected_user}")
    return jsonify("received data")


# randomly cheeck user out every 5 second
@app.route("/checkout", methods=["GET"])
def checkout_user():
    randomnum = random.randint(0, max_cap - 1)
    selected_user.pop(randomnum) if selected_user else None
    print(selected_user)


sched = BackgroundScheduler(daemon=True)
# sched.add_job(checkout_user, "interval", seconds=5)
sched.start()


app.run(debug=True, host="0.0.0.0", port=5000)
