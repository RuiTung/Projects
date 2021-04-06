# import functools

# user = {'usr': 'bob', 'level': 'admin'}

# def make_secure(access_level):
#     def decorator(func):
#         @functools.wraps(func)
#         def secure_func(*args, **kwargs):
#             if user['level'] == access_level:
#                 return func(*args, **kwargs)
#             else:
#                 return f"No {access_level} for {user['usr']}"
#         return secure_func
#     return decorator


# @make_secure("admin")
# def get_admin_password():
#     return 'admin: 1234'

# @make_secure('guest')
# def get_dashboard_password():
#     return "user: user_password"

# print(get_admin_password())
# print(get_dashboard_password())

from typing import List, Optional

class Student:
    def __init__(self, name: str, grades: Optional[List[int]] = None):
        self.name = name
        self.grades = grades or []

    def take_exam(self, result: int):
        self.grades.append(result)

bob = Student('bob')
joe = Student('joe')
bob.take_exam(90)
print(bob.grades)
print(joe.grades)