from flask import Flask
from flask_cors import CORS
from models import db
from routes.auth import auth_bp
from routes.resources import resource_bp
from routes.events import event_bp
from routes.allocations import allocation_bp
from routes.reports import report_bp
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///eventra.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'supersecretkeyeventra123'

db.init_app(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(resource_bp, url_prefix='/api/resources')
app.register_blueprint(event_bp, url_prefix='/api/events')
app.register_blueprint(allocation_bp, url_prefix='/api/allocations')
app.register_blueprint(report_bp, url_prefix='/api/reports')

@app.route('/')
def home():
    return "Eventra Flask API Running"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
