
from flask import request
from src import app
from src.model.user import ForumUser
from src.config.constants import DEFAULT_PER_PAGE
import math
import json

def validate_user_object(decodedUser, action):
    # Validate user received data
    errors = []

    # Mandatory Fields
    if action == "insert":
        mandatory = ['firstName', 'email', 'login', 'password', 'source']
    else:
        mandatory = ['login']

    # Loop for each field 
    for field in mandatory:
        if field not in decodedUser:
            errors.append("Field "+field+" is missing")
        else:
            if decodedUser[field] == "":
                errors.append("Field "+field+" is empty")

        
    if 'email' in mandatory:
        # If there are no errors, validate email
        if len(errors) == 0:
            # Verify if email is unique for this user
            email_exists = len(ForumUser.query(
                ForumUser.email == decodedUser['email'],
                ForumUser.login != decodedUser['login'] # If other user has this email
            ).fetch(1))

            if email_exists == 1:
                errors.append("E-mail already taken")

    # Only validates login when inserting
    if action == "insert":
        # If there are no errors, validate login
        if len(errors) == 0:
            # Verify if email is unique
            login_exists = len(ForumUser.query(ForumUser.login == decodedUser['login']).fetch(1))

            if login_exists == 1:
                errors.append("Login already taken")


    # Validates password
    if 'password' in decodedUser:
        if len(decodedUser['password']) < 6:
            errors.append("Password length must be greater than or equal 6")

    return errors

@app.route('/api/v1/users', methods=['GET', 'POST'])
def users():
    # If its creating an user
    if request.method == 'POST':
        # @todo Validate session

        # User object
        decodedUser = json.loads(request.form['body'])
        
        # Validates the received user
        errors = validate_user_object(decodedUser, "insert")

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
        page = request.args.get('page')

        if page == None:
            page = 1

        begin =  (page - 1) * per_page
        end = begin + per_page
        
        # List of Users
        query = ForumUser.query()

        # Order by created at descending
        list_users = query.order(-ForumUser.created_at).fetch(per_page, offset=begin)
        
        # Total of users
        total = query.count()
        total_pages = int(math.ceil(total / per_page) + 1)

        # Adjust pagination
        if end > total:
            end = total

        # Json to be returned
        json_list = []

        # Adds each user at json list
        for user in list_users:
            json_list.append(user.to_json())
        
        
        # Return json object
        return json.dumps({ 
            "code":200, 
            "response":"success",
            "resource":"users",
            "paging" : {
                "total" : total,
                "page" : page,
                "pages" : total_pages,
                "perPage" : per_page,
                "begin" : begin,
                "end" : end                
            }, 
            "records" : json_list
        })


@app.route('/api/v1/users/<id>', methods=['GET', 'PUT', 'DELETE'])
def user(id):

    # Validate the ID
    try: 
        id = int(id)
    except ValueError:
        return json.dumps({"code":200, "response":"error", "message": "Invalid ID"})



    """
        Return an user from its id
    """
    if request.method == 'GET':    
        # @todo - Validate session
        
        # List of Users
        user = ForumUser.get_by_id(id)

        # If find the user..
        if user != None:
            return json.dumps(user.to_json())
        else:
            return json.dumps({"code": 200, "response":"error", "message" : "User not found"})
        
    elif request.method == 'PUT':
        """
            Updates an user by its id
        """
        
        # @todo - Validate session
        decodedUser = json.loads(request.form['body'])
        
        # Validates the received user
        errors = validate_user_object(decodedUser, "update")
        
        if len(errors) == 0:
            # List of Users
            user = ForumUser.get_by_id(id)

            # If found user
            if user != None:
                # User that needs to be updated           
                
                for attr in decodedUser:
                    if attr == "firstName":
                        setattr(user, "firstname", decodedUser[attr])

                    elif attr == "lastName":
                        setattr(user, "lastname", decodedUser[attr])

                    elif attr == "numMessages":
                        setattr(user, "num_messages", decodedUser[attr])

                    elif attr == "createdAt":
                        setattr(user, "created_at", decodedUser[attr])
                    
                    elif attr == "updatedAt":                        
                        setattr(user, "updated_at", decodedUser[attr])
                    else:
                        setattr(user, attr, decodedUser[attr])

                user.put()
                
                # Usuario recebido
                return json.dumps(user.to_json())
            else:
                return json.dumps({"code": 200, "response":"error", "message" : "User not found"})
        else:
            return json.dumps({"code":"200", "response":"error", "errors" : errors})


    elif request.method == 'DELETE':
        """
            Deletes an user by its id
        """

        # Find user by id
        user = ForumUser.get_by_id(id)
        
        if user != None:
            user.delete()
            return json.dumps({"code":200,"response":"success","message":"User deleted"})
        else:
            return json.dumps({"code": 200, "response":"error", "message" : "User not found"})