import React from 'react';
import {
    Row,
    Col,
    Card,
    Container,
    Button,
    InputGroup,
    Form
} from 'react-bootstrap';
import { signUp } from '../../store/actions/authActions';
import { connect } from 'react-redux';

class SignUp extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
        isLoading: false
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        }, () => {
            this.checkCredentials();
        });
    }

    checkCredentials = () => {
        var errors = [];
        if (this.state.username.length < 4) {
            errors.push('Username length must be greater than 4 characters');
        }
        if (this.state.email === '') {
            errors.push('Email cannot be empty');
        }
        if (this.state.password.length < 6) {
            errors.push('Password length must be greater than 6 characters');
        }
        if (this.state.password !== this.state.confirmPassword) {
            errors.push("Password doesn't match");
        }

        this.setState({
            errors: errors
        });
    }

    signup = (e) => {
        this.setState({
            isLoading: true
        });
        e.preventDefault();
        var credentials = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        this.props.signUp(credentials);
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000);
    }

    render() {
        return (
            <Container fluid className="mt-3">
                <Row>
                    <Col lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }} sm={{ span: 10, offset: 1 }}>
                        <Card>
                            <Card.Header as="h5">Sign up</Card.Header>
                            <Card.Body>
                                <Form as="form" onSubmit={this.signup}>
                                    <Form.Group controlId="username">
                                        <Form.Label className="text-left d-block">Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" onChange={this.handleChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label className="text-left d-block">Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label className="text-left d-block">Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password" onChange={this.handleChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="confirmPassword">
                                        <Form.Label className="text-left d-block">Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password again" onChange={this.handleChange} required />
                                    </Form.Group>
                                    {this.state.errors.length !== 0 ?
                                        this.state.errors.map((error) => {
                                            return <Form.Group key={error}>
                                                <InputGroup>
                                                    <Form.Control.Feedback className="d-block" type="invalid">{error}</Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>;
                                        })
                                        :
                                        null
                                    }
                                    {this.props.authError ?
                                        <Form.Group>
                                            <InputGroup>
                                                <Form.Control.Feedback className="d-block" type="invalid">{this.props.authError}</Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        :
                                        null
                                    }
                                    <Button variant="success" type="submit" disabled={this.state.errors.length !== 0 || this.state.isLoading} block>Sign up</Button>
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
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);