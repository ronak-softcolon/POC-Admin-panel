// "use client";

// import React, { useEffect, useState } from "react";
// import { Avatar, Box, IconButton, WrapItem, useBreakpointValue } from "@chakra-ui/react";
// // Here we have used react-icons package for the icons
// import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// // And react-slick as our Carousel Lib
// import Slider from "react-slick";
// import useUserHook from "../../pages/protectedpages/Users/useUserHook";

// // Settings for the slider
// const settings = {
//     dots: true,
//     arrows: false,
//     fade: true,
//     infinite: true,
//     autoplay: true,
//     speed: 500,
//     autoplaySpeed: 5000,
//     slidesToShow: 1,
//     slidesToScroll: 1
// };

// const CustomCard = () => {
//     // As we have used custom buttons, we need a reference variable to
//     // change the state
//     const [slider, setSlider] = React.useState<Slider | null>(null);
//     const { setUserData, setIdByuserDataData, updateUserStatus, setUpdateData, updateData, getIdByUser, userData } =
//         useUserHook();
//     const [isLoading, setIsLoading] = useState<any>(false);
//     const [tableData, setTableData] = useState<any>([]);

//     // These are the breakpoints which changes the position of the
//     // buttons as the screen size changes
//     const top = useBreakpointValue({ base: "90%", md: "50%" });
//     const side = useBreakpointValue({ base: "30%", md: "10px" });

//     async function fetchData() {
//         setIsLoading(true);
//         try {
//             const idByuserData = await getIdByUser();
//             setUserData(idByuserData);
//             setTableData(idByuserData);
//             setIsLoading(false);
//         } catch (error) {
//             console.log(error);
//             setIsLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <Box position={"relative"} height={"60"} width={"full"} overflow={"hidden"}>
//             {/* CSS files for react-slick */}
//             <link
//                 rel="stylesheet"
//                 type="text/css"
//                 href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
//             />
//             <link
//                 rel="stylesheet"
//                 type="text/css"
//                 href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
//             />
//             {/* Left Icon */}
//             <IconButton
//                 aria-label="left-arrow"
//                 colorScheme="messenger"
//                 borderRadius="full"
//                 position="absolute"
//                 left={side}
//                 top={top}
//                 transform={"translate(0%, -50%)"}
//                 zIndex={2}
//                 onClick={() => slider?.slickPrev()}
//             >
//                 <BiLeftArrowAlt />
//             </IconButton>
//             {/* Right Icon */}
//             <IconButton
//                 aria-label="right-arrow"
//                 colorScheme="messenger"
//                 borderRadius="full"
//                 position="absolute"
//                 right={side}
//                 top={top}
//                 transform={"translate(0%, -50%)"}
//                 zIndex={2}
//                 onClick={() => slider?.slickNext()}
//             >
//                 <BiRightArrowAlt />
//             </IconButton>
//             {/* Slider */}
//             <Slider {...settings} ref={(slider) => setSlider(slider)}>
//                 {tableData?.coverImage?.length > 0
//                     ? tableData?.coverImage?.map((url: any, index: any) => (
//                           <Box
//                               key={index}
//                               height={"6xl"}
//                               position="relative"
//                               backgroundPosition="center"
//                               backgroundRepeat="no-repeat"
//                               backgroundSize="cover"
//                               backgroundImage={`url(${url?.url})`}
//                           />
//                       ))
//                     : ""}
//             </Slider>
//         </Box>
//     );
// };

// export default CustomCard;

"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
// Here we have used react-icons package for the icons
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import useUserHook from "../../pages/protectedpages/Users/useUserHook";
import ImageCard from "./ImageCard";
import MainLoader from "../loader/MainLoader";

// Settings for the slider
const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
};

const CustomCard = () => {
    const { setUserData, getIdByUser } = useUserHook();
    const [isLoading, setIsLoading] = useState<any>(false);
    const [tableData, setTableData] = useState<any>([]);
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
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <div>
                    <MainLoader />
                </div>
            ) : (
                <Box w="full" mt={5}>
                    <Grid templateColumns="repeat(5, 1fr)" gap={6} my={5}>
                        {tableData?.coverImage?.length > 0 &&
                            tableData?.coverImage?.map((url: any, index: number) => {
                                return (
                                    <>
                                        <GridItem key={index}>
                                            <ImageCard image={url} />
                                        </GridItem>
                                    </>
                                );
                            })}
                    </Grid>
                </Box>
            )}
        </>
    );
};

export default CustomCard;
