import {TOKEN_KEY, USER_TYPE} from "../constants/constants";

export const isNumber = (text) => {
    return !isNaN(parseInt(text)) && isFinite(text);
};

export const isEmpty = prop =>
    prop === null ||
    prop === undefined ||
    (prop.hasOwnProperty("length") && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0);

export const hasWhiteSpace = s => {
    return /\s/g.test(s);
};

export const isLoggedIn = loggedUserType => {
    return localStorage.getItem(USER_TYPE) === loggedUserType;
};

