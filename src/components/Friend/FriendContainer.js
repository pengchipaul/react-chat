import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FriendList from './FriendList';
import FriendRequestList from "./FriendRequestList";
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { showFriendRequests } from '../../store/actions/friendRequestActions';
import { showFriends } from '../../store/actions/friendActions';
import '../../css/friend.css';

class FriendContainer extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.friendRequests !== prevProps.friendRequests) {
            this.props.showFriendRequests(this.props.friendRequests);
        }
        if (this.props.friends !== prevProps.friends) {
            this.props.showFriends(this.props.friends);
        }
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col md={{ span: 12 }} lg={{ span: 3 }} className="friend-list-bg pt-2 pl-0 pr-0" style={{minHeight: "100vh"}}>
                            {this.props.friendsAreLoaded &&
                                this.props.friends.length !== 0 &&
                                <FriendList/>}
                        </Col>
                        <Col md={{ span: 12 }} lg={{ span: 6 }}> Friend Chat Section </Col>
                        <Col md={{ span: 12 }} lg={{ span: 3 }} className="mt-lg-0 mt-sm-5 pl-0 pr-0 pl-md-2 pr-md-2">
                            {this.props.requestsAreLoaded &&
                                this.props.friendRequests.length !== 0 &&
                                <FriendRequestList/>}
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
        requestsAreLoaded: state.friendRequest.isLoaded,
        friendsAreLoaded: state.friend.isLoaded
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        showFriends: (friendList) => dispatch(showFriends(friendList)),
        showFriendRequests: (requestList) => dispatch(showFriendRequests(requestList))
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
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