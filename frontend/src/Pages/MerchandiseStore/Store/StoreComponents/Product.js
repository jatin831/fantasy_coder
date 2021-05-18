import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

const Product = (props) => {
    return (
        <motion.div
            className="ProductCard"
            initial="hidden"
            animate="visible"
            variants={variants}>
            <Link style={{all: 'unset'}} to={'/store/product/' + props.product.product_id}>
                <div className="ProductDetail" >
                    <img src={`data:image/png;base64, ${props.product.front_image.slice(2, -1)}`}/>
                    <h6>{props.product.product_name}</h6>
                    <h6><strong>&#8377;{props.product.price}</strong></h6>
                </div>
            </Link>
        </motion.div>
    )
}

export default Product;