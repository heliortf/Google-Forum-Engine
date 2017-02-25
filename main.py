"""`main` is the top level module for your Flask application."""

# Note: We don't need to call run() since our application is embedded within
# the App Engine WSGI application server.
from src import app

@app.route('/hello-world')
def hello():
    """Return a friendly HTTP greeting."""
    return 'Hello World!'


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, Nothing at this URL.', 404


@app.errorhandler(500)
def application_error(e):
    """Return a custom 500 error."""
    return 'Sorry, unexpected error: {}'.format(e), 500
