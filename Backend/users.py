from flask import Flask, render_template, request, Response, jsonify, Blueprint
from bson import json_util
import json
users_api = Blueprint('users_api', __name__)

@users_api.route('/users/signup', methods=["POST"])
def signup():
    
    import app
    form = request.json

    UserID = form["UserID"]
    Username = form["Username"]
    PhoneNumber = form["PhoneNumber"]
    EmailID = form["EmailID"]
    
    users = app.db['user']
    if not users.find_one({"EmailID":EmailID}):
        
        new_user = {
            'UserID':UserID,
            'Username':Username,
            'PhoneNumber':PhoneNumber,
            'EmailID':EmailID,
        }
        
        users.insert_one(new_user)
        return jsonify(success = True)
    
    return jsonify(success = False)


@users_api.route('/users/details', methods=["POST"])
def details():
    import app
    form = request.json

    UserID = form["UserID"]
    users = app.db['user']
    
    if not users.find_one({"UserID": UserID}):
        return Response("{'Error':'UserID not Found'}", status=404, mimetype='application/json')
    
    user = users.find_one({"UserID": UserID})
    return json.loads(json_util.dumps(user))

@users_api.route('/users/update', methods=["POST"])
def update():
    
    import app
    form = request.json

    UserID = str(form["UserID"])
    Username = str(form["Username"])
    PhoneNumber = str(form["PhoneNumber"])
    EmailID = str(form["EmailID"])
    Age = str(form["Age"])

    users = app.db['user']
    
    if not users.find_one({'UserID' : UserID}):
        return Response("{'Error' : 'UserID not Found'}", status=404, mimetype='application/json')
    
    filter_condition = {'UserID' : UserID}
    new_val = {'$set' : {
        'UserID' : UserID,
        'Username' : Username,
        'PhoneNumber' : PhoneNumber,
        'EmailID' : EmailID,
        "Age" : Age
        }}
    
    users.update_one(filter_condition, new_val)
    
    return jsonify(success=True)

@users_api.route('/users/appointments', methods=["POST"])
def appointments():
    
    import app
    form = request.json

    UserID = form["UserID"]
    users = app.db['user']
    
    appointments = app.db['appointments']
    
    if not users.find_one({'UserID':UserID}):
        return Response("{'Error' : 'UserID not Found'}", status=404, mimetype='application/json')

    user_appointments = appointments.find({'UserID':UserID})
    
    clinics = app.db["Clinics"]
    records = []
    for item in user_appointments:
        clinic_id = item["ClinicID"]
        item["ClinicName"] = clinics.find_one({'ClinicID':str(clinic_id)})["ClinicName"]
        records.append(json.loads(json_util.dumps(item)))

    return jsonify(records)

@users_api.route('/users/consultations', methods=["POST"])
def consultations():
    import app
    form = request.json

    UserID = form["UserID"]
    users = app.db['user']
    
    consultations = app.db['consultations']
    
    if not users.find_one({'UserID':UserID}):
        return Response("{'Error' : 'UserID not Found'}", status=404, mimetype='application/json')

    user_consultations = consultations.find({'UserID':UserID})
    
    doctors = app.db["doctors"]
    records = []
    for item in user_consultations:
        doctor_id = item["DoctorID"]
        item["DoctorName"] = doctors.find_one({'DoctorID':str(doctor_id)})["DoctorName"]
        records.append(json.loads(json_util.dumps(item)))
    
    return jsonify(records)
