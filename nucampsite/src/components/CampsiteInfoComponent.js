import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }



    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
        //alert(`Author: ${this.author.value} Rating: ${this.rating.value} Text: ${this.text.checked}`);
        this.toggleModal();
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                    <Control.select
                                        model=".rating"
                                        id="rating"
                                        name="rating"
                                        className="form-control"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                            </div>
                            
                            <div className="form-group">
                                <Label htmlFor="author">Author</Label>
                                    <Control.text 
                                        model=".author" 
                                        id="author" 
                                        name="author" 
                                        className="form-control" 
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />

                            </div>

                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                    <Control.textarea 
                                        model=".text" 
                                        id="text" 
                                        name="text"
                                        rows="6"
                                        className="form-control"
                                    />
                            </div>

                            <div className="form-group">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </div>

                        </LocalForm>              
                    </ModalBody>
                </Modal>

                <Button 
                    outline 
                    type="submit" 
                    onClick={this.toggleModal}
                    color="primary">
                    <i className="fa fa-pencil fa-lg" />
                        Submit Comment
                </Button>
            </div>
        );
    }
}


function RenderCampsite({campsite}) {

        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

function RenderComments({comments}) {
        
        if(comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map( comment => <ul><li key={comment.id}>{comment.text} <br />
                    -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li></ul> )}
                    <CommentForm />
                </div>
            );
        } 
            
        return (<div />);
    }

function CampsiteInfo(props) {
    if(props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    } 
    return (<div />);        
}


export default CampsiteInfo;
