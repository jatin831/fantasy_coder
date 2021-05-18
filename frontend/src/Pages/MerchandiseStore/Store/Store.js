import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TopImg from './StoreComponents/TopImg';
import ProductFilter from './StoreComponents/ProductFilter';
import './Store.css';
import Product from './StoreComponents/Product';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';

class Store extends Component {

    state = {
        selectedProduct: "all",
        productList: [],
        curProducts: [],
        isFull: false,
        loading: false
    }

    getProductsFromServer = () => {
        this.setState({
            loading: true
        })
        axios.get('https://server.codeium.tech/product')
        .then(response => {
            if (Array.isArray(response.data.msg)) {
                this.setState({
                    productList: response.data.msg
                })
                this.increaseProducts();
            }
            this.setState({
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

    componentDidMount() {
        this.getProductsFromServer();
    }

    componentDidUpdate(prevProps, _) {
        let currLocation = this.props.location.pathname;
        if(prevProps.location.pathname !== currLocation) {
            this.increaseProducts();
            if (currLocation === '/store') {
                this.getProductsFromServer();
            } else {
                this.setState({
                    loading: true
                })
                const category = currLocation.slice(16);
                axios.get('https://server.codeium.tech/products/' + category)
                .then(response => {
                    if (Array.isArray(response.data.msg)) {
                        console.log(response.data.msg);
                        this.setState({
                            productList: response.data.msg,
                            curProducts: []
                        })
                        this.increaseProducts();
                    }
                    this.setState({
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
            
        }

    }

    increaseProducts = () => {
        let curLen = this.state.curProducts.length;
        let totalLen = this.state.productList.length;
        if(totalLen > curLen) {
            let prevList = [...this.state.curProducts];
            for(let i = curLen ; i < curLen + 12; i++) {
                if(i === totalLen) {
                    break;
                }
                prevList.push(this.state.productList[i]);
            }
            this.setState({curProducts: prevList});
            if(prevList.length === totalLen) {
                this.setState({isFull: true});
            }
        } else {
            this.setState({isFull: true})
        }
    }

    render() {

        return (
            <div className="Store mt-2">
                <TopImg />
                <div className = "ProductsHeader mb-4">
                    <ul>
                        <li className="active">
                            <a href="">PRODUCTS</a>
                        </li>
                    </ul>
                </div>

                <div className="ProductsContainer">
                    <div className = {"row"}>
                        <div className="col-md-2 ProdFilterCol" >
                            <ProductFilter clicked={this.selectProduct} selectedProduct={this.state.selectedProduct} />
                        </div>
                        
                        <div className="col-md-10 col-sm-12 ProductList" >

                            {
                                this.state.loading ? <Spinner /> :
                                this.state.curProducts.map(product => {
                                    return <Product key={product.product_id} product={product} />;
                                })
                            }
                            
                            {
                                !this.state.isFull ? (
                                    <div className="MoreProductContainer"> 
                                        <button onClick={this.increaseProducts} className="MoreProducts">
                                            More Products
                                        </button>
                                    </div>
                                ) : null
                            }
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
    
}

export default withRouter(Store);