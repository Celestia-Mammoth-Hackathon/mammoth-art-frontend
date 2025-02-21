import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Preview.module.sass";
import Icon from "@/components/Icon";
import { useRouter } from "next/router";
import SelectCollectionModal from "./SelectCollectionModal";
import useCollectionStore from "@/store/index";
import { useCollectionContext } from "context/collection";
import SelectMultiple from "@/components/SelectMultiple";

type PreviewProps = {
  cid: any;
};

const Preview = ({ cid }: PreviewProps) => {
  const [randomKey, setRandomKey] = useState<number>(Date.now());
  const [visibleCollectionModal, setVisibleCollectionModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [curatedCollections, setCuratedCollections] = useState([]);
  const { collections, fetchAllCollections } = useCollectionStore();
  const router = useRouter();
  const { collectionData, setCollectionData, saveDataToLocalStorage } = useCollectionContext();
  const [options, setOptions] = useState<any>();
  const [selectedOptions, setSelectedOptions] = useState<any>(null);

  // Sync selectedOptions with collectionData.influences
  useEffect(() => {
    if (collectionData.influences) {
      setSelectedOptions(collectionData.influences);
    }
  }, [collectionData.influences]);

  // Update collectionData.influences when selectedOptions changes
  const handleSelectedOptionsChange = (newSelectedOptions: any) => {
    setSelectedOptions(newSelectedOptions);
    setCollectionData((prevData: any) => ({
      ...prevData,
      influences: newSelectedOptions,
    }));
  };

  const fetchTraits = async () => {
    try {
      setLoading(true);

      // Fetch the script from IPFS
      const response = await fetch(`https://ipfs.io/ipfs/${cid}/sketch.js`);
      if (!response.ok) {
        throw new Error(`Failed to fetch script: ${response.statusText}`);
      }

      const scriptContent = await response.text();

      // Flexible regex to match hl.token.setTraits() even with different spaces or line breaks
      const traitsRegex = /hl\.token\.setTraits\s*\(\s*(\w+)\s*\)/;
      const match = scriptContent.match(traitsRegex);

      if (match) {
        let variableName = match[1];

        // Modified regex to match both 'let' and 'const' declarations
        let traitsRegex = new RegExp(`(?:let|const)\\s+${variableName}\\s*=\\s*(\\{[\\s\\S]*?\\});`, "m");
        let traitsMatch: any = scriptContent.match(traitsRegex);
        let traitsWithoutNewLines = traitsMatch[1].replace(/\n/g, "");

        // Regex to match keys with either single or double quotes
        let keyRegex = /'([^']+)':|"([^"]+)":/g;

        let keys = [];
        let keyMatch;

        while ((keyMatch = keyRegex.exec(traitsWithoutNewLines)) !== null) {
          // Since we have two capture groups now, we need to take the non-null one
          const key = keyMatch[1] || keyMatch[2];
          keys.push(key);
        }

        // Map traits to options
        setOptions(
          keys.map((key) => ({
            value: key,
            label: key,
          }))
        );
      } else {
        throw new Error("Traits object not found in the script.");
      }
    } catch (error) {
      console.error("Error fetching traits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchAllCollections();
      } catch (error) {
        console.error("Error fetching drops:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTraits();
    fetchData();
  }, []);

  useEffect(() => {
    const curatedCollections: any = Object.values(collections);
    setCuratedCollections(curatedCollections);
  }, [collections]);

  const onCloseModal = (setVisibleModal: any) => {
    return () => {
      setVisibleModal(false);
    };
  };

  const handleRandomizeAll = () => {
    // Update the key to force iframe reload
    setRandomKey(Date.now());
  };

  const handleNextStep = async () => {
    // Save to localStorage
    saveDataToLocalStorage({
      influences: collectionData.influences
    });
    router.push(`/mint-generative/preview?cid=${cid}`);
  };

  const handlePrevStep = async () => {
    router.push(`/mint-generative/create`);
  };

  return (
    <div className={styles.uploadWrapper}>
      <div className={styles.info}>
        <Icon name={"info"} fill="#ffffff" />
        <span className={styles.infoText}>
          Now, double-check your Generative Token to see if it behaves properly.
          On the next step, you will configure how previews will be generated
          each time your token is collected.
        </span>
      </div>
      <div className={styles.preview}>
        <div className={styles.tokenPreview}>
          <div className={styles.previewText}>
            <span className={styles.text}>Token Preview</span>
            <button className={styles.randomAll} onClick={handleRandomizeAll}>
              <Icon name={"shuffle"} fill="#ffffff" />
              <span>Randomize All</span>
            </button>
          </div>
          <iframe
            className={styles.iframe}
            src={`https://ipfs.io/ipfs/${cid}/index.html?random=${randomKey}`}
            width="664"
            height="662"
            style={{
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            title="Token Preview"
          ></iframe>
        </div>
        <div className={styles.inputs}>
          <div>
            <div className={styles.collectionInputs}>
              <span>Collection Inputs</span>
            </div>
            <div className={styles.selectBox}>
              <div className={styles.selectWrapper}>
                <span>Select a collection</span>
                <div
                  className={cn(styles.button, styles.selectBtn)}
                  onClick={() => setVisibleCollectionModal(true)}
                >
                  <Icon name={"plus"} fill="#ffffff" />
                </div>
              </div>
              <div className={styles.collectionWrapper}>
                {Object.entries(collectionData.formaCollection || {}).map(
                  ([collectionName, attributes]: any[]) => (
                    <div key={collectionName} className={styles.collectionSection}>
                      <h3>{collectionName}</h3>
                      {attributes &&
                        Object.entries(attributes).map(([traitType, traitValues]: any[]) => (
                          <div key={traitType} className={styles.traitSection}>
                            <strong className={styles.traitType}>{traitType}:</strong>{" "}
                            {traitValues ? traitValues.join(", ") : ""}
                          </div>
                        ))}
                    </div>
                  )
                )}
              </div>
              <SelectCollectionModal
                visible={visibleCollectionModal}
                onClose={onCloseModal(setVisibleCollectionModal)}
                curatedCollections={curatedCollections}
              />
            </div>
          </div>
          <div>
            <div className={styles.collectionInputs}>
              <span>Influence</span>
            </div>
            <div className={styles.selectBox}>
              <div className={styles.selectInfWrapper}>
                <span>Select an influence</span>
                <SelectMultiple
                  options={options}
                  setOptions={setOptions}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={handleSelectedOptionsChange} // Use the modified handler
                />
              </div>
              <div className={styles.collectionWrapper}></div>
              <SelectCollectionModal
                visible={visibleCollectionModal}
                onClose={onCloseModal(setVisibleCollectionModal)}
                curatedCollections={curatedCollections}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div
          className={cn(
            "button-medium button-wide",
            styles.button,
            styles.prevBtn,
            { [styles.prevDisabled]: false }
          )}
          onClick={handlePrevStep}
        >
          <Icon name={"arrow-left"} fill="#ffffff" />
          PREV STEP
        </div>
        <div
          className={cn("button-medium button-wide", styles.button, styles.nextBtn)}
          onClick={handleNextStep}
        >
          NEXT STEP
          <Icon name={"arrow-right"} fill="#ffffff" />
        </div>
      </div>
    </div>
  );
};

export default Preview;