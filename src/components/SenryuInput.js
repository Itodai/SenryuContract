import { Input } from "@chakra-ui/react";

const SenryuInput = ({ placeholder, width, value, onChange }) => {
  return (
    <Input
      placeholder={placeholder}
      fontFamily="inherit"
      width={width}
      height="40px"
      textAlign="center"
      marginRight="10px"
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};

export default SenryuInput;