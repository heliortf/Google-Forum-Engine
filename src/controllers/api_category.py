
from src import app

@app.route('/api/v1/categories')
def categories():
    return "categories!"

@app.route('/api/v1/categories/<id>')
def category(id):
    return "category! "+id