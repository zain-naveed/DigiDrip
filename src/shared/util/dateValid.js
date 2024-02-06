import moment from "moment";
import Web3 from "web3";

const SelectedDay = (endDate) => {
  var selectday = new Date(endDate);
  var selectdd = String(selectday.getDate()).padStart(2, "0");
  var selmm = String(selectday.getMonth() + 1).padStart(2, "0");
  var selyyyy = selectday.getFullYear();

  return (selectday = selyyyy + "-" + selmm + "-" + selectdd);
};
const getToday = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  return (today = yyyy + "-" + mm + "-" + dd);
};
const CheckDate = (date) => {
  const todayMintues = new Date().getMinutes();
  const todayHours = new Date().getHours();
  const endHours = new Date(date).getHours();
  const endMinutes = new Date(date).getMinutes();
  const checkDay = SelectedDay(date);
  const today = getToday();
  if (date) {
    if (checkDay > today) {
      return true;
    } else if (checkDay == today) {
      if (endHours > todayHours) {
        return true;
      } else if (endHours == todayHours) {
        if (endMinutes > todayMintues) {
          return true;
        } else {
          return false;
        }
      } else if (endHours < todayHours) {
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
const fromNow = (date) => {
  return moment(date).fromNow();
};
const convertToWei = (amount) => {
  return Web3.utils.toWei(`${amount}`, "ether");
};
const convertToEther = (amount) => {
  if (amount) return Web3.utils.fromWei(`${amount}`, "ether");
  return "--";
};
const convertWeiToDollar = (amount) => {
  if (amount) {
    return amount / 220717142989720.0;
  }
};
export {
  SelectedDay,
  getToday,
  CheckDate,
  fromNow,
  convertToWei,
  convertToEther,
  convertWeiToDollar,
};
