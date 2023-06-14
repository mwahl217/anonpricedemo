document.getElementById('priceForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const priceInput = document.getElementById('priceInput');
  const price = parseFloat(priceInput.value);

  // Send the price to the API Gateway endpoint
  const response = await fetch('https://4aahvi7tnj.execute-api.us-east-1.amazonaws.com/beta', {
    method: 'POST',
    body: JSON.stringify({ price }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    document.getElementById('result').textContent = data.message;
  } else {
    document.getElementById('result').textContent = 'An error occurred while processing the price.';
  }

  priceInput.value = '';
});
