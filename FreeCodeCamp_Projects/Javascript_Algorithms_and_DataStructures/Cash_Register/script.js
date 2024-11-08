let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const changeDueElement = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const cashInput = document.getElementById("cash");
const priceScreen = document.getElementById("price-screen");
const cashDrawerDisplay = document.getElementById("cash-drawer-display");

const formatResult = (status, change) => {
  changeDueElement.innerHTML = `<p>Status: ${status}</p>`;
  changeDueElement.innerHTML += change
    .map(
      ([denominationName, denominationAmount]) =>
        `<p>${denominationName}: $${denominationAmount}</p>`
    )
    .join("");
};

const updateCashRegister = () => {
  const cashInCent = Math.round(Number(cashInput.value) * 100);
  const priceInCent = Math.round(price * 100);

  if (cashInCent < priceInCent) {
    alert("Customer does not have enough money to purchase the item");
    cashInput.value = "";
    return;
  }

  if (cashInCent === priceInCent) {
    changeDueElement.innerHTML =
      "<p>No change due - customer paid with exact cash</p>";
    cashInput.value = "";
    return;
  }

  let changeDue = cashInCent - priceInCent;
  const reversedCid = cid
    .toReversed()
    .map(([denominationName, denominationAmount]) => [
      denominationName,
      Math.round(denominationAmount * 100),
    ]);
  const denominationValues = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  const result = { status: "OPEN", change: [] };
  const totalCid = reversedCid.reduce((acc, [_, amount]) => acc + amount, 0);

  if (totalCid < changeDue) {
    changeDueElement.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }

  if (totalCid === changeDue) {
    result.status = "CLOSED";
  }

  for (let i = 0; i < reversedCid.length; i++) {
    if (changeDue >= denominationValues[i] && changeDue > 0) {
      const [denominationName, denominationAmount] = reversedCid[i];
      const possibleChange = Math.min(denominationAmount, changeDue);
      const count = Math.floor(possibleChange / denominationValues[i]);
      const changeAmount = count * denominationValues[i];
      changeDue -= changeAmount;

      if (count > 0) {
        result.change.push([denominationName, changeAmount / 100]);
      }
    }
  }
  console.log(changeDue);
  if (changeDue > 0) {
    changeDueElement.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }

  formatResult(result.status, result.change);
  updateUI(result.change);
};

const updateUI = (change) => {
  const denominationNameObj = {
    PENNY: "Pennies",
    NICKEL: "Nickels",
    DIME: "Dimes",
    QUARTER: "Quarters",
    ONE: "Ones",
    FIVE: "Fives",
    TEN: "Tens",
    TWENTY: "Twenties",
    "ONE HUNDRED": "Hundreds",
  };

  if (change) {
    change.forEach(([changeDenominationName, changeDenominationAmount]) => {
      const targetArr = cid.find(
        ([denominationName]) => denominationName === changeDenominationName
      );
      targetArr[1] =
        (Math.round(targetArr[1] * 100) - Math.round(changeDenominationAmount * 100)) / 100;
    });
  }

  cashInput.value = "";
  priceScreen.textContent = `Total: $${price}`;
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
      .map(
        ([denominationName, denominationAmount]) =>
          `<p>${denominationNameObj[denominationName]}: $${denominationAmount}</p>`
      )
      .join("")}
  `;
};

const checkInput = () => {
  if (!cashInput.value) {
    return;
  }
  updateCashRegister();
};

purchaseBtn.addEventListener("click", () => {
  checkInput();
});

cashInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkInput();
  }
});

updateUI();
