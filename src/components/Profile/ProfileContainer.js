import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class ProfileContainer extends React.Component{
    render() {
        return(
            <div>
                Profile Page
                <Container>
                    <Row>
                        <Col xs={12} md={{span: 4, offset: 4}}>
                            <Button className="text-white" variant="warning" size="lg" block>
                                Log out
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ProfileContainer;