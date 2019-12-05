import {APIUrls} from "../constants/urls";
import {msgType} from "../constants/constants";
import {showErrorModal} from "../utils/utils";

export const fetchAuthors = async () =>
    fetch(`${APIUrls.Author}`)
        .then(res => {
            const data = res.json();
            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message);
            }
        });