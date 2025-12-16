from flask import Blueprint, request, jsonify
from models import db, Resource, Allocation, Event
from datetime import datetime

report_bp = Blueprint('reports', __name__)

@report_bp.route('/utilization', methods=['GET'])
def get_utilization():
    start_date_str = request.args.get('start_date')
    end_date_str = request.args.get('end_date')

    # Fetch all resources and their allocations
    resources = Resource.query.all()
    stats = []

    for r in resources:
        total_hours = 0
        bookings = 0
        
        # We could optimize this with a complex SQL query, but iterating is clearer for this scale
        for alloc in r.allocations:
            e = alloc.event
            s = e.start_time
            end = e.end_time
            
            # Date filtering
            include = True
            if start_date_str:
                filter_start = datetime.fromisoformat(start_date_str.replace('Z', '+00:00'))
                if end < filter_start: include = False
            
            if end_date_str:
                 filter_end = datetime.fromisoformat(end_date_str.replace('Z', '+00:00'))
                 if s > filter_end: include = False

            if include:
                duration = (end - s).total_seconds() / 3600
                total_hours += duration
                bookings += 1
        
        stats.append({
            'id': r.id,
            'name': r.name,
            'type': r.type,
            'total_hours': round(total_hours, 2),
            'bookings': bookings
        })

    return jsonify(stats)
