import axios from "axios";

export const getDolarPrice = () => {
  const options = {
    method: "GET",
    url: "https://exchangerate-api.p.rapidapi.com/rapid/latest/USD",
    headers: {
      "X-RapidAPI-Key": "f5b8bf79e4msh25787ede94720aep17173ejsne2e841f052f2",
      "X-RapidAPI-Host": "exchangerate-api.p.rapidapi.com",
    },
  };

  return axios(options).then((res) => res.data);
};
