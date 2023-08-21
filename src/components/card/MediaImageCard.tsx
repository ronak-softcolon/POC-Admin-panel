import { Box, Image, useDisclosure } from "@chakra-ui/react";
import ImageModal from "../modal/ImageModal";
interface MediaImageCardProps {
    image: any;
}
export default function MediaImageCard({ image }: MediaImageCardProps) {
    return (
        <Box maxH={"400px"} maxW={"400px"}>
            <Image h={"full"} w={"full"} src={"download (1).jpeg"} />
        </Box>
    );
}
