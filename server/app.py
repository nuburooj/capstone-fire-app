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
                email=json['email'],
                user_picture=json['user_picture'],
                Socials=json['Socials']
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


allowed_endpoints = ['signup', 'login', 'check_session', 'genres', 'songs', 'song_by_id', 'genre_by_id', 'logout', 'users', 'user_by_id', 'comments', 'comment_by_id', 'comments_by_songs']
@app.before_request
def check_if_logged_in():
    if not session.get('user_id') and request.endpoint not in allowed_endpoints:
        return {'error': 'Unauthorized'}, 401


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


#Get All Users
@app.route('/users', methods=['GET', 'POST'])
def users():
        if request.method == 'GET':

            users = User.query.all()
            users_dict = [user.to_dict() for user in users]

            response = make_response(
                users_dict,
                200
            )
        
        elif request.method == "POST":
            new_user = User(
                username=request.json['username'],
                email=request.json['email'],
                user_picture=request.json['user_picture'],
                Socials=request.json['Socials']
            )
            new_user.password_hash = request.json['password']
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id

            response = make_response(
                new_user.to_dict(),
                200
            )
            
        else:
            response = make_response(
                {'message': 'Method is not working'},
                405
            )

        return response


#Get Users by ID
@app.route('/users/<int:id>', methods=['GET', 'PATCH'])
def user_by_id(id):
    user = User.query.filter(User.id == id).first()
    if user:
        if request.method == 'GET':

            user_dict = user.to_dict()

            response = make_response(
                user_dict,
                200
            )

        elif request.method == 'PATCH':
            try:
                form_data = request.get_json()


                for attr in form_data:
                    setattr(user, attr, form_data[attr])

                db.session.commit()

                response = make_response(
                    user.to_dict(),
                    202
                )
            except ValueError:
                response = make_response(
                    {'errors': ['Validation Errors']},
                    400
                )

        return response



#Get All songs
@app.route('/songs', methods=['GET', 'POST'])
def songs():
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
            upload_file = request.json['upload_file'],
            artist_id = request.json['artist_id'],
            
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
            #FUTURE COMMENT CASCADE 
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
    

    #Get All Genre Routes
@app.route('/genres', methods=['GET', 'POST'])
def genres():
    
    if request.method == 'GET':
    
        genres_list = [genre.to_dict() for genre in Genre.query.all()]
        response = make_response(genres_list, 200)

    elif request.method == 'POST':
        new_genre = Genre(
            genre_name = request.json['genre_name'],
            genre_description = request.json['genre_description'],
            
        )
        db.session.add(new_genre)
        db.session.commit()
        response = make_response(new_genre.to_dict(), 201)
    else:
        response = make_response({'message': 'Method not allowed'}, 405)
    
    return response

#Get Genre By ID
@app.route('/genres/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def genre_by_id(id):
    genre = Genre.query.filter(Genre.id == id).first()
    if genre:
        if request.method == 'GET':
            genre_dict = genre.to_dict()

            response = make_response(genre_dict, 200)

        elif request.method == 'PATCH':
            
            try:
                form_data = request.get_json()

                for attr in form_data:
                    setattr(genre, attr, form_data[attr])

                db.session.commit()

                response = make_response(genre.to_dict(), 202)

            except ValueError:
                response = make_response({'errors': ['Validation Errors']}, 400)

        elif request.method == 'DELETE':

            assoc_songs = Song.query.filter(Song.genre_id == id).all()
            for assoc_song in assoc_songs:
                db.session.delete(assoc_song)

                db.session.delete(genre)

                db.session.commit()
                response = make_response({}, 204)

            #FUTURE COMMENT CASCADE
            # assoc_comments = Comment.query.filter(Comment.song_id == id).all()
            # for assoc_comment in assoc_comments:
            #     db.session.delete(assoc_comment)

            #     db.session.delete(genre)

            #     db.session.commit()
            #     response = make_response({}, 204)
                
            db.session.delete(genre)
            db.session.commit()
            response = make_response('', 204)
    else:
        response = make_response(
            {'message': 'Method not allowed'}, 405
        )
    return response


# Get All Songs By Genre

@app.route('/genres/<int:id>/songs', methods=['GET'])
def songs_by_genre(id):
    genre = Genre.query.filter(Genre.id == id).first()
    if genre:
        song_list = [song.to_dict() for song in Song.query.filter(Song.genre_id == id).all()]
        response = make_response(song_list, 200)
    else:
        response = make_response(
            {'message': 'Method not allowed'}, 405
        )
    return response


#Get All Comments
@app.route('/comments', methods=['GET', 'POST'])
def comments():
    if request.method == 'GET':
    
        comment_list = [comment.to_dict() for comment in Comment.query.all()]
        response = make_response(comment_list, 200)

    elif request.method == 'POST':
        new_comment = Comment(
            comment_description = request.json['comment_description'],
            user_id = request.json['user_id'],
            song_id = request.json['song_id'],
            
        )
        db.session.add(new_comment)
        db.session.commit()
        response = make_response(new_comment.to_dict(), 201)
    else:
        response = make_response({'message': 'Method not allowed'}, 405)
    
    return response

#Get Comments By ID
@app.route('/comments/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def comment_by_id(id):
    comment = Comment.query.filter(Comment.id == id).first()
    if comment:
        if request.method == 'GET':
            comment_dict = comment.to_dict()

            response = make_response(comment_dict, 200)
        elif request.method == 'PATCH':
            
            try:
                form_data = request.get_json()

                for attr in form_data:
                    setattr(comment, attr, form_data[attr])

                db.session.commit()

                response = make_response(comment.to_dict(), 202)
            except ValueError:
                response = make_response({'errors': ['Validation Errors']}, 400)
        elif request.method == 'DELETE':
            
            db.session.delete(comment)
            db.session.commit()
            response = make_response('', 204)
    else:
        response = make_response(
            {'message': 'Method not allowed'}, 405
        )
    return response

#GET ALL COMMENTS BY SONG

@app.route('/songs/<int:id>/comments', methods=['GET'])
def comments_by_songs(id):
    song = Song.query.filter(Song.id == id).first()
    if song:
        comment_list = [comment.to_dict() for comment in Comment.query.filter(Comment.song_id == id).all()]
        response = make_response(comment_list, 200)
    else:
        response = make_response(
            {'message': 'Method not allowed'}, 405
        )
    return response


if __name__ == '__main__':
    app.run(port=5555, debug=True)

