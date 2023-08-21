import { Avatar, Badge, Box, Flex, Stack, Text, Tooltip, WrapItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useHelperHook from "../../../hooks/useHelperHook";
import MainHeading from "../../../components/header/MainHeading";
import ReactDataTableComponent from "../../../components/table/ReactDataTable";
import TableHeading from "../../../components/table/TableHeading";
import UserTable from "../../../components/table/UserTable";
import { globalStyles } from "../../../theme/styles";
import DateSelect from "../../../components/customSelect/DateSelect";
import { useFormik } from "formik";
import SearchButton from "../../../components/button/SearchButton";
import ResetButton from "../../../components/button/ResetButton";
import InputSelect from "../../../components/filters/InputSelect";
import MySelect from "../../../components/filters/MySelect";
import { USER_STATUS } from "../Users/user.type";
import ExportExcel from "../../../components/button/Excelexport";
import useBlockUserHook from "./useBlockUserHook";
import dayjs from "dayjs";
import { endOfDay, startOfDay } from "date-fns";

const BlockUsermgmt = () => {
    const { t, navigate, toast } = useHelperHook();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isLoading, setIsLoading] = useState<any>(false);
    const [disableReset, setDisableReset] = useState<boolean>(true);
    const [tableData, setTableData] = useState<any[]>([]);

    const { blockuserData, setBlockUserData, getAllBlockUser } = useBlockUserHook();

    const column = [
        {
            id: 1,
            name: <TableHeading heading={t("ユーザーネーム")} />,
            selector: (row: any) => row?.nickName,
            sortable: true,
            wrap: true,
            omit: false,
            width: "170px",
            cell: (row: any) => {
                return (
                    <Flex alignItems={"center"}>
                        <WrapItem pr={2}>
                            <Avatar size={"sm"} src={row?.profileImage?.url} />
                        </WrapItem>
                        <Text
                            color={globalStyles.colors.mainColor}
                            fontWeight={"normal"}
                            textTransform={"uppercase"}
                            cursor={"pointer"}
                        >
                            {row.nickName ?? "--"}
                        </Text>
                    </Flex>
                );
            }
        },
        {
            id: 2,
            name: "ID",
            selector: (row: any) => row?._id,
            omit: false,
            width: "100px",
            cell: (row: any) => (
                <Flex alignItems={"center"}>
                    <Text as={"span"} cursor={"pointer"} color={globalStyles.colors.mainColor} fontWeight={"normal"}>
                        #{row._id && row._id?.substring(row._id.length - 5)}
                    </Text>
                </Flex>
            )
        },
        {
            id: 13,
            name: <TableHeading heading={t("コイン")} />,
            selector: (row: any) => row?.coin,
            sortable: true,
            wrap: true,
            omit: false,
            width: "120px",
            cell: (row: any) => {
                return <UserTable column={row?.coin ?? "--"} />;
            }
        },
        {
            id: 3,
            name: <TableHeading heading={t("自己紹介")} />,
            selector: (row: any) => row?.SelfIntroduction,
            sortable: true,
            wrap: true,
            omit: false,
            width: "120px",
            cell: (row: any) => (
                <Tooltip label={row.SelfIntroduction}>
                    <Text fontWeight={"500"} noOfLines={1} cursor="pointer">
                        {row.SelfIntroduction ?? "--"}
                    </Text>
                </Tooltip>
            )
        },
        {
            id: 4,
            name: <TableHeading heading={t("生年月")} />,
            selector: (row: any) => row?.dateOfBirth,
            sortable: true,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.dateOfBirth ? dayjs(row?.dateOfBirth).format("YYYY/MM") : "--"} />;
            }
        },
        {
            id: 5,
            name: <TableHeading heading={t("職業")} />,
            selector: (row: any) => row?.profession?.name,
            sortable: false,
            wrap: true,
            width: "130px",
            cell: (row: any) => {
                return <UserTable column={row?.profession?.name ?? "--"} />;
            }
        },
        {
            id: 6,
            name: <TableHeading heading={t("換金済み C ")} />,
            selector: (row: any) => row?.convertedCoin,
            sortable: true,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.convertedCoin ?? "--"} />;
            }
        },
        {
            id: 7,
            name: <TableHeading heading={t("MC累計回数")} />,
            selector: (row: any) => row?.matchingTimes,
            sortable: true,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.matchingTimes ?? "--"} />;
            }
        },
        {
            id: 8,
            name: <TableHeading heading={t("警告回数")} />,
            selector: (row: any) => row?.warnings,
            sortable: true,
            wrap: true,
            omit: false,
            width: "120px",
            cell: (row: any) => {
                return <UserTable column={row?.warnings ?? "--"} />;
            }
        },

        {
            id: 11,
            name: <TableHeading heading={t("性別")} />,
            selector: (row: any) => (
                <Text flexWrap={"wrap"}>{row?.gender === "MALE" ? "男性" : "FEMALE" ? "女性" : "--"}</Text>
            ),
            sortable: true,
            wrap: true,
            width: "100px"
        },
        {
            id: 12,
            name: <TableHeading heading={t("携帯電話")} />,
            selector: (row: any) => row?.contactNumber,
            sortable: false,
            wrap: true,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.contactNumber} />;
            }
        },
        {
            id: 15,
            name: (
                <Text fontWeight={"bold"} w={"full"} display={"flex"} justifyContent={"center"}>
                    {t("userRole")}
                </Text>
            ),
            selector: (row: any) => row?.userRole,
            sortable: true,
            wrap: true,
            width: "150px",
            omit: false,
            cell: (row: any) => (
                <Badge variant={row?.userRole === "SERVICE_RECEIVER" ? "success" : "danger"}>
                    {row?.userRole === "SERVICE_RECEIVER" ? t("クライアント") : t("カウンセラー")}
                </Badge>
            )
        },
        {
            id: 14,
            name: (
                <Text fontWeight={"bold"} w={"full"} display={"flex"} justifyContent={"center"}>
                    {t("common.status")}
                </Text>
            ),
            selector: (row: any) => row?.userStatus,
            sortable: true,
            wrap: true,
            width: "150px",
            omit: false,
            cell: (row: any) => (
                <Badge variant={row?.userStatus === "BLOCKED" ? "danger" : "success"}>
                    {row?.userStatus === "BLOCKED" ? t("ブロック") : t("アクティブ")}
                </Badge>
            )
        }
    ];

    const handleSearchData = () => {
        setDisableReset(false);
        handleFilteredData();
    };

    async function fetchData() {
        setIsLoading(true);
        try {
            const blockuserData = await getAllBlockUser();
            setBlockUserData(blockuserData);
            setTableData(blockuserData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }
    const { values, handleSubmit, touched, setFieldValue, resetForm, setFieldTouched, dirty, handleChange } = useFormik(
        {
            initialValues: {
                userName: "",
                userStatus: {
                    label: "",
                    value: ""
                },
                contactNumber: ""
            },
            onSubmit: handleSearchData
        }
    );

    const getExcelData = () => {};

    const handleFilteredData = () => {
        let filterData = blockuserData.length > 0 ? [...blockuserData] : [];

        if (values.userName) {
            const lowerName = values.userName.trim().toLowerCase();
            filterData = filterData.filter((data: any) => data?.nickName?.toString().toLowerCase().includes(lowerName));
        }

        if (values.contactNumber) {
            if (values.contactNumber) {
                const lowerName = values.contactNumber.trim().toLowerCase();
                filterData = filterData.filter((data: any) =>
                    data?.contactNumber?.toString().toLowerCase().includes(lowerName)
                );
            }
        }

        if (!endDate && startDate) {
            filterData = filterData.filter((data: any) => {
                return startOfDay(new Date(data.createdAt)).getTime() >= startOfDay(new Date(startDate)).getTime();
            });
        }

        if (endDate && !startDate) {
            filterData = filterData.filter(
                (data: any) => endOfDay(new Date(endDate)) >= startOfDay(new Date(data.createdAt))
            );
        }

        if (endDate && startDate) {
            filterData = filterData.filter(
                (data: any) =>
                    startOfDay(new Date(startDate)) <= startOfDay(new Date(data.createdAt)) &&
                    endOfDay(new Date(endDate)) >= startOfDay(new Date(data.createdAt))
            );
        }

        setTableData(filterData);
    };

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        fetchData();
        setBlockUserData(blockuserData);
        resetForm();
    };

    useEffect(() => {
        fetchData();
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    return (
        <>
            <Stack direction={"row"} mt={5} mb={1} alignItems={"center"} justifyContent={"space-between"}>
                <MainHeading title={t("ブロックユーザー")} />
            </Stack>

            <Box bgColor={"white"} p={4} rounded={"lg"} shadow={"sm"} my={3} mt={0}>
                <Text display={"flex"} fontWeight={"bold"} mb={3} alignItems={"center"}>
                    {t("common.search_condition")}
                </Text>

                <Flex gap={5} w={"full"} alignItems={"center"}>
                    <Flex flexDir={"column"} gap={3} w={"xs"}>
                        <InputSelect
                            label={"ニックネーム"}
                            value={values.userName}
                            handleChange={handleChange}
                            name={"userName"}
                            type="text"
                        />

                        <InputSelect
                            label={"携帯電話"}
                            value={values.contactNumber}
                            handleChange={handleChange}
                            name={"contactNumber"}
                            type="text"
                        />

                        <DateSelect
                            label={t("作成日")}
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            selected={startDate}
                            setFieldValue={setFieldValue}
                            name="date"
                        />
                        {/* <Flex justifyContent={"space-between"} gap={3}>
                            <Text fontWeight={"bold"} fontSize="sm">
                                {t("common.status")}
                            </Text>
                            <MySelect
                                value={values.userStatus}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                options={USER_STATUS(t)}
                                name="userStatus"
                                multi={false}
                            />
                        </Flex> */}
                    </Flex>
                    <Box w={"0.5px"} h={"32"} bgColor={globalStyles.colors.mainColor} />
                    <Flex gap={2} mb={2} flexDir={"column"} ml={4}>
                        <Box w="36"></Box>
                        <ExportExcel getExcelData={getExcelData} fileName={"ユーザー"} />
                        <SearchButton isLoading={isLoading} handleSearchData={handleSubmit} />
                        <ResetButton isDisabled={!dirty} handleReset={handleReset} />
                    </Flex>
                </Flex>
            </Box>

            <Box rounded={"lg"} bgColor={"white"} px={5}>
                <ReactDataTableComponent column={column} data={tableData} />
            </Box>
        </>
    );
};

export default BlockUsermgmt;
