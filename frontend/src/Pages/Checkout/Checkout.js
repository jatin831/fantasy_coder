import React, { Component } from "react";
import { storeShippingDetails } from '../ReduxStore/slices/cartSlice';
import Logo from "../MerchandiseStore/Logo/Logo";
import "./Checkout.css";
import { Link, Redirect } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import ContactData from "./ContactData/ContactData";
import CheckoutDetails from './CheckoutDetails/CheckoutDetails';
import axios from 'axios';
import { connect } from "react-redux";

class Checkout extends Component {
  state = {
    currentTab: "shipping",
    checkSumHash: null,
    orderId: null,
    responseData: {},
    user_Id: null,
    discountedPrice: 0,
  };

  componentDidMount() {
    let shippingDetails = localStorage.getItem('Codeium__shippingDetails');
    if (shippingDetails) {
      shippingDetails = JSON.parse(shippingDetails);
      this.setState({contactData: shippingDetails});
    }
  }

  changeTabHandler = (targetTab) => {
    if (targetTab === this.state.currentTab) {
      return;
    }
    this.setState({ currentTab: targetTab });
  };

  formSubmit = async () => {
    this.setState({
      currentTab: 'payment'
    })
    const stringifiedData = {
      "username": "test5",
      "password" :  "Test@456789"
    }
    await axios.post('https://server.codeium.tech/login', stringifiedData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })

    const currData = this.state.contactData;
    let totalPrice = this.props.cartProducts.reduce((total, el) => total + (el.quantity * el.perUnitPrice), 0);
    totalPrice = (totalPrice * (1 - this.props.discount * 0.01)).toFixed(2);
    totalPrice = parseFloat(totalPrice);
    this.setState({
      discountedPrice: totalPrice
    })
    console.log(totalPrice);
    let sendData = {
      username: 'test5',
      total_price: totalPrice,
      contact_person: currData.firstName + " " + this.state.contactData.lastName,
      contact_email: this.state.contactData.email,
      phone_number: this.state.contactData.phone,
      delivery_address: currData.address + " " + (currData.aptNo ? currData.aptNo + " " : "") + currData.city + " " + currData.state + " " + currData.postalCode,
      coins_used: this.props.coinsUsed,
      products:  this.props.cartProducts.map(product => ({
        ...product,
        img: null,
        product_id: product.id,
        size: 'S'
      }))
    }
    console.log(this.props.discount);
    // sendData = JSON.stringify(sendData);
    axios.post("https://server.codeium.tech/payment", sendData)
      .then(response => {
        const checkSumHash = response.data.CHECKSUMHASH;
        this.setState({checkSumHash: checkSumHash, orderId: response.data.ORDER_ID, responseData: response.data});
      })
      .catch(err => {
        console.log(err);
      })
  }

  storeTransactionDetails = () => {
    localStorage.setItem('Codeium__transaction', JSON.stringify({
      orderId: this.state.responseData['ORDER_ID'],
      transactionDate: new Date().getTime(),
      transferAmount: this.state.discountedPrice
    }))
  }

  render() {
    const totalPrice = this.props.cartProducts.reduce((total, el) => total + (el.quantity * el.perUnitPrice), 0);
    let displayOutput = null;
    let paymentDetails = null;
    if (this.state.checkSumHash) {
      paymentDetails = (
        <div>
          <h1>Payment</h1>
          <form name="f1" action="https://securegw-stage.paytm.in/theia/processTransaction">
            { 
              Object.keys(this.state.responseData).map(inputKey => {
                  if (inputKey === 'TXN_AMOUNT') {
                    return <input key={inputKey} readOnly type="hidden" name={inputKey} value={this.state.discountedPrice} />
                  }
                  return <input key={inputKey} readOnly type="hidden" name={inputKey} value={this.state.responseData[inputKey]} />
              })  
            }
            {/* <script type="text/javascript" > f1.submit(); </script> */}
            <div className="row my-0">
              <div className="col-12 my-0 mx-auto">
                <button onClick={this.storeTransactionDetails} className="btn btn-lg btn-dark btn-block my-5">Pay &#8377;{(totalPrice * (1 - this.props.discount * 0.01)).toFixed(2)}</button>
              </div>
            </div>
          </form>
          
        </div>
      )
    }

    if (this.state.currentTab === "shipping") {
      displayOutput = <ContactData formSubmit={this.formSubmit} />;
    } else if (this.state.currentTab === "payment") {
      displayOutput = paymentDetails;
    }

    return (
      <div className="SuperContainer">
        <div className="Left-Col">
          <div className="Checkout-Container ">
            <div className="pb-2">
              <a href="/">
                <Logo />
              </a>
            </div>
            <div className="Directory">
              <Link to="/store">
                <span>Store</span>
              </Link>
              <span className="Directory-Icons">
                <BsChevronRight />
              </span>
              <Link to="/store/cart">
                <span>Cart</span>
              </Link>
              <span className="Directory-Icons">
                <BsChevronRight />
              </span>
              <span
                onClick={this.changeTabHandler.bind(this, "shipping")}
                className={
                  "Directory-Shipping " +
                  (this.state.currentTab === "shipping" ? "active" : "")
                }
              >
                Shipping
              </span>
              <span className="Directory-Icons">
                <BsChevronRight />
              </span>
              <span
                className={
                  "Directory-Payment " +
                  (this.state.currentTab === "payment" ? "active" : "")
                }
              >
                Payment
              </span>
            </div>
            <div className="Checkout-Content Border-Bottom-Light">
              {displayOutput}
            </div>
            <div className="Checkout-Footer mt-2">
              <ul className="nav pl-3 Footer-Links">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="Checkout-Details-Container">
              <CheckoutDetails />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartProducts: state.cart.cartProducts,
    discount: state.cart.discount,
    coinsUsed: state.cart.coinsUsed,
  }
}

const mapDispatchToProps = dispatch => {
  return  {
      storeShippingDetails: (shippingDetails) => dispatch(storeShippingDetails(shippingDetails))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
