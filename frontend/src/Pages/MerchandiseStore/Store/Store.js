import React, { Component } from 'react';
import TopImg from './StoreComponents/TopImg';
import ProductFilter from './StoreComponents/ProductFilter';
import './Store.css';
import Hats from './Products/hats';
import Hoodies from './Products/hoodies';
import Jackets from './Products/jackets';
import Product from './StoreComponents/Product';
import Fade from 'react-bootstrap/Fade';

class Store extends Component {

    state = {
        selectedProduct: "all",
        productList: [...Hats, ...Hoodies, ...Jackets].sort( () => .5 - Math.random() ),
        curProducts: [],
        isFull: false,
    }

    selectProduct = (newProduct) => {
        if(newProduct === this.state.selectedProduct) {
            return;
        }
        this.setState({selectedProduct: newProduct, curProducts: [], isFull: false});
        if(newProduct === 'hats') {
            this.setState({productList: [...Hats]});
        } 
        else if(newProduct === 'hoodies') {
            this.setState({productList: [...Hoodies]});
        }
        else if(newProduct === 'jackets') {
            this.setState({productList: [...Jackets]});
        }
        else if(newProduct === 'all') {
            this.setState({productList: [...Hats, ...Hoodies, ...Jackets].sort( () => .5 - Math.random() )});
        }
    }

    componentDidMount() {
        this.increaseProducts();
    }

    componentDidUpdate(_, prevState) {
        if(prevState.selectedProduct !== this.state.selectedProduct) {
            this.increaseProducts();
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
        }
    }

    render() {

        return (
            <div className="Store mt-2">
                <TopImg />
                <div className = "ProductsHeader">
                    <ul>
                        <li className="active">
                            <a href="">PRODUCTS</a>
                        </li>
                        <li>
                            <a href="/store">ABOUT</a>
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
                                this.state.curProducts.map(product => {
                                    return <Product key={product.id} product={product} />;
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

export default Store;