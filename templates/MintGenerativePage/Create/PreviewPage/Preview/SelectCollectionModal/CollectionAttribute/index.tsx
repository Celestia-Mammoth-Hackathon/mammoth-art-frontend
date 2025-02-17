import styles from "./CollectionAttribute.module.sass";
import { useCollectionContext } from "context/collection";
import { useState, useMemo, useEffect } from "react";
import Input from "components/Input";

type CollectionAttributeProps = {
    collection: any;
};

const CollectionAttribute: React.FC<CollectionAttributeProps> = ({
    collection
}) => {
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string[]>>({});
    const { collectionData, setCollectionData, saveDataToLocalStorage } = useCollectionContext();

    const sortedAttributes = useMemo(() => {
        if (!collection.attributes) return [] as [string, Record<string, number>][];
    
        if (collection.sortAttributes === false) {
          return Object.entries(collection.attributes) as [string, Record<string, number>][];
        }
    
        const sorted: Record<string, Record<string, number>> = {};
    
        Object.entries(collection.attributes as Record<string, Record<string, number>>)
          .sort(([traitTypeA], [traitTypeB]) => traitTypeA.localeCompare(traitTypeB))
          .forEach(([traitType, traits]) => {
            const sortedTraits = Object.fromEntries(
              Object.entries(traits).sort(([, a], [, b]) => a - b)
            );
            sorted[traitType] = sortedTraits;
          });
    
        return Object.entries(sorted);
    }, [collection]);

    useEffect(() => {
        // Safely check if formaCollection and collection name exist
        if (collectionData?.formaCollection && 
            collection?.collectionName && 
            collectionData.formaCollection[collection.collectionName]) {
            setSelectedAttributes(collectionData.formaCollection[collection.collectionName]);
        } else {
            // Set default empty state if no data exists
            setSelectedAttributes({});
        }
    }, [collectionData?.formaCollection, collection?.collectionName]);
    
    const selectAttribute = (traitType: string, traitValue: string, selected: boolean) => {
        const newSelectedAttributes = { ...selectedAttributes };
        traitType = traitType.toLowerCase();
        traitValue = traitValue.toLowerCase();
        if (selected) {
          if (!newSelectedAttributes[traitType]) {
            newSelectedAttributes[traitType] = [];
          }
          newSelectedAttributes[traitType].push(traitValue);
        } else {
          newSelectedAttributes[traitType] = newSelectedAttributes[traitType].filter((val: string) => val !== traitValue);
        }
        if (newSelectedAttributes[traitType].length === 0) {
          delete newSelectedAttributes[traitType];
        }
        
        setSelectedAttributes(newSelectedAttributes);

        // Update the formaCollection in collectionData
        setCollectionData((prevData: any) => ({
          ...prevData,
          formaCollection: {
              ...prevData.formaCollection,
              [collection.collectionName]: newSelectedAttributes,
          },
        }));

        // Save to localStorage
        saveDataToLocalStorage({
          formaCollection: {
            [collection.collectionName]: newSelectedAttributes,
          },
        });
    };

    return (
        <>
            {sortedAttributes.length > 0 && (
                  <div className={styles.attributes}>
                    {sortedAttributes.map(([traitType, traitValues]) => (
                      <Input
                        key={traitType}
                        traitType={traitType}
                        traitValues={traitValues as Record<string, number>}
                        selectedValues={selectedAttributes[traitType.toLowerCase()] || []}
                        selectAttribute={selectAttribute}
                      />
                    ))}
                  </div>
                )}
        </>
    );
};

export default CollectionAttribute;
