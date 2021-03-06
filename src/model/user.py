from google.appengine.ext import ndb
import json

"""
    Users Model
"""
class ForumUser(ndb.Model):    
    firstname = ndb.StringProperty(required=True)
    lastname = ndb.StringProperty()
    email = ndb.StringProperty(required=True)
    login = ndb.StringProperty(required=True, indexed=True)
    password = ndb.StringProperty(required=True)
    source = ndb.StringProperty(required=True, choices=["GOOGLE", "FACEBOOK", "FORUM"])
    num_messages = ndb.IntegerProperty()
    status = ndb.StringProperty(choices=["ACTIVE", "INACTIVE"])
    signature = ndb.StringProperty()
    created_at = ndb.DateTimeProperty(auto_now_add=True)
    updated_at = ndb.DateTimeProperty()


    """
        Transforms the object in a JSON
    """
    def to_json(self):
        obj = {
            "id" : self.key.id(),
            "firstName": self.firstname,
            "lastName": self.lastname,
            "email": self.email,
            "userName": self.login,
            #"password": self.password,
            "source": self.source,
            "numMessages": self.num_messages,
            "createdAt": self.created_at.isoformat()            
        }

        # Updated at is only defined when user is updated
        obj["updatedAt"] = "" if self.updated_at == None else self.updated_at.isoformat()

        return obj