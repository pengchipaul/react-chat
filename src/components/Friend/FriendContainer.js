import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FriendList from './FriendList';
import FriendRequestList from "./FriendRequestList";
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class FriendContainer extends React.Component {
    render() {
        const { friends } = this.props;
        const { friendRequests } = this.props;
        return (
            <div>
                Friend Page
                <Container fluid>
                    <Row>
                        <Col md={{ span: 12 }} lg={{ span: 5, offset: 1 }}> {friends && <FriendList friendList={friends} />}  </Col>
                        <Col md={{ span: 12 }} lg={{ span: 4, offset: 1 }} className="mt-lg-0 mt-sm-5"> {friendRequests && <FriendRequestList requestList={friendRequests} />}  </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        auth: state.firebase.auth,
        friends: state.friend.friends,
        friendRequests: state.firestore.ordered.friendRequests
    }

}


export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        {
            collection: 'users/' + props.auth.uid + '/friendRequests',
            storeAs: 'friendRequests'
        }
    ])
)(FriendContainer);