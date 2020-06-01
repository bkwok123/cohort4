import os
import traceback
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import json
import generateExInv
from pathlib import Path

app = Flask(__name__)
app.secret_key = os.urandom(16) # Requires for session to encryt and decryt cookie
CORS(app, supports_credentials=True)

# Define global variables for each point to use
dirpath = Path("C:/code/cohort4/python-Excel/template")
infile = os.path.join(dirpath, "Merge_template.xlsx")
wb = {}

#################################################################
# Exercise - Using basic flask just dump the contents 
#            to the browser in a very simple dump
#################################################################  
@app.route("/dump")
def dump():	

    global wb    

    return f"<h1>Simple Dumping</h1> {wb}"

#################################################################
# Exercise - Use a flask template that loops through the 
#            data and displays into the browser 
#################################################################  
@app.route("/template")
def template():

    global wb

    return render_template("display.html", result = wb)

# To inject new variables automatically into the context of a template
@app.context_processor
def inject_title():
    return dict(title="Invoice Workbook")    

#################################################################
# Exercise - Create an API to send a JSON document 
#            to a React frontend (SPA)
#################################################################  
# Set default service as API method
@app.route("/")
@app.route("/api", methods = ['GET'])
def api():
    global wb

    return jsonify(list(wb.items())), 200

if __name__ == '__main__':
    print("--- Starting", __file__)    

    wb = generateExInv.validateInvInput(dirpath, infile)

    app.run(debug=True, use_reloader=True, port=5000)    