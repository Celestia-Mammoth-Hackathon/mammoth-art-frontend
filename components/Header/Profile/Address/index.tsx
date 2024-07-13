import styles from "./Address.module.sass";
import Icon from "@/components/Icon";
import { formatUserAddress } from "@/utils/index";
import { useUserContext } from "context/user";

const Address = () => {
  const { address, ensName } = useUserContext();

  const copyToClipboard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!address) {
    return <></>;
  }

  return (
    <div className={styles.user}>
      <div className={styles.connect}>
        <div className={styles.title}>My Address</div>
        <div className={styles.code}>
          {ensName ? ensName : formatUserAddress(address, 10)}
          <button
            className={styles.copy}
            onClick={() => copyToClipboard(address)}
          >
            <Icon name="copy" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Address;
