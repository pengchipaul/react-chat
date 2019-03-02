import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import firebase from '../../config/fbConfig';
import { acceptFriendRequest, deleteFriendRequest } from '../../store/actions/friendRequestActions';
import { connect } from 'react-redux';

class FriendRequestList extends React.Component {

    state = {
        isLoaded: false,
        friendRequests: null
    }

    componentDidMount() {
        this.getDataFromRequests(this.props.requestList);
    }

    componentWillReceiveProps(nextProps) {
        this.getDataFromRequests(nextProps.requestList);
    }

    componentWillUnmount() {
        
    }

    getDataFromRequests(requestList) {
        var db = firebase.firestore();
        let friendRequests = [];
        /* get user data from friend requests */
        if (requestList.length !== 0) {
            var totalRequests = requestList.length;
            requestList.forEach((request) => {
                var username, email;
                db.collection('users').doc(request.id).get().then((res) => {
                    username = res.data().username;
                    email = res.data().email;
                    friendRequests.push({
                        id: request.id,
                        username: username,
                        email: email,
                        message: request.message
                    });
                    totalRequests--;
                    if (totalRequests === 0) {
                        this.setState({
                            friendRequests: friendRequests,
                            isLoaded: true
                        });
                    }
                });
            });
        } else {
            this.setState({
                friendRequests: null
            });
        }
    }

    acceptFriendRequest = (requestId) => {
        this.props.acceptFriendRequest(requestId);
    }

    deleteFriendRequest = (requestId) => {
        this.props.deleteFriendRequest(requestId);
    }

    render() {
        let requests;
        
        if (this.state.friendRequests && this.state.isLoaded) {
            requests = this.state.friendRequests.map((request) => {
                return (
                    <ListGroup.Item key={request.id}><b>{request.username}</b> ({request.email}) sent you a friend
                        request!
                <hr />
                        <p>Message: {request.message}</p>
                        <Button variant="success" size="sm" onClick={() => this.acceptFriendRequest(request.id)}>Accept</Button>
                        <Button variant="danger" size="sm" onClick={() => this.deleteFriendRequest(request.id)}>Decline</Button>
                    </ListGroup.Item>
                )

            });
        }

        return (
            <div className="request-list">

                {this.state.isLoaded &&
                    <div>
                        <h3 className="alert-heading"> Friend Requests </h3>
                        <ListGroup>
                            {requests}
                        </ListGroup>
                    </div>

                }
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        acceptFriendRequest: (requestId) => dispatch(acceptFriendRequest(requestId)),
        deleteFriendRequest: (requestId) => dispatch(deleteFriendRequest(requestId))
    }
}

export default connect(null,mapDispatchToProps)(FriendRequestList);