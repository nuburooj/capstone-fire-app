from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique = True, nullable = False)
    email = db.Column(db.String, unique = True, nullable = False)
    _password_hash = db.Column(db.String)
    user_picture = db.Column(db.String)
    Socials = db.Column(db.String)

    def __repr__(self):
        return f'User: {self.username}, Email: {self.email}, Picture: {self.user_picture}'

    #SERIALIZE RULES
    serialize_rules = ('-_password_hash', '-songs.user' )

    #RELATIONSHIPS
    songs = db.relationship('Song', back_populates = 'user')

    #USER validations
    @hybrid_property
    def password_hash(self):
        raise Exception("Password hashes may not be viewed.")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    

    
    @validates('username')
    def validate_username(self, key, value):

        if not isinstance(value, str) and len(value) == 0:
            raise ValueError('Username needs to be a non-empty string.')
        
        elif User.query.filter_by(username = value).first() is not None:
            raise ValueError('Username already exists.')
        
        return value
    
    @validates('email')
    def validate_email(self, key, value):

        if not isinstance(value, str):
            raise ValueError('Email must be a string.')
        
        elif len(value) == 0 or '@' not in value:
            raise ValueError('Must be a valid email address')
        
        elif User.query.filter_by(email = value).first() is not None:
            raise ValueError('Email provided is already taken')
        
        return value
    
    @validates('password')
    def validate_password(self, key, value):
        if not isinstance(value, str) and len(value) == 0:
            raise ValueError('Password needs to be a non-empty string')

    @validates('user_picture')
    def validate_user_picture(self, key, value):
        if not isinstance(value, str) and len(value) == 0:
            raise ValueError('User_picture must be a non-emty string')
        return value
    
    @validates('Socials')
    def validate_Socials(self, key, value):
        if not isinstance(value, str) and len(value) == 0:
            raise ValueError('Spotify link must be a non-emty string')
        return value

class Song(db.Model, SerializerMixin):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key = True)
    song_title = db.Column(db.String)
    song_description = db.Column(db.String)
    song_artwork = db.Column(db.String)
    upload_file = db.Column(db.String)
    artist_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'))


    def __repr__(self):
        return f'Title: {self.song_title}, Description: {self.song_description}, Album Art: {self.song_artwork}'
    
    #RELATIONSHIPS
    user = db.relationship('User', back_populates = 'songs')
    genres = db.relationship('Genre', back_populates = 'songs')

    #SERIALIZATION RULES
    serialize_rules = ('-user.songs', '-genres.songs' )

    
    #VALIDATIONS

    @validates('song_title')
    def validate_song_title(self, key, value):
        if not isinstance(value, str) and len(value) == 0:
            raise ValueError('Song_title must be a non-emty string')
        return value
    
    @validates('song_description')
    def validate_song_description(self, key, value):
        if not isinstance(value, str) and len(value) == 0:
            raise ValueError('Song_description must be a non-emty string')
        return value
    
    @validates('song_artwork')
    def validate_song_artwork(self, key, value):
        if not isinstance(value, str) and len(value) == 0:
            raise ValueError('artwork must be a non-emty string')
        return value
    
    @validates('upload_file')
    def validate_upload_file(self, key, value):
        if not isinstance(value, str) and len(value) == 0:
            raise ValueError('Song_file must be a non-emty string')
        return value


class Genre(db.Model,SerializerMixin):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key = True)
    genre_name = db.Column(db.String)
    genre_description = db.Column(db.String)
    

    def __repr__(self):
        return f'Title: {self.genre_name}, Description: {self.genre_description}'
    
    #RELATIONSHIPS
    songs = db.relationship('Song', back_populates = 'genres')

    #SERIALIZE RULES
    serialize_rules = ('-songs.genres', )

    #VALIDATIONS

    @validates('genre_name')
    def validate_genre_name(self, key, value):
        if not isinstance(value, str) and len(value) == 0:
            raise ValueError('genre_name must be a non-emty string')
        return value
    
    @validates('genre_description')
    def validate_genre_description(self, key, value):
        if not isinstance(value, str) and len(value) == 0:
            raise ValueError('genre_description must be a non-emty string')
        return value