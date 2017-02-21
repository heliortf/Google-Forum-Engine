from google.appengine.ext import ndb
from model.user import ForumUser
from model.forum import Forum
from model.category import Category

"""
    Topic Model
"""
class Topic(ndb.Model):
    title = ndb.StringProperty()
    description = ndb.StringProperty()

    # Topic status.
    # - OPEN = Can create forums
    # - CLOSED = Cannot create forums
    status = ndb.StringProperty(required=True, choices=[
        "OPEN", "CLOSED"
    ])

    # User that created the topic
    created_by = ndb.StructuredProperty(ForumUser)

    # Category
    category = ndb.StructuredProperty(Category)

    # Last Message
    last_message = ndb.StructuredProperty(Forum)

    # Number os messages inside this topic
    num_messages = ndb.IntegerProperty()

    # Number os visualizations
    num_views = ndb.IntegerProperty()
    
    created_at = ndb.DateTimeProperty(auto_now_add=True)
    updated_at = ndb.DateTimeProperty(auto_now_add=True)

