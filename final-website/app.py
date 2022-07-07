from flask import Flask, render_template, url_for, redirect, request, jsonify
import random
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)

tokenlist1=['3','32','apple','1']
tokenlist =[]
selected_user=['apple', 'banana', 'cherry','1', '5', '7', '9', '3']
max_cap = 10
approved=[]
invalid=[]
dq_method=0

# @app.route("/")
# def home():
#     return render_template("main.html"), {"Refresh": "3; redirect"}

@app.route("/success/")
def success():
    return render_template("success.html",)

@app.route("/fail/")
def fail():
    return render_template("invalid.html")

# GET token and save in list
@app.route("/gettoken")
def gettoken():
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
    current_no = max_cap-len(selected_user)
    data.append(current_no)
    # tokenlist1 =tokenlist
    data.append(dq_method)
    tokenlist.clear()
    return jsonify(data)


# retrieve validated data
@app.route("/validatetoken", methods=["POST"])
def validate():
    #retrieving data from brandon, commented because i m using dummy data
    # request_data = json.loads(request.get_json())
    # print(request_data)
    # token = str(request_data["token"])
    # tokenlist.append(token)
    # global result
    # result = str(request_data["result"])
    # choosen= str(request_data["choosen"])
    # selected_user.append(choosen)
    return jsonify("received data")

#validate and splitdata and redirection decision
@app.route('/redirect/<token>')
def results(token):
    for x in range(len(tokenlist1)):
        if tokenlist1[x] in selected_user:
            print("token "+ str(tokenlist1[x])+" valid")
            approved.append(tokenlist1[x])
            print(approved)
        else:
            print("token "+str(tokenlist1[x])+" invalid")
            invalid.append(tokenlist1[x])
    print(approved)
    print(token)
    result=""
    if token in approved:
        result='success'
    else:
        result='fail'
    return redirect(url_for(result))

# randomly cheeck user out every 5 second
def checkout_user():
    randomnum = random.randint(0,max_cap-1)
    selected_user.pop(randomnum) if selected_user else None
    print(selected_user)

sched = BackgroundScheduler(daemon=True)
sched.add_job(checkout_user,'interval',seconds=5)
sched.start()


app.run(debug=True)
