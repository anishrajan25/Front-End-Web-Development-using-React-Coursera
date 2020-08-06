import React ,{Component } from 'react';
import { Button, Row, Label, Modal, ModalHeader, ModalBody, Col } from "reactstrap";
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = (val) => (val) && val.length;
const minLength = (len) => (val) => (val) && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len)

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log("handleSubmit invoked" + JSON.stringify(values));
        alert("handleSubmit invoked" + JSON.stringify(values));
        this.toggleModal();
    }

    toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });
    
    render() {
        return(
            <div>
                <Button outline color="secondary" onClick={this.toggleModal} >
                    <span className="fa fa-pencil fa-lg"></span>{' '}Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => {this.handleSubmit(values)}}>
                            <Row className="form-group">
                                <Label htmlFor='rating' sm={12} >Rating</Label>
                                <Col sm={12} >
                                    <Control.select model='.rating' name='rating'
                                        className='form-control'>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" sm={12}>Your Name</Label>
                                <Col sm={12} >
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" sm={12}>Comment</Label>
                                <Col sm={12} >
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col sm={12} >
                                    <Button type="submit" color="primary" >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default CommentForm;