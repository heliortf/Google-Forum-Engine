from flask import request, render_template
from src import app
from src.model.user import ForumUser
from src.config.constants import DEFAULT_PER_PAGE
import json

@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')