import styles from "./LayoutCreate.module.sass";
import { useEffect, useState } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import Link from "next/link";


type LayoutCreateProps = {
    step: string; 
    rightElement: any;
};

const LayoutCreate = ({ step, rightElement }: LayoutCreateProps) => {
    const [steps, setSteps] = useState([
        { id: 1, name: "Upload", icon: "upload", href: "/create/upload" },
        { id: 2, name: "Checking Files", icon: "check", href: "/create/upload" },
        { id: 3, name: "Preview Images", icon: "preview", href: "/create/upload" },
        { id: 4, name: "Distributions", icon: "give", href: "/create/upload" },
        { id: 5, name: "Project Details", icon: "details", href: "/create/upload" },
        { id: 6, name: "Preview & Mint", icon: "mint", href: "/create/upload" },
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
