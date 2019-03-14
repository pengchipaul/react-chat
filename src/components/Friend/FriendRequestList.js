import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { acceptFriendRequest, deleteFriendRequest } from '../../store/actions/friendRequestActions';
import { connect } from 'react-redux';

class FriendRequestList extends React.Component {

    acceptFriendRequest = (request) => {
        this.props.acceptFriendRequest(request);
    }

    deleteFriendRequest = (request) => {
        this.props.deleteFriendRequest(request);
    }

    render() {
        let requests;
        if (this.props.requestList) {
            requests = this.props.requestList.map((request) => {
                return (
                    <ListGroup.Item key={request.id}><b>{request.username}</b> ({request.email}) sent you a friend
                        request!
                <hr />
                        <p>Message: {request.message}</p>
                        <Button variant="success" size="sm" onClick={() => this.acceptFriendRequest(request)}>Accept</Button>
                        <Button variant="danger" size="sm" onClick={() => this.deleteFriendRequest(request)}>Decline</Button>
                    </ListGroup.Item>
                )

            });
        }


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

const mapDispatchToProps = (dispatch) => {
    return {
        acceptFriendRequest: (request) => dispatch(acceptFriendRequest(request)),
        deleteFriendRequest: (request) => dispatch(deleteFriendRequest(request))
    }
}

export default connect(null, mapDispatchToProps)(FriendRequestList);