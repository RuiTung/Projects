from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager

from db import db
from resources.user import UserRegister, User, UserLogin, TokenRefresh
from resources.item import Item, ItemList
from resources.store import Store, StoreList
from blacklist import BLACKLIST


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config["JWT_BLACKLIST_ENABLED"] = True
app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = ["access", "refresh"]
app.secret_key = "dover"
api = Api(app) # not creating /ath


@app.before_first_request
def create_tables():
    db.create_all()

jwt = JWTManager(app)

@jwt.additional_claims_loader
def add_claims_to_jwt(identity):
    if identity == 1: # read from a config file or a database for avoiding hard-coding
        return {"is_admin": True}
    return {"is_admin": False}

@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(decrypted_token):
    return decrypted_token["jti"] in BLACKLIST

@jwt.expired_token_loader
def expired_token_callback(error):
    return jsonify({
        "msg": "token expired",
        "err": "token_expired"
    }), 401

@jwt.invalid_token_loader
def invalid_token_loader(error):
    return jsonify({
        "msg": "signature verification failed",
        "err": "invalid_token"
    }), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({
        "msg": "access token missing",
        "err": "autho_required"
    }), 401


@jwt.needs_fresh_token_loader
def token_not_fresh_callback(error):
    return jsonify({
        "msg": "need refresh token",
        "err": "refresh_token_required"
    }), 401

@jwt.revoked_token_loader
def revoked_token_loader(error):
    return jsonify({
        "msg": "token revoked",
        "err": "token_revoked"
    }), 401



api.add_resource(Store, "/store/<string:name>")
api.add_resource(StoreList, "/stores")
api.add_resource(Item, "/item/<string:name>")
api.add_resource(ItemList, "/items")
api.add_resource(UserRegister, "/register")
api.add_resource(User, "/user<int:user_id>")
api.add_resource(UserLogin, "/login")
api.add_resource(TokenRefresh, "/refresh")

if __name__ == "__main__": # to avoid running without python app.py
    db.init_app(app)
    app.run(port=5000, debug=True)