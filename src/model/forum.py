from google.appengine.ext import ndb
from model.user import ForumUser


"""
    This class may serve as the forum thread or a message
"""
class Forum(ndb.Model):
    inner_type = ndb.StringProperty(required=True, choices=["FORUM", "MESSAGE", "ANNOUNCEMENT"])
    forum = ndb.StructuredProperty(Forum)
    title = ndb.StringProperty(required=True)
    description = ndb.StringProperty(required=True)
    created_by = ndb.StructuredProperty(ForumUser, required=True)
    
    
    created_at = ndb.DateTimeProperty(auto_now_add=True)
    updated_at = ndb.DateTimeProperty(auto_now_add=True)

