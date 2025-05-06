import React, { useEffect, useState } from 'react';

function MarketOverview() {
  const [market, setMarket] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/market')
      .then(res => res.json())
      .then(data => setMarket(data))
      .catch(err => console.error('Error fetching market info:', err));
  }, []);

  if (!market) return <p>Loading market information...</p>;

  return (
    <div>
      <h2>{market.name}</h2>
      <p><strong>Location:</strong> {market.location}</p>
      <p>{market.description}</p>
    </div>
  );
}

export default MarketOverview;
