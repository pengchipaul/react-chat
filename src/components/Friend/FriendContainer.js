import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FriendList from './FriendList';
import FriendChat from './FriendChat';
import FriendRequestList from "./FriendRequestList";
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import '../../css/friend.css';

class FriendContainer extends React.Component {
    state = {
        windowHeight: null,
        sectionHeight: null
    }

    componentDidMount() {
        const BAR_HEIGHT = 56;
        if (window.innerWidth <= 576) {
            this.setState({
                sectionHeight: window.innerHeight
            })
        } else {
            this.setState({
                sectionHeight: window.innerHeight - BAR_HEIGHT
            })
        }
        this.setState({
            windowHeight: window.innerHeight - BAR_HEIGHT
        });
    }

    render() { 
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col md={{ span: 12 }} lg={{ span: 3 }} className="friend-page-section friend-list-bg pt-2 pl-0 pr-0" style={{ height: this.state.windowHeight }}>
                            {this.props.friends &&
                                <FriendList friendList={this.props.friends} />}
                        </Col>
                        <Col id="friend-chat-section" md={{ span: 12 }} lg={{ span: 6 }} className="friend-page-section pt-2 pl-0 pr-0" style={{ height: this.state.sectionHeight }}> {this.props.selectedChat && <FriendChat friends={this.props.friends}
                             />} </Col>
                        <Col md={{ span: 12 }} lg={{ span: 3 }} className="friend-page-section pt-2 pl-0 pr-0 pl-md-2 pr-md-2" style={{ height: this.state.sectionHeight }}>
                            {this.props.friendRequests &&
                                <FriendRequestList requestList={this.props.friendRequests} />}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.firebase.auth,
        friends: state.firestore.ordered.friends,
        friendRequests: state.firestore.ordered.friendRequests,
        friendChats: state.firestore.ordered.friendChats,
        selectedChat: state.friendChat.selectedChat
    }

}



export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        {
            collection: 'users/' + props.auth.uid + '/friendRequests',
            storeAs: 'friendRequests'
        },
        {
            collection: 'users/' + props.auth.uid + '/friends',
            storeAs: 'friends'
        }
    ])
)(FriendContainer);