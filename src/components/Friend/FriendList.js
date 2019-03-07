import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

class FriendList extends React.Component {

    render() {
        return (
            <div className="friend-list friend-list-bg">
                <ListGroup>
                    {this.props.friends.map((friend) => {
                        return (
                            <ListGroup.Item key={friend.id} className="text-left">
                                <strong>{friend.username} ({friend.email})</strong>
                                <br></br>
                                <span><small>{friend.lastMessage}</small></span>
                            </ListGroup.Item>

                        )
                    })
                    }
                </ListGroup>

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        friends: state.friend.friends
    }
}

export default connect(mapStateToProps)(FriendList);