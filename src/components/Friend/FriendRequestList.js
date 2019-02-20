import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function FriendRequestList(props) {
    const requestList = props.requestList;
    const requests = requestList.map((request) => {
        return (
            <ListGroup.Item key={request.id}><b>{request.senderName}</b> ({request.email}) sent you a friend
                request!
                <hr/>
                <Button variant="success" size="sm">Accept</Button>
                <Button variant="danger" size="sm">Decline</Button>
            </ListGroup.Item>
        )

    });
    return (
        <div className="request-list">
            <h3 className="alert-heading"> Friend Requests </h3>
            {requestList &&
            <ListGroup>
                {requests}
            </ListGroup>
            }
        </div>
    )
}

export default FriendRequestList;