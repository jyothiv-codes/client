import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import SearchBarByCategory from './SearchBarByCategory';
import { FaShoppingCart } from 'react-icons/fa'; 
import CartPage from './CartPage'; 

//Prime React UI component
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsByCategory, setSearchResultsByCategory] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [buttonQuantities, setButtonQuantities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); 

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Reset button quantities to 0 when search results change
    setButtonQuantities(new Array(products.length).fill(0));
  }, [searchResults, searchResultsByCategory, products.length]);

  useEffect(() => {
    
    const totalItems = cartItems.reduce((acc, curr) => acc + curr, 0);
    // Update document title with total items in the cart
    document.title = `(${totalItems}) Shopiyay`; 
  }, [cartItems]); 

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
      setCartItems(new Array(response.data.products.length).fill(0)); // Initialize cartItems array with 0 for each product
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleSearchByCategory = (results) => {
    setSearchResultsByCategory(results);
    setSelectedCategory(results.category); 
  };

  //updates made to the item quantity
  const handleAddToCart = (productId) => {
    setCartItems(prevCartItems => {
      const newCartItems = [...prevCartItems];
      const index = products.findIndex(product => product.id === productId);
      if (index !== -1) {
        newCartItems[index]++;
      }
      return newCartItems;
    });
  
    setButtonQuantities(prevButtonQuantities => {
      const newButtonQuantities = [...prevButtonQuantities];
      const index = products.findIndex(product => product.id === productId);
      if (index !== -1) {
        newButtonQuantities[index]++;
      }
      return newButtonQuantities;
    });
  };
  
  //To handle items removed from cart
  const handleRemoveFromCart = (productId) => {
    setCartItems(prevCartItems => {
      const newCartItems = [...prevCartItems];
      const index = products.findIndex(product => product.id === productId);
      if (index !== -1 && newCartItems[index] > 0) {
        newCartItems[index]--;
      }
      return newCartItems;
    });
  };
  
  const handleUpdateQuantity = (index, newQuantity) => {
    // Update cartItems with the new quantity
    setCartItems(prevCartItems => {
      const newCartItems = [...prevCartItems];
      newCartItems[index] = newQuantity;
      return newCartItems;
    });
  
    // Update button quantities
    setButtonQuantities(prevButtonQuantities => {
      const newButtonQuantities = [...prevButtonQuantities];
      newButtonQuantities[index] = newQuantity;
      return newButtonQuantities;
    });
  };
  // Calculate total items in the cart
  const totalItems = cartItems.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="product-list">
      {/* Cart Icon with item count */}
      <div className="cart-icon">
  <i className="pi pi-shopping-cart" style={{ fontSize: '2em' }} />
  {/* Icon created using Prime React UI component */}
  <Badge value={totalItems} severity="danger" />
</div>
      {/* Display search results */}
      <SearchBar onSearch={handleSearch} />
      <SearchBarByCategory onSearch={handleSearchByCategory} />

      {/* Display search results (textbox)if available, search results by category if available. If not, display the regular product list */}
      {searchResults && searchResults.products && searchResults.products.length > 0 ? (
        <div>
          <h2>Search Results:</h2>
          <div className="product-box-container">
            {searchResults.products.map((product, index) => (
              <div key={product.id} className="product-box">
                <img src={product.thumbnail} alt={product.title} />
                <p>{product.title}</p>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Discount: {product.discountPercentage}%</p>
                <p>Rating: {product.rating}</p>
                <p>Stock: {product.stock}</p>
                <p>Brand: {product.brand}</p>
                
                
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product.id)} style={{ marginBottom: '7px' }}>Add to Cart</button>

                {buttonQuantities[index] > 0 && (
                  <div className="cart-controls">
                    
                    <button className="cart-btn" onClick={() => handleRemoveFromCart(product.id)}>-</button>

                    <span className="cart-quantity">{buttonQuantities[index]}</span>
                    <button className="cart-btn" onClick={() => handleAddToCart(index)}>+</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : searchResultsByCategory && searchResultsByCategory.products && searchResultsByCategory.products.length > 0 > 0 ? (
        <div>
          <h2>Search Results:</h2>
          <div className="product-box-container">
            {searchResultsByCategory.products.map((product, index) => (
              <div key={product.id} className="product-box">
                <img src={product.thumbnail} alt={product.title} />
                <p>{product.title}</p>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Discount: {product.discountPercentage}%</p>
                <p>Rating: {product.rating}</p>
                <p>Stock: {product.stock}</p>
                <p>Brand: {product.brand}</p>
               
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product.id)} style={{ marginBottom: '7px' }}>Add to Cart</button>

                {buttonQuantities[index] > 0 && (
                  <div className="cart-controls">
                    
                    <button className="cart-btn" onClick={() => handleRemoveFromCart(product.id)}>-</button>

                    <span className="cart-quantity">{buttonQuantities[index]}</span>
                    <button className="cart-btn" onClick={() => handleAddToCart(index)}>+</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Regular product list */}
          <div className="product-box-container">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="product-box">
                <img src={product.thumbnail} alt={product.title} />
                <p>{product.title}</p>
                <p>Price: ${product.price}</p>
                <p>Discount: {product.discountPercentage}%</p>
                <p>Rating: {product.rating}</p>
                <p>Stock: {product.stock}</p>
                <p>Brand: {product.brand}</p>
                
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product.id)} style={{ marginBottom: '7px' }}>Add to Cart</button>

                {buttonQuantities[index] > 0 && (
                  <div className="cart-controls">
                    
                    <button className="cart-btn" onClick={() => handleRemoveFromCart(product.id)}>-</button>

                    <span className="cart-quantity">{buttonQuantities[index]}</span>
                    <button className="cart-btn" onClick={() => handleAddToCart(index)}>+</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <CartPage cartItems={cartItems} products={products} selectedCategory={selectedCategory} onUpdateQuantity={handleUpdateQuantity} />


    </div>
  );
};

export default ProductList;
