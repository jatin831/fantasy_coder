import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import "./ProdDesc.css";
import Sidedrawer from './Sidedrawer/Sidedrawer';
import ImgRed from "../../../assets/img/jacket.jpg";
import ImgRedBack from "../../../assets/img/jacketBack.jpg";
import ImgBlack from '../../../assets/img/hoodie.jpg';
import ImgBlackBack from '../../../assets/img/hoodieBack.jpg';
import ImgGreen from '../../../assets/img/hoodieGreen.jpg';
import ImgGreenBack from '../../../assets/img/hoodieGreenBack.jpg';
import { connect } from 'react-redux';
import * as actions from '../../ReduxStore/slices/cartSlice';

const fakeProduct = {
  id: "xyz007",
  name: "Floor Gang",
  category: "Lightweight Full Zip Jacket",
  description:
    "Rock this simplistic design all year round on jackets, tees, and hoodies!",
  defaultColor: "red",
  colors: {
    red: {
      images: [ImgRed, ImgRedBack],
      sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    },

    green: {
      images: [ImgGreen, ImgGreenBack],
      sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    },

    black: {
      images: [ImgBlack, ImgBlackBack],
      sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    },
  },
  price: 24.99,
};

class ProdDesc extends Component {

  state = {
    addedToCart: false,
    selectedColor: fakeProduct.defaultColor,
    product: fakeProduct.colors[fakeProduct.defaultColor],
    selectedSize: null,
    curImage: 0,
    showSizeMssg: false,
    animate: false,
    showSidedrawer: false
  };

  addToCart = () => {

    const currProd = {
      id: fakeProduct.id,
      name: fakeProduct.name,
      category: fakeProduct.category,
      color: this.state.selectedColor,
      size: this.state.selectedSize,
      uniqueKey: fakeProduct.id + this.state.selectedColor + this.state.selectedSize, 
      quantity: 1,
      img: this.state.product.images[this.state.curImage],
      perUnitPrice: fakeProduct.price,
    }
    
    this.props.addToCart(currProd);
  };

  componentDidMount() {
    window.scroll(0, 0);
  };

  currImageHandler = (index) => {
    this.setState({ curImage: index });
  };

  colorChangeHandler = (color) => {
    this.setState({selectedColor: color, product: fakeProduct.colors[color], curImage: 0});
  };

  changeSizeHandler = (event) => {
    this.setState({selectedSize: event.target.value, showSizeMssg: false});
  }

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
    // console.log(this.props.match.params.id); // this id will be used to fetch current products desc

    let showSizeMssg = null;
    if (this.state.showSizeMssg) {
      showSizeMssg = (
        <p className={"SizeErrMssg " + (this.state.animate ? 'Animate' : '')}>Please Select a size</p>
      )
    }

    if(this.state.animate) {
      setTimeout(() => this.setState({animate: false}), 200);
    }

    return (
      
      <div className="ProdDesc">
        <Sidedrawer show = {this.state.showSidedrawer} removeSidedrawer = {this.removeSidedrawerHandler} />
        <div className="DescContainer">
          <div className="row justify-content-center m-0">
            <div className="col-12 text-center text-lg-left col-lg-6">
              <h2 className="ProductName mt-4 mb-3">{fakeProduct.name}</h2>
              <div className="d-flex">

                <div className="ProductImages">
                  {this.state.product.images.map((Image, index) => {
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
                  })}
                </div>

                <img
                  className="ProductImg"
                  src={this.state.product.images[this.state.curImage]}
                ></img>
              </div>
            </div>
            <div className="col-12 text-center text-lg-left col-lg-3 pt-4">
              <h4 className="Price">${fakeProduct.price}</h4>
              <div className="Description d-flex flex-column justify-content-around">
                <p style={{ color: "#8795A1" }}>{fakeProduct.category}</p>
                <p>{fakeProduct.description}</p>

                <div className="d-flex justify-content-between ProductColor">
                  <div className="ColorDesc">
                    <p className="ColorText">COLOR</p>
                    <p className="ColorName">{this.state.selectedColor}</p>
                  </div>
                  <div className="ColorTray">
                    {
                      Object.keys(fakeProduct.colors).map((key) => {
                        return (
                          <div
                            key={key}
                            style={{ backgroundColor: key }}
                            className="ColorOption"
                            onClick={this.colorChangeHandler.bind(this, key)}
                          ></div>
                        );
                      })
                    }
                  </div>
                </div>

                <div className="d-flex justify-content-between ProductSize">
                  <div className="ColorDesc">
                    <p className="mt-2 ColorText">SIZE</p>
                  </div>
                  <div className="ColorTray">
                  { showSizeMssg }
                  <Form>
                    <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                      <Form.Control style={{width: '140px', fontSize: '15px'}} onChange={this.changeSizeHandler} as="select"custom>
                        <option disabled={this.state.selectedSize ? true : false}>Select Size...</option>
                        {
                          this.state.product.sizes.map(size => {
                            return (
                              <option key={size} value={size}>{size}</option>
                            )
                          })
                        }
                      </Form.Control>
                    </Form.Group>
                  </Form>
                  </div>
                </div>
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

export default connect(null, mapDispatchToProps)(ProdDesc);
