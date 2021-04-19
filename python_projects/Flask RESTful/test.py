import sqlite3

connection = sqlite3.connect('data.db')

cursor = connection.cursor()

create_table = "CREATE TABLE users (id int, username text, password text)"
cursor.execute(create_table)

user = (1, 'a', 'asdf')
insert_query = "INSERT INTO users VALUES (?, ?, ?)"
cursor.execute(insert_query, user)

users = [
    (2, 'b', 'bvcx'),
    (3, 'c', 'cxz')
]
cursor.executemany(insert_query, users)

select_query = "SELECT * FROM users"
for entry in cursor.execute(select_query):
    print(entry)


connection.commit()

connection.close()