import { Box, Image, useDisclosure } from "@chakra-ui/react";
import ImageModal from "../modal/ImageModal";
interface ImageCardProps {
    image: any;
}
export default function ImageCard({ image }: ImageCardProps) {
    const { isOpen: ImageIsOpen, onOpen: ImageOnOpen, onClose: ImageOnClose } = useDisclosure();
    return (
        <Box>
            <Image cursor={"pointer"} onClick={ImageOnOpen} src={image?.url} />
            <ImageModal isOpen={ImageIsOpen} onClose={ImageOnClose} image={image} />
        </Box>
    );
}
