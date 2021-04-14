import React, { Component } from "react";
import Logo from "../MerchandiseStore/Logo/Logo";
import "./Checkout.css";
import { Link, Redirect } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import ContactData from "./ContactData/ContactData";
import CheckoutDetails from './CheckoutDetails/CheckoutDetails';
import axios from 'axios';

class Checkout extends Component {
  state = {
    currentTab: "shipping",
    contactData: {},
    checkSumHash: null
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:5000/")
      .then(response => {
        console.log(response);
        const checkSumHash = response.data.CHECKSUMHASH;
        this.setState({checkSumHash: checkSumHash});
      })
    
  }

  changeTabHandler = (targetTab) => {
    if (targetTab === this.state.currentTab) {
      return;
    }
    this.setState({ currentTab: targetTab });
  };

  saveContactData = (contactData) => {
    this.setState({contactData: contactData, currentTab: 'payment'});
  }

  render() {
    let displayOutput = null;
    let paymentDetails = null;
    console.log(this.state.checkSumHash);
    if (this.state.checkSumHash) {
      console.log(this.state.checkSumHash);
      paymentDetails = (
        <div>
          <h1>Payment</h1>
          {console.log(this.state.checkSumHash)}
          <form name="f1" action="https://securegw-stage.paytm.in/theia/processTransaction">
            <input   name="MID" value="wKvHLC50416086372235"/>
            <input   name="WEBSITE" value="WEBSTAGING"/>
            <input   name="INDUSTRY_TYPE_ID" value="Retail"/>
            <input   name="ORDER_ID" value="xyz007"/>
            <input   name="CUST_ID" value="007"/>
            <input   name="TXN_AMOUNT" value="100.00"/>
            <input   name="CHANNEL_ID" value="WEB"/>
            <input   name="MOBILE_NO" value="7777777777"/>
            <input   name="EMAIL" value="example@paytm.com"/>
            <input   name="CALLBACK_URL" value="http://127.0.0.1:5000/callback"/>
            <input   name="CHECKSUMHASH" value={this.state.checkSumHash} />
            <script type="text/javascript" > f1.submit(); </script>
            <button>Submit URL</button>
          </form>
          
        </div>
      )
    }

    if (this.state.currentTab === "shipping") {
      displayOutput = <ContactData
                        saveContactData={this.saveContactData} 
                        currContactData={this.state.contactData}
                        />;
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

export default Checkout;
