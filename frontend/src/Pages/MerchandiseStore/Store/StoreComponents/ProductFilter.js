import axios from 'axios';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1);
}

class ProductFilter extends Component {

    state = {
        categories: []
    }

    componentDidMount() {
        axios.get('https://server.codeium.tech/product/categories')
            .then(res => {
                this.setState({
                    categories: res.data.msg.map(category => category.product_category)
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {

        return (
            <div className="ProductFilter">
                <h6 className="FilterProdHeader">FILTER BY PRODUCT</h6>
                <ul className="ProdCategories">
                    <Link to='/store' >
                        <li className= { this.props.location.pathname == '/store' ? 'active' : null }>
                                All Products
                        </li>
                    </Link>
                    {
                        this.state.categories.map(category => {
                            return (
                                <Link key={category} to={'/store/category/' + category}>
                                    <li className= { this.props.location.pathname == '/store/category/' + category ? 'active' : null }>
                                        {capitalize(category)}    
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            
            </div>
        )
    }
    
}

export default withRouter(ProductFilter);