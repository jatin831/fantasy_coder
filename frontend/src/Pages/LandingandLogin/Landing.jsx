import React, { Component } from 'react';
import AOS from 'aos';
import { Watch } from 'scrollmonitor-react';
import '../../assets/css/style.css';
import '../../assets/vendor/icofont/icofont.min.css';
import { Link, animateScroll as scroll } from "react-scroll";
import { Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse, Modal, ModalBody, NavLink, TabContent, TabPane, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import axios from 'axios';
import auth from "./auth";
import { Accordion, Button } from 'react-bootstrap';


export default Watch(
  class Landing extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isNavOpen: false,
        isModalOpen: false,
        activeTab: "1",
        loginError: "",
        signUpError: "",
        userLogin: {
          "username": '',
          "password": '',
          "remember": false
        },
        userSignUp: {
          "fname": '',
          "lname": '',
          "username": '',
          "email_id": '',
          "password": '',
          "cpassword": '',
        },
        touched: {
          username: '',
          email_id: '',
          password: '',
          cpassword: '',
        }
      }
      this.toggleNavbar = this.toggleNavbar.bind(this);
      this.scrollToTop = this.scrollToTop.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
      this.setActiveTab = this.setActiveTab.bind(this);
      this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
      this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
      this.handleLoginChange = this.handleLoginChange.bind(this);
      this.handleSignUpChange = this.handleSignUpChange.bind(this);
      this.validate = this.validate.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
    }
    toggleNavbar() { this.setState({ isNavOpen: !this.state.isNavOpen }); }
    toggleModal() { this.setState({ isModalOpen: !this.state.isModalOpen, activeTab: "1" }); }
    setActiveTab(selectedTab) { this.setState({ activeTab: selectedTab }); }
    scrollToTop = () => { scroll.scrollToTop(); };
    componentDidMount() { this.aos = AOS; this.aos.init({ duration: 1000, once: true }); }
    componentDidUpdate() { this.aos.refresh(); }

    handleBlur = (field) => (event) => {
      this.setState({
        touched: { ...this.state.touched, [field]: true }
      });
    }
    validate(username, email_id, password, cpassword) {
      const errors = {
        username: '',
        email_id: '',
        password: '',
        cpassword: ''
      };
      if (this.state.touched.username && username.length < 3)
        errors.username = 'Username should be greater than 3 characters long';

      const regex_email = /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$/;
      if (this.state.touched.email_id && !regex_email.test(email_id))
        errors.email_id = 'Enter a valid email address';

      const regex_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$/;
      if (this.state.touched.password && !regex_pass.test(password))
        errors.password = 'Password must have at least 1 number 1 uppercase and lowercase character, 1 special symbol and between 8 to 20 characters';

      if (this.state.touched.cpassword && !(password === cpassword))
        errors.cpassword = 'Passwords don\'t match';

      return errors;
    }
    handleLoginChange(event) {
      const target = event.target;
      const value = (target.type === 'checkbox') ? target.checked : target.value;
      const name = target.name;
      let { userLogin } = this.state;
      this.setState({
        userLogin: {
          ...this.state.userLogin,
          [name]: value
        }
      });
    }

    handleSignUpChange(event) {
      const target = event.target;
      const value = (target.type === 'checkbox') ? target.checked : target.value;
      const name = target.name;
      let { userSignUp } = this.state;
      this.setState({
        userSignUp: {
          ...this.state.userSignUp,
          [name]: value
        }
      });
    }

    // Handling log in through Async await 
    handleLoginSubmit = (event) => {
      event.preventDefault();
      const loginData = this.state.userLogin;
      const sendPostRequest = async () => {
        try {
          const res = await axios.post(`http://104.211.91.225:5000/login`, loginData);
          if (res.data.status === 200) {
            auth.login(() => {
              this.props.history.push("/user");
            });
          }
          else {
            this.setState({ loginError : "Invalid username or password!!" });
          }
        } catch (err) {
          this.setState({ loginError: "Error : Please, try again later!!" });
        }
      };
      sendPostRequest();
    }
    // Handling sign up through Async await 
    handleSignUpSubmit(event) {
      event.preventDefault();
      const signUpData = this.state.userSignUp;
      const sendPostRequest = async () => {
        try {
          const res = await axios.post(`http://104.211.91.225:5000/register`, signUpData);
          if (res.data.status === 200) {
            this.props.history.push("/user");
          }
          else {
            this.setState({ signUpError: res.data.msg });
          }
        } catch (err) {
          this.setState({ signUpError: "Error : Please, try again later!!" });
        }
      };
      sendPostRequest();
    }

    render() {
      const errors = this.validate(this.state.userSignUp.username, this.state.userSignUp.email_id, this.state.userSignUp.password, this.state.userSignUp.cpassword);
      return (
        <div className="">
          <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">
              <Navbar dark expand="md" style={{ width: "100%" }}>
                <div className="container">
                  <NavbarBrand className="mr-auto" href="/">
                    <h1 className="logo mr-auto">
                      <a className="nav-logo" onClick={this.scrollToTop}>O<span>z</span>one</a>
                    </h1>
                  </NavbarBrand>
                  <NavbarToggler onClick={this.toggleNavbar} className="ml-auto" />
                  <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar className="ml-auto d-flex align-items-center">
                      <NavItem>
                        <Link className="nav-link" to="hero"
                          activeClass="active"
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={500}>
                          Home
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link className="nav-link" to="about"
                          activeClass="active"
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={500}>
                          About
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link className="nav-link" to="faq"
                          activeClass="active"
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={500}>
                          F.A.Q
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link className="nav-link" to="contact"
                          activeClass="active"
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={500}>
                          Contact Us
                        </Link>
                      </NavItem>
                    </Nav>
                    <Nav className="ml-0 ml-md-2 d-flex align-items-center" navbar>
                      <NavItem className="nav-buttons">
                        <button className="btn btn-light" onClick={this.toggleModal}>Login</button>
                      </NavItem>
                    </Nav>
                  </Collapse>
                </div>
              </Navbar>
            </div>
            {/* Login and Sign Up Modal*/}
            <Modal id="loginSignUp" isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="login">
              <ModalBody className="auth-inner pt-5">
                <Nav tabs className="d-flex justify-content-center align-items-center mt-2 mb-2">
                  <NavItem className="w-50 text-center">
                    <NavLink className={this.state.activeTab == '1' ? 'active' : ''} onClick={() => this.setActiveTab('1')} style={{ cursor: "pointer" }}>
                      <h5 className="font-weight-bold pb-0 pt-2">Login</h5>
                    </NavLink>
                  </NavItem>
                  <NavItem className="w-50 text-center">
                    <NavLink className={this.state.activeTab == '2' ? 'active' : ''} onClick={() => this.setActiveTab('2')} style={{ cursor: "pointer" }}>
                      <h5 className="font-weight-bold pb-0 pt-2">Sign Up</h5>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab} className="mt-4">
                  <TabPane tabId="1">
                    {/* SIGN IN */}
                    <Form onSubmit={this.handleLoginSubmit}>
                      <FormGroup>
                        <Label className="font-weight-bold">Username or Email</Label>
                        <Input type="text" name="username" className="form-control" placeholder="Enter username or email" value={this.state.userLogin.email} onChange={this.handleLoginChange} required />
                      </FormGroup>
                      <FormGroup>
                        <Label className="font-weight-bold">Password</Label>
                        <Input type="password" id="password" name="password" className="form-control" placeholder="Enter password" value={this.state.userLogin.password} onChange={this.handleLoginChange} required />
                      </FormGroup>
                      <FormGroup>
                        <div className="custom-control custom-checkbox">
                          <Input type="checkbox" className="custom-control-input" id="remember" name="remember" value={this.state.userLogin.remember} onChange={this.handleLoginChange} />
                          <Label className="custom-control-label" htmlFor="remember" >Remember me</Label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <FormFeedback className="d-block">{this.state.loginError}</FormFeedback>
                      </FormGroup>
                      <button type="submit" className="btn btn-primary btn-block">Login</button>
                      <p className="forgot-password text-right">
                        <a href="#">Forgot password?</a>
                      </p>
                      
                    </Form>
                  </TabPane>
                  <TabPane tabId="2">
                    {/* SIGN UP */}
                    <Form onSubmit={this.handleSignUpSubmit}>
                      <FormGroup>
                        <label className="font-weight-bold">First name</label>
                        <input type="text" id="fname" name="fname" className="form-control" placeholder="First name" value={this.state.userSignUp.firstname} onChange={this.handleSignUpChange} required />
                      </FormGroup>
                      <FormGroup>
                        <label className="font-weight-bold">Last name</label>
                        <input type="text" id="lname" name="lname" className="form-control" placeholder="Last name" value={this.state.userSignUp.lastname} onChange={this.handleSignUpChange} required />
                      </FormGroup>
                      <FormGroup>
                        <label className="font-weight-bold">Username</label>
                        <input type="text" id="username" name="username" className="form-control" placeholder="User name" value={this.state.userSignUp.username} onChange={this.handleSignUpChange} required
                          onBlur={this.handleBlur('username')} valid={errors.username === ''} invalid={errors.username !== ''}
                        />
                        <FormFeedback>{errors.username}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <label className="font-weight-bold">Email address</label>
                        <input type="email" name="email_id" className="form-control" placeholder="Enter email" value={this.state.userSignUp.email} onChange={this.handleSignUpChange} required
                          onBlur={this.handleBlur('email_id')} valid={errors.email_id === ''} invalid={errors.email_id !== ''}
                        />
                        <FormFeedback>{errors.email_id}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <label className="font-weight-bold">Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Enter password" value={this.state.userSignUp.password} onChange={this.handleSignUpChange} required
                          onBlur={this.handleBlur('password')} valid={errors.password === ''} invalid={errors.password !== ''}
                        />
                        <FormFeedback>{errors.password}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <label className="font-weight-bold">Confirm Password</label>
                        <input type="password" name="cpassword" className="form-control" placeholder="Confirm password" value={this.state.userSignUp.cnfPassword} onChange={this.handleSignUpChange} required
                          onBlur={this.handleBlur('cpassword')} valid={errors.cpassword === ''} invalid={errors.cpassword !== ''}
                        />
                        <FormFeedback>{errors.cpassword}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <FormFeedback className="d-block">{this.state.signUpError}</FormFeedback>
                      </FormGroup>
                      <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                      <p className="forgot-password text-right">
                        Already registered <a className="or-signin" style={{ color: "#167BFF" }} onClick={() => this.setActiveTab('1')} >sign in?</a>
                      </p>
                    </Form>
                  </TabPane>
                </TabContent>
              </ModalBody>
            </Modal>
          </header><br /><br />
          <section id="hero" className="text-dark">
            <div className="container" >
              <div className="row">
                <div className="col col-12 col-md-8">
                  <h1>Welcome to <span>Ozone</span>
                  </h1>
                  <h2>A place to explore the re-defined version of competitive coding..</h2>
                  <div className="d-flex">
                    <a className="btn-get-started scrollto" style={{ cursor: "pointer" }} onClick={this.toggleModal}>Get Started</a>
                  </div>
                </div>
                <div className="col col-12 col-md-4 ">
                  <img src="./assets/img/2842681.jpg" alt="" width="100%" height="100%" />
                </div>
              </div>
            </div>
          </section>
          <main id="main">
            <section id="featured-services" className="featured-services section-bg">
              <div className="container" data-aos="fade-up">
                <div className="row d-flex justify-content-around">
                  <div className="col-md-6 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0">
                    <a href="">
                      <div className="icon-box" data-aos={"fade-up"} data-aos-delay={"100"}>
                        <div className="icon"><i className="bx bx-file"></i></div>
                        <h4 className="title">Practice CP</h4>
                        <p className="description">Check out some practice problems to boost your competitive coding skills.</p>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-6 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0">
                    <a href="">
                      <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
                        <div className="icon"><i className="bx bx-world"></i></div>
                        <h4 className="title">Contests</h4>
                        <p className="description">Take a test of your coding skills to experience the real competition.</p>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-6 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0">
                    <a href="/store">
                      <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
                        <div className="icon"><i className="bx bx-store"></i></div>
                        <h4 className="title">Merchandise Store</h4>
                        <p className="description">Check out our store for some exclusive goodies.</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section id="about" className="about section-bg bg-white">
              <div className="container" data-aos="fade-up">
                <div className="section-title">
                  <h3>Find Out More <span>About Us</span></h3>
                  <p>Ozone was initiated with a mission to help students learn competitive coding along with some exciting monetary rewards.</p>
                </div>
                <div className="row">
                  <div className="col-lg-6" data-aos="zoom-out" data-aos-delay="100">
                    <img src="assets/img/AdobeStock_296042529.jpeg" className="img-fluid" alt="" />
                  </div>
                  <div className="col-lg-6 pt-4 pt-lg-0 content d-flex flex-column justify-content-center" data-aos="fade-up"
                    data-aos-delay="100">
                    <h3>With us you find a chance to explore the re-defined version of competitive coding.</h3>
                    <p className="font-italic">
                      We provide you a chance to learn CP and earn coins through :-
                  </p>
                    <ul>
                      <li>
                        <i className="bx bx-store-alt"></i>
                        <div>
                          <h5>Our Practice Problems</h5>
                          <p>Each solved problem will earn you coins.</p>
                        </div>
                      </li>
                      <li>
                        <i className="bx bx-images"></i>
                        <div>
                          <h5>Regular Contests</h5>
                          <p>Earn special coins on the basis of your contest rank.</p>
                        </div>
                      </li>
                    </ul>
                    <p>
                      Redeem your coins at our merchandise store to buy some exclusive goodies and avail some bumper discounts.
                  </p>
                  </div>
                </div>
              </div>
            </section>
            <section id="faq" className="faq section-bg"><br /><br />
              <div className="container" data-aos="fade-up">
                <div className="section-title">
                  <h3>Frequently Asked <span>Questions</span></h3>
                  <p>Facing any query, get it resolved here.</p>
                </div>
                <ul className="faq-list" data-aos="fade-up" data-aos-delay="100">
                  <Accordion defaultActiveKey="0">
                    <li>
                      <div>
                        <Accordion.Toggle as={Button} style={{ whiteSpace: "normal", textAlign: "left" }} variant="link" eventKey="0">
                          Is this platform just for students?
                      </Accordion.Toggle>
                      </div>
                      <Accordion.Collapse eventKey="0">
                        <p>This platform is open for any coding enthusiast.</p>
                      </Accordion.Collapse>
                    </li>
                    <li>
                      <div>
                        <Accordion.Toggle as={Button} style={{ whiteSpace: "normal", textAlign: "left" }} variant="link" eventKey="1">
                          How to earn coins through problems and contests?
                        </Accordion.Toggle>
                      </div>
                      <Accordion.Collapse eventKey="1">
                        <p>Each problem in our practice section is associated with a certain number of coins which you gain after solving it. Also
                        our contests provide you coins on the basis of your rank.</p>
                      </Accordion.Collapse>
                    </li>
                    <li>
                      <div>
                        <Accordion.Toggle as={Button} style={{ whiteSpace: "normal", textAlign: "left" }} variant="link" eventKey="2">
                          How and where to redeem coins ?
                        </Accordion.Toggle>
                      </div>
                      <Accordion.Collapse eventKey="2">
                        <p>Our merchandise store provides you a way to redeem your coins to buy some exclusive products. You can also avail heavy
                        discounts using the coins.</p>
                      </Accordion.Collapse>
                    </li>
                    <li>
                      <div>
                        <Accordion.Toggle as={Button} style={{ whiteSpace: "normal", textAlign: "left" }} variant="link" eventKey="3">
                          Where can I find my collected coins?
                        </Accordion.Toggle>
                      </div>
                      <Accordion.Collapse eventKey="3">
                        <p>Once you create your profile, you can find your total collected coins.</p>
                      </Accordion.Collapse>
                    </li>
                    <li>
                      <div>
                        <Accordion.Toggle as={Button} style={{ whiteSpace: "normal", textAlign: "left" }} variant="link" eventKey="4">
                          Still didn’t answer your question?
                        </Accordion.Toggle>
                      </div>
                      <Accordion.Collapse eventKey="4">
                        <p>Contact us at any Social Media or through the form given below.</p>
                      </Accordion.Collapse>
                    </li>
                  </Accordion>
                </ul>
              </div>
            </section>
            <section id="contact" className="contact">
              <div className="container" data-aos="fade-up">
                <div className="section-title">
                  <h3><span>Contact Us</span></h3>
                  <p>We’d love to hear from you! </p>
                </div>
                <div className="row" data-aos="fade-up" data-aos-delay="100">
                  <div className="col-12 col-md-6">
                    <div className="row" data-aos="fade-up" data-aos-delay="100">
                      <div className="col-12">
                        <div className="info-box mb-4">
                          <i className="bx bx-map"></i>
                          <h3>Our Address</h3>
                          <p>A108 Adam Street, New York, NY 535022</p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="info-box  mb-4">
                          <i className="bx bx-envelope"></i>
                          <h3>Email Us</h3>
                          <p>contact@example.com</p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="info-box  mb-4">
                          <i className="bx bx-phone-call"></i>
                          <h3>Call Us</h3>
                          <p>+1 5589 55488 55</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="row d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
                      <div className="col-12">
                        <form action="" method="post" role="form" className="email-contact-form">
                          <div className="form-row">
                            <div className="col form-group">
                              <input type="text" name="name" className="form-control" id="name" placeholder="Your Name"
                                data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                              <div className="validate"></div>
                            </div>
                            <div className="col form-group">
                              <input type="email" className="form-control" name="email" id="email" placeholder="Your Email"
                                data-rule="email" data-msg="Please enter a valid email" />
                              <div className="validate"></div>
                            </div>
                          </div>
                          <div className="form-group">
                            <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject"
                              data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                            <div className="validate"></div>
                          </div>
                          <div className="form-group">
                            <textarea className="form-control" name="message" rows="5" data-rule="required"
                              data-msg="Please write something for us" placeholder="Message"></textarea>
                            <div className="validate"></div>
                          </div>
                          <div className="mb-3">
                            <div className="loading">Loading</div>
                            <div className="error-message"></div>
                            <div className="sent-message">Your message has been sent. Thank you!</div>
                          </div>
                          <div className="text-center"><button style={{ cursor: "pointer" }} type="submit">Send Message</button></div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <footer id="footer">
            <section className="footer-top">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-6 footer-contact">
                    <h2>O<span style={{ color: "#f0c017" }}>z</span>one</h2>
                    <p>
                      A108 Adam Street <br />
                    New York, NY 535022<br />
                    United States <br /><br />
                      <strong>Phone:</strong> +1 5589 55488 55<br />
                      <strong>Email:</strong> info@example.com<br />
                    </p>
                  </div>
                  <div className="col-lg-3 col-md-6 footer-links">
                    <h4>Useful Links</h4>
                    <ul>
                      <li><i className="bx bx-chevron-right"></i>
                        <a href="">
                          <Link to="hero"
                            activeClass="active"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}>Home
                        </Link></a>
                      </li>
                      <li><i className="bx bx-chevron-right"></i>
                        <a href="">
                          <Link to="about"
                            activeClass="active"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}>About us
                        </Link>
                        </a>
                      </li>
                      <li><i className="bx bx-chevron-right"></i>
                        <a href="">
                          <Link to="faq"
                            activeClass="active"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}>
                            F.A.Q
                        </Link>
                        </a>
                      </li>
                      <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                      <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 footer-links ml-auto">
                    <h4>Our Social Networks</h4>
                    <p>Follow us at our Social handles to get all the updates.</p>
                    <div className="social-links mt-3">
                      <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                      <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                      <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                      <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                      <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </footer>

        </div>
      );
    }
  });