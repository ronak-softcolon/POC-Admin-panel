import { useState } from "react";
import client from "../../../apiConfig/client";
import { GET_ALL_USER, GET_ID_USER_USER } from "../../../utils/url";
import { AxiosError } from "axios";
import { UserProps } from "./user.type";
import { useParams } from "react-router-dom";

const useUserHook = () => {
    const [userData, setUserData] = useState<UserProps[]>([]);
    const [idByuserData, setIdByuserDataData] = useState<UserProps[]>([]);
    const [updateData, setUpdateData] = useState<UserProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const params = useParams();

    async function getAllUser(): Promise<UserProps[]> {
        try {
            const response = await client.get(GET_ALL_USER);
            const userData: UserProps[] = response.data?.data?.rows ?? [];
            return userData;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    async function getIdByUser(): Promise<any> {
        try {
            const response = await client.get(`/admin/user/details/${params.userId}`);
            const idByuserData: UserProps[] = response.data?.data ?? [];
            return idByuserData;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    async function updateUserStatus(status: any): Promise<any> {
        try {
            const response = await client.put(`/admin/user/status/${params.userId}`, { userStatus: status });
            const updateStatus: UserProps[] = response.data?.data ?? [];
            return updateStatus;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    return {
        getAllUser,
        setUserData,
        userData,
        getIdByUser,
        idByuserData,
        setIdByuserDataData,
        updateUserStatus,
        setUpdateData,
        updateData
    };
};

export default useUserHook;
