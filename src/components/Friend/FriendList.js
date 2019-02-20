import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function FriendList(props) {
    const friendList = props.friendList;

    return (
        <div className="friend-list">
            {friendList && friendList.map((friend) => {
                return (
                    <Card key={friend.id}>
                        <Card.Header as="h5">{friend.username}</Card.Header>
                        <Card.Body>
                            <Card.Title>{friend.email}</Card.Title>
                            <Card.Text>{friend.status}</Card.Text>
                            <Button variant='success'>Chat</Button>
                        </Card.Body>
                    </Card>
                )
            })
            }
        </div>
    )
}

export default FriendList;