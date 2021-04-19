import sqlite3
from flask_restful import Resource, reqparse
from flask_jwt import jwt_required

class Item(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        'price',
        type=float,
        required=True,
        help="Mandatory field!"
    )
    # data = Item.parser.parse_args()

    @jwt_required()
    def get(self, name):
        # for item in items:
        #     if item['name'] == name:
        #         return item

        # item = next(filter(lambda x : x['name'] == name, items), None)
        # return {'item': None}, 200 if item else 404
        
        item = self.find_by_name(name)
        if item:
            return item
        return {'message': 'Item not found'}, 404

    @classmethod
    def find_by_name(cls, name):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM items WHERE name=?"
        result = cursor.execute(query, (name,))
        entry = result.fetchone()
        connection.close()

        if entry:
            return {'item': {'name': entry[0], 'price': [entry[1]]}}
    
    @classmethod
    def insert(cls, item):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "INSERT into items values (?, ?)"
        cursor.execute(query, (item['name'], item['price']))

        connection.commit()
        connection.close()
    
    @classmethod
    def update(cls, item):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "UPDATE items SET price=? WHERE name=?"
        cursor.execute(query, (item['price'], item['name']))

        connection.commit()
        connection.close()

    def post(self, name):
        # if next(filter(lambda x : x['name'] == name, items), None):
        #     return {'message': "item '{}' exists".format(name)}, 400

        if self.find_by_name(name):
            return {'message': "item '{}' exists".format(name)}, 400 # Request error

        data = Item.parser.parse_args()

        item = {'name': name, 'price': data['price']}

        try:
            self.insert(item)
        except:
            return {"message": "error to insert"}, 500 # Internal server error
        
        return item, 201

    def delete(self, name):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "DELETE FROM items WHERE name="
        cursor.execute(query, (name,))

        connection.commit()
        connection.close()

        return {'message': 'Item deleted'}

    def put(self, name):
        data = Item.parser.parse_args()

        item = self.find_by_name(name)
        updated_item = {'name': name, 'price': data['price']}

        if item:
            try:
                self.insert(updated_item)
            except:
                return {"message": "error to insert"}, 500
        else:
            try:
                self.update(updated_item)
            except:
                return {"message": "error to update"}, 500
        return updated_item

class ItemList(Resource):
    def get(self):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "SELECT * FROM items"
        result = cursor.execute(query)

        items = []
        for entry in result:
            items.append({'name': entry[0], 'price': entry[1]})

        connection.close()

        return {'items': items}
    
