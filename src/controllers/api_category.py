
from src import app

@app.route('/api/v1/categories', methods=['GET'])
def categories():
    return "categories!"


@app.route('/api/v1/categories/<id>', methods=['GET'])
def category(id):
    """
        Return a category from its id
    """
    
    return "category! "+id

