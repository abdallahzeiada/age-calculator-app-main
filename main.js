const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const dayOutput = document.getElementById("daysOutput");
const monthOutput = document.getElementById("monthsOutput");
const yearOutput = document.getElementById("yearsOutput");
const inputs = document.querySelectorAll("input");
const labels = document.querySelectorAll("label");
const errorEmpty = document.querySelectorAll(".error-empty");
const submitBtn = document.getElementById("submit");
const validateFalse = (input, label, span) => {
  input.classList.add("error-empty-input");
  label.classList.add("error-empty-span");
  span.classList.add("error-empty-span");
};
const validateTrue = (input, label, span) => {
  input.classList.remove("error-empty-input");
  label.classList.remove("error-empty-span");
  span.classList.remove("error-empty-span");
};
let daysNo = 0;
let dayLock = false;
let monthLock = false;
let yearLock = false;
submitBtn.addEventListener("click", () => {
  switch (+month.value) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      daysNo = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      daysNo = 30;
      break;
    case 2:
      if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
        daysNo = 29;
      } else {
        daysNo = 28;
      }
      break;
    default:
      daysNo = 31;
  }
  if (day.value == "") {
    validateFalse(inputs[0], labels[0], errorEmpty[0]);
  } else if (day.value <= 0 || day.value > daysNo) {
    errorEmpty[0].innerHTML = "must be a valid day";
    validateFalse(inputs[0], labels[0], errorEmpty[0]);
  } else {
    validateTrue(inputs[0], labels[0], errorEmpty[0]);
    dayLock = true;
  }

  if (month.value == "") {
    validateFalse(inputs[1], labels[1], errorEmpty[1]);
  } else if (month.value <= 0 || month.value > 12) {
    errorEmpty[1].innerHTML = "must be a valid month";
    validateFalse(inputs[1], labels[1], errorEmpty[1]);
  } else {
    validateTrue(inputs[1], labels[1], errorEmpty[1]);
    monthLock = true;
  }

  if (year.value == "") {
    validateFalse(inputs[2], labels[2], errorEmpty[2]);
  } else if (year.value <= 0 || year.value > new Date().getFullYear()) {
    errorEmpty[2].innerHTML = "must be in the bast";
    validateFalse(inputs[2], labels[2], errorEmpty[2]);
  } else {
    validateTrue(inputs[2], labels[2], errorEmpty[2]);
    yearLock = true;
  }
  if (dayLock === true && monthLock === true && yearLock === true) {
    let yearsNum = new Date().getFullYear() - year.value;
    let monthsNum = new Date().getMonth()+1 - month.value;
    let daysNum = new Date().getDate() - day.value;
    if (daysNum < 0) {
      monthsNum--;
      daysNum += 31;
    }
    if (monthsNum < 0) {
      yearsNum--;
      monthsNum += 12;
    }
    yearOutput.innerHTML = `${yearsNum}`;
    monthOutput.innerHTML = `${monthsNum}`;
    dayOutput.innerHTML = `${daysNum}`;
  }
});
