import React, { useEffect } from "react";
import { useAuthContext } from "../AuthContext/Authcontext";
type FilterOptions = {
  all: string[];
  People: string[];
  Groups: string[];
  Messages: string[];
};

interface FilterOptionsInterface {
  [key: string]: string[];
}

function AdvancedSorting() {
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  const [SelectedData, setSelectedData] =
    React.useState<string>("Advanced Sorting");

  const [filterOptions, setFilterOptions] = React.useState<FilterOptions>({
    all: ["Risk Score Asc", "Risk Score Desc"],
    People: [
      "Risk Score Asc",
      "Risk Score Desc",
      "Country Name Asc",
      "Country Name Desc",
    ],
    Groups: [
      "Risk Score Asc",
      "Risk Score Desc",
      "Member Count Asc",
      "Member Count Desc",
    ],
    Messages: ["Risk Score Asc", "Risk Score Desc", "Date Asc", "Date Desc"],
  });
  const { selectedsearchResultValue, setSelectedsearchResultValue } =
    useAuthContext();

  useEffect(() => {
    setShowDropdown(false);
    setSelectedData("Advanced Sorting");
  }, [selectedsearchResultValue, setSelectedsearchResultValue]);
  return (
    <div>
      <div className="relative w-full">
        <h3
          className="flex w-fit mb-0 align-middle md:justify-start justify-center  gap-2 ml-3 mr-3 mt-5 text-[#1391EA] font-[700] text-[15px] cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="flex align-center md:justify-start justify-center  gap-1 leading-[20px] w-fit">
            <span className="flex align-middle gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#108DE5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5px"
                  d="M11 10h7m-7 4h5m-5 4h3M11 6h10M7 18.813C6.607 19.255 5.56 21 5 21m-2-2.187C3.393 19.255 4.44 21 5 21m0 0v-6M3 5.188C3.393 4.745 4.44 3 5 3m2 2.188C6.607 4.745 5.56 3 5 3m0 0v6"
                  color="#108DE5"
                ></path>
              </svg>
              {SelectedData}
            </span>
          </span>
          {showDropdown ? (
            <svg
              className="open-icon"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 14L12 9L17 14H7Z" fill="#1391EA" />
            </svg>
          ) : (
            <svg
              className="closed-icon"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.78613 10L12.7861 15L17.7861 10H7.78613Z"
                fill="#1391EA"
              />
            </svg>
          )}
        </h3>

        <div
          className={`dropdown-container w-full absolute top-5 flex flex-col pb-2 pt-2 bg-white left-0 z-10 text-[black] ${
            showDropdown ? "open" : "closed"
          }`}
        >
          {(filterOptions as any)[selectedsearchResultValue].map(
            (item: string, index: number) => (
              <span
                key={index}
                onClick={() => {
                  setSelectedData(item);
                  setShowDropdown(false);
                }}
                className="hover:bg-gray-200 hover:cursor-pointer pl-3 pr-3 pt-1 pb-1"
              >
                {item}
              </span>
            )
          )}
          {/* <span className="hover:bg-gray-200 hover:cursor-pointer pl-3 pr-3 pt-1 pb-1">
            Risk Score Asc
          </span>
          <span className="hover:bg-gray-200 hover:cursor-pointer pl-3 pr-3 pb-1 pt-1">
            Risk Score Desc
          </span> */}
        </div>
      </div>
    </div>
  );
}

export default AdvancedSorting;
