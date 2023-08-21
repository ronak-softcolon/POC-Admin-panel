import { Box } from "@chakra-ui/react";
interface VideoCardProps {
    video: any;
}
const VideoCard = ({ video }: VideoCardProps) => {
    return (
        <>
            <Box w={"full"} h={"full"}>
                <video
                    style={{
                        width: "100%",
                        maxHeight: "400px",
                        maxWidth: "400px",
                        objectFit: "cover"
                    }}
                    src={"video.mp4"}
                    controls
                />
            </Box>
        </>
    );
};
export default VideoCard;
