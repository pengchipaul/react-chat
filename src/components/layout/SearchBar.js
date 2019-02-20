import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';

class SearchBar extends React.Component {
    state = {
        showProfile: false,
        searchEmail: '',
        result: {}
    }

    handleSearchChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    searchUserByEmail = () => {
        if(!this.state.searchEmail){
            return;
        }
        this.setState({
            showProfile: true
        });
        if(this.state.searchEmail){
            this.setState({
                result: {
                    userId: '7',
                    userName: 'testing 7',
                    userEmail: this.state.searchEmail,
                    status: "..."
                }
            }, () => {
                this.setState({
                    searchEmail: ''
                })
            })
        } else {
            this.setState({
                result: {}
            })
        }
    }

    handleClose = () => {
        this.setState({
            showProfile: false
        });
    }

    render() {
        return (
            <Form inline>
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <FormControl type="text" id="searchEmail" placeholder="Search" className="mr-sm-2" value={this.state.searchEmail} onChange={this.handleSearchChange} />
                            <Button variant="outline-info" onClick={this.searchUserByEmail}>Search</Button>
                        </Col>
                    </Row>
                </Container>
                {this.state.result &&  <Modal show={this.state.showProfile} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.result.userName} ({this.state.result.userEmail})</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.result.status}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={this.handleClose}>
                            Add friend
                        </Button>
                    </Modal.Footer>
                </Modal>}

            </Form>
        )
    }
}

export default SearchBar;