import AdvanceFilter from "./AdvanceFilter";
import SearchResultDataDetails from "./SearchResultDataDetails";

function SearchResultData() {
  return (
    <div className="border-r border-gray-600 h-100 border-t ">
      <AdvanceFilter />
      <SearchResultDataDetails />
    </div>
  );
}

export default SearchResultData;
