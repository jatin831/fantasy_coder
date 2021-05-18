import React, { Component } from 'react';
import './ContactData.css';
import { Link } from 'react-router-dom';
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class ContactData extends Component  {

    state = {
        contactForm: {
            firstName: {
              value: '',
              validation: {
                required: true,
              },
              showErrMssg: false,
              errMssg: "Enter Your First Name",
              valid: false
            },
            lastName: {
              value: '',
              validation: {
                required: true,
              },
              showErrMssg: false,
              errMssg: "Enter Your Last Name",
              valid: false
            },
            email: {
              value: '',
              validation: {
                required: true,
                type: 'email'
              },
              showErrMssg: false,
              errMssg: "Enter a Valid Email",
              valid: false
            },
            address: {
              value: '',
              validation: {
                required: true
              },
              showErrMssg: false,
              errMssg: "Enter Your Address",
              valid: false
            },
            city: {
              value: '',
              validation: {
                required: true
              },
              showErrMssg: false,
              errMssg: "Enter Your City",
              valid: false
            },
            postalCode: {
              value: '',
              validation: {
                required: true,
                type: "number",
                length: 6
              },
              showErrMssg: false,
              errMssg: "Enter a 6-Digit Zip Code",
              valid: false
            },
            state: {
              value: '',
              validation: {
                required: true
              },
              showErrMssg: false,
              errMssg: "Enter Your State",
              valid: false
            },
            phone: {
              value: '',
              validation: {
                required: true,
                type: 'number',
                minLength: 10,
                maxLength: 11
              },
              showErrMssg: false,
              errMssg: "Enter a Valid Phone Number",
              valid: false
            },
            aptNo: {
              value: '',
              validation: {
              },
              valid: true
            },
          },
          isFormValid: false ,
          url: null
    }

    componentDidMount() {
      let shippingDetails = localStorage.getItem('Codeium__shippingDetails');
      if (shippingDetails) {
        shippingDetails = JSON.parse(shippingDetails);
      } else {
        shippingDetails = {};
      }

      const contactForm = {
        ...this.state.contactForm
      }
      for (let key in shippingDetails) {
        contactForm[key] = {
          ...contactForm[key],
          value: shippingDetails[key],
          valid: true
        }
      }

      this.setState({
        contactForm: contactForm,
        isFormValid: true
      })
    }

    saveContactData = (contactData) => {
      localStorage.setItem('Codeium__shippingDetails', JSON.stringify(contactData));
    }

    // handlePostRequest = () => {
    //   const BASE_URL = "https://securegw-stage.paytm.in";
    //   const url = BASE_URL + '/theia/processTransaction';
    //   const transaction_data = {
    //     "MID": "wKvHLC50416086372235",
    //     "WEBSITE": "WEBSTAGING",
    //     "INDUSTRY_TYPE_ID": "Retail",
    //     "ORDER_ID": "xyz007",
    //     "CUST_ID": "007",
    //     "TXN_AMOUNT": "100.00",
    //     "CHANNEL_ID": "WEB",
    //     "MOBILE_NO": "7777777777",
    //     "EMAIL": "example@paytm.com",
    //     "CALLBACK_URL": "http://127.0.0.1:5000/callback"
    //   }
    //   // console.log(this.props.history);
    //   this.setState({url: url});
    // }
    
    InputChangeHandler = (event) => {
        let inputValue = event.target.value;
        let inputName = event.target.name;
        let validInputType = this.state.contactForm[inputName].validation.type;

        if ((validInputType === "number" && isNaN(Number(inputValue)))) {
          return;
        }

        const contactForm = { 
            ...this.state.contactForm 
        };

        const contactData = {
            ...this.state.contactForm[inputName]
        }
        contactData.value = inputValue;
        contactData.valid = this.checkValidity(inputValue, contactData.validation);
        if (contactData.valid) {
          contactData.showErrMssg = false;
        }
        contactForm[inputName] = contactData;

        let formIsValid = true;
        for (let key in contactForm) {
            formIsValid = contactForm[key].valid && formIsValid;
        }
         
        this.setState({contactForm: contactForm, isFormValid: formIsValid});
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!value) {
          isValid = false;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.length) {
            isValid = value.length == rules.length  && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength  && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength  && isValid;
        }

        if (rules.type === 'email') {
            isValid = validateEmail(value) && isValid;
        }

        return isValid;
    }

    formSubmitHandler = (event) => {
      event.preventDefault();
      if (this.state.isFormValid) {
        const contactData = {};
        for (let key in this.state.contactForm) {
          contactData[key] = this.state.contactForm[key].value;
        }
        this.saveContactData(contactData);
        this.props.formSubmit();
      } else {
        const contactForm = { 
          ...this.state.contactForm 
        };
        for (let key in this.state.contactForm) {
          if (!this.state.contactForm[key].valid) {

            const contactData = {
                ...this.state.contactForm[key]
            };

            contactData.showErrMssg = true;
            contactForm[key] = contactData;
          }
        }
        this.setState({contactForm: contactForm});
      } 
    }

    render() {
        return (
            <>
                {
                  this.state.url ? <Redirect to={this.state.url} /> : null
                }
                <div className="Contact-Data">
                    <h1 className="ContactInfo-Head">Contact Information</h1>
                    <form className="mt-4">
                        <div className="row p-0 mx-0 my-3">
                            <div className="col-6 py-0 pl-0 pr-3">
                                <h6 className="Input-Label">FIRST NAME <span>*</span></h6>
                                <input 
                                    type="text" 
                                    placeholder="Enter Your First Name" 
                                    name="firstName"
                                    value={this.state.contactForm.firstName.value}
                                    onChange={this.InputChangeHandler}
                                    className={"Input " + (this.state.contactForm.firstName.showErrMssg ? "ErrorField" : "")} />
                                {
                                  this.state.contactForm.firstName.showErrMssg ? (
                                    <div className="Error-Mssg">
                                      {this.state.contactForm.firstName.errMssg}
                                    </div>
                                  ) : null
                                }
                                
                            </div>
                            <div className="col-6 py-0 pl-0 pr-3">
                                <h6 className="Input-Label">LAST NAME <span>*</span></h6>
                                <input 
                                    type="text" 
                                    placeholder="Enter Your Last Name" 
                                    name="lastName"
                                    value={this.state.contactForm.lastName.value}
                                    onChange={this.InputChangeHandler}
                                    className={"Input " + (this.state.contactForm.lastName.showErrMssg ? "ErrorField" : "")} />
                                {
                                  this.state.contactForm.lastName.showErrMssg ? (
                                    <div className="Error-Mssg">
                                      {this.state.contactForm.lastName.errMssg}
                                    </div>
                                  ) : null
                                }
                            </div>
                        </div>
                        <div className="row p-0 mx-0 my-3">
                            <div className="col-12 p-0 pr-3">
                                <h6 className="Input-Label">EMAIL <span>*</span></h6>
                                <input 
                                    type="text" 
                                    placeholder="name@example.com"
                                    name="email" 
                                    value={this.state.contactForm.email.value}
                                    onChange={this.InputChangeHandler}
                                    className={"Input " + (this.state.contactForm.email.showErrMssg ? "ErrorField" : "")} />
                                {
                                  this.state.contactForm.email.showErrMssg ? (
                                    <div className="Error-Mssg">
                                      {this.state.contactForm.email.errMssg}
                                    </div>
                                  ) : null
                                }
                            </div>
                        </div>
                    
                        <h1 className="ContactInfo-Head mt-5">Shipping Address</h1>
                    
                        <div className="row p-0 mx-0 my-3">
                            <div className="col-8 py-0 pl-0 pr-3">
                                <h6 className="Input-Label">ADDRESS (SHIPPING) <span>*</span></h6>
                                <input 
                                    type="text" 
                                    placeholder="Address"
                                    name="address" 
                                    value={this.state.contactForm.address.value}
                                    onChange={this.InputChangeHandler}
                                    className={"Input " + (this.state.contactForm.address.showErrMssg ? "ErrorField" : "")} />
                                {
                                  this.state.contactForm.address.showErrMssg ? (
                                    <div className="Error-Mssg">
                                      {this.state.contactForm.address.errMssg}
                                    </div>
                                  ) : null
                                }
                                
                            </div>
                            <div className="col-4 py-0 pl-0 pr-3">
                                <h6 className="Input-Label">APT ./ SUITE <span></span></h6>
                                <input 
                                    type="text" 
                                    placeholder="Apt ./ Suite" 
                                    name="aptNo"
                                    value={this.state.contactForm.aptNo.value}
                                    onChange={this.InputChangeHandler}
                                    className="Input" />
                            </div>
                        </div>
                        <div className="row p-0 mx-0 my-3">
                            <div className="col-8 py-0 pl-0 pr-3">
                                <h6 className="Input-Label"> CITY <span>*</span></h6>
                                <input 
                                    type="text" 
                                    placeholder="City" 
                                    name="city"
                                    value={this.state.contactForm.city.value}
                                    onChange={this.InputChangeHandler}
                                    className={"Input " + (this.state.contactForm.city.showErrMssg ? "ErrorField" : "")} />
                                {
                                  this.state.contactForm.city.showErrMssg ? (
                                    <div className="Error-Mssg">
                                      {this.state.contactForm.city.errMssg}
                                    </div>
                                  ) : null
                                }
                                
                            </div>
                            <div className="col-4 py-0 pl-0 pr-3">
                                <h6 className="Input-Label">POSTAL CODE<span>*</span></h6>
                                <input 
                                    type="text" 
                                    placeholder="ZIP" 
                                    name="postalCode"
                                    value={this.state.contactForm.postalCode.value}
                                    onChange={this.InputChangeHandler}
                                    className={"Input " + (this.state.contactForm.postalCode.showErrMssg ? "ErrorField" : "")} />
                                {
                                  this.state.contactForm.postalCode.showErrMssg ? (
                                    <div className="Error-Mssg">
                                      {this.state.contactForm.postalCode.errMssg}
                                    </div>
                                  ) : null
                                }
                            </div>
                        </div>
                        <div className="row p-0 mx-0 my-3">
                            <div className="col-6 py-0 pl-0 pr-3">
                                <h6 className="Input-Label"> STATE <span>*</span></h6>
                                <input 
                                    type="text" 
                                    placeholder="State" 
                                    name="state"
                                    value={this.state.contactForm.state.value}
                                    onChange={this.InputChangeHandler}
                                    className={"Input " + (this.state.contactForm.state.showErrMssg ? "ErrorField" : "")} />
                                {
                                  this.state.contactForm.state.showErrMssg ? (
                                    <div className="Error-Mssg">
                                      {this.state.contactForm.state.errMssg}
                                    </div>
                                  ) : null
                                }
                                
                            </div>
                            <div className="col-6 py-0 pl-0 pr-3">
                                <h6 className="Input-Label">COUNTRY <span></span></h6>
                                <input 
                                    type="text" 
                                    placeholder="Country" 
                                    value="India"
                                    readOnly
                                    name="country" 
                                    className="Input"/>
                            </div>
                        </div>
                        <div className="row p-0 mx-0 my-3">
                            <div className="col-12 p-0 pr-3">
                                <h6 className="Input-Label">PHONE <span>*</span></h6>
                                <div className={"PhoneInput " + (this.state.contactForm.phone.showErrMssg ? "ErrorField" : "")}>
                                    <div style={{fontSize: '14px', paddingTop: '4px'}}>
                                        +91
                                    </div>
                                    <input 
                                    type="text" 
                                    placeholder="Enter you phone number" 
                                    name="phone"
                                    value={this.state.contactForm.phone.value}
                                    onChange={this.InputChangeHandler}
                                    className={"Input "} />
                                    
                                </div>
                                {
                                  this.state.contactForm.phone.showErrMssg ? (
                                    <div className="Error-Mssg">
                                      {this.state.contactForm.phone.errMssg}
                                    </div>
                                  ) : null
                                }
                            </div>
                        </div>
                        <div className="Form-Footer row mx-0 my-5">
                            <div className="col-4 d-flex align-items-center">
                                <Link className="Footer-Back" to="/store/cart">&lt; Back to cart</Link>
                            </div>
                            <div className="col-8">
                                <button onClick={this.formSubmitHandler} className="btn BootstrapButton btn-dark btn-block btn-lg p-2 py-3">Continue to payment method</button>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </>
        )
    }
    
}

export default ContactData;