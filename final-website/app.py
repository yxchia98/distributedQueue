from flask import Flask, render_template, url_for, redirect,request,jsonify
import random
import time
app = Flask(__name__)

tokenlist=[]
@app.route('/')
def home():
    return render_template('main.html'),{"Refresh": "3; redirect"}

# GET token and save in list
@app.route('/gettoken')
def gettoken():
    # if key doesn't exist, returns None
    token = request.args.get('token')
    tokenlist.append(token)
    return '''
              <h1>The token is: {}</h1>'''.format(token)

#send token for validation
@app.route('/sendtoken', methods=['GET'])
def starting_url():
    return jsonify(tokenlist)

#validate token 
@app.route('/validatetoken', methods=['POST'])
def validate():
    request_data = request.get_json()
    token = request_data['token']
    global result
    result = request_data['result']
    for elem in list(tokenlist):
        if tokenlist[elem] == token:
            tokenlist.remove(elem)
        else:
            return '''
              <h1>error</h1>'''
   


#deicde which site to redirect to
@app.route('/redirect')
def options():
    if result == "True":
        return redirect("/option1")
    else:
        print("hi2")
        return redirect("/option2")
   
@app.route('/option1')
def option1():
    return render_template('success.html')

@app.route('/option2')
def option2():
    return render_template('index.html')




app.run(debug=True)