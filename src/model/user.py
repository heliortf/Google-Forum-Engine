from google.appengine.ext import ndb
import json

"""
    Users Model
"""
class ForumUser(ndb.Model):
    firstname = ndb.StringProperty(required=True)
    lastname = ndb.StringProperty()
    email = ndb.StringProperty(required=True)
    login = ndb.StringProperty(required=True)
    password = ndb.StringProperty(required=True)
    source = ndb.StringProperty(required=True)
    num_messages = ndb.IntegerProperty()
    created_at = ndb.DateTimeProperty(auto_now_add=True)
    updated_at = ndb.DateTimeProperty()


    """
        Transforms the object in a JSON
    """
    def to_json(self):
        return {
            firstName: self.firstname,
            lastName: self.lastname,
            email: self.email,
            login: self.login,
            password: self.password,
            source: self.source,
            numMessages: self.num_messages,
            createdAt: self.created_at,
            updatedAt: self.updated_at
        }

