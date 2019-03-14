import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import { sendChatMessage } from '../../store/actions/friendChatAction';
import moment from 'moment';

class FriendChat extends React.Component {
    state = {
        content: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    sendChatMessage = (e) => {
        e.preventDefault();
        if (this.state.content === '') {
            return;
        }
        const message = {
            content: this.state.content,
            friendId: this.props.selectedChat
        }
        this.setState({
            content: ''
        });
        this.props.sendChatMessage(message);
    }

    render() {
        //console.log(this.state);
        const chatContainerClasses = "text-white message-container mb-1 rounded-pill px-4 py-1 ";
        return (
            <div className="pb-5" style={{position: 'relative'}}>
                {this.props.chats && this.props.chats.map((message) => {
                    return (<div key={message.id} className={message.userId === this.props.auth.uid ? "text-right" : "text-left"}>
                        <div className={message.userId === this.props.auth.uid ? chatContainerClasses + "bg-success" : chatContainerClasses + "bg-secondary"}>
                            <div className="chat-message">{message.content}</div>
                            <div className="chat-timestamp">{moment(message.createdAt.toDate()).calendar()}</div>
                        </div>
                    </div>)
                })
                }
                {this.props.chats &&
                    <Form inline onSubmit={this.sendChatMessage} className="friend-chat-input fixed-bottom">
                        <InputGroup style={{ width: "100%" }}>
                            <FormControl placeholder="enter your text" type="text" id="content" value={this.state.content} onChange={this.handleChange} />
                            <InputGroup.Append>
                                <Button variant="outline-success" type="submit">Send</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>

                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedChat: state.friendChat.selectedChat,
        friends: state.firestore.ordered.friends,
        auth: state.firebase.auth,
        chats: state.firestore.ordered.chats,
        isLoaded: state.friendChat.isLoaded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendChatMessage: (message) => dispatch(sendChatMessage(message))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        {
            collection: 'users/' + props.auth.uid + '/friends/' + props.selectedChat + '/chats',
            storeAs: 'chats',
            orderBy: [
                'createdAt', 'asc'
            ]
        }
    ])
)(FriendChat);