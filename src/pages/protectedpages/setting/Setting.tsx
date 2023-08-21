import { Box, Button, Flex, Input, Table, Tbody, Td, Text, Th, Thead, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MainHeading from "../../../components/header/MainHeading";
import useHelperHook from "../../../hooks/useHelperHook";
import { BiEdit } from "react-icons/bi";
import { AxiosError } from "axios";
import client from "../../../apiConfig/client";
import { GET_ALL_SETTING, UPDATE_EMAIL } from "../../../utils/url";
import { useFormik } from "formik";
import { AddAdminSchema } from "../../../validations/adminValidation";
import CustomEmailField from "../../../components/form/CustomEmailField";
import { AiOutlineDelete } from "react-icons/ai";
import CustomNumberField from "../../../components/form/CustomeNumberFiels";
import { MATCHING_ROLE, SettingProps } from "./SettingType";
import settingService from "../../../services/settingService";
import UpdateProfessionModal from "../../../components/modal/UpdateProfessionModal";
import UpdateValueModal from "../../../components/modal/UpdateValueModal";
import SmallFormLabel from "../../../components/filters/SmallFormLabel";
import MySelect from "../../../components/filters/MySelect";
import { USER_GENDER } from "../Users/user.type";
import CustomSelectField from "../../../components/filters/CustomSelect";
import MatchingPriority from "./components/MatchingPriority.component";
import ModalFooterComponent from "../../../components/modal/ModalFooter";
import { globalStyles } from "../../../theme/styles";

export interface optionTypes {
    label: string;
    value: string;
}

const Setting = () => {
    const { t, toast, navigate } = useHelperHook();
    const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
    const [isTimeLoading, setIsTimeLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [settingData, setSettingData] = useState<any>({});
    const [deleteEmail, setDeleteEmail] = useState<any>();

    const getAll = async () => {
        try {
            const { data } = await settingService.getAll();

            setSettingData(data);

            setFieldValue("freeMatch", data?.freeMatch);
            // setFieldValue("contactUsMail", data?.contactUsMail);

            setFieldValue("dataRemoveTime", data?.dataRemoveTime);

            const matchings: optionTypes[] = [];

            data.matching &&
                data.matching.length > 0 &&
                data.matching.map((result: string) => {
                    matchings.push({
                        label: result,
                        value: result
                    });
                });

            setFieldValue("matching", matchings);
        } catch (error) {}
    };

    // Add email
    const onSubmit = async (values: any) => {
        setIsLoading(true);
        try {
            const result = await client.put(UPDATE_EMAIL, { email: values.email });
            toast({
                title: result?.data?.message,
                position: "top-right",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            getAll();
            resetForm();
            setIsLoading(false);
        } catch (error: AxiosError | any) {
            toast({
                title: error?.message,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Free Time Matching
    const handleSearchSubmit = async (e: any) => {
        e.preventDefault();
        setIsAddLoading(true);
        try {
            const result = await client.put(UPDATE_EMAIL, { freeMatch: values?.freeMatch });
            toast({
                title: result?.data?.message,
                position: "top-right",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            getAll();
            setIsAddLoading(false);
        } catch (error: AxiosError | any) {
            toast({
                title: error?.message,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            setIsAddLoading(false);
        }
    };

    // TimeUpdate
    const handleSearchTimeSubmit = async (e: any) => {
        setIsTimeLoading(true);
        e.preventDefault();
        try {
            const result = await client.put(UPDATE_EMAIL, { time: values?.dataRemoveTime });
            toast({
                title: result?.data?.message,
                position: "top-right",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            getAll();
            setIsTimeLoading(false);
        } catch (error: AxiosError | any) {
            toast({
                title: error?.message,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            setIsTimeLoading(false);
        }
    };

    // DELETE
    // const handleDelete = async (value: any) => {
    //     setDeleteEmail(value);
    //     // setIsLoading(true);
    //     try {
    //         const result = await client.put(UPDATE_EMAIL, { emailDelete: value });
    //         toast({
    //             title: result?.data?.message,
    //             position: "top-right",
    //             status: "success",
    //             duration: 3000,
    //             isClosable: true
    //         });
    //         getAll();
    //     } catch (error: AxiosError | any) {
    //         toast({
    //             title: error?.message,
    //             position: "top-right",
    //             status: "error",
    //             duration: 3000,
    //             isClosable: true
    //         });
    //     } finally {
    //         // setIsLoading(false);
    //     }
    // };

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        dirty,
        handleChange,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
        resetForm
    } = useFormik({
        initialValues: {
            email: "",
            freeMatch: "",
            contactUsMail: [],
            emailDelete: deleteEmail,
            dataRemoveTime: "",
            matching: []
        },
        validationSchema: AddAdminSchema(t),
        onSubmit
    });

    useEffect(() => {
        getAll();
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    return (
        <>
            <Flex display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <MainHeading title={t("設定")} />
            </Flex>

            {/* Box 1  */}
            <MatchingPriority setFieldTouched={setFieldTouched} setFieldValue={setFieldValue} value={values.matching} />

            {/* <Box bgColor={"white"} p={4} rounded={"lg"} my={3} mt={2}>
                <Text display={"flex"} fontWeight={"bold"} mb={3}>
                    {t("マッチング優先順位")}
                </Text>
                <Box>
                    <Table w={"full"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Tbody>
                            <Thead
                                w={"96"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                border={"1px solid gray"}
                            >
                                新規登録者
                            </Thead>
                            <Td
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                border={"1px solid gray"}
                            >
                                <Flex justifyContent={"space-between"}>
                                    <SmallFormLabel title={t("性別")} />
                                    <CustomSelectField
                                        value={values.contactUsMail}
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                        options={MATCHING_ROLE(t)}
                                        name="contactUsMail"
                                        multi={false}
                                    />
                                </Flex>
                            </Td>
                            <Td
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                border={"1px solid gray"}
                            >
                                {tableData?.data?.matching?.[0]}
                            </Td>
                            <Td
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                border={"1px solid gray"}
                            >
                                {tableData?.data?.matching?.[1]}
                            </Td>
                            <Td
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                border={"1px solid gray"}
                            >
                                {tableData?.data?.matching?.[2]}
                            </Td>
                        </Tbody>
                    </Table>
                </Box>
                <Box display={"flex"} justifyContent={"flex-end"}>
                    <Button bgColor={"gray"}>更新</Button>
                </Box>
            </Box> */}

            {/* Box 2  */}
            <Box bgColor={"white"} p={4} pb={1} rounded={"lg"} my={2} mt={2}>
                <Text display={"flex"} fontWeight={"bold"}>
                    画像、動画保存期限:
                </Text>

                <form onSubmit={handleSearchTimeSubmit}>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        bgColor={"white"}
                        rounded={"lg"}
                        position={"relative"}
                    >
                        <Flex gap={5} w={"64"}>
                            <CustomNumberField
                                name="dataRemoveTime"
                                Type="number"
                                values={values.dataRemoveTime}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.dataRemoveTime}
                                touched={touched.dataRemoveTime}
                            />
                            <Text py={4}>時間オート削除</Text>
                        </Flex>
                        <Box display={"flex"} justifyContent={"flex-end"} position={"absolute"} right={"0"}>
                            <Button type="submit" color={"white"} bgColor={globalStyles.colors.mainColor}>
                                更新
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>

            {/* Box 3  */}
            {/* <Box bgColor={"white"} p={4} rounded={"lg"} my={3} mt={2}>
                <Text display={"flex"} fontWeight={"bold"} mb={3}>
                    問い合わせ先メールアドレス:
                </Text>
                <form onSubmit={handleSubmit}>
                    <Box>
                        <Table w={"full"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Tbody>
                                <Thead
                                    w={"96"}
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    border={"1px solid gray"}
                                >
                                    新規登録者
                                </Thead>
                                <Td
                                    display={"flex"}
                                    flexDirection={"column"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    border={"1px solid gray"}
                                    gap={2}
                                >
                                    {tableData?.data?.contactUsMail?.map((data: any, value: any) => (
                                        <Flex gap={2}>
                                            <CustomEmailField
                                                name="contactUsMail"
                                                Type="email"
                                                values={data}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                errors={errors.contactUsMail}
                                                touched={touched.contactUsMail}
                                            />
                                            <Box py={3}>
                                                <AiOutlineDelete
                                                    cursor={"pointer"}
                                                    fontSize={"24px"}
                                                    onClick={() => handleDelete(data)}
                                                />
                                            </Box>
                                        </Flex>
                                    ))}
                                </Td>
                                <Td
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    border={"1px solid gray"}
                                >
                                    <CustomEmailField
                                        name="email"
                                        Type="email"
                                        values={values.email}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        errors={errors.email}
                                        touched={touched.email}
                                    />
                                </Td>
                            </Tbody>
                        </Table>
                    </Box>
                    <Box display={"flex"} justifyContent={"flex-end"}>
                        <Button isLoading={isAddLoading} type="submit" bgColor={"gray"}>
                            更新
                        </Button>
                    </Box>
                </form>
            </Box> */}

            {/* Box 4  */}
            <Box bgColor={"white"} p={4} pb={1} rounded={"lg"} my={2} mt={2}>
                <Text display={"flex"} fontWeight={"bold"}>
                    {t("無料マッチング回数: ")}
                </Text>

                <form onSubmit={handleSearchSubmit}>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        bgColor={"white"}
                        rounded={"lg"}
                        position={"relative"}
                    >
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Flex w={64} gap={5}>
                                <Box>
                                    <CustomNumberField
                                        name="freeMatch"
                                        Type="number"
                                        values={values.freeMatch}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        errors={errors.freeMatch}
                                        touched={touched.freeMatch}
                                    />
                                </Box>
                                <Text py={4}>回</Text>
                            </Flex>
                        </Box>
                        <Box
                            display={"flex"}
                            justifyContent={"flex-end"}
                            position={"absolute"}
                            right={"0"}
                            bottom={"2"}
                        >
                            <Button
                                type="submit"
                                color={"white"}
                                bgColor={globalStyles.colors.mainColor}
                                // isLoading={isTimeLoading}
                            >
                                更新
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default Setting;
