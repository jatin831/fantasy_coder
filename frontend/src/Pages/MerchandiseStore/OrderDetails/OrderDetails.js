import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "./OrderDetails.css";
import axios from "axios";
import CoinImg from '../../../assets/img/coin.png';
import Spinner from '../Spinner/Spinner';

const convertIST = (d) => {
  let date = new Date(d).getTime();
  let offset = new Date(d).getTimezoneOffset() * 60000;
  return new Date(offset + date).toLocaleString();
}

class OrderDetails extends Component {
  state = {
    orderDetails: null,
    loading: false
  };

  componentDidMount() {
    this.setState({
      loading: true
    })
    const orderId = this.props.match.params.id;
    axios.get('https://server.codeium.tech/orders/' + orderId)
      .then(res => {
        this.setState({
          orderDetails: res.data.msg[0],
          loading: false
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        })
      })
  }

  render() {

    let statusText = "is currently being prepared";
    if (this.state.orderDetails?.order_status === 'delivered') {
      statusText = "was delivered";
    } else if (this.state.orderDetails?.order_status === 'cancelled') {
      statusText = "was cancelled ";
    }

    let totalAmount = this.state.orderDetails?.products.reduce((total, product) => (
        total + parseFloat(product.total)
      ), 0).toFixed(2)

    return this.state.loading ? <Spinner /> : (
      <div className="container p-3">
        <div className="row">
          <div className="col-12 my-4 d-flex flex-column align-items-center justify-content-center mx-auto">
            <h1 className="text-sm-26">Order Details</h1>
            <p className="mt-4 mb-3 text-sm-14">The Order <span className="text-secondary">#{this.state.orderDetails?.order_id}</span> was placed on {this.state.orderDetails ? convertIST(this.state.orderDetails.date_of_purchase) : null} and {statusText} </p>
            <Table
              className="mt-4 text-center table-responsive-sm"
              borderless
              hover
            >
              <thead>
                <tr>
                  <th>
                    <span>Item</span>
                  </th>
                  <th>
                    <span>Price</span>
                  </th>
                  <th>
                    <span>Quantity</span>
                  </th>
                  <th>
                    <span>Total</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.orderDetails?.products.map((product) => {
                  return (
                    <tr key={product.product_id}>
                      <td className="ProductData">
                        <div className="d-flex justify-content-center  align-items-center">
                          <div className="OrderDetail-ImgContainer">
                            <a
                              className="OrderDetails-ProductName"
                              href={"/store/product/" + product.product_id}
                            >
                              <img src={`data:image/png;base64, ${product.front_image.slice(2, -1)}`} />
                            </a>
                          </div>
                          <div className="d-flex flex-column text-left pl-3">
                            <a
                              className="OrderDetails-ProductName"
                              href={"/store/product/" + product.product_id}
                            >
                              {product.product_name}
                            </a>
                            <p className="text-muted">category: {product.product_category}</p>
                            <p className="text-muted">size: {product.size}</p>
                          </div>
                        </div>
                      </td>
                      <td>&#8377;{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>&#8377;{product.total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="container mt-4">
              <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="Card">
                      <h6>ORDER SUMMARY</h6>
                      <ul className="OrderSummary-List">
                        <li>
                          <div>
                            Order Subtotal
                          </div>
                          <div>
                            &#8377;{totalAmount}
                          </div>
                        </li>
                        <li>
                          <div>
                            Coins Used
                          </div>
                          <div>
                            {this.state.orderDetails?.coins_used}
                            <img className="Cart_CoinImg" src={CoinImg} alt="Coins" />
                          </div>
                        </li>
                        <li>
                          <div>
                            Discount
                          </div>
                          <div>
                            &#8377;{totalAmount - this.state.orderDetails?.total_price}
                          </div>
                        </li>
                        <li>
                          <div>
                            Total
                          </div>
                          <div>
                            <span className="TotalAmount-Span">
                              &#8377;{this.state.orderDetails?.total_price}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="Card">
                      <h6>SHIPPING ADDRESS</h6>
                      <div className="OrderDetails-ShippingAdrress">
                        <p>{this.state.orderDetails?.contact_person}</p>
                        <p>{this.state.orderDetails?.delivery_address}</p>
                        <p>{this.state.orderDetails?.contact_email}</p>
                        <p>{this.state.orderDetails?.phone_number}</p>
                        <p>{this.state.orderDetails?.shipping_mode}</p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(OrderDetails);
