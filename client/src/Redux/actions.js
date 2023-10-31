
import {
  CREATE_NEW_DRIVER,
  DELETE_DRIVER,
  RESET_DETAIL,

  GET_DRIVERS,
  GET_TEAMS,

  ORDER_ALPHABETICALLY,
  ORDER_DATE_OF_BIRTH,
  
  SEARCH_BY_ID,
  SEARCH_BY_NAME,

  FILTER_BY_ORIGIN,
  FILTER_BY_TEAMS,
} from "./action-type";
import axios from "axios";


export const createNewDriver = (driver, navigate) => {
  const endpoint = `http://localhost:3001/drivers`;
  
  return async (dispatch) => {
    const { data } = await axios.post(endpoint, driver);

    if (data.status === "Driver already exists") {
      return alert("Driver already exists in the database");
    } else if (data.status === "Missing data") {
      return alert("Missing data");
    }

    if (data.name) {
      navigate(`/home`);

      return dispatch({
        type: CREATE_NEW_DRIVER,
        payload: data,
      });
    }
  };
};
export const deleteDriver = (id) => {
  const endpoint = `http://localhost:3001/drivers/${id}`;
  return async (dispatch) => {
    const { data } = await axios.delete(endpoint);
    return dispatch({
      type: DELETE_DRIVER,
      payload: data,
    });
  };
};
export const resetDetail = () => {
  return {
    type: RESET_DETAIL,
  };
};
export const getDrivers = () => {
  const endpoint = `http://localhost:3001/drivers`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    return dispatch({
      type: GET_DRIVERS,
      payload: data,
    });
  };
};

export const searchById = (id) => {
  const endpoint = `http://localhost:3001/drivers/${id}`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    if (data.name) {
      return dispatch({
        type: SEARCH_BY_ID,
        payload: data,
      });
    }
  };
};

export const searchByName = (name) => {
  const endpoint = `http://localhost:3001/drivers/name/?name=${name}`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    if (data) {
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: data,
      });
    }
  };
};

export const getTeams = () => {
  const endpoint = `http://localhost:3001/teams`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    // console.log(data);
    return dispatch({
      type: GET_TEAMS,
      payload: data,
    });
  };
};


export const orderAlfhabetically = (order) => {
  return { type: ORDER_ALPHABETICALLY, payload: order };
};

export const orderDateOfBirth = (order) => {
  return { type: ORDER_DATE_OF_BIRTH, payload: order };
};

export const filterByTeams = (order) => {
  return { type: FILTER_BY_TEAMS, payload: order };
};

export const filterByOrigin = (order) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: order,
  };
};

