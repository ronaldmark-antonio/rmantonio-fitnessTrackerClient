import { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import logo from '../images/fitverse-logo.png';

export default function Register() {

  const notyf = useRef(new Notyf({ duration: 2000, ripple: true })).current; 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/workouts', { replace: true });
    }
  }, [navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://rmantonio-fitnesstrackerserver.onrender.com/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.message === 'Registered Successfully') {
        	
        	notyf.success('Registration Successful!');
        	
        	setEmail('');
        	setPassword('');
        	setConfirmPassword('');
        
        	navigate('/login');

      } else if (data.error === 'Password must be atleast 8 characters') {
       		
       		notyf.error('Password must be at least 8 characters');

      } else {

        	notyf.error('Something went wrong. Please try again.');
      }

    } catch {
      	notyf.error('Network error. Please try again.');
    } finally {
      	setLoading(false);
    }
  };

  useEffect(() => {
    setIsActive(
      email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword
    );
  }, [email, password, confirmPassword]);

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: 'rgb(255, 255, 255)' }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-3">
              <Card.Body className="p-5 text-center">

                <div className="text-center mb-3">
                  <img
                    src={logo}
                    alt="FitVerse Logo"
                    className="img-fluid"
                    style={{ maxWidth: '180px' }}
                  />
                </div>

                <h2 className="fw-bold mb-4 text-dark">Register</h2>

                <Form onSubmit={registerUser}>
                  <Form.Group controlId="userEmail" className="mb-3 text-start">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3 text-start">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="confirmPassword" className="mb-4 text-start">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={!isActive || loading}
                      size="lg"
                      className="rounded-3"
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{' '}
                          Registering...
                        </>
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </div>
                </Form>

                <div className="mt-4">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <a
                      href="/login"
                      className="text-decoration-none fw-semibold text-primary"
                    >
                      Login
                    </a>
                  </p>
                </div>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
