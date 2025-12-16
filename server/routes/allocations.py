from flask import Blueprint, request, jsonify
from models import db, Allocation, Event
from datetime import datetime

allocation_bp = Blueprint('allocations', __name__)

@allocation_bp.route('', methods=['GET'])
def get_allocations():
    allocations = Allocation.query.all()
    results = []
    for a in allocations:
        results.append({
            'id': a.id,
            'event_id': a.event_id,
            'resource_id': a.resource_id,
            'event_title': a.event.title,
            'resource_name': a.resource.name,
            'start_time': a.event.start_time.isoformat(),
            'end_time': a.event.end_time.isoformat()
        })
    return jsonify(results)

@allocation_bp.route('', methods=['POST'])
def create_allocation():
    data = request.get_json()
    event_id = data.get('event_id')
    resource_id = data.get('resource_id')

    # 1. Get the target event's timing
    target_event = Event.query.get(event_id)
    if not target_event:
        return jsonify({'error': 'Event not found'}), 404

    new_start = target_event.start_time
    new_end = target_event.end_time

    # 2. Check for conflicts
    # Join Allocation with Event to filter by resource_id
    existing_allocations = db.session.query(Allocation).join(Event).filter(Allocation.resource_id == resource_id).all()

    for alloc in existing_allocations:
        exist_start = alloc.event.start_time
        exist_end = alloc.event.end_time
        
        # Overlap logic: (StartA < EndB) && (EndA > StartB)
        if new_start < exist_end and new_end > exist_start:
             return jsonify({
                'error': 'Resource conflict detected',
                'details': f"Resource is already booked for '{alloc.event.title}' from {exist_start} to {exist_end}"
            }), 409

    # 3. No conflict, create
    new_alloc = Allocation(event_id=event_id, resource_id=resource_id)
    db.session.add(new_alloc)
    db.session.commit()
    return jsonify({'id': new_alloc.id, 'event_id': event_id, 'resource_id': resource_id})
