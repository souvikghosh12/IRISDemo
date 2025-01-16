import axios, { all } from "axios";
import React, { useEffect } from "react";
import { useAuthContext } from "../AuthContext/Authcontext";
import "@/app/search/components/css/AdvanceFilter.css";
import Image from "next/image";
import CustomCalendar from "./CustomCalendar";
import AdvancedSorting from "./AdvancedSorting";
import dynamic from "next/dynamic";

interface Option {
  name: string;
  value: string;
  img?: string;
  id?: string;
  alpha2_code?: string;
}

interface SubFilter {
  name: string;
  options?: Option[];
  type: string;
}

interface FilterState {
  [key: string]: SubFilter[];
  all: SubFilter[];
  People: SubFilter[];
  Groups: SubFilter[];
  Messages: SubFilter[];
}

interface FilterOptionName {
  [key: string]: boolean;
}

type SelectedSearchResultValue = keyof FilterState;
function AdvanceFilter() {
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const [AdvanceFilterSubFilter, setAdvanceFilterSubFilter] =
    React.useState<FilterState>({
      all: [
        {
          type: "all",
          name: "Risk Score",
          options: [
            { name: "Less than 20%", value: "<20%" },
            { name: "Less than 40%", value: "<40%" },
            { name: "Less than 60%", value: "<60%" },
            { name: "Less than 80%", value: "<80%" },
            { name: "Less than 100%", value: "<100%" },
          ],
        },
      ],
      People: [
        {
          type: "People",
          name: "Risk Score",
          options: [
            { name: "Less than 20%", value: "<20%" },
            { name: "Less than 40%", value: "<40%" },
            { name: "Less than 60%", value: "<60%" },
            { name: "Less than 80%", value: "<80%" },
            { name: "Less than 100%", value: "<100%" },
          ],
        },
        {
          type: "People",
          name: "Classification",
          options: [
            {
              name: "Child Abuse",
              value: "Child Abuse",
            },
            {
              name: "Drugs",
              value: "Drugs",
            },
            {
              name: "HAMAS",
              value: "HAMAS",
            },
            {
              name: "Hate Speech",
              value: "Hate Speech",
            },
            {
              name: "Human Trafficking",
              value: "Human Trafficking",
            },
            {
              name: "Illicit Activities",
              value: "Illicit Activities",
            },
            {
              name: "ISIS",
              value: "ISIS",
            },
            {
              name: "Terrorism",
              value: "Terrorism",
            },
          ],
        },
        {
          type: "People",
          name: "Country",
          options: [],
        },
      ],
      Groups: [
        {
          type: "Groups",
          name: "Risk Score",
          options: [
            { name: "Less than 20%", value: "<20%" },
            { name: "Less than 40%", value: "<40%" },
            { name: "Less than 60%", value: "<60%" },
            { name: "Less than 80%", value: "<80%" },
            { name: "Less than 100%", value: "<100%" },
          ],
        },
        {
          type: "Groups",
          name: "Classification",
          options: [
            {
              name: "Child Abuse",
              value: "Child Abuse",
            },
            {
              name: "Drugs",
              value: "Drugs",
            },
            {
              name: "HAMAS",
              value: "HAMAS",
            },
            {
              name: "Hate Speech",
              value: "Hate Speech",
            },
            {
              name: "Human Trafficking",
              value: "Human Trafficking",
            },
            {
              name: "Illicit Activities",
              value: "Illicit Activities",
            },
            {
              name: "ISIS",
              value: "ISIS",
            },
            {
              name: "Terrorism",
              value: "Terrorism",
            },
          ],
        },
        {
          type: "Groups",
          name: "Members",
          options: [
            { name: "Less than 10", value: "<10" },
            { name: "Less than 25", value: "<25" },
            { name: "Less than 50", value: "<50" },
            { name: "Less than 100", value: "<100" },
            { name: "Less than 500", value: "<500" },
            { name: "Less than 1000", value: "<1000" },
            { name: "Less than 10000", value: "<10000" },
            { name: "Above 10000", value: ">10000" },
          ],
        },
      ],
      Messages: [
        {
          type: "Message",
          name: "Risk Score",
          options: [
            { name: "Less than 20%", value: "<20%" },
            { name: "Less than 40%", value: "<40%" },
            { name: "Less than 60%", value: "<60%" },
            { name: "Less than 80%", value: "<80%" },
            { name: "Less than 100%", value: "<100%" },
          ],
        },
        {
          type: "Message",
          name: "Date Range",
        },
      ],
    });

  const [selectedSubFilter, setSelectedSubFilter] = React.useState<string>("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const {
    selectedsearchResultValue,
    setSelectedsearchResultValue,
    selectedOptions,
    setSelectedOptions,
  } = useAuthContext();

  const [dropDownSubFilter, setDropDownSubFilter] =
    React.useState<FilterOptionName>({
      "Risk Score": false,
      Classification: false,
      Country: false,
      Members: false,
      "Date Range": false,
    });

  useEffect(() => {
    axios
      .get(`http://20.217.64.227/api/search-filterlist`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Client-Secret": "asdfdsgvbrggre",
        },
      })
      .then((response) => {
        const countryOptions: Option[] = response?.data?.data?.countries;

        setAdvanceFilterSubFilter((prevState) => ({
          ...prevState,
          People: prevState.People.map((subFilter) => {
            if (subFilter.name === "Country") {
              return {
                ...subFilter,
                options: countryOptions.map((option) => ({
                  name: option?.name,
                  value: option?.id?.toString() ?? "",
                  img: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${option?.alpha2_code}.svg`,
                })),
              };
            }
            return subFilter;
          }),
        }));
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropDownSubFilter({
          "Risk Score": false,
          Classification: false,
          Country: false,
          Members: false,
          "Date Range": false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropDownSubFilter({
      "Risk Score": false,
      Classification: false,
      Country: false,
      Members: false,
      "Date Range": false,
    });
    setDropDownOpen(false);
  }, [selectedsearchResultValue, setSelectedsearchResultValue]);

  console.log(selectedOptions, "selectedOptions");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    subFilter: SubFilter,
    option: Option
  ) => {
    console.log(
      selectedOptions[subFilter.type][subFilter.name?.replace(" ", "")],
      option.value
    );

    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [subFilter.type]: {
        ...prevOptions[subFilter.name],
        [e.target.name]: e.target.value,
      },
    }));
  };

  return (
    <div className="w-100 relative">
      <div className="flex justify-between align-middle">
        <h3
          className="flex w-fit mb-0 align-middle md:justify-start justify-center  gap-2 ml-3 mr-3 mt-5 text-[#1391EA] font-[700] text-[12px] cursor-pointer"
          onClick={() => setDropDownOpen(!dropDownOpen)}
        >
          <span className="flex align-center md:justify-start justify-center  gap-1 leading-[20px] w-fit">
            <svg
              width="21"
              height="18"
              viewBox="0 0 21 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.75389 3.95832C7.5254 3.95832 7.30627 4.04173 7.1447 4.19019C6.98313 4.33866 6.89237 4.54002 6.89237 4.74999C6.89237 4.95995 6.98313 5.16131 7.1447 5.30978C7.30627 5.45825 7.5254 5.54165 7.75389 5.54165C7.98238 5.54165 8.20151 5.45825 8.36307 5.30978C8.52464 5.16131 8.61541 4.95995 8.61541 4.74999C8.61541 4.54002 8.52464 4.33866 8.36307 4.19019C8.20151 4.04173 7.98238 3.95832 7.75389 3.95832ZM5.31579 3.95832C5.49378 3.49477 5.82386 3.09337 6.26053 2.80945C6.6972 2.52552 7.21896 2.37305 7.75389 2.37305C8.28882 2.37305 8.81058 2.52552 9.24725 2.80945C9.68392 3.09337 10.014 3.49477 10.192 3.95832H16.3691C16.5976 3.95832 16.8167 4.04173 16.9783 4.19019C17.1398 4.33866 17.2306 4.54002 17.2306 4.74999C17.2306 4.95995 17.1398 5.16131 16.9783 5.30978C16.8167 5.45825 16.5976 5.54165 16.3691 5.54165H10.192C10.014 6.0052 9.68392 6.4066 9.24725 6.69053C8.81058 6.97446 8.28882 7.12693 7.75389 7.12693C7.21896 7.12693 6.6972 6.97446 6.26053 6.69053C5.82386 6.4066 5.49378 6.0052 5.31579 5.54165H4.30781C4.07932 5.54165 3.86019 5.45825 3.69862 5.30978C3.53706 5.16131 3.44629 4.95995 3.44629 4.74999C3.44629 4.54002 3.53706 4.33866 3.69862 4.19019C3.86019 4.04173 4.07932 3.95832 4.30781 3.95832H5.31579ZM12.923 8.70832C12.6945 8.70832 12.4754 8.79173 12.3138 8.94019C12.1523 9.08866 12.0615 9.29002 12.0615 9.49999C12.0615 9.70995 12.1523 9.91131 12.3138 10.0598C12.4754 10.2082 12.6945 10.2917 12.923 10.2917C13.1515 10.2917 13.3706 10.2082 13.5322 10.0598C13.6938 9.91131 13.7845 9.70995 13.7845 9.49999C13.7845 9.29002 13.6938 9.08866 13.5322 8.94019C13.3706 8.79173 13.1515 8.70832 12.923 8.70832ZM10.4849 8.70832C10.6629 8.24477 10.993 7.84337 11.4296 7.55944C11.8663 7.27552 12.3881 7.12305 12.923 7.12305C13.4579 7.12305 13.9797 7.27552 14.4164 7.55944C14.853 7.84337 15.1831 8.24477 15.3611 8.70832H16.3691C16.5976 8.70832 16.8167 8.79173 16.9783 8.94019C17.1398 9.08866 17.2306 9.29002 17.2306 9.49999C17.2306 9.70995 17.1398 9.91131 16.9783 10.0598C16.8167 10.2082 16.5976 10.2917 16.3691 10.2917H15.3611C15.1831 10.7552 14.853 11.1566 14.4164 11.4405C13.9797 11.7245 13.4579 11.8769 12.923 11.8769C12.3881 11.8769 11.8663 11.7245 11.4296 11.4405C10.993 11.1566 10.6629 10.7552 10.4849 10.2917H4.30781C4.07932 10.2917 3.86019 10.2082 3.69862 10.0598C3.53706 9.91131 3.44629 9.70995 3.44629 9.49999C3.44629 9.29002 3.53706 9.08866 3.69862 8.94019C3.86019 8.79173 4.07932 8.70832 4.30781 8.70832H10.4849ZM7.75389 13.4583C7.5254 13.4583 7.30627 13.5417 7.1447 13.6902C6.98313 13.8387 6.89237 14.04 6.89237 14.25C6.89237 14.46 6.98313 14.6613 7.1447 14.8098C7.30627 14.9582 7.5254 15.0417 7.75389 15.0417C7.98238 15.0417 8.20151 14.9582 8.36307 14.8098C8.52464 14.6613 8.61541 14.46 8.61541 14.25C8.61541 14.04 8.52464 13.8387 8.36307 13.6902C8.20151 13.5417 7.98238 13.4583 7.75389 13.4583ZM5.31579 13.4583C5.49378 12.9948 5.82386 12.5934 6.26053 12.3094C6.6972 12.0255 7.21896 11.873 7.75389 11.873C8.28882 11.873 8.81058 12.0255 9.24725 12.3094C9.68392 12.5934 10.014 12.9948 10.192 13.4583H16.3691C16.5976 13.4583 16.8167 13.5417 16.9783 13.6902C17.1398 13.8387 17.2306 14.04 17.2306 14.25C17.2306 14.46 17.1398 14.6613 16.9783 14.8098C16.8167 14.9582 16.5976 15.0417 16.3691 15.0417H10.192C10.014 15.5052 9.68392 15.9066 9.24725 16.1905C8.81058 16.4745 8.28882 16.6269 7.75389 16.6269C7.21896 16.6269 6.6972 16.4745 6.26053 16.1905C5.82386 15.9066 5.49378 15.5052 5.31579 15.0417H4.30781C4.07932 15.0417 3.86019 14.9582 3.69862 14.8098C3.53706 14.6613 3.44629 14.46 3.44629 14.25C3.44629 14.04 3.53706 13.8387 3.69862 13.6902C3.86019 13.5417 4.07932 13.4583 4.30781 13.4583H5.31579Z"
                fill="#108DE5"
              />
            </svg>
            <span className="">Advanced Filter</span>
          </span>

          {dropDownOpen ? (
            <svg
              className="arrow-icon mt-[-2px]"
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
              className="arrow-icon mt-[-2px]"
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
        <AdvancedSorting />
      </div>
      <div
        className={`grid relative w-full  grid-cols-3 gap-1 justify-start mt-3 mb-3 mr-3 dropdown-container ${
          dropDownOpen ? "open" : "closed"
        }`}
      >
        {AdvanceFilterSubFilter[selectedsearchResultValue]?.map(
          (subFilter: SubFilter) => (
            <div
              key={subFilter.name}
              className="cursor-pointer w-full flex flex-col gap-1  p-2"
              ref={dropdownRef}
            >
              <p
                className="font-[700] AdvancedFilter_filterLabel text-[12px]"
                onClick={() => {
                  setSelectedSubFilter(subFilter.name);
                  setDropDownSubFilter((prevDropDownSubFilter) => {
                    const newDropDownState = { ...prevDropDownSubFilter };

                    // Close all dropdowns
                    Object.keys(newDropDownState).forEach((key) => {
                      newDropDownState[key] = false;
                    });

                    // Open the clicked dropdown
                    newDropDownState[subFilter.name] =
                      !prevDropDownSubFilter[subFilter.name];

                    return newDropDownState;
                  });
                }}
              >
                {subFilter.name}
                {dropDownSubFilter[subFilter.name] ? (
                  <svg
                    className={`arrow-icon ${
                      dropDownSubFilter[subFilter.name] ? "rotate" : ""
                    } `}
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 14L12 9L17 14H7Z" fill="white" />
                  </svg>
                ) : (
                  <svg
                    className={`arrow-icon ${
                      dropDownSubFilter[subFilter.name] ? "rotate" : ""
                    }`}
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.78613 10L12.7861 15L17.7861 10H7.78613Z"
                      fill="white"
                    />
                  </svg>
                )}
              </p>
              <div
                className={`flex flex-col gap-2 relative ${
                  subFilter?.name !== "Date Range" ? "w-full" : "w-fit"
                }    rounded dropdown-container ${
                  dropDownSubFilter[subFilter.name] ? "open" : "closed"
                } `}
              >
                <div
                  className={`absolute p-2 top-0 left-0 z-10 max-h-[400px] transition-max-height duration-300 overflow-y-scroll w-100 scrollbar-hide rounded bg-[#fff] ${
                    subFilter?.name !== "Date Range" ? "w-full" : "w-fit"
                  }`}
                >
                  {subFilter?.name !== "Date Range" && (
                    <label
                      htmlFor="none"
                      className={`cursor-pointer  p-[3px] rounded-[7px] text-[black] text-[12px] font-[500]  flex align-middle gap-2`}
                    >
                      <input
                        type="radio"
                        id="none"
                        checked={
                          selectedOptions[subFilter.type][
                            subFilter.name?.replace(" ", "")
                          ] === "none"
                        }
                        name={subFilter.name?.replace(" ", "")}
                        onChange={(e) => {
                          setSelectedOptions((prevOptions) => ({
                            ...prevOptions,
                            [subFilter.type]: {
                              [e.target.name]: e.target.value,
                            },
                          }));
                        }}
                        value="none"
                      />
                      None
                    </label>
                  )}
                  {subFilter?.options?.map((option: Option) => (
                    <>
                      <label
                        key={option.value}
                        htmlFor={option.value}
                        className={`cursor-pointer  p-[3px] rounded-[7px] text-[black] text-[12px] font-[500]  flex align-middle gap-2`}
                      >
                        <input
                          type="radio"
                          id={option.value}
                          name={subFilter.name?.replace(" ", "")}
                          value={option.value}
                          checked={
                            selectedOptions[subFilter.type][
                              subFilter.name?.replace(" ", "")
                            ] === option.value
                          }
                          onChange={(e) => {
                            handleChange(e, subFilter, option);
                          }}
                        />
                        {option?.img && (
                          <Image
                            src={option.img || ""}
                            alt={option.name}
                            width={20}
                            height={20}
                          />
                        )}
                        {option.name}
                      </label>
                    </>
                  ))}
                  {subFilter?.name === "Date Range" && (
                    <CustomCalendar
                      type={subFilter.type}
                      name={subFilter.name}
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                    />
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(AdvanceFilter), { ssr: false });
