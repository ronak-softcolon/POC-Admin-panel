import { Box, Grid, GridItem } from "@chakra-ui/react";
import VideoCard from "../../../components/card/VideoCard";
import { docExtensions, imageExtensions, videoExtensions } from "../../../utils/data";
import DocCard from "../../../components/card/DocCard";
import MediaImageCard from "../../../components/card/MediaImageCard";

const cards: string[] = [
    "download (1).jpeg",
    "download (1).jpeg",
    "download (1).jpeg",
    "download (1).jpeg",
    "video.mp4",
    "video.mp4",
    "video.mp4",
    "video.mp4",
    "cv.docx",
    "cv.docx",
    "cv.docx",
    "cv.docx",
    "download (1).jpeg",
    "download (1).jpeg",
    "download (1).jpeg",
    "download (1).jpeg",
    "video.mp4",
    "video.mp4",
    "video.mp4",
    "video.mp4",
    "cv.docx",
    "cv.docx",
    "cv.docx",
    "cv.docx",
    "download (1).jpeg",
    "download (1).jpeg",
    "download (1).jpeg",
    "download (1).jpeg",
    "video.mp4",
    "video.mp4",
    "video.mp4",
    "video.mp4",
    "cv.docx",
    "cv.docx",
    "cv.docx",
    "cv.docx",
    "video.mp4",
    "video.mp4",
    "video.mp4",
    "video.mp4"
];

const MediaList = () => {
    return (
        <div>
            <Box w="100%" p={5}>
                <Grid templateColumns="repeat(4, 1fr)" gap={6} my={5}>
                    {cards?.map((item: any, index: number) => {
                        if (videoExtensions.some((ext) => item.endsWith(ext))) {
                            return (
                                <GridItem w="100%" key={index}>
                                    <VideoCard video={item} />
                                </GridItem>
                            );
                        } else if (imageExtensions.some((ext) => item.endsWith(ext))) {
                            return (
                                <GridItem w="100%" key={index}>
                                    <MediaImageCard image={item} />
                                </GridItem>
                            );
                        } else if (docExtensions.some((ext) => item.endsWith(ext))) {
                            return (
                                <GridItem w="100%" key={index}>
                                    <DocCard doc={item} />
                                </GridItem>
                            );
                        } else {
                            return null;
                        }
                    })}
                </Grid>
            </Box>
        </div>
    );
};

export default MediaList;
