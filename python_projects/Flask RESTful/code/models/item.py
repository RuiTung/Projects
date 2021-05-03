from db import db

class ItemModel(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    price = db.Column(db.Float(precision=2))
    
    store_id = db.Column(db.Integer, db.ForeignKey("stores.id"))
    store = db.relationship("StoreModel")

    def __init__(self, name, price, store_id):
        self.name = name
        self.price = price
        self.store_id = store_id


    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "store_id": self.store_id
        }
    
    @classmethod
    def find_by_name(cls, name):
        # return an ItemModel object
        # return ItemModel.query.filter_by(name=name) # means SELECT * FROM items WHERE name=name
        return cls.query.filter_by(name=name).first() # means SELECT * FROM items WHERE name=name LIMITE 1

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
            
    