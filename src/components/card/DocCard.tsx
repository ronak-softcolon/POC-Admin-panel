import { Box, Text, VStack } from "@chakra-ui/react";
interface DocCardProps {
    doc: any;
}
const DocCard = ({ doc }: DocCardProps) => {
    return (
        <Box
            w={"400px"}
            h={"400px"}
            maxW={"400px"}
            maxH={"400px"}
            borderWidth="1px"
            border={"1px solid gray"}
            borderRadius="lg"
            p={4}
        >
            <VStack h={"full"} w={"full"} spacing={2} align="stretch">
                <Box
                    bg={"#b0c3dd80"}
                    borderWidth="1px"
                    cursor={"pointer"}
                    h={"full"}
                    w={"full"}
                    borderRadius="lg"
                    p={2}
                    _hover={{ bg: "gray.100" }}
                    transition="background 0.3s"
                >
                    <Text
                        display={"flex"}
                        h={"full"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        fontWeight={"500"}
                        fontSize="2xl"
                    >
                        Document {doc + 1}
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
};
export default DocCard;
