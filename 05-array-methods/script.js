// Random User API

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// put all the people
let data = [];

// fetch random user and add money
// const url = "http://api.randomuser.me/";
// const url = "http://randomuser.me/api";

// async function getRandomUser() {
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data.results[0]);
//   console.log('===');
// }


// function getRandomUser() {
//   fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     const user = data.results[0];
//     // console.log(user);
//   }); 
// }

async function getRandomUser() {
  fetch('https://randomuser.me/api')
    .then(response => response.json())
    .then(data => {

      const user = data.results[0];
      // console.log(user)

      const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
      };

      addData(newUser);

      // console.log(newUser);
    });
}


getRandomUser();
getRandomUser();
getRandomUser();

// Add data
function addData(user) {
  data.push(user);
  updateDom();
}

function updateDom(providedData = data) {
  // clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach((item, index, arr) => {
   
    // console.log(item.name);
    const el = document.createElement('div');
    el.classList.add('person');
    el.innerHTML = `<strong>${item.name}</strong>$
    ${formatMoney(item.money)}`;
    main.appendChild(el);
  });

}

function doubleMoney() {
  data = data.map(user => {

    userCopy = {...user};
    userCopy.money *= 2;
    return userCopy;
  });
  updateDom();
}

function sortByRichest() {
  data.sort((a,b) => b.money - a.money);
  updateDom();

}

function showMillionaires() {
  data = data.filter(user => user.money > 1000000);
  updateDom();
}

function showTotalWealth() {
  var total = data.reduce((acc, user) => (acc + user.money), 0);
  var formattedTotal = formatMoney(total);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total wealth: ${formattedTotal}</h3>`;
  main.appendChild(wealthEl);
}

// Format Money
function formatMoney(amt) {
  var formattedAmt = amt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return formattedAmt;
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', showTotalWealth);


// console.log("======Data=======");
// data.forEach(item) {console.log(item)};
// console.log("======Data=======");