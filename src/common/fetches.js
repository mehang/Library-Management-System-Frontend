import {APIUrls} from "../constants/urls";
import {msgType} from "../constants/constants";
import {showErrorModal} from "../utils/utils";

export const fetchAuthors = async () =>
    fetch(`${APIUrls.Author}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Error while fetching authors");
            }
        });