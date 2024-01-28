import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CLIENT_ID = 'TeCx0qAJkrEH8VQD4l7v';
const CLIENT_SECRET = 'q6IUCTGsK9';

function NaverCallback() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(location.search).get('code');
        const state = new URLSearchParams(location.search).get('state');

        axios.get(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&state=${state}`)
        .then((res) => {
            const { access_token } = res.data;
            console.log(res)
            axios.get('https://openapi.naver.com/v1/nid/me', { headers: { 'Authorization': `Bearer ${access_token}` } })
            .then((res) => {
                console.log(res.data);
                navigate('/test');
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }, [location, navigate]);

    return <div>처리중...</div>;
}

export default NaverCallback;
