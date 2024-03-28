import axios from "axios";

export const propubget = (query, offset) => {
  
    return axios.get(`https://api.propublica.org/congress/v1/bills/search.json?query=${query}&offset=${offset}`, {
      headers: { 'X-API-Key': import.meta.env.PROPUB_API_KEY },
    })
  };