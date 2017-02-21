from google.appengine.ext import ndb
from model.user import ForumUser


"""
    This class may serve as the forum thread or a message
"""
class Forum(ndb.Model):
    # Forum object can be of 3 types
    #
    # - FORUM ( First message in a forum topic that we call forum )
    # - MESSAGE ( After the first message ( forum ) , all the others are messages )
    # - ANNOUNCEMENT ( First foruns in a bolletin board )
    #
    inner_type = ndb.StringProperty(required=True, choices=["FORUM", "MESSAGE", "ANNOUNCEMENT"])

    # Forum tells where this ( message ) is
    forum = ndb.StructuredProperty(Forum)

    # Title of the forum
    title = ndb.StringProperty(required=True)

    # Description of the message
    description = ndb.StringProperty(required=True)

    # Who created this record
    created_by = ndb.StructuredProperty(ForumUser, required=True)

    # When it was created
    created_at = ndb.DateTimeProperty(auto_now_add=True)

    # When was modified
    updated_at = ndb.DateTimeProperty(auto_now_add=True)

