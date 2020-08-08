import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';


class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                telnum: false,
                email: false
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        //if it is check box get value from its checked attribute otherwise get value from value attribute of input tag
        const name = target.name;
        // name is same  as this.state.property

        this.setState({
            [name]: value
        });

    }

    handleSubmit(event) {
        console.log("handleSubmit invoked" + JSON.stringify(this.state));
        alert("handleSubmit invoked" + JSON.stringify(this.state));
        event.preventDefault();
    }

    // this fn will recieve field as input and then event as evt
    // and ... means 'all those' input boxes have been modified, set their corresponding (touched) field as true
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true}
        });
    }

    validate(firstname, lastname, telnum, email) {
        const errors = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: ''
        };

        if(this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be >= 3 characters';
        else if(this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First Name should be <= 10 characters';
            
        if(this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last Name should be >= 3 characters';
        else if(this.state.touched.lastname && lastname.length > 10)
            errors.lastname = 'Last Name should be <= 10 characters';
            
        const reg = /^\d+$/;
        if(this.state.touched.telnum && !reg.test(telnum) )
            errors.telnum = 'Tel. Number should contain only numbers';
        else if(this.state.touched.telnum && telnum.length !== 10)
            errors.telnum = 'Tel. Number should be = 10 numbers';
            
        if(this.state.touched.email && email.split('').filter( x => x == '@').length !== 1 )
            errors.email = 'Email should contain a @';

        return errors;
    }

    // we will invoke validate fn in render because
    // whenever there is a change in input fields, the form will be re-rendered
    // so this is the best place to call validate fn 
    render() {

        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
        
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10} >
                                    <Input name="firstname" type="text" id="firstname"
                                        placeholder="First Name" value={this.state.firstname}
                                        valid={this.state.touched.firstname === true && errors.firstname === ''}
                                        invalid={errors.firstname!==''}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('firstname')} />
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10} >
                                    <Input name="lastname" type="text" id="lastname"
                                        placeholder="Last Name" value={this.state.lastname}
                                        valid={this.state.touched.lastname === true && errors.lastname === ''}
                                        invalid={errors.lastname!==''}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('lastname')} />
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10} >
                                    <Input name="telnum" type="tel" id="telnum"
                                        placeholder="Tel. Number" value={this.state.telnum}
                                        valid={this.state.touched.telnum === true && errors.telnum === ''}
                                        invalid={errors.telnum!==''}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('telnum')} />
                                    <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10} >
                                    <Input name="email" type="email" id="email"
                                        placeholder="Email" value={this.state.email}
                                        valid={this.state.touched.email === true && errors.email === ''}
                                        invalid={errors.email!==''}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('email')} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree"
                                                checked={this.state.agree} 
                                                onChange={this.handleInputChange} /> {' '}
                                                <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size:3, offset: 1}}>
                                    <Input type="select" name="contactType" 
                                        value={this.state.contactType}
                                        onChange={this.handleInputChange} >
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10} >
                                    <Input name="message" type="textarea" id="message"
                                        rows="12" value={this.state.message}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}} >
                                    <Button type="submit" color="primary" >
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
   
}

export default Contact;

// with label instead of for use htmlFor because if not then it will be confused with JS's for
//md={2} means for med to xl screen size it will occupy 2 columns.
//<Col md={10}> is same as <div class="col-md-10"
// when we tie the input with state as value={this.state.firstname} then it becomes controlled form
// <Col md={{size:6, offset: 2}}> means this col will occupy 6 col with an offset of 2 columns. here we
// passed {size:6, offset: 2} as JS object