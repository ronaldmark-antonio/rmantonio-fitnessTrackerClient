import { Card, Badge, Button } from 'react-bootstrap';

export default function WorkoutCard({ workout, onEdit, onDelete }) {
  const capitalizeFirstLetter = (str) => {
    if (!str) return 'Active';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const status = capitalizeFirstLetter(workout.status || 'active');
  const badgeColor = status === 'Complete' ? 'success' : 'secondary';

  return (
    <Card 
      className="border rounded-0 h-100 position-relative"
      style={{ minHeight: '180px' }}
    >
      <div 
        className="position-absolute"
        style={{ top: "10px", right: "10px", zIndex: 10 }}
      >
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" onClick={onEdit}>
            <i className="bi bi-pencil-square"></i>
            
          </Button>
          <Button variant="outline-danger" size="sm" onClick={onDelete}>
            <i className="bi bi-trash"></i>
            
          </Button>
        </div>
      </div>

      <Card.Body className="d-flex flex-column justify-content-between p-3">
        <div>
          <Card.Title className="fw-semi-bold mb-2 mt-3">{workout.name}</Card.Title>
          <Card.Text className="text-muted mb-1">
            Duration: {workout.duration}
          </Card.Text>
          <small className="d-block text-muted mb-1">
            Date Added: {new Date(workout.dateAdded).toLocaleDateString()}
          </small>
        </div>

        <div className="mt-3">
          Status:{" "}
          <Badge bg={badgeColor} className="text-uppercase">
            {status}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
}
