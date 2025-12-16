from flask import Blueprint, request, jsonify
from models import db, Resource

resource_bp = Blueprint('resources', __name__)

@resource_bp.route('', methods=['GET'])
def get_resources():
    resources = Resource.query.all()
    return jsonify([{
        'id': r.id,
        'name': r.name,
        'type': r.type
    } for r in resources])

@resource_bp.route('', methods=['POST'])
def create_resource():
    data = request.get_json()
    new_resource = Resource(name=data['name'], type=data['type'])
    db.session.add(new_resource)
    db.session.commit()
    return jsonify({'id': new_resource.id, 'name': new_resource.name, 'type': new_resource.type})

@resource_bp.route('/<int:id>', methods=['DELETE'])
def delete_resource(id):
    resource = Resource.query.get(id)
    if resource:
        db.session.delete(resource)
        db.session.commit()
        return jsonify({'message': 'Deleted'})
    return jsonify({'error': 'Not found'}), 404
