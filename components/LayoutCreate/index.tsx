import styles from "./LayoutCreate.module.sass";
import { useEffect, useState } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import Link from "next/link";
import { useRouter } from "next/router";

type LayoutCreateProps = {
    step: string; 
    rightElement: any;
};

const LayoutCreate = ({ step, rightElement }: LayoutCreateProps) => {
    const router = useRouter();
    const { cid } = router.query;
    const [steps, setSteps] = useState([
        { id: 1, name: "Upload", icon: "upload", href: "/mint-generative/create" },
        { id: 2, name: "Checking Files", icon: "check", href: `/mint-generative/create?cid=${cid}`},
        { id: 3, name: "Preview Images", icon: "preview", href: `/mint-generative/preview?cid=${cid}` },
        { id: 4, name: "Distributions", icon: "give", href: `/mint-generative/distribute?cid=${cid}` },
        { id: 5, name: "Project Details", icon: "details", href: `/mint-generative/details?cid=${cid}` },
        { id: 6, name: "Preview & Mint", icon: "mint", href: `/mint-generative/mint=?cid=${cid}` },
    ]);

    const [leftElement, setLeftElement] = useState<any>(null);

    useEffect(() => {
        setLeftElement(
            <>
                <div className={styles.content}>
                    {steps.map((item, index) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn({
                                [styles.disabled]: step > String(item.id),  // Items after active
                            })}
                        >
                            <div
                                className={cn(styles.step, {
                                    [styles.active]: step === String(item.id),
                                    [styles.beforeActive]: step > String(item.id),
                                    [styles.afterActive]: step < String(item.id),
                                })}
                            >
                                <Icon name={item.icon} fill="#ffffff" />
                                <span>{item.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    }, [step, steps]);

    return (
        <div className={styles.layout}>
            <div className={cn("h1", styles.title)}>
                —mint a Generative Collection
            </div>
            <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.wrap}>{leftElement}</div>
            </div>
                <div className={styles.col}>{rightElement}</div>
            </div>
        </div>
        
    );
};

export default LayoutCreate;
