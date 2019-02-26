import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { searchByEmail } from '../../store/actions/friendRequestActions';
import { createFriendRequest } from '../../store/actions/friendRequestActions';

class SearchBar extends React.Component {
    state = {
        showProfile: false,
        searchEmail: '',
        message: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }


    handleClose = () => {
        this.setState({
            showProfile: false,
            searchEmail: '',
            message: ''
        });
    }

    sendFriendRequest = () => {
        if (this.props.userFound.uid === this.props.auth.uid) {
            return;
        }
        const receiver = {
            uid: this.props.userFound.uid,
            message: this.state.message
        }
        this.props.createFriendRequest(receiver);
        this.handleClose();
    }

    searchUserByEmail = () => {
        if (this.state.searchEmail === '') {
            return;
        }
        this.setState({
            showProfile: true
        });
        this.props.searchByEmail(this.state.searchEmail);
    }

    render() {
        return (
            <Form inline>
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <FormControl type="text" id="searchEmail" placeholder="Search" className="mr-sm-2" value={this.state.searchEmail} onChange={this.handleChange} />
                            <Button variant="outline-info" onClick={this.searchUserByEmail}>
                                {this.props.isSearching ? "Searching..." : "Search"}
                            </Button>
                        </Col>
                    </Row>
                </Container>
                {!this.props.isSearching && <Modal show={this.state.showProfile} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.userFound ?
                                this.props.userFound.username + "(" + this.props.userFound.email + ")"
                                :
                                "User not found"
                            }

                        </Modal.Title>
                    </Modal.Header>
                    {this.props.userFound &&
                        <Modal.Body>
                        {this.props.userFound.status}
                            <Form.Control className="mt-2" type="text" placeholder="enter your message" id="message" value={this.state.message} onChange={this.handleChange} />
                        </Modal.Body>
                    }

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        {this.props.userFound &&
                            <Button variant="success" disabled={this.props.userFound.uid === this.props.auth.uid} onClick={this.sendFriendRequest}>
                                Add friend
                            </Button>
                        }

                    </Modal.Footer>
                </Modal>}

            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSearching: state.friendRequest.isSearching,
        userFound: state.friendRequest.userFound,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createFriendRequest: (friendRequest) => dispatch(createFriendRequest(friendRequest)),
        searchByEmail: (email) => dispatch(searchByEmail(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);