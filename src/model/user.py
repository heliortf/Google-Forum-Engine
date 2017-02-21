from google.appengine.ext import ndb

"""
    Users Model
"""
class ForumUser(ndb.Model):
    name = ndb.StringProperty()
    lastname = ndb.StringProperty()
    email = ndb.StringProperty()
    login = ndb.StringProperty()
    password = ndb.StringProperty()
    source = ndb.StringProperty()
    num_messages = ndb.IntegerProperty()
    created_at = ndb.DateTimeProperty(auto_now_add=True)
    updated_at = ndb.DateTimeProperty(auto_now_add=True)

