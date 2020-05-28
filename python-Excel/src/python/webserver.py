import os
import traceback
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import json
import generateExInv
from pathlib import Path

app = Flask(__name__)
app.secret_key = os.urandom(16)
CORS(app, supports_credentials=True)

# Define global variables for each point to use
dirpath = Path("C:/code/cohort4/python-Excel/template")
infile = os.path.join(dirpath, "Merge_template.xlsx")
wb = None

@app.route("/dump")
def dump():	

    global wb    

    return f"<h1>Simple Dumping</h1> {wb}"

@app.route("/template")
def template():

    global wb

    return render_template("display.html", result = wb)

if __name__ == '__main__':
    print("--- Starting", __file__)    

    wb = generateExInv.validateInvInput(dirpath, infile)

    app.run(debug=True, use_reloader=True, port=5000)    