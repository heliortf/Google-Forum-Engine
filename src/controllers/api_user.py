
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
        errors = []

        # Mandatory Fields
        mandatory = ['firstName', 'email', 'login', 'password', 'source']

        # Loop for each field 
        for field in mandatory:
            if field not in decodedUser:
                errors.append("Field "+field+" is missing")
            else:
                if decodedUser[field] == "":
                    errors.append("Field "+field+" is empty")

        
        # If there are no errors, validate email
        if len(errors) == 0:
            # Verify if email is unique
            email_exists = len(ForumUser.query(ForumUser.email == decodedUser['email']).fetch(1))

            if email_exists == 1:
                errors.append("E-mail already taken")


        # If there are no errors, validate login
        if len(errors) == 0:
            # Verify if email is unique
            login_exists = len(ForumUser.query(ForumUser.login == decodedUser['login']).fetch(1))

            if login_exists == 1:
                errors.append("Login already taken")


        # Validates password
        if len(decodedUser['password']) < 6:
            errors.append("Password length must be greater than or equal 6")


        if len(errors) == 0:
            # Instantiate the new User
            user = ForumUser(
                firstname = decodedUser['firstName'],
                lastname = decodedUser['lastName'],
                email = decodedUser['email'],
                login = decodedUser['login'],
                password = decodedUser['password'],
                source = decodedUser['source'],
                num_messages = 0
            )

            # Saves the user
            user.put()

            return json.dumps(user.to_json())
        else:
            return json.dumps({"code":"200", "response":"error", "errors" : errors})
    else:
        # Parameter
        per_page = DEFAULT_PER_PAGE

        # List of Users
        list_users = ForumUser.query().fetch(per_page)

        # Json to be returned
        json_list = []

        # Adds each user at json list
        for user in list_users:
            json_list.append(user.to_json())
        
        # Return json object
        return json.dumps(json_list)


@app.route('/api/v1/users/<id>', methods=['GET', 'PUT', 'DELETE'])
def user(id):
    """
        Return an user from its id
    """
    if request.method == 'GET':    
        # List of Users
        list_users = ForumUser.query(ForumUser.login == id).fetch(1)

        if len(list_users) == 1:
            return json_dumps(list_users[0].to_json())
        else:
            return json_dumps({"code": 200, "response":"error", "message" : "User not found"})
    elif request.method == 'PUT':
        """
            Updates an user by its id
        """
        # List of Users
        list_users = ForumUser.query(ForumUser.login == id).fetch(1)

        # If found user
        if len(list_users) == 1:
            # User that needs to be updated
            u = list_users[0]

            # Usuario recebido

            return json_dumps(list_users[0].to_json())
        else:
            return json_dumps({"code": 200, "response":"error", "message" : "User not found"})

    elif request.method == 'DELETE':
        # List of Users
        list_users = ForumUser.query(ForumUser.login == id).fetch(1)

        if len(list_users) == 1:
            list_users[0].delete()
            return json_dumps({"code":200,"response":"success","message":"User deleted"})
        else:
            return json_dumps({"code": 200, "response":"error", "message" : "User not found"})