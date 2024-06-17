const barsIcon = document.querySelector(".bars_icon");
const navLinks = document.querySelector(".nav_links");
let menuIsOpen = false;

const seats = document.querySelectorAll(".seat");
const selectedSeatsElem = document.querySelector(".selected_seats");
const selectedSeatsCountElem = document.getElementById("selected_seats_count");
const seatsLeft = document.getElementById("seats_left");
const totalPriceElem = document.querySelector(".total_price");
const totalPriceCalculationElem = document.getElementById("total_price");
const grandTotalElem = document.querySelector(".grand_total");
const grandTotalCalculationElem = document.getElementById("grand_total");
const couponInputElem = document.querySelector(".coupon_input");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const nextButton = document.querySelector("form button");

let selectedSeatsArray = [];
let totalPrice = null;

barsIcon.addEventListener("click", () => {
  if (!menuIsOpen) {
    navLinks.style.display = "flex";
    menuIsOpen = true;
  } else {
    navLinks.style.display = "none";
    menuIsOpen = false;
  }
});

const handleSeatClick = (event) => {
  const seatNo = event.target.innerText;

  if (selectedSeatsArray.includes(seatNo)) {
    deselectSeat(event);
    removeSeatNoFromArray(seatNo);
    removeFromSelectedSeatList(seatNo);
  } else {
    if (selectedSeatsArray.length == 4) {
      return alert("You can not select more than 4 seats");
    }

    selectSeat(event);
    addSeatNoToArray(seatNo);
    addToSelectedSeatList(seatNo);
  }

  updateSeatCount();
  updateTotalPrice();
  updateGrandTotal();
  showHideCouponInput();
  enableDisableNextButton();
};

const updateSeatCount = () => {
  selectedSeatsCountElem.innerText = selectedSeatsArray.length;
  seatsLeft.innerText = 40 - selectedSeatsArray.length;
};

const updateTotalPrice = () => {
  if (selectedSeatsArray.length) {
    totalPrice = 550 * selectedSeatsArray.length;
    totalPriceCalculationElem.innerText = totalPrice;
    totalPriceElem.classList.remove("hide");
  } else {
    totalPriceElem.classList.add("hide");
  }
};

const updateGrandTotal = () => {
  if (selectedSeatsArray.length) {
    grandTotalCalculationElem.innerText = totalPrice;
    grandTotalElem.classList.remove("hide");
  }
};

const showHideCouponInput = () => {
  if (selectedSeatsArray.length) {
    couponInputElem.classList.remove("hide");
  } else {
    couponInputElem.classList.add("hide");
  }
};

const addToSelectedSeatList = (seatNo) => {
  let row = createElement("div", ["row"]);
  row.id = seatNo + "_row";
  let seatNoCol = createElement("div", ["col"]);
  seatNoCol.innerText = seatNo;
  let seatClassCol = createElement("div", ["col"]);
  seatClassCol.innerText = "Economy";
  let priceCol = createElement("div", ["col"]);
  priceCol.innerText = "550";

  row.appendChild(seatNoCol);
  row.appendChild(seatClassCol);
  row.appendChild(priceCol);

  selectedSeatsElem.appendChild(row);
};

const removeFromSelectedSeatList = (seatNo) => {
  let elem = document.getElementById(seatNo + "_row");
  elem.remove();
};

const createElement = (elem, classes) => {
  let element = document.createElement(elem);
  classes.forEach((cls) => element.classList.add(cls));
  return element;
};

const addSeatNoToArray = (seatNo) => {
  selectedSeatsArray.push(seatNo);
};

const removeSeatNoFromArray = (seatNo) => {
  selectedSeatsArray = selectedSeatsArray.filter((seat) => {
    return seat != seatNo;
  });
};

const selectSeat = (event) => {
  event.target.classList.add("selected");
};

const deselectSeat = (event) => {
  event.target.classList.remove("selected");
};

seats.forEach((seat) => {
  seat.addEventListener("click", handleSeatClick);
});

const enableDisableNextButton = () => {
  if (
    selectedSeatsArray.length &&
    nameInput.value.trim() != "" &&
    phoneInput.value != ""
  ) {
    nextButton.classList.remove("disabled");
  } else {
    nextButton.classList.add("disabled");
  }
};

nameInput.addEventListener("keyup", enableDisableNextButton);
phoneInput.addEventListener("keyup", enableDisableNextButton);
