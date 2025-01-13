// src/app/search/components/SearchResultButton.tsx
'use client';

import { useAuthContext } from "@/app/search/AuthContext/Authcontext"; // Import the custom hook

import "@/app/search/components/css/SearchResultButton.css";

function SearchResultButton() {
  const { selectedsearchResultValue, setSelectedsearchResultValue } = useAuthContext();

  const handlebuttonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    console.log(button.value, "on button click");
    setSelectedsearchResultValue(button.value);
  };

  return (
    <div className="flex align-middle md:justify-start justify-center gap-4 ml-3 mr-3 mt-5">
      <h3 className="text-base font-[600] text-[#fff] md:block hidden">
        Search Results
      </h3>
      <div className="grid grid-cols-4 align-middle gap-2 flex-wrap">
        <button
          value="all"
          className={`search-result-buttons ${
            selectedsearchResultValue === "all" ? "active-search-result-button" : ""
          }`}
          onClick={handlebuttonClick}
        >
          All
        </button>
        <button
          value="People"
          className={`search-result-buttons ${
            selectedsearchResultValue === "People" ? "active-search-result-button" : ""
          }`}
          onClick={handlebuttonClick}
        >
          People
        </button>
        <button
          value="Groups"
          className={`search-result-buttons ${
            selectedsearchResultValue === "Groups" ? "active-search-result-button" : ""
          }`}
          onClick={handlebuttonClick}
        >
          Groups
        </button>
        <button
          value="Messages"
          className={`search-result-buttons ${
            selectedsearchResultValue === "Messages" ? "active-search-result-button" : ""
          }`}
          onClick={handlebuttonClick}
        >
          Messages
        </button>
      </div>
    </div>
  );
}

export default SearchResultButton;
