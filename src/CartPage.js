import React from 'react';
import './CartPage.css'; 

const CartPage = ({ cartItems, products, onUpdateQuantity, selectedCategory }) => {
  // Filter products based on the selected category
  const categoryProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;

  // Display products from the selected category in the cart
  return (
    <div className="cart-page">
      <h2 className="cart-title">Here are the items in your cart!</h2>
      <ul className="cart-list">
        {categoryProducts.map((product, index) => {
          const quantity = cartItems[index];
          if (quantity > 0) {
            return (
              <li key={index} className="cart-item">
                <img src={product.thumbnail} alt={product.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-title">{product.title}</p>
                  <p className="cart-item-price">Price: ${product.price}</p>
                  <div className="cart-item-quantity">
                    
                    <button className="cart-quantity-btn" onClick={() => onUpdateQuantity(index, quantity - 1)}>-</button>


                    <span className="cart-quantity">{quantity}</span>
                    <button className="cart-quantity-btn" onClick={() => onUpdateQuantity(index, quantity + 1)}>+</button>
                  </div>
                </div>
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  );
};

export default CartPage;
