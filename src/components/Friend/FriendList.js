import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { showFriendChat } from '../../store/actions/friendChatAction';

class FriendList extends React.Component {

    showFriendChat(friendId) {
        this.props.showFriendChat(friendId);
        document.getElementById('friend-chat-section').scrollIntoView();
    }

    render() {
        return (
            <div className="friend-list friend-list-bg">
                <ListGroup>
                    {this.props.friendList && this.props.friendList.map((friend) => {
                        return (
                            <ListGroup.Item key={friend.id} className="text-left" onClick={() => this.showFriendChat(friend.id)}>
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

const mapDispatchToProps = (dispatch) => {
    return {
        showFriendChat: (friendId) => dispatch(showFriendChat(friendId))
    }
}

export default connect(null, mapDispatchToProps)(FriendList);