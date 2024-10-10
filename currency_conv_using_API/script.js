const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Define country list for currency codes and their country flags


// Populate dropdowns with currencies
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  // Update flag on currency change
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // Ensure the from and to currencies are selected
  if (fromCurr.value && toCurr.value) {
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    try {
      let response = await fetch(URL);
      if (response.ok) {
        let data = await response.json();
        let rate = data[toCurr.value.toLowerCase()];

        if (rate) {
          let finalAmount = amtVal * rate;
          msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(
            2
          )} ${toCurr.value}`;
        } else {
          msg.innerText = "Rate not found for the selected currencies.";
        }
      } else {
        msg.innerText = "Error fetching exchange rate.";
      }
    } catch (error) {
      console.error("Error:", error);
      msg.innerText = "Failed to fetch exchange rate.";
    }
  } else {
    msg.innerText = "Please select both currencies.";
  }
};

// Update flag images
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Add event listener to button
btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // Prevent form from submitting
  updateExchangeRate();
});

// Fetch exchange rate on page load
window.addEventListener("load", () => {
  updateExchangeRate();
});
