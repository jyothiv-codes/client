import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (typeof searchQuery !== 'string' || searchQuery.trim() === ''){
        throw new Error('Search query is invalid');
      }
      //encode the search query and fetch data
      const encodedSearchQuery = "https://dummyjson.com/products/search?q=" + encodeURIComponent(searchQuery);
      console.log(encodedSearchQuery);
      const response = await fetch(encodedSearchQuery);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      console.log(data); 
      onSearch(data); 
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <InputText
        type="text"
        placeholder="Search a product"
        value={searchQuery}
        onChange={handleChange}
        className="p-inputtext-lg" // Example of applying PrimeReact's styles
        style={{ marginRight: '60px' }}
      />
        
        
        <Button
        type="submit"
        label="Search"
        className="p-button-lg p-button-primary" // Example of applying PrimeReact's styles
      />
      </form>
    </div>
  );
};

export default SearchBar;
