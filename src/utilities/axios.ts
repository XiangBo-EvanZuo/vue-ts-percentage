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
    });
    console.log({getLoginData: res});
    if (res.data.code !== 200) {
        throw res.data;
    }
    return {
        workSpace: workSpace || [],
        data: {res: res.data.data},
    };
};

export const getProjectList = async (token: string) => {
    const res = await axios.post('http://localhost:9201/resource/project/userProjectList', {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    console.log({getProjectList: res});
    return res;
};

export const getProjectFileList = async (token: string, projectId: number) => {
    console.warn({token, projectId});
    const params = {
        projectId,
    };
    const res = await axios.post('http://localhost:9201/resource/project/list', params, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    console.log({getProjectFileList: res});
    return res;
};
export const axiosSaveDateFileInfo = async (data: any, token: string) => {
    console.log({data, token});
    const res = await axios.post('http://localhost:9201/resource/project/save', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    console.log({axiosSaveDateFileInfo: res});
    return res;
};
export const axiosCreateProject = async (projectName: string, token: string) => {
    const params = {
        projectName,
    };
    const res = await axios.post('http://localhost:9201/resource/project/saveProject', params, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    console.log({axiosCreateProject: res});
    return res.data.data;
};