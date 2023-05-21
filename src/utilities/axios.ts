import axios from 'axios';
export const getAxiosData = () => {
    return axios.get('https://tooltt.com/json2typescript/');
};
export const getLoginData = async (workSpace: string) => {
    const res = await axios.post('http://localhost:9201/resource/project/list', {
        projectId: '1',
    }, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2F1dGgyLXJlc291cmNlIl0sInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsiYWxsIl0sImlkIjoxLCJleHAiOjE2ODQ2ODE5NTAsImF1dGhvcml0aWVzIjpbIlVTRVIiLCJBRE1JTiJdLCJqdGkiOiIwNWM2YzhiZi03MjllLTQxMWUtYWM1OS0yMzJkOWM3MjIyNTQiLCJjbGllbnRfaWQiOiJjbGllbnQtYXBwIn0.RZbfaGkpW8wFZxDUiZ7MT2rNUd7PFgxGxyV6JBu-PW1nvsyFcpkw3pPdfVP028N8p_klxGEKwTNjCXaVdQjxTLNcAIEM48VddwulmtPcCs-asgeyiRp7MWR_YSoucbKiPp0OS_S2xX6jWSlzV6rjvGf6nsHsrkniE3EvOxi6gI9djxaUEa7i_jN-KknvnnmOYqXmqw0DRtLJRfV0dwk3OFg1gLW5pJO3a1K8DxHKDNULMtc2TB_tthxa-pv-WlqIyofOzIXQqBCaSjM8H1CPFc9xNVgPKff-KhTP9oEKx0p7Cqz7GQE4NvEehGraqtlCvniE7FqyIClMCdADNMctqg',
        }
    })
    console.warn({res: res.data.data})
    return {
        workSpace,
        data: {res: res.data.data},
    };
};