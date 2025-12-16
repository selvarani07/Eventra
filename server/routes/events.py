from flask import Blueprint, request, jsonify
from models import db, Event
from datetime import datetime

event_bp = Blueprint('events', __name__)

@event_bp.route('', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([{
        'id': e.id,
        'title': e.title,
        'start_time': e.start_time.isoformat(),
        'end_time': e.end_time.isoformat(),
        'description': e.description
    } for e in events])

@event_bp.route('', methods=['POST'])
def create_event():
    data = request.get_json()
    # Assuming ISO format string
    start = datetime.fromisoformat(data['start_time'].replace('Z', '+00:00'))
    end = datetime.fromisoformat(data['end_time'].replace('Z', '+00:00'))
    
    new_event = Event(
        title=data['title'],
        start_time=start,
        end_time=end,
        description=data.get('description', '')
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify({
        'id': new_event.id, 
        'title': new_event.title,
        'start_time': new_event.start_time.isoformat(),
        'end_time': new_event.end_time.isoformat(),
        'description': new_event.description
    })
