import { useState } from 'react';
import { createRental } from '../services/rentalAPI';

const RentalForm = () => {
  const [tokenId, setTokenId] = useState('');
  const [duration, setDuration] = useState('');
  const [deposit, setDeposit] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rentalData = { tokenId, duration, deposit };

    try {
      const result = await createRental(rentalData);
      console.log('Rental created:', result);
    } catch (error) {
      console.error('Error creating rental:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Token ID" onChange={(e) => setTokenId(e.target.value)} />
      <input type="number" placeholder="Duration" onChange={(e) => setDuration(e.target.value)} />
      <input type="number" placeholder="Deposit" onChange={(e) => setDeposit(e.target.value)} />
      <button type="submit">Create Rental</button>
    </form>
  );
};

export default RentalForm;
