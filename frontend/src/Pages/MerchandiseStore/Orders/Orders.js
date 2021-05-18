import React, { Component } from "react";
import Table from "react-bootstrap/Table";

import Spinner from '../Spinner/Spinner';
import OrderStatus from "./OrderStatus";
import "./Orders.css";
import Img from "../../../assets/img/noOrders2.jpg";
import axios from "axios";

class Orders extends Component {

  state = {
    orderList: {},
    loading: false
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    axios.post('https://server.codeium.tech/orders', {
      username: 'test5'
    })
    .then(res => {
      this.setState({
        orderList: res.data,
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
    let displayOutput = null;
    if(this.state.loading) {
      displayOutput = <Spinner />
    } else if(this.state.orderList.msg?.length == 0) {
      displayOutput = (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="NoOrder-ImgContainer">
              <img src={Img} />
          </div>
          <p>There are no Orders placed yet.</p>
          <a role="button" className="btn btn-dark mt-3 btn-lg" href='/store'>
              Shop Now    
          </a>
        </div>
      );
    } else {
      displayOutput = (
        <>
          <h1 className="mb-4 text-sm-26">Your Orders</h1>
          <Table className="mt-4 text-center table-responsive-lg" borderless hover>
            <thead>
              <tr>
                <th>
                  <span>Order ID</span>
                </th>
                <th>
                  <span>Date</span>
                </th>
                <th>
                  <span>Total</span>
                </th>
                <th>
                  <span>Status</span>
                </th>
                <th>
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.orderList.msg?.map((order) => {
                return (
                  <tr key={order.order_id}>
                    <td style={{ fontWeight: "bold" }}>
                      <span># {order.order_id}</span>
                    </td>
                    <td>
                      <span>{order.date_of_purchase}</span>
                    </td>
                    <td>
                      <span>&#8377;{order.total_price}</span>
                    </td>
                    <td>
                      <OrderStatus status={order.order_status ? order.order_status : "pending"} />
                    </td>
                    <td>
                      <a
                        role="button"
                        className="btn btn-outline-dark btn-sm"
                        href={"/store/orders/" + order.order_id}
                      >
                        {" "}
                        View Order{" "}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      );
    }

    return (
      <div className="Orders_Container p-3">
        <div className="row">
          <div className="col-12 my-4 d-flex flex-column align-items-center justify-content-center mx-auto">
            {displayOutput}
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
