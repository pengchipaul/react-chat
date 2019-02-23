import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';


class SignIn extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value 
        });
    }

    login = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render(){
        return (
            <Container fluid className="mt-3">
                <Row>
                    <Col md={{ span: 6, offset: 3 }} sm={{ span: 10, offset: 1 }}> 
                        <Card>
                            <Card.Header as="h5">Sign in</Card.Header>
                            <Card.Body>
                                <Form as="form" onSubmit={this.login}>
                                    <Form.Group controlId="email">
                                        <Form.Label className="text-left">Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password" onChange={this.handleChange} required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" block>Log in</Button>
                                </Form>
                            </Card.Body>
                            
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(null, mapDispatchToProps)(SignIn);