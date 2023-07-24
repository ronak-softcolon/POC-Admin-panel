// import { setRefreshToken } from "../store/auth";
import client from "./client";
// import { resetState } from "../store/auth";
import axios from "axios";
import { BASE_URL } from "../utils/environments";

let isRefreshTokenUpdating = false;

export default function addAuthTokenInterceptor(store) {
    client.interceptors.request.use((req) => {
        const token = store.getState().auth.token;
        if (!token) return req;
        req.headers.Authorization = `Bearer ${token}`;
        return req;
    });

    client.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalConfig = error?.config;
            const refreshToken = store.getState().auth.refreshToken;
            const token = store.getState().auth.token;
            // originalConfig._retry = true;

            if (error.response) {
                if (
                    !isRefreshTokenUpdating &&
                    refreshToken &&
                    error?.response?.status === 406 &&
                    !originalConfig._retry
                ) {
                    // If user login and have refresh token
                    isRefreshTokenUpdating = true;
                    originalConfig._retry = true;

                    //console.log({ originalConfig });

                    try {
                        const data = JSON.stringify({
                            refresh_token: refreshToken
                        });

                        let config = {
                            method: "post",
                            maxBodyLength: Infinity,
                            url: `${BASE_URL}/company/auth/access-token`,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            data: data
                        };

                        const result = await axios.request(config);
                        //console.log({ result });
                        isRefreshTokenUpdating = false;
                        // store.dispatch(setRefreshToken(result.data));
                        return client(originalConfig);
                    } catch (error) {
                        //console.log({ Token: JSON.stringify(error) });
                        isRefreshTokenUpdating = false;
                        // store.dispatch(resetState());
                        return (window.location = "/login");
                    }
                } else if (isRefreshTokenUpdating) {
                    // If refresh token is updating
                    await isRefreshTokenDone();
                    //console.log("isRefreshTokenUpdating");
                    return client(originalConfig);
                } else if (token && token.length === 0) {
                    store.dispatch(resetState());
                    window.location = "/login";
                    return Promise.reject(error.response.data);
                } else {
                    return Promise.reject(error.response.data);
                }
            }
            return Promise.reject(error);
        }
    );
}

/**
 * Stop Function excution still refresh token did't update
 */
const isRefreshTokenDone = async () => {
    if (isRefreshTokenUpdating) {
        await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for one second
        return await isRefreshTokenDone();
    } else {
        return true;
    }
};
