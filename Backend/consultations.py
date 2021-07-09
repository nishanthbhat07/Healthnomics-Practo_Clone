from flask import Flask, render_template, request, Response, jsonify, Blueprint
import datetime
from bson import json_util
import json
consultations_api = Blueprint('consultations_api', __name__)

@consultations_api.route('/consultations/search', methods=["POST"])
def search():
    import app
    
    form = request.json

    # UserID = form["UserID"]
    SearchQuery = form["SearchQuery"].strip()
    SearchType = form["SearchType"].strip().split("&")

    doctors = app.db['doctors']
    symptom_name = app.db['symptom_name']
    symptom_doctor = app.db['symptom_doctor']
    return_json = {}

    # Search Clinics
    if 'DN' in SearchType or "DS" in SearchType:

        doctor_list = list()

        # Search Clinics by Clinic Name
        if "DN" in SearchType:
            
            doctor_results = doctors.find({'DoctorName':{'$regex': SearchQuery}})
            
            for doctor in doctor_results:
                doctor_list.append(json.loads(json_util.dumps(doctor)))

        # Search Clinics by Clinic Speciality
        if "DS" in SearchType:
            SymptomID = symptom_name.find_one({'SymptomName': {'$regex': SearchQuery}})
            print(SymptomID)
            if not SymptomID:
                SymptomID = "<<NULL>>"
            else:
                SymptomID = SymptomID["SymptomID"]
                
            doctor_ids = set([item["DoctorID"] for item in symptom_doctor.find({'SymptomID': SymptomID})])
            print(doctor_ids)
            for doctor_id in doctor_ids:
                doc_temp = doctors.find_one({"DoctorID": doctor_id})
                if doc_temp is not None:
                    doctor_list.append(json.loads(json_util.dumps(doc_temp)))

        return_json = {}

        for id, doctor in enumerate(doctor_list):
            return_json['Doctor' + str(id)] = doctor

    return jsonify(return_json)


@consultations_api.route('/consultations/checkslot', methods=["POST"])
def checkslot():

    import app
    
    form = request.json
    DoctorID = str(form["DoctorID"])
    DateDiff = str(form["DateDiff"]) #0 for today, 1 for tom, ... , 6 for 7 days later.
    TimeSlot = int(form["TimeSlot"])
    
    doctor_timings = app.db['doctor_timings']
    timings = doctor_timings.find_one({'DoctorID':DoctorID})[f'T{DateDiff}']
    
    if timings[TimeSlot] == '0':
        return jsonify({'SlotAvailable':True})
    
    return jsonify({'SlotAvailable':False})

@consultations_api.route('/consultations/bookslot', methods=["POST"])
def bookslot():
    import app
    
    form = request.json
    UserID = form["UserID"]
    SymptomID = form["SymptomID"]
    DoctorID = str(form["DoctorID"])
    DateDiff = str(form["DateDiff"]) #0 for today, 1 for tom, ... , 6 for 7 days later.
    TimeSlot = int(form["TimeSlot"])
                    
    users = app.db['user']
    doctor_timings = app.db['doctor_timings']
    
    if not users.find_one({"UserID": UserID}):
        return Response("{'Error':'UserID not Found'}", status=404, mimetype='application/json')

    old_string = doctor_timings.find_one({'DoctorID':DoctorID})[f'T{DateDiff}']
    
    if old_string[TimeSlot] == '1':
        return jsonify("Slot Already Booked")
    
    new_string = old_string[:TimeSlot] + '1' + old_string[TimeSlot + 1:]
    
    filter_condition = {'DoctorID' : DoctorID}
    new_val = {'$set' : {f'T{DateDiff}' : new_string}}
    doctor_timings.update_one(filter_condition, new_val)
    
    today = datetime.date.today()
    day_datediff = str(today + datetime.timedelta(days = int(DateDiff)))
    
    consultations = app.db['consultations']
    count=consultations.find().count()
    consultations.insert_one({
        'ConsultationID': str(count+1),
        'UserID' : UserID, 
        'DoctorID' : DoctorID, 
        "BookingDay" : day_datediff,
        'BookingTime' : str(TimeSlot),
        'BookingStatus' : 'B', 
        "SymptomID":SymptomID
        })
        
    return jsonify(success=True)


@consultations_api.route('/consultations/cancel', methods=["POST"])
def cancel():
    import app
    
    form = request.json
    
    ConsultationID = str(form["ConsultationID"])
    consultations=app.db['consultations']
    doctor_timings=app.db['doctor_timings']
    
    consult = consultations.find_one({'ConsultationID':ConsultationID})
    
    time = int(consult['BookingTime'])
    datediff = str(datetime.datetime.strptime(consult['BookingDay'], '%Y-%m-%d').date()  - datetime.date.today())

    
    if not 0 <= datediff <= 6:
        return jsonify({"error":"past consultations cannot be cancelled"}), 405
    
    old_string=doctor_timings.find_one({'DoctorID':consult['DoctorID']})[f'T{datediff[0]}']
    
    new_string = old_string[:time] + '0' + old_string[time + 1:]
    
    filter_condition = {'DoctorID' : consult['DoctorID']}
    new_val = {'$set' : {
        f'T{datediff[0]}': new_string
        }}
    
    doctor_timings.update_one(filter_condition, new_val)

    filter_condition1 = {'ConsultationID' : ConsultationID}
    new_val1 = {'$set' : {
        "BookingStatus": 'C'
        }}
    consultations.update_one(filter_condition1, new_val1)
    
    return jsonify(success=True)

@consultations_api.route('/consultations/setlink', methods=["POST"])
def set_link():
    import app

    form = request.json

    ConsultationID = str(form["ConsultationID"])
    link = str(form["link"])

    if link:
        new_booking_status = 'S'
    else:
        new_booking_status = 'O'

    consultations = app.db['consultations']
    
    filter_condition = {'ConsultationID' : ConsultationID}
    new_val = {'$set' : {"link" : link, "BookingStatus" : new_booking_status}}
    consultations.update_one(filter_condition, new_val)

    return jsonify(success=True)
