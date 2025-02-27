import { ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ handleSearchChange, value }: { handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void; value: string }) => {


  return (
    <div className="w-full flex flex-row justify-between items-center gap-0 rounded-lg relative h-[50px]">
      <input
        id="searchInput"
        type="text"
        value={value}
        onChange={handleSearchChange}
        placeholder="Search for trending news..."
        className="p-4 md:border w-full border-gray-300 rounded-lg border-r-0 shadow-sm focus:outline-none outline-none pr-10 h-[40px] bg-white"
      />
        <BiSearch className="text-[15px] hover:text-[#6b8e23] absolute cursor-pointer right-2" onClick={()=>({})} />
    </div>
  );
};

export default SearchBar;