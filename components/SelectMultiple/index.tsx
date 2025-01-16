import Select from "react-select";

type SelectMultipleProps = {
    className?: string;
    options: any;
    setOptions: any;
    selectedOptions: any;
    setSelectedOptions: any;
};

const SelectMultiple = ({ className, options, selectedOptions, setSelectedOptions }: SelectMultipleProps) => {
  const onChangeHandler = (selectedOptions:any) => {
    setSelectedOptions(selectedOptions);
  };

    return (
      <Select
        isMulti
        value={selectedOptions}
        onChange={onChangeHandler}
        options={options}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            color: 'black'
          }),
          option: (baseStyles) => ({
            ...baseStyles,
            color: 'black',
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 1,
          borderColor: 'white',
          colors: {
            ...theme.colors,
            primary25: 'grey',
            primary: 'white',
          },
        })}
      />
    );
};

export default SelectMultiple;
