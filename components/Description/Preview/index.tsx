import styles from "./Preview.module.sass";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import { handleIpfsLink } from "@/utils/index";
import { useState } from 'react';
import { Stream } from "@cloudflare/stream-react";

type PreviewProps = {
    image: string;
    alt: string;
    animation: string;
};

const Preview = ({ image, alt, animation }: PreviewProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className={styles.preview}>
            {animation ? (
                    <span className={styles.videoSpan}>
                        <Stream
                            src={animation}
                            className={styles.photo}
                            width="auto"
                            height="100%"
                            controls
                            autoplay
                            loop
                            muted
                        />
                    </span>
                ) : (
                image && (
                    <>
                        <Image src={handleIpfsLink(image)} layout="fill" objectFit="contain" alt={alt} />
                        <div className={styles.actions}>
                            <button className={styles.action} onClick={toggleModal}>
                                <Icon name="full-view" />
                            </button>
                        </div>
                    </>
                )
            )}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={toggleModal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={toggleModal}>
                            <Icon name="close" />
                        </button>
                        <Image src={handleIpfsLink(image)} layout="fill" objectFit="contain" alt={alt} />
                    </div>
                </div>
            )}
        </div>
    );
}
export default Preview;
