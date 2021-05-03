from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from models.item import ItemModel

class Item(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "price",
        type=float,
        required=True,
        help="Mandatory field!"
    )

    parser.add_argument(
        "store_id",
        type=int,
        required=True,
        help="Mandatory field!"
    )

    @jwt_required
    def get(self, name):
        item = ItemModel.find_by_name(name)
        if item:
            return item.json()
        return {"message": "Item not found"}, 404
    
    @jwt_required(refresh=True)
    def post(self, name):
        if ItemModel.find_by_name(name):
            return {"message": "item '{}' exists".format(name)}, 400 # Request error

        data = Item.parser.parse_args()

        item = ItemModel(name, **data)

        try:
            item.save_to_db()
        except:
            return {"message": "error to insert"}, 500 # Internal server error
        
        return item.json(), 201


    @jwt_required
    def delete(self, name):
        claims = get_jwt()
        if not claims["is_admin"]:
            return {"message": "level is not correct, need admin"}, 401

        item = ItemModel.find_by_name(name)
        if item:
            item.delete_from_db()
        return {"message": "Item deleted"}

    def put(self, name):
        data = Item.parser.parse_args()

        item = ItemModel.find_by_name(name)

        if item:
            # item = ItemModel(name, data["price"], data["store_id"])
            item.price = data['price']
        else:
            item = ItemModel(name, **data)

        item.save_to_db()

        return item.json()


class ItemList(Resource):
    @jwt_required(optional=True)
    def get(self):
        user_id = get_jwt_identity()
        items = [item.json() for item in ItemModel.find_all()]
        if user_id:
            return {"items": items}, 200
        return {
            "items": [item["name"] for item in items],
            "message": "To login to see details"
        }, 200

        # return {"item": list(map(lambda x: x.json(), ItemModel.query.all()))}
