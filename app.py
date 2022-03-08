from flask import Flask, send_from_directory, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.ApiHandler import HelloApiHandler
# from firebase import Firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import requests

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)
cred = credentials.Certificate('key.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://my-sous-chef-1cae3-default-rtdb.firebaseio.com',
    'databaseAuthVariableOverride': None
})

@app.route('/apis/search-recipe', methods=['POST'])
def store_user():
    id = "7cd1c1c9"
    key = "ecc4ac78af2cff499bedb3fbce0aafa1"
    ingdts = request.get_json()['ingdts']
    
    url = "https://api.edamam.com/api/recipes/v2?type=public&q=${ingdts}&app_id=${key}&app_key=${key}"
    response = requests.get(url)
    return response.json()