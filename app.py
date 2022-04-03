from flask import Flask, send_from_directory, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.ApiHandler import HelloApiHandler
# from firebase import Firebase
import firebase_admin
from firebase_admin import auth
from firebase_admin import credentials
from firebase_admin import firestore
# from firebase_admin import db
import requests
import json

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)
cred = credentials.Certificate('./../Downloads/key.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://my-sous-chef-1cae3-default-rtdb.firebaseio.com',
    'databaseAuthVariableOverride': None
})

db = firestore.client()

@app.route('/apis/search-recipe', methods=['POST'])
def search():
    ingdts = request.get_json()['ingdts'] 
    url = "https://api.edamam.com/api/recipes/v2?type=public&&app_id=7cd1c1c9&app_key=ecc4ac78af2cff499bedb3fbce0aafa1&random=true&q="
    url += ingdts
    response = requests.get(url)
    return response.json()

@app.route('/apis/add-filters', methods=['POST'])
def filter():
    ingdts = request.get_json()['ingdts']
    cuisine = request.get_json()['cuisine']
    meal_type = request.get_json()['mealType']
    url = "https://api.edamam.com/api/recipes/v2?type=public&&app_id=7cd1c1c9&app_key=ecc4ac78af2cff499bedb3fbce0aafa1&random=true&q="
    url += ingdts

    if cuisine != "":
        url += "&cuisineType=" + cuisine
    if meal_type != "":
        url += "&mealType=" + meal_type
    response = requests.get(url)
    return response.json()

@app.route('/apis/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    result = db.collection(u'users').where(u'email', u'==', email).stream()
    length = len(list(result))
    if length > 0:
        print("already exists")
        return {}

    ref = db.collection(u'users')
    query = ref.order_by(
        u'id', direction=firestore.Query.DESCENDING).limit(1)
    results = query.stream()
    for doc in results:
        response = str(doc.to_dict())
        response = response.replace("\'", "\"")
        load = json.loads(response)
        id = int(load["id"]) + 1
    print(id)
    
    new_user = {
        u"email": email,
        u"id": id,
    }
    db.collection(u'users').add(new_user)
    return new_user

@app.route('/apis/add-fav', methods=['POST'])
def add_fav():
    email = request.get_json()['email']
    result = db.collection(u'users').where(u'email', u'==', email).stream()
    id = -1
    for doc in result:
        response = str(doc.to_dict())
        response = response.replace("\'", "\"")
        load = json.loads(response)
        id = str(int(load["id"]))

    label = request.get_json()['label']
    image = request.get_json()['image']
    url = request.get_json()['url']
    data = {
        u"label": str(label),
        u"image": str(image),
        u"url": str(url),
    }

    db.collection(u'favorites').document(id).collection('fav_list').add(data)
    return data