import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

class ProfileContainer extends React.Component{

    render() {
        return(
            <div>
                Profile Page
                <Container>
                    <Row>
                        <Col xs={12} md={{span: 4, offset: 4}}>
                            <Button className="text-white" variant="warning" size="lg" block onClick={this.props.signOut}>
                                Log out
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(ProfileContainer);