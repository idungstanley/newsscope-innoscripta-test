import { TbCaretDownFilled } from "react-icons/tb";
import { DropdownInputProps } from "../@types/type.interface";


const DropdownInput: React.FC<DropdownInputProps> = ({ options, value, onChange, placeholder }) => {
  return (
    <div className="relative inline-block w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
        {' '}
        <TbCaretDownFilled className="text-gray-600 dark:text-white" />
      </span>
    </div>
  );
};

export default DropdownInput;