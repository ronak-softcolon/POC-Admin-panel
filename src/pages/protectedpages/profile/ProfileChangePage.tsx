import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

import client from "../../../apiConfig/client";
import { GET_ADMIN_PROFILE } from "../../../utils/url";
import { useAppDispatch } from "../../../store/hooks";
import { selectProfileImage, setProfileData } from "../../../store/slices/authSlice";
import { AxiosError } from "axios";

const ProfileChange = () => {
    const [mode, setMode] = useState<boolean>(true);
    const handleModeChange = () => {
        setMode(!mode);

        if (!mode) {
            getAdminProfile();
        }
    };

    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>({});

    const getAdminProfile = async () => {
        setIsLoading(true);
        try {
            const result = await client.get(GET_ADMIN_PROFILE);
            const data = result?.data?.data;
            setDetails(data);
            dispatch(setProfileData(data));
        } catch (error: AxiosError | any) {
            console.log({ error });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAdminProfile();
    }, []);

    return (
        <div>
            {isLoading ? (
                // <LoaderIcon />
                <div>loading...</div>
            ) : (
                <>
                    {mode ? (
                        <Profile details={details} handleModeChange={handleModeChange} />
                    ) : (
                        <EditProfile handleModeChange={handleModeChange} details={details} />
                    )}
                </>
            )}
        </div>
    );
};

export default ProfileChange;
