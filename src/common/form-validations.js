import {EMPTY_STRING} from "../constants/constants";
import {hasWhiteSpace} from "../utils/utils";
import {isEmailValid, isPhoneNumberValid} from "../utils/validators";

export const validatePassword2 = (context) => {
    let {validation} = context.state;
    const {password1, password2} = context.state;
    if (password2 === EMPTY_STRING) {
        if (validation.password2.required) {
            validation.password2.error = "This input is required.";
            context.setState({validation: validation});
        }
    } else {
        if (password1 === password2) {
            validation.password2.error = EMPTY_STRING;
        } else {
            validation.password2.error = "The passwords are not matching with each other.";
        }
        context.setState({validation: validation});
    }
};

export const validatePassword1 = (context) => {
    let {validation} = context.state;
    if (validation.password1.required && context.state.password1 === EMPTY_STRING) {
        validation.password1.error = "This input is required";
    } else {
        validation.password1.error = EMPTY_STRING;
    }
    context.setState({validation: validation});
};

export const validateName = (context) => {
    let {validation} = context.state;
    if (validation.name.required && context.state.name === EMPTY_STRING) {
        validation.name.error = "This input is required";
    } else {
        validation.name.error = EMPTY_STRING;
    }
    context.setState({validation: validation});
};

export const validateUsername = (context) => {
    let {validation} = context.state;
    if (context.state.username !== EMPTY_STRING) {
        if (hasWhiteSpace(context.state.username)) {
            validation.username.error = "Username cannot have space.";
        } else {
            validation.username.error = EMPTY_STRING;
        }
        context.setState({validation: validation});
    } else {
        if (validation.username.required) {
            validation.username.error = "This input is required.";
            context.setState({validation: validation});
        }
    }
};

export const validatePhoneNumber = (context) => {
    let {validation} = context.state;
    if (context.state.phoneNumber !== "") {
        if (!isPhoneNumberValid(context.state.phoneNumber)) {
            validation.phoneNumber.error = "This input is not valid phone number.";
        } else {
            validation.phoneNumber.error = "";
        }
        context.setState({validation: validation});
    } else {
        if (validation.phoneNumber.required) {
            validation.phoneNumber.error = "This input is required.";
            context.setState({validation: validation});
        }
    }
};

export const validateEmail = (context) => {
    let {validation} = context.state;
    if (context.state.email !== EMPTY_STRING) {
        if (!isEmailValid(context.state.email)) {
            validation.email.error = "This input is not valid E-mail.";
        } else {
            validation.email.error = EMPTY_STRING;
        }
        context.setState({validation: validation});
    } else {
        if (validation.email.required) {
            validation.email.error = "This input is required.";
            context.setState({validation: validation});
        }
    }
};