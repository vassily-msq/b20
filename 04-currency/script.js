const curElement1 = document.getElementById('currency-one');
const amountElement1 = document.getElementById('amount-one');
const curElement2 = document.getElementById('currency-two');
const amountElement2 = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM

function calculate() {
  // console.log("RAN");   
  var cur1 = curElement1.value;
  var cur2 = curElement2.value;
  var amt1 = Number(amountElement1.value);
  var amt2 = Number(amountElement2.value);
  
  console.log(cur1, cur2);

  fetch(`https://v6.exchangerate-api.com/v6/ecfcabd1fe5e77c42b28eba7/latest/${cur1}`)
    .then(res => res.json())
    .then(data => { 
      // console.log(data); 
      const rate = data.conversion_rates[cur2];
      console.log(rate, typeof rate);
      console.log(amt1, typeof amt1)
      rateEl.innerText = `1 ${cur1} = ${rate} ${cur2}`;

      amountElement2.value= rate * amt1;
    });
}

// Event listeners
curElement1.addEventListener('change', calculate);
amountElement1.addEventListener('input', calculate);
curElement2.addEventListener('change', calculate);
amountElement2.addEventListener('input', calculate);

swap.addEventListener('click', function() {
  var temp = curElement1.value;
  curElement1.value = curElement2.value;
  curElement2.value = temp; 
  calculate();
});

calculate();