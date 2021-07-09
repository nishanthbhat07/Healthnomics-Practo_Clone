from flask import Flask, render_template, request, Response, jsonify, Blueprint
import json
import datetime
from bson import json_util

appointments_api = Blueprint('appointments_api', __name__)

@appointments_api.route('/appointments/search', methods=["POST"])
def search():
    
    import app
    
    form = request.json

    Location = form["Location"].strip().lower()
    SearchQuery = form["SearchQuery"].strip().lower()
    SearchType = form["SearchType"].strip().split("&")
    
    clinics = app.db['Clinics']
    speciality_name = app.db['speciality_name']
    speciality_clinic = app.db['speciality_clinic']

    # Search Clinics
    if 'CN' in SearchType or "CS" in SearchType:

        clinics_list = list()
        
        # Search Clinics by Clinic Name
        if "CN" in SearchType:
            
            clinic_results = clinics.find({'Location':{'$regex': Location}, "ClinicName": {'$regex': SearchQuery}})
            
            for clinic in clinic_results:
                clinics_list.append(json.loads(json_util.dumps(clinic)))

        # Search Clinics by Clinic Speciality
        if "CS" in SearchType:
            
            specialityID = speciality_name.find_one({'SpecialityName':{'$regex':SearchQuery}})
        
            if not specialityID:
                
                specialityID = "<<NULL>>"
            else:
                specialityID = specialityID["SpecialityID"]
                
            clinic_ids = set([item["ClinicID"] for item in speciality_clinic.find({'SpecialityID':{'$regex':specialityID}})])
            # print(clinic_ids)

            for clinic_id in clinic_ids:
                clinic_temp = clinics.find_one({"ClinicID":clinic_id, "Location":{'$regex':Location}})
                if clinic_temp is not None:
                    clinics_list.append(json.loads(json_util.dumps(clinic_temp)))
        
        return_json = {}
        # print(clinics_list)
        for id, clinic in enumerate(clinics_list):
            return_json['Clinic' + str(id)] = clinic

    return jsonify(return_json)

@appointments_api.route('/appointments/checkslot', methods=["POST"])
def checkslot():
    import app
    
    form = request.json
    ClinicID = str(form["ClinicID"])
    DateDiff = str(form["DateDiff"]) #0 for today, 1 for tom, ... , 6 for 7 days later.
    TimeSlot = int(form["TimeSlot"])
    
    clinic_timings = app.db['clinic_timings']
    timings = clinic_timings.find_one({'ClinicID':ClinicID})[f'T{DateDiff}']
    
    if timings[TimeSlot] == '0':
        return jsonify({'SlotAvailable':True})
    
    return jsonify({'SlotAvailable':False})


@appointments_api.route('/appointments/bookslot', methods=["POST"])
def bookslot():
    import app
    
    form = request.json
    
    UserID = form["UserID"]
    SpecialityID = form["SpecialityID"]
    ClinicID = str(form["ClinicID"])
    DateDiff = str(form["DateDiff"]) #0 for today, 1 for tom, ... , 6 for 7 days later.
    TimeSlot = int(form["TimeSlot"])
    
    users = app.db['user']
    clinic_timings = app.db['clinic_timings']

    if not users.find_one({"UserID": UserID}):
        return Response("{'Error':'UserID not Found'}", status=404, mimetype='application/json')

    old_string = clinic_timings.find_one({'ClinicID':ClinicID})[f'T{DateDiff}']
    
    if old_string[TimeSlot] == '1':
        return jsonify("Slot Already Booked")
    
    new_string = old_string[:TimeSlot] + '1' + old_string[TimeSlot + 1:]
    
    filter_condition = {'ClinicID' : ClinicID}
    new_val = {'$set' : {f'T{DateDiff}' : new_string}}
    clinic_timings.update_one(filter_condition, new_val)
    
    today = datetime.date.today()
    day_datediff = str(today + datetime.timedelta(days = int(DateDiff)))
    
    appointments = app.db['appointments']
    
    count=appointments.find().count()
    appointments.insert_one({
        "AppointmentID" :str(count+1),
        'UserID' : UserID, 
        'ClinicID' : ClinicID, 
        "BookingDay" : day_datediff,
        'BookingTime' : str(TimeSlot),
        'SpecialityID' : SpecialityID,
        'BookingStatus' : 'B'
        })
        
    return jsonify(success=True)

@appointments_api.route('/appointments/cancel', methods=["POST"])
def cancel():
    import app
    
    
    form = request.json
    
    print(form)
    AppointmentID = str(form["AppointmentID"])

    appointments = app.db['appointments']
    clinic_timings=app.db['clinic_timings']

    appointment = appointments.find_one({'AppointmentID':AppointmentID})
    print(appointment)
    time = int(appointment['BookingTime'])
    datediff = str(datetime.datetime.strptime(appointment['BookingDay'], '%Y-%m-%d').date()  - datetime.date.today())
    old_string = clinic_timings.find_one({'ClinicID':appointment['ClinicID']})[f'T{datediff[0]}']

    new_string = old_string[:time] + '0' + old_string[time + 1:]
    
    filter_condition = {'ClinicID' : appointment['ClinicID']}
    new_val = {'$set' : {
        f'T{datediff[0]}': new_string
        }}
    
    clinic_timings.update_one(filter_condition, new_val)

    filter_condition1 = {'AppointmentID' : AppointmentID}
    new_val1 = {'$set' : {
        "BookingStatus": 'C'
        }}
    appointments.update_one(filter_condition1, new_val1)
    return jsonify(success=True)