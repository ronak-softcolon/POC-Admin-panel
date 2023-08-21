// import { Flex, Spinner } from "@chakra-ui/react";
// import React from "react";

// const MainLoader = () => {
//     // return <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />;
//     return (
//         <Flex justifyContent={"center"} alignItems={"center"} w={"full"} h={"100vh"}>
//             <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
//         </Flex>
//     );
// };

// export default MainLoader;

import { Flex, Spinner } from "@chakra-ui/react";
interface LoaderProps {
    height?: any;
}
const MainLoader = ({ height }: LoaderProps) => {
    return (
        <Flex justifyContent={"center"} alignItems={"center"} w={"full"} h={!height ? "100vh" : height}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Flex>
    );
};
export default MainLoader;
