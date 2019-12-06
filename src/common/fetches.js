import {APIUrls} from "../constants/urls";
import { TOKEN_KEY} from "../constants/constants";

export const fetchAuthors = async () => {
    let data = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        },
    };
    return fetch(`${APIUrls.Author}`, data)
        .then(res => {
            const data = res.json();
            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message);
            }
        })};