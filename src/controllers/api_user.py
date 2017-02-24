
from flask import request
from src import app
from src.model.user import ForumUser
from src.config.constants import DEFAULT_PER_PAGE
import json

@app.route('/api/v1/users', methods=['GET', 'POST'])
def users():
    # If its creating an user
    if request.method == 'POST':   
        # @todo Validate session

        # User object
        decodedUser = json.loads(request.form['body'])
        
        # @todo Validate user received data

        # Instantiate the new User
        user = ForumUser(
            firstname = decodedUser.firstName,
            lastname = decodedUser.lastName,
            email = decodedUser.email,
            login = decodedUser.login,
            password = decodedUser.password,
            source = decodedUser.source,
            num_messages = 0
        )

        # Saves the user
        user.put()

        return json.dumps(user.to_json())
    else:
        # Parameter
        per_page = DEFAULT_PER_PAGE

        # List of Users
        list_users = ForumUser.query().fetch(per_page)

        # Json to be returned
        json_list = []

        # Adds each user at json list
        for user in list_users.iter():
            json_list.append(user.to_json)
        
        # Return json object
        return json.dumps(json_list)


@app.route('/api/v1/users/<id>', methods=['GET', 'PUT', 'DELETE'])
def user(id):
    """
        Return an user from its id
    """
    if request.method == 'GET':    
        return "user! "+id    
    elif request.method == 'PUT':
        """
            Updates an user by its id
        """
        return "success"
    elif request.method == 'DELETE':
        return "deleted"