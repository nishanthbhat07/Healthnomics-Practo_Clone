
from flask import Flask, render_template, request, Response, jsonify, Blueprint
import pymongo
from flask_cors import CORS

from users import users_api
from appointments import appointments_api
from consultations import consultations_api
from doctors import doctors_api

from dotenv import dotenv_values

app = Flask(__name__)
CORS(app)
app.register_blueprint(appointments_api)
app.register_blueprint(users_api)
app.register_blueprint(consultations_api)
app.register_blueprint(doctors_api)
config=dotenv_values('.env')

mongoURI = "mongodb+srv://admin:4WWOvl2I5rAYlWe2@practocluster.ducbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client = pymongo.MongoClient(mongoURI)
db = client.Practo

app.route('/', methods = ["GET"])
def home():
	return "Hello Welcome to Practo App"

if __name__ == "__main__":
	app.run(debug=True)