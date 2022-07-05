from flask import Flask, render_template, url_for, redirect
from flask import request
import random
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('main.html')


@app.route('/redirect')
def options():
    option= random.randint(0,10)
    if option%2==0:
        print("hi1") 
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