import { useEffect, useState, useContext, useRef } from 'react';
import { Row, Col, Button, Modal, Form, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import WorkoutCard from '../components/WorkoutCard';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import logo from '../images/fitverse-logo.png';

export default function Workouts() {
  const notyf = useRef(new Notyf()).current;
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const fetchWorkouts = async () => {
    try {
      const res = await fetch('https://rmantonio-fitnesstrackerserver.onrender.com/workouts/getMyWorkouts', {
      	method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();
      setWorkouts(data.workouts || []);
    } catch {
      notyf.error('Failed to fetch workouts');
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const addWorkout = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://rmantonio-fitnesstrackerserver.onrender.com/workouts/addWorkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, duration: `${duration} minutes` }),
      });

      const data = await res.json();
      if (res.status === 201) {

        	notyf.success('Workout Added!');
        
        	setShowModal(false);
        	setName('');
        	setDuration('');
        
        	fetchWorkouts();

      } else {
        	
        	notyf.error(data.error || 'Failed to add workout');
      }
    } catch {
      		notyf.error('Something went wrong.');
    }
  };

	const handleLogout = () => {
		
	  localStorage.removeItem('token');
	  setUser(null);

	  notyf.success('Logged out successfully!');
	  navigate('/login', { replace: true });
	};


  return (
    <Container className="py-5" style={{ backgroundColor: 'rgb(255,255,255)' }}>
      
      <div className="mb-4">
        <img
          src={logo}
          alt="FitVerse Logo"
          className="img-fluid mb-1"
          style={{ maxWidth: '160px' }}
        />
      </div>

      {user ? (
        <>
          <Card className="shadow-lg border-0 rounded-0 p-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark">My Workouts</h2>
                <div>
                  <Button
                    id="addWorkout"
                    variant="primary"
                    onClick={() => setShowModal(true)}
                    className="me-2"
                  >
                    + Add Workout
                  </Button>
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </div>

              {workouts.length > 0 ? (
                <Row className="g-4">
                  {workouts.map((workout) => (
                    <Col md={6} lg={4} key={workout._id}>
                      <WorkoutCard workout={workout} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-muted text-center">No workouts yet.</p>
              )}
            </Card.Body>
          </Card>
        </>
      ) : (
        <div className="text-center mt-5">
          <h3>You are not logged in</h3>
          <Button href="/login" variant="primary" className="mt-3">
            Login to View
          </Button>
        </div>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="md"
        backdrop="static"
      >
        <Card className="shadow-lg border-0 rounded-3">
          <Card.Body className="p-5">
            <Modal.Header closeButton className="border-0 px-0 pb-3">
              <Modal.Title className="fw-bold">Add Workout</Modal.Title>
            </Modal.Header>

            <Form onSubmit={addWorkout}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Duration (in minutes)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button variant="danger" onClick={() => setShowModal(false)} className="me-2">
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Modal>
    </Container>
  );
}
