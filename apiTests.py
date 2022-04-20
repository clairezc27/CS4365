from http.client import responses
from json import dumps
from app import *
import firebase_admin
from firebase_admin import auth
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, send_from_directory, request, jsonify

# cred = credentials.Certificate('./../Downloads/key.json')

# firebase_admin.initialize_app(cred, {
#     'databaseURL': 'https://my-sous-chef-test-1cae3-default-rtdb.firebaseio.com',
#     'databaseAuthVariableOverride': None
# })

db = firestore.client()

user1 = {
    u"email": "claire@gmail.com",
    u"id": 0,
}
user2 = {
    u"email": "rachel@gmail.com",
    u"id": 1,
}
user3 = {
    u"email": "emma@gmail.com",
    u"id": 2,
}
db.collection(u'users').add(user1)
db.collection(u'users').add(user2)
db.collection(u'users').add(user3)

recipe1 = {
    u"label": "Salmon",
    u"image": "www.img1.com",
    u"url": "www.recipe1.com",
}

recipe2 = {
    u"label": "Grilled Cheese",
    u"image": "www.img2.com",
    u"url": "www.recipe3.com",
}

recipe3 = {
    u"label": "Pad Thai",
    u"image": "www.img3.com",
    u"url": "www.recipe3.com",
}

recipe4 = {
    u"label": "Pancakes",
    u"image": "www.img4.com",
    u"url": "www.recipe4.com",
}

recipe5 = {
    u"label": "Chicken",
    u"image": "www.img5.com",
    u"url": "www.recipe5.com",
}

recipe6 = {
    u"label": "Ramen",
    u"image": "www.img6.com",
    u"url": "www.recipe6.com",
}

recipe7 = {
    u"label": "Tacos",
    u"image": "www.img7.com",
    u"url": "www.recipe7.com",
}

recipe8 = {
    u"label": "Salad",
    u"image": "www.img8.com",
    u"url": "www.recipe8.com",
}

recipe9 = {
    u"label": "Salmon",
    u"image": "www.img9.com",
    u"url": "www.recipe9.com",
}
BASE_URL = 'http://localhost:5000/apis'
SEARCH_URL = '${BASE_URL}/search-recipe'
FILTER_URL = '${BASE_URL}/add-filters'
FAV_URL = '${BASE_URL}/add-fav'
LOGIN_URL = '${BASE_URL}/login'
FETCH_FAVS_URL = '${BASE_URL}/fetch-favs'
UNFAV_URL = '${BASE_URL}/unfav'
SAVE_URL = '${BASE_URL}/save'
FETCH_SAVED_URL = '${BASE_URL}/fetch-saved'
COMPLETE_URL = '${BASE_URL}/complete'
FETCH_COMPLETED_URL = '${BASE_URL}/fetch-completed'
UNSAVE_URL = '${BASE_URL}/unsave'

headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
}

def test_login():
    payload = dumps({
        'email': user1['email']
    })
    resp = requests.post(url=LOGIN_URL, data=payload, headers=headers)
    assert resp.status_code == 200
    assert resp == user1

def test_add_fav():
    payload = dumps({
        'email': user1['email'],
        'label': recipe1['label'],
        'image': recipe1['image'],
        'url': recipe1['url'],
    })
    resp = requests.post(url=FAV_URL, data=payload, headers=headers)
    assert resp.status_code == 200
    assert resp == recipe1

def test_fetch_favs():
    db.collection(u'favorites').document(user1['id']).collection('fav_list').add(recipe2)
    db.collection(u'favorites').document(user1['id']).collection('fav_list').add(recipe3)
    payload = dumps({
        'email': user1['email']
    })
    resp = requests.post(url=FETCH_FAVS_URL, data=payload, headers=headers)
    assert resp.status_code == 200
    assert resp == [recipe1, recipe2, recipe3]

def test_unfav():
    payload = dumps({
        'email': user1['email'],
        'label': recipe1['label'],
        'image': recipe1['image'],
        'url': recipe1['url'],
    })
    resp = requests.post(url=UNFAV_URL, data=payload, headers=headers)
    assert resp.status_code == 200
    assert resp == [recipe2, recipe3]

def test_search():
    payload = dumps({
        'ingdts': ['beef', 'onion', 'cheese'],
    })
    resp = requests.post(url=SEARCH_URL, data=payload, headers=headers)
    assert resp.status_code == 200

def test_filter():
    payload = dumps({
        'ingdts': ['beef', 'onion', 'pepper'],
        'cuisine': 'Chinese',
        'mealType': 'lunch',
        'diet': 'balanced',
        'health': 'uten-free',
    })
    resp = requests.post(url=SEARCH_URL, data=payload, headers=headers)
    assert resp.status_code == 200

def test_save():
    payload = dumps({
        'email': user1['email'],
        'label': recipe4['label'],
        'image': recipe4['image'],
        'url': recipe4['url'],
    })
    resp = requests.post(url=SAVE_URL, data=payload, headers=headers)
    assert resp.status_code == 200
    assert resp == recipe4

def test_fetch_saved():
    db.collection(u'saved').document(user1['id']).collection('save_list').add(recipe5)
    db.collection(u'saved').document(user1['id']).collection('save_list').add(recipe6)
    payload = dumps({
        'email': user1['email']
    })
    resp = requests.post(url=FETCH_SAVED_URL, data=payload, headers=headers)
    assert resp.status_code == 200
    assert resp == [recipe4, recipe5, recipe6]

def test_unsave():
    payload = dumps({
        'email': user1['email'],
        'label': recipe5['label'],
        'image': recipe5['image'],
        'url': recipe5['url'],
    })
    resp = requests.post(url=UNSAVE_URL, data=payload, headers=headers)
    assert resp.status_code == 200
    assert resp == [recipe4, recipe6]

def test_complete():
    payload = dumps({
        'email': user1['email'],
        'label': recipe7['label'],
        'image': recipe7['image'],
        'url': recipe7['url'],
    })
    resp = requests.post(url=COMPLETE_URL, data=payload, headers=headers)
    assert resp.status_code == 200
    assert resp == recipe7

def test_fetch_complete():
    db.collection(u'completed').document(user1['id']).collection('complete_list').add(recipe8)
    db.collection(u'completed').document(user1['id']).collection('complete_list').add(recipe9)
    payload = dumps({
        'email': user1['email']
    })
    resp = requests.post(url=FETCH_COMPLETED_URL, data=payload, headers=headers)
    assert resp.status_code == 200
    assert resp == [recipe7, recipe8, recipe9]

