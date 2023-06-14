const form = document.querySelector('#price-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const priceInput = document.querySelector('#price-input');
  const price = priceInput.value;

 // const payload = {
   // body: JSON.stringify({ price: price }) // Include the price in the 'body' field
  const payload = JSON.stringify({ price: price }); // Include the price in the 'body' field

  try {
    const response = await fetch('https://UpdateWithYourValue.execute-api.us-east-1.amazonaws.com/beta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Process the response as needed
  } catch (error) {
    console.error('Error:', error);
  }
});
