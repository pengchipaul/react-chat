import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
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

    render() {
        return (
            <Container fluid className="mt-3">
                <Row>
                    <Col lg={{ span: 4, offset: 4 }} md={{span: 6, offset: 3}} sm={{ span: 10, offset: 1 }}>
                        <Card>
                            <Card.Header as="h5">Sign in</Card.Header>
                            <Card.Body>
                                <Form as="form" onSubmit={this.login}>
                                    <Form.Group controlId="email">
                                        <Form.Label className="text-left d-block">Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label className="text-left d-block">Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password" onChange={this.handleChange} required />
                                    </Form.Group>
                                    {this.props.authError &&
                                        <Form.Group>
                                            <InputGroup>
                                                <Form.Control.Feedback className="d-block" type="invalid">Email/Password is not correct</Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    }
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

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);