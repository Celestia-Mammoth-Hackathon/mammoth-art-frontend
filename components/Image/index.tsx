import { useState } from "react";
import { default as NextImage, ImageProps } from "next/image";
import cn from "classnames";
import styles from "./Image.module.sass";

interface CustomImageProps extends ImageProps {
    preview?: boolean;
}

const Image = ({ className, preview, ...props }: CustomImageProps) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <NextImage
            className={cn(styles.image, { [styles.loaded]: loaded }, className, preview ? styles.preview : "")}
            onLoadingComplete={() => setLoaded(true)}
            {...props}
        />
    );
};

export default Image;
