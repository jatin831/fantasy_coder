import React from 'react';

const ProductFilter = (props) => {

    return (

        <div className="ProductFilter">
            <h6 className="FilterProdHeader">FILTER BY PRODUCT</h6>
            <ul className="ProdCategories">
                <li className= { props.selectedProduct == 'all' ? 'active' : null } 
                    onClick = {props.clicked.bind(this, 'all')}>
                    All Products
                </li>
                <li className= { props.selectedProduct == 'hats' ? 'active' : null } 
                    onClick = {props.clicked.bind(this, 'hats')}>
                    Hats
                </li>
                <li className= { props.selectedProduct == 'hoodies' ? 'active' : null } 
                    onClick = {props.clicked.bind(this, 'hoodies')}>
                    Hoodies
                </li>
                <li className= { props.selectedProduct == 'jackets' ? 'active' : null }
                    onClick = {props.clicked.bind(this, 'jackets')}>
                    Jackets
                </li>
                <li className= { props.selectedProduct == 'longSleeves' ? 'active' : null }
                    onClick = {props.clicked.bind(this, 'longSleeves')}>
                    Long sleeves
                </li>
                <li className= { props.selectedProduct == 'misc' ? 'active' : null }
                    onClick = {props.clicked.bind(this, 'misc')}>
                    Miscellaneous
                </li>
                <li className= { props.selectedProduct == 'shirts' ? 'active' : null }
                    onClick = {props.clicked.bind(this, 'shirts')}>
                    Shirts
                </li>
            </ul>
        
        </div>
    )
    
}

export default ProductFilter;