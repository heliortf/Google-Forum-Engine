# Import the Flask Framework
from flask import Flask
import jinja2
app = Flask(__name__)

from controllers import api_category
from controllers import api_forum
from controllers import api_topic
from controllers import api_user
from controllers import admin_home