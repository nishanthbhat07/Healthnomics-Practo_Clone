from flask import Flask, render_template, request, Response, jsonify, Blueprint
import json
from bson import json_util

doctors_api = Blueprint('doctors_api', __name__)

@doctors_api.route('/doctors/consultations', methods = ["POST"])
def consultations():
    import app
    form = request.json

    DoctorID = str(form["DoctorID"])
    doctors = app.db['doctors']
    consultations = app.db['consultations']
    users = app.db['user']

    if not doctors.find_one({'DoctorID' : DoctorID}):
        return Response("{'Error':'DoctorID Details not Found'}", status=404, mimetype='application/json')
    
    doctor_consultations = consultations.find({'DoctorID' : DoctorID})
    
    records = []
    for item in doctor_consultations:
        
        user_id = item["UserID"]
        item["Username"] = users.find_one({'UserID' : user_id})['Username']
        records.append(json.loads(json_util.dumps(item)))
    
    return jsonify(records)





   