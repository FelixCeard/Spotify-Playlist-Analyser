from math import log
from flask import Flask, request, render_template
from spotify import *
import os.path

template_dir = os.path.abspath('static/templates')
static_dir = os.path.abspath('static')

app = Flask('name', template_folder=template_dir, static_folder=static_dir)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/app')
def application():
    return render_template('app.html')

@app.route('/getplaylist')
def generate():
    input_string =  request.args.get('url', default="none", type = str)
    print(input_string)
    if input_string == "none":
        return "{'error 123': 'no string provided, you have to route it to /getplaylist?url=<url>'}"
    else:
        informations = get_playlist_infos(input_string)
        return json.dumps(informations)
@app.route('/favicon.ico')
def icon():
    with open('icon.ico', 'rb') as file:
        return file.read()

app.run()
