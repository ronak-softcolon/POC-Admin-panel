import { useState } from "react";
import client from "../../../apiConfig/client";
import { AxiosError } from "axios";
import { DELETE_PROFESSION, GET_PROFESSION, UPDATE_PROFESSION } from "../../../utils/url";
import { ProfessionProps } from "./ProfessionTypes";

const useProfessionHook = () => {
    const [professionData, setProfessionData] = useState<ProfessionProps[]>([]);

    const [selectedData, setSelectedData] = useState<ProfessionProps>({
        professionStatus: false,
        _id: ""
    });

    async function getAllProfession(): Promise<ProfessionProps[]> {
        try {
            const response = await client.get(GET_PROFESSION);
            const professionData: ProfessionProps[] = response.data?.data?.rows ?? [];
            return professionData;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    async function updateProfession(id: string, professionData: ProfessionProps) {
        try {
            const response = await client.put(UPDATE_PROFESSION + id, professionData);

            const updateProfession = response?.data?.message;
            return updateProfession;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    async function deleteProfession(professionData: ProfessionProps) {
        try {
            const response = await client.delete(`${DELETE_PROFESSION}/${professionData?._id}`);
            const deleteProfession = response?.data?.message;
            return deleteProfession;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    return {
        getAllProfession,
        setProfessionData,
        professionData,
        deleteProfession,
        setSelectedData,
        selectedData,
        updateProfession
    };
};

export default useProfessionHook;
