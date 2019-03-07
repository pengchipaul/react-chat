import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { acceptFriendRequest, deleteFriendRequest } from '../../store/actions/friendRequestActions';
import { connect } from 'react-redux';

class FriendRequestList extends React.Component {

    acceptFriendRequest = (requestId) => {
        this.props.acceptFriendRequest(requestId);
    }

    deleteFriendRequest = (requestId) => {
        this.props.deleteFriendRequest(requestId);
    }

    render() {
        let requests;
        requests = this.props.friendRequests.map((request) => {
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

        return (
            <div className="request-list">
                <div>
                    <ListGroup>
                        {requests}
                    </ListGroup>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        friendRequests: state.friendRequest.friendRequests,
        isLoaded: state.friendRequest.isLoaded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        acceptFriendRequest: (requestId) => dispatch(acceptFriendRequest(requestId)),
        deleteFriendRequest: (requestId) => dispatch(deleteFriendRequest(requestId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestList);