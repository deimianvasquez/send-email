"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException, send_email
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import cloudinary.uploader as uploader
from base64 import b64encode


api = Blueprint('api', __name__)


def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")


def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")


# Allow CORS requests to this API
CORS(api)


@api.route("/register", methods=["POST"])
def register_user():
    data_file = request.files
    data_form = request.form

    data = {
        "lastname":data_form.get("lastname"),
        "email": data_form.get("email"),
        "password": data_form.get("password"),
        "avatar":data_file.get("avatar")
    }

    user = User.query.filter_by(email=data.get("email")).one_or_none()
    if user is not None:
        return jsonify({"message":"the user exists"}), 400

    else:
        salt = b64encode(os.urandom(32)).decode("utf-8")
        data.update({"salt":salt})
        data.update({"password": set_password(data.get("password"), salt)})
    
    if data.get("avatar"):

        result_avatar = uploader.upload(data.get("avatar"))

        data.update({"avatar":result_avatar.get("secure_url")})
        data.update({"public_id_avatar":result_avatar.get("public_id")})

    user = User(
        email=data.get("email"), 
        lastname=data.get("lastname"),
        password=data.get("password"),
        avatar=data.get("avatar"),
        salt=data.get("salt"),
        public_id_avatar=data.get("public_id_avatar")
        )
    db.session.add(user)

    try:
        db.session.commit()
        return jsonify({"message":"user register success"}),201
    except Exception as error:
        print(error)
        return jsonify({"message":"error al registrar el usuario"}), 500
    

@api.route("/login", methods=["POST"])
def handle_login():
    body = request.json
    email = body.get("email")
    password = body.get("password")

    if email is None or password is None:
        return jsonify({"message":"You need email and password"}), 400
    else:
        user = User.query.filter_by(email=email).one_or_none()
        if user is None:
            return jsonify({"message":"Bad credentials"}), 400
        else:
            if check_password(user.password, password, user.salt):
                # le pasasmos un diccionario con lo necesario
                # OJO no se puede pasar informacion sencible por seguridad
                token = create_access_token(identity={
                    "user_id":user.id,
                    "rol":"general"
                })
                return jsonify({"token":token}), 200
            else:
                return jsonify({"message":"Bad credentials"}), 400


@api.route("/reset-password", methods=["POST"])
def reset_password():
    body = request.json
    
    data = {
        "subject":body["subject"],
        "to":body["to"],
        "message":body["message"]
    }

    sended_email = send_email(data.get("subject"),data.get("to"), data.get("message"))
    print("me ejecuto en el endpoint")
    print(sended_email)

  

    return jsonify({"message":"Trabajando en ello"}), 200

    # result =email_send("reset password", body, "ingresa a este link para recuperar la contraseña hola https://ominous-yodel-v5p54wg6w2qrg-3000.app.github.dev/")

    # if result == True:
    #     return jsonify("se envio mensaje"), 200
    
    # else:
    #     return jsonify("fallo mensaje"), 500