import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const SearchBarByCategory = ({ onSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedCategory) {
        throw new Error('Please select a category');
      }
      //encode the search query and fetch data
      const encodedSearchQuery = `https://dummyjson.com/products/category/${encodeURIComponent(selectedCategory)}`;
      const response = await fetch(encodedSearchQuery);
      
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      
      const data = await response.json();
      console.log(data);
      onSearch(data); // Pass search results to the parent component
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit} className="p-d-flex p-flex-column">
      <Dropdown
      optionLabel="label"
      optionValue="value"
      placeholder="Select a category..."
      value={selectedCategory}
      onChange={handleChange}
      style={{ marginRight: '100px',marginTop : '30px' , width: '200px'}}
      options={[
        { label: 'Select a category...', value: '' },
        { label: 'Smartphones', value: 'smartphones' },
        { label: 'Laptops', value: 'laptops' },
        { label: 'Fragrances', value: 'fragrances' },
        { label: 'Skincare', value: 'skincare' },
        { label: 'Groceries', value: 'groceries' },
        { label: 'Home decoration', value: 'home-decoration' },
        { label: 'Furniture', value: 'furniture' },
        { label: 'Tops', value: 'tops' },
        { label: "Women's dresses", value: 'womens-dresses' },
        { label: "Women's shoes", value: 'womens-shoes' },
        { label: "Men's shirts", value: 'mens-shirts' },
        { label: "Men's shoes", value: 'mens-shoes' },
        { label: "Men's watches", value: 'mens-watches' },
        { label: "Women's watches", value: 'womens-watches' },
        { label: "Women's bags", value: 'womens-bags' },
        { label: "Women's jewellery", value: 'womens-jewellery' },
        { label: 'Sunglasses', value: 'sunglasses' },
        { label: 'Automotive', value: 'automotive' },
        { label: 'Motorcycle', value: 'motorcycle' },
        { label: 'Lighting', value: 'lighting' },
      ]}
    />
        
        <Button
        type="submit"
        label="Search"
        className="p-button-lg p-button-primary" 
      />
      </form>
    </div>
  );
};

export default SearchBarByCategory;
