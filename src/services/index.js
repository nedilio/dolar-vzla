import axios from "axios";

export const getDolarPrice = () => {
  return axios("https://s3.amazonaws.com/dolartoday/data.json").then(
    (res) => res.data
  );
};
