from google.appengine.ext import ndb

"""
    Users Model
"""
class Category(ndb.Model):
    name = ndb.StringProperty()
    description = ndb.StringProperty()
    parent_category = ndb.StructuredProperty(Category)    
    created_at = ndb.DateTimeProperty(auto_now_add=True)
    updated_at = ndb.DateTimeProperty(auto_now_add=True)

