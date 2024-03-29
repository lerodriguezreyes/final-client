import axios from "axios";

export const congressget = (congressquery, billNumberQuery, billTypeQuery) => {
  return axios.get(
    `https://api.congress.gov/v3/bill/${congressQuery}/${billTypeQuery}/${billNumberQuery}?api_key=[${
      import.meta.env.VITE_CONGRESS_API_KEY
    }]`
  );
};

export const congressgetsummary = (
  congressquery,
  billNumberQuery,
  billTypeQuery
) => {
  return axios.get(
    `https://api.congress.gov/v3/bill/${congressQuery}/${billTypeQuery}/${billNumberQuery}/summary?api_key=[${
      import.meta.env.VITE_CONGRESS_API_KEY
    }]`
  );
};

export const congressgettext = (
  congressquery,
  billNumberQuery,
  billTypeQuery
) => {
  return axios.get(
    `https://api.congress.gov/v3/bill/${congressQuery}/${billTypeQuery}/${billNumberQuery}/text?api_key=[${
      import.meta.env.VITE_CONGRESS_API_KEY
    }]`
  );
};
