import axios from 'axios';
import * as FormData from 'form-data';
import { WorkspaceFolder } from 'vscode';
export const getAxiosData = () => {
    return axios.get('https://tooltt.com/json2typescript/');
};
export const getLoginData = async (workSpace: readonly WorkspaceFolder[] | undefined, data: { username: string; password: string }) => {
    const requestData = new FormData();
    requestData.append("username", data.username);
    requestData.append("password", data.password);
    requestData.append("grant_type", 'password');
    requestData.append("client_id", 'client-app');
    requestData.append("client_secret", '123456');
    const res = await axios.post('http://localhost:9201/oauth/token', requestData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    if (res.data.code !== 200) {
        throw res.data;
    }
    return {
        workSpace: workSpace || [],
        data: {res: res.data.data},
    };
};