#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import *

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if not user:
            return make_response(
                {'error': "Unauthorized: you must be logged in."},
                401
            )
        else:
            return make_response(
                user.to_dict(),
                200
            )
        
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Signup(Resource):
    def post(self):
        json = request.get_json()
        try:
            user = User(
                username=json['username'],
                email=json['email']
            )
            user.password_hash = json['password']
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id

            return make_response(
                user.to_dict(),
                201
            )
        except Exception as e:
            return make_response(
                {'error': str(e) },
                422
            )
        
api.add_resource(Signup, '/signup', endpoint='signup')


class Login(Resource):
    def post(self):
        username = request.get_json()['username']

        user = User.query.filter(User.username == username).first()
        password = request.get_json()['password']

        if not user:
            response_body = {'error': 'User not found.'}
            status = 404

        else:
            if user.authenticate(password):
                session['user_id'] = user.id
                response_body = user.to_dict()
                status = 200
            else:
                response_body = {'error': 'Invalid username or password'}
                status = 401
        
        return make_response(response_body, status)
    
api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204
    
api.add_resource(Logout, '/logout', endpoint='logout')


allowed_endpoints = ['signup', 'login', 'check_session']
@app.before_request
def check_if_logged_in():
    if not session.get('user_id') and request.endpoint not in allowed_endpoints:
        return {'error': 'Unauthorized'}, 401


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'



#Get All songs
@app.route('/songs', methods=['GET', 'POST'])
def threads():
    if request.method == "GET":
        songs = Song.query.all()
        songs_dict =  [song.to_dict() for song in songs]

        response = make_response(
            songs_dict,
            200
        )

    elif request.method == "POST":
        new_song = Song(
            song_title = request.json['song_title'],
            song_description = request.json['song_description'],
            song_artwork = request.json['song_artwork'],
            genre_id = request.json['genre_id'],
            upload_file = request.json['upload_file']
        )

        db.session.add(new_song)
        db.session.commit()

        response = make_response(
            new_song.to_dict(),
            200
        )
    else:
        response = make_response(
            {'message': 'Method is not working'},
            405
        )

    return response


#Get Songs by ID
@app.route('/songs/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def song_by_id(id):
    song = Song.query.filter(Song.id == id).first()
    if song:
        if request.method == 'GET':

            song_dict = song.to_dict()

            response = make_response(
                song_dict,
                200
            )
        elif request.method == 'PATCH':
            try:
                form_data = request.get_json()

                for attr in form_data:
                    setattr(song, attr, form_data[attr])
                
                db.session.commit()

                response = make_response(
                    song.to_dict(),
                    202
                )
            except ValueError:
                response = make_response(
                    {'errors': ['Validation Errors']},
                    400
                )
        elif request.method == 'DELETE':
            # assoc_comments = Comment.query.filter(Comment.song_id == id).all()
            # for assoc_comment in assoc_comments:
            #     db.session.delete(assoc_comment)
            #     db.session.delete(song)

            #     db.session.commit()
            #     response = make_response(
            #         {},
            #         204
            #     )
            db.session.delete(song)
            db.session.commit()
            response = make_response(
                '',
                204
            )
            
        else:
            response = make_response(
                {'message': 'Invalid Method'},
                405
            )

        return response



if __name__ == '__main__':
    app.run(port=5555, debug=True)

