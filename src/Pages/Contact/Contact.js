import classNames from 'classnames/bind';
import React from 'react';
import GoogleMap from './GoogleMap';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './Contact.module.scss';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col md={6}>
                        <GoogleMap />
                    </Col>
                    <Col md={6}>
                        <div className={cx('contactForm')}>
                            <h2>Contact Us</h2>
                            <Form>
                                <Form.Group controlId="formFullName">
                                    <Form.Label>Full Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your full name" required />
                                </Form.Group>

                                <Form.Group controlId="formPhoneNumber">
                                    <Form.Label>Phone Number:</Form.Label>
                                    <Form.Control type="tel" placeholder="Enter your phone number" required />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email address" required />
                                </Form.Group>

                                <Form.Group controlId="formMessage">
                                    <Form.Label>Message:</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Type your message" required />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Contact;
