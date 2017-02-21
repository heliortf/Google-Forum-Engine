from google.appengine.ext import ndb
from model.user import ForumUser
from model.topic import Topic

"""
    Topic Model
"""
class Topic(ndb.Model):
    title = ndb.StringProperty()
    description = ndb.StringProperty()
    status = ndb.StringProperty(required=True)

    # User that created the topic
    created_by = ndb.StructuredProperty(ForumUser)

    # Category
    category = ndb.StructuredProperty(Category)

    num_messages = ndb.IntegerProperty()
    num_views = ndb.IntegerProperty()
    
    created_at = ndb.DateTimeProperty(auto_now_add=True)
    updated_at = ndb.DateTimeProperty(auto_now_add=True)
