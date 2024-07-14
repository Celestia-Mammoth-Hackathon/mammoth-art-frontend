import { useEffect, useState } from "react";
import styles from "./OraclePage.module.sass";
import { useReadContract } from 'wagmi';
import { priceOracleERC721ABI } from "@/abi/PriceOracleERC721";

const OraclePage = () => {
  const [svg, setSvg] = useState<string>("");
  const { data } = useReadContract({
    abi: priceOracleERC721ABI,
    address: '0x33a42f74A770897E0c95439AaB415f4806b173F1',
    functionName: 'tokenURI',
    args: [BigInt(0)],
  });

  useEffect(() => {
    if (data && data.startsWith("data:application/json;base64,")) {
      const base64Data = data.replace("data:application/json;base64,", "");
      const jsonData = Buffer.from(base64Data, "base64").toString("utf-8");
      const decodedData = JSON.parse(jsonData);
      setSvg(decodedData.image);
    }
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {svg && <img src={svg} />}
      </div>
    </div>
  );
}

export default OraclePage;
