import cn from "classnames";
import styles from "./CheckboxMini.module.sass";

type CheckboxMiniProps = {
    className?: string;
    label: string;
    value: any;
    onChange: any;
};

const CheckboxMini = ({ className, label, value, onChange }: CheckboxMiniProps) => {
    return (
        <label className={cn(styles.checkbox, className, { [styles.checked]: value })}>
            <input
                className={styles.input}
                type="checkbox"
                value={value}
                onChange={onChange}
                checked={value}
            />
            <span className={styles.inner}>
                <span className={styles.tick}></span>
                <span className={styles.label}>{label}</span>
            </span>
        </label>
    );
};

export default CheckboxMini;
