import React, { useState } from "react";
import { Box, Button, Divider, Flex, Input, Table, Tbody, Td, Text, Th, Thead, useDisclosure } from "@chakra-ui/react";
import CustomSelectField from "../../../../components/filters/CustomSelect";
import useHelperHook from "../../../../hooks/useHelperHook";
import { MATCHING_ROLE } from "../SettingType";
import { optionTypes } from "../Setting";
import { globalStyles } from "../../../../theme/styles";

interface Props {
    setFieldTouched: any;
    setFieldValue: any;
    value: optionTypes[];
}

const MatchingPriority = ({ setFieldTouched, setFieldValue, value }: Props) => {
    const { t, toast, navigate } = useHelperHook();

    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditMode = () => {
        setIsEditMode(!isEditMode);
    };
    return (
        <Box bgColor={"white"} p={4} rounded={"lg"} mt={2} position={"relative"}>
            <Text display={"flex"} fontWeight={"bold"} mb={3}>
                {t("マッチング優先順位")}
            </Text>
            <Box>
                <Table w={"full"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Tbody>
                        <Td display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            {isEditMode ? (
                                <Flex justifyContent={"space-between"}>
                                    <CustomSelectField
                                        value={value}
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                        options={MATCHING_ROLE}
                                        name="matching"
                                        multi={true}
                                    />
                                </Flex>
                            ) : (
                                <>
                                    <Box>
                                        {value.map((result: optionTypes) => (
                                            <>
                                                <Td
                                                    minWidth={"28rem"}
                                                    display={"flex"}
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                    border={"1px solid gray"}
                                                >
                                                    {result.value}
                                                </Td>
                                            </>
                                        ))}
                                    </Box>
                                </>
                            )}
                        </Td>
                    </Tbody>
                </Table>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"}>
                <Button color={"white"} bgColor={globalStyles.colors.mainColor} onClick={handleEditMode}>
                    更新
                </Button>
            </Box>
        </Box>
    );
};

export default MatchingPriority;
