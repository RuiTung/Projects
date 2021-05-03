from db import db

class StoreModel(db.Model):
    __tablename__ = "stores"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    items = db.relationship("ItemModel", lazy="dynamic")

    def __init__(self, name, price):
        self.name = name

    def json(self):
        return {
            "id": self.id,
            "name": self.name, 
            "items": [item.json() for item in self.items.all()]
        }
    
    @classmethod
    def find_by_name(cls, name):
        # return an StoreModel object
        # return StoreModel.query.filter_by(name=name) # means SELECT * FROM stores WHERE name=name
        return cls.query.filter_by(name=name).first() # means SELECT * FROM stores WHERE name=name LIMITE 1

    @classmethod
    def find_all(cls):
        return cls.query.all()

    # for both update and insert
    def save_to_db(self):
        # session is a collection of object that we want to write into database
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
            
    