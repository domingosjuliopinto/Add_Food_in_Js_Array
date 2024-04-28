import { useState } from 'react';
import './addfood.css'

import axios from 'axios';

import HeadNav from '../reusable/header/HeadNav';

function AddFood() {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [foodGenre, setFoodGenre] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!item.trim() || !quantity || !foodGenre) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Here you can perform further actions like sending data to server
    const fooditem = item.trim()
    await axios.post('http://localhost:5000/addfooditems', {item:fooditem, quantity, foodGenre})
    console.log()
    // Clear fields and error message after successful submission
    setItem('');
    setQuantity('');
    setFoodGenre('');
    setErrorMessage('');

    window.location.href = "/home";
  };

  return (
    <div>
    <HeadNav/>
    <div className='centerc_it'>
    <div className="container">
      <h2>Add Food</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="item">Item:</label>
        <input
          type="text"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
        />
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <label htmlFor="foodGenre">Food Genre:</label>
        <select
          id="foodGenre"
          value={foodGenre}
          onChange={(e) => setFoodGenre(e.target.value)}
          required
        >
          <option value="">Select Genre</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Chinese">Chinese</option>
          <option value="Indian">Indian</option>
          <option value="Dessert">Dessert</option>
          <option value="Fruits">Fruits</option>
          <option value="Breakfast">Breakfast</option>
          
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default AddFood;
