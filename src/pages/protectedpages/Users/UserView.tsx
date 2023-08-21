import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Flex,
    FormControl,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    StackDivider,
    Text,
    WrapItem,
    useDisclosure,
    IconButton,
    useBreakpointValue,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from "@chakra-ui/react";
import ReturnButton from "../../../components/button/ReturnButton";
import useHelperHook from "../../../hooks/useHelperHook";
import { useEffect, useState } from "react";
import useUserHook from "./useUserHook";
import dayjs from "dayjs";
import { globalStyles } from "../../../components/theme/styles";
import CustomCard from "../../../components/card/CustomCard";

const UserView = () => {
    const { t, toast, navigate } = useHelperHook();
    const [scrollTop, setScrollTop] = useState<boolean>(false);
    const { setUserData, setIdByuserDataData, updateUserStatus, setUpdateData, updateData, getIdByUser, userData } =
        useUserHook();
    const [isLoading, setIsLoading] = useState<any>(false);
    const [tableData, setTableData] = useState<any>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modal, setModal] = useState<any>(false);

    async function fetchData() {
        setIsLoading(true);
        try {
            const idByuserData = await getIdByUser();
            setUserData(idByuserData);
            setTableData(idByuserData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const handleUpdateStatus = async () => {
        setIsLoading(true);

        try {
            const updateData = await updateUserStatus(tableData?.userStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE");
            setUpdateData(updateData);
            setTableData(updateData);
            onClose();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        scrollTopFunction(), [scrollTop];
    }, []);

    const scrollTopFunction = () => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "auto" });
        }, 100);
    };

    const tabs = [{ name: "ユーザープロフィール" }, { name: "Coverd Image" }];

    return (
        <>
            <Tabs variant="enclosed">
                <TabList mt={5} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {tabs.map((tab: any, index: number) => {
                        return (
                            <Tab
                                key={index}
                                w={"50%"}
                                fontSize={{ base: "xs", md: "sm", lg: "md" }}
                                _selected={{
                                    background: globalStyles.colors.mainColor,
                                    color: "gray.100"
                                }}
                            >
                                {tab.name}
                            </Tab>
                        );
                    })}
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Box w={"4xl"} width={{ base: "full", md: "4xl" }} pt={4}>
                            <Card>
                                <Box py={4} my={3} position={"relative"} display={"flex"} alignItems={"center"}>
                                    <Stack position={"absolute"} mx={5}>
                                        <ReturnButton />
                                    </Stack>
                                    <CardHeader
                                        p={0}
                                        display={"flex"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        alignContent={"center"}
                                        width="full"
                                    >
                                        <Heading
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            alignContent={"center"}
                                            size="lg"
                                        >
                                            {t("user_mgmt.user_details")}
                                        </Heading>
                                    </CardHeader>
                                </Box>

                                <Box mt={5} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                    <Avatar size="2xl" borderRadius={"md"} src={tableData?.profileImage?.url} />
                                </Box>

                                <CardBody>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"ID"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {tableData?._id ? tableData?._id : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"ニックネーム"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {tableData?.nickName ?? "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex flex={"0.2"}>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"自己紹介"}
                                            </Heading>
                                            <Text p={3} flex={"0.8"} fontSize="md">
                                                {tableData?.SelfIntroduction ?? "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex flex={"0.2"}>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"MC累計回数"}
                                            </Heading>
                                            <Text p={3} flex={"0.8"} fontSize="md">
                                                {tableData?.MC累計回数 ?? "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex flex={"0.2"}>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"換金済み C"}
                                            </Heading>
                                            <Text p={3} flex={"0.8"} fontSize="md">
                                                {tableData?.換金済みC ?? "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"生年月"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {tableData?.dateOfBirth
                                                    ? dayjs(tableData?.dateOfBirth).format("YYYY/MM")
                                                    : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"性別"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {tableData?.gender === "MALE" ? "男性" : "FEMALE" ? "女性" : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"警告回数"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {tableData?.警告回数 ?? "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"年代"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {tableData?.年代 ?? "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"友達紹介"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {tableData?.友達紹介 ?? "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"メールアドレス"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {tableData?.メールアドレス ?? "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"職業"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {tableData?.profession?.name ?? "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"携帯電話"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {tableData?.contactNumber ?? "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"コイン"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {tableData?.coin ?? "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"ステータス"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {/* {tableData?.userStatus ?? "--"} */}
                                                <Badge
                                                    variant={tableData?.userStatus === "ACTIVE" ? "success" : "danger"}
                                                >
                                                    {tableData?.userStatus === "ACTIVE"
                                                        ? t("アクティブ")
                                                        : t("ブロック")}
                                                </Badge>
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"最終ログイン"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {tableData?.lastLoginAt
                                                    ? dayjs(tableData?.lastLoginAt).format("YYYY/MM/DD HH:mm")
                                                    : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                </CardBody>

                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} py={2}>
                                    <Button
                                        onClick={onOpen}
                                        isLoading={isLoading}
                                        bgColor={tableData?.userStatus === "ACTIVE" ? "red.400" : "#4299e1"}
                                        _hover={{
                                            bgColor: tableData?.userStatus === "ACTIVE" ? "red.300" : "blue.300"
                                        }}
                                        color={"white"}
                                        w={"36"}
                                    >
                                        {tableData?.userStatus == "ACTIVE" ? t("status.block") : t("status.active")}
                                    </Button>
                                </Box>

                                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>{t("common.user_status")}</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Box>
                                                <FormControl gap={10} display="flex" justifyContent={"center"} mt={5}>
                                                    {tableData?.userStatus === "ACTIVE" ? (
                                                        <Text>{t("form_errors.suspend_message")}</Text>
                                                    ) : (
                                                        <Text>{t("form_errors.active_message")}</Text>
                                                    )}
                                                </FormControl>
                                            </Box>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Box
                                                w={"full"}
                                                display="flex"
                                                justifyContent={"center"}
                                                onClick={() => setModal(false)}
                                            >
                                                <Button
                                                    bgColor={globalStyles.colors.mainColor}
                                                    _hover={{ bgColor: "blue.300" }}
                                                    isLoading={isLoading}
                                                    onClick={() => {
                                                        setScrollTop(true);
                                                        handleUpdateStatus();
                                                    }}
                                                    color={"white"}
                                                    mr={3}
                                                >
                                                    {t("common.yes")}
                                                </Button>
                                                <Button
                                                    bgColor={"red.500"}
                                                    _hover={{ bgColor: "red.300" }}
                                                    color={"white"}
                                                    onClick={() => {
                                                        setScrollTop(true);
                                                        onClose();
                                                    }}
                                                >
                                                    {t("common.no")}
                                                </Button>
                                            </Box>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Card>
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <CustomCard />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export default UserView;
