import React, { Component } from "react";
import "./ProdDesc.css";
import { withRouter } from 'react-router-dom';
import Sidedrawer from './Sidedrawer/Sidedrawer';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../ReduxStore/slices/cartSlice';
import axios from "axios";

class ProdDesc extends Component {

  state = {
      product: null,
      addedToCart: false,
      curImage: 0,
      animate: false,
      showSidedrawer: false,
      loading: false
  }

  componentDidMount() {
    window.scroll(0, 0);
    this.setState({
      loading: true
    })
    axios.get('https://server.codeium.tech/product/' + this.props.location.pathname.slice(14))
      .then(res => {
        const product = res.data.msg[0];
        console.log(product);
        this.setState({
            product: {
                id: product.product_id.trim(),
                description: product.pdesc,
                price: product.price,
                name: product.product_name,
                images: [`data:image/png;base64, ${product.front_image.slice(2, -1)}`, `data:image/png;base64, ${product.back_image.slice(2, -1)}`],
                category: product.product_category
            },
            loading: false
        })
    })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        })
    }) 
  };

  addToCart = () => {
    const currProd = {
      id: this.state.product.id,
      name: this.state.product.name,
      category: this.state.product.category,
      quantity: 1,
      uniqueKey: this.state.product.id,
      img: this.state.product.images[0],
      perUnitPrice: this.state.product.price,
    }
    
    this.props.addToCart(currProd);
  };

  currImageHandler = (index) => {
    this.setState({ curImage: index });
  };

  removeSidedrawerHandler = () => {
    this.setState({showSidedrawer: false})
  }

  displaySidedrawerHandler = () => {
    this.setState({showSidedrawer: true})
  }

  addToCartHandler = (currProd) => {
    if (this.state.selectedSize === null) {
      this.setState({showSizeMssg: true, animate: true});
      return;
    }
    this.setState({showSidedrawer: true});
    this.addToCart(currProd);
  }

  render() {
    if(this.state.animate) {
      setTimeout(() => this.setState({animate: false}), 200);
    }

    return this.state.loading ? <Spinner /> : (
      <div className="ProdDesc">
        <Sidedrawer show = {this.state.showSidedrawer} removeSidedrawer = {this.removeSidedrawerHandler} />
        <div className="DescContainer">
          <div className="row justify-content-center m-0">
            <div className="col-12 px-xs-3 px-0 text-center text-lg-left col-lg-6">
              <h2 className="ProductName mt-4 mb-3">{this.state.product?.name}</h2>
              <div className="d-flex Product_Display ">

                <div className="ProductImages">
                  {
                    this.state.product?.images.map((Image, index) => {
                      return (
                        <img
                          className={
                            index === this.state.curImage ? "active" : ""
                          }
                          onClick={this.currImageHandler.bind(this, index)}
                          key={index}
                          src={Image}
                        />
                      );
                    })
                  }
                </div>
                <div className="ProductImgContainer">
                  <img
                  className="ProductImg"
                  src={this.state.product?.images[this.state.curImage]}
                  />
                </div>
                
              </div>
            </div>
            <div className="col-12 text-center ml-lg-3 text-lg-left col-lg-4 pt-4">
              <h4 className="Price">&#8377;{this.state.product?.price}</h4>
              <div className="Description d-flex flex-column justify-content-around">
                <p style={{ color: "#8795A1" }}>{this.state.product?.category}</p>
                <p>{this.state.product?.description}</p>
              </div>
              <button
                onClick={this.addToCartHandler}
                className="btn btn-dark CartBtn btn-block mt-3"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (currProd) => dispatch(actions.addToCart(currProd))
  }
}

export default connect(null, mapDispatchToProps)(withRouter(ProdDesc));
