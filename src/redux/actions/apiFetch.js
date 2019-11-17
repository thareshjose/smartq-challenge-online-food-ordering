import Axios from "axios";

const baseUrl =
  "https://s3-ap-southeast-1.amazonaws.com/he-public-data/smartQFood8bef5a2.json";

export const apiFetch = () => {
  var encodedURI = window.encodeURI(baseUrl);
  return Axios.get(encodedURI).then(response => {
    return response.data;
  });
};
