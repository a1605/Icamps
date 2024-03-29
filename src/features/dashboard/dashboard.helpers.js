export const transInventoryData = ({ data }) => {
    let arr = [];
  Object.keys(data).map(function (key) {
    arr.push({
     [key]:data[key]
    })
  });
  return arr;
};
