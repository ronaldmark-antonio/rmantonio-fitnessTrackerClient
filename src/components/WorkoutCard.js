import { Card, Badge, Button } from 'react-bootstrap';

export default function WorkoutCard({ workout, onEdit, onDelete, onComplete }) {
  const status = (workout?.status || 'pending').toLowerCase();
  const isComplete = status === 'completed';

  const formattedDate = workout?.dateAdded
    ? new Date(workout.dateAdded).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <Card className="border rounded-0 h-100 position-relative" style={{ minHeight: '180px' }}>
      
      {/* UPPER LEFT: Toggle Complete / Pending */}
      {!isComplete && (
        <div className="position-absolute" style={{ top: '10px', left: '10px', zIndex: 10 }}>
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => onComplete(workout._id, status)}
            title="Mark as Complete"
          >
            <i className="bi bi-check-lg"></i>
          </Button>
        </div>
      )}

      {/* UPPER RIGHT: Edit & Delete */}
      <div className="position-absolute" style={{ top: '10px', right: '10px', zIndex: 10 }}>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" onClick={() => onEdit(workout)}>
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => onDelete(workout._id)}>
            <i className="bi bi-trash"></i>
          </Button>
        </div>
      </div>

      <Card.Body className="d-flex flex-column justify-content-between p-3">
        <div>
          <Card.Title className="fw-semi-bold mb-2 mt-5">{workout?.name || 'Unnamed Workout'}</Card.Title>
          <Card.Text className="text-muted mb-1">Duration: {workout?.duration || 'N/A'}</Card.Text>
          <small className="d-block text-muted mb-1">Date Added: {formattedDate}</small>
        </div>

        <div className="mt-3">
          Status:{' '}
          <Badge bg={isComplete ? 'success' : 'warning'} className="text-uppercase">
            {status.toUpperCase()}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
}
