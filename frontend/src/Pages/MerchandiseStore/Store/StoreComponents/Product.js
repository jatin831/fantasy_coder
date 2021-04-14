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
            <Link style={{all: 'unset'}} to={'/store/' + props.product.id}>
                <div className="ProductDetail" >
                    <img src={props.product.imgsrc}/>
                    <h6>{props.product.name}</h6>
                    <h6><strong>${props.product.price}</strong></h6>
                </div>
            </Link>
        </motion.div>
    )
}

export default Product;