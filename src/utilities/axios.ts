import axios from 'axios';
export const getAxiosData = () => {
    return axios.get('https://tooltt.com/json2typescript/');
};
export const getLoginData = (workSpace: string) => {
    return {
        workSpace,
        data: [{demo: 1}],
    };
};