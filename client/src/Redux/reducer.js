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

const initialState = {
  drivers: [],
  allDrivers: [],
  driverForName: [],
  teams: [],
  detail: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case CREATE_NEW_DRIVER:
      return {
        ...state,
        drivers: [...state.drivers, action.payload],
        allDrivers: [...state.allDrivers, action.payload],
      };

    case DELETE_DRIVER:
      return {
        ...state,
        drivers: [...state.drivers.filter((e) => e.id !== action.payload.id)],
        allDrivers: [...state.allDrivers.filter((e) => e.id !== action.payload.id)],
       
      };
    case RESET_DETAIL:
      return { ...state, detail: {} };
    default:
      return { ...state };

    case GET_DRIVERS:
      return {
        ...state,
        drivers: action.payload,
        allDrivers: action.payload,
      };
      case GET_TEAMS:
        return {
          ...state,
          teams: action.payload,
        };
    case SEARCH_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };
    case SEARCH_BY_NAME:
      return {
        ...state,
        drivers: action.payload,
      };
    
    case  ORDER_ALPHABETICALLY:
      const driversABC = [...state.drivers];
      return {
        ...state,
        drivers:
          action.payload === "Ascending"
            ? driversABC.sort(
                (a, b) =>
                  a.name.toLowerCase().charCodeAt(0) -
                  b.name.toLowerCase().charCodeAt(0)
              )
            : driversABC.sort(
                (a, b) =>
                  b.name.toLowerCase().charCodeAt(0) -
                  a.name.toLowerCase().charCodeAt(0)
              ),
      };
      case ORDER_DATE_OF_BIRTH:
        const driversDOBo = [...state.drivers];
  
        const compareBirthDates = (a, b) => {
          const dateA = new Date(a.dob);
          const dateB = new Date(b.dob);
        
          if (dateA < dateB) return 1;
          if (dateA > dateB) return -1;
        
          return 0;
        };
  
        const sortedDrivers = action.payload === "AscendenteDOB"
              ? driversDOBo.sort(compareBirthDates)
              : driversDOBo.sort(compareBirthDates).reverse();
  
        return {
          ...state,
          drivers: sortedDrivers,
        };
        
    case FILTER_BY_TEAMS:
      let filterDrivers = state.allDrivers;
      let filterdDriver = filterDrivers.filter((e) =>
        e.teams?.includes(action.payload)
      );

      return {
        ...state,
        drivers: filterdDriver,
      };
    case FILTER_BY_ORIGIN:
      let originDriver = state.allDrivers;
      let filterCopy;
      if (action.payload === "driverList") {
        filterCopy = originDriver.filter((e) => typeof e.image !== "string");
      } else if (action.payload === "createdDrivers") {
        filterCopy = originDriver.filter((e) => typeof e.image !== "object");
      } else filterCopy = state.allDrivers;

      return {
        ...state,
        drivers: filterCopy,
      };

    
  }
};

export default reducer;