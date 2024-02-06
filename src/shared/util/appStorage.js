const storeData = async (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));
const getData = (key, callback) => {
  let data = localStorage.getItem(key);
  let resp = JSON.parse(data);
  if (resp) {
    callback(resp);
  } else {
    callback(false);
  }
};

const removeItem = (item) => localStorage.removeItem(item);

const removeItemsFromLocalStorage = async (keys) => {
  try {
    localStorage.removeItem(keys);
    return true;
  } catch (exception) {
    return false;
  }
};
export { storeData, getData, removeItem, removeItemsFromLocalStorage };
