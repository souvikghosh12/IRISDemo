import "@/app/search/components/css/SearchInputContainer.css";
import { useAuthContext } from "../AuthContext/Authcontext";
import { useEffect, useRef, useState } from "react";

function SearchInputContainer() {
  const {
    searchValue,
    setSearchValue,
    setSearchedValue,
    setSelectedsearchResultValue,
  } = useAuthContext();

  const [options, setOptions] = useState<string[]>([]); // Manage the list of options for autocomplete
  const dropdownRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOptions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchedValue(searchValue);
    setSelectedsearchResultValue("all");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const formData = new FormData();
    formData.append("search", e.target.value);
    fetch("http://20.217.64.227/api/search-keyword", {
      method: "POST",
      headers: {
        "Client-Secret": "asdfdsgvbrggre",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data?.data?.all_result);

        // Extract and combine all the results from different categories
        const allResults = [
          ...(data?.data?.all_result?.entitys.Result || []),
          ...(data?.data?.all_result?.groups.Result || []),
          ...(data?.data?.all_result?.messages.Result || []),
        ];

        const newOptions = allResults.map((result: any) => {
          return (
            result?.phone_number || result?.group_name || result?.message_text
          );
        });

        // Map the results into a format you want for the autocomplete options

        setOptions(newOptions);
        // Update the options state
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form
      className="mt-[.6rem] mb-[.6rem] ml-3 mr-3 border border-gray-600 rounded flex items-center justify-between form-container-search-input"
      onSubmit={handleSearch}
      ref={dropdownRef}
    >
      <div className="relative full-width-flex-box">
        <input
          type="search"
          name=""
          id=""
          className="search-input"
          placeholder="Search anything (message, group, users etc.)"
          value={searchValue}
          onChange={(e) => handleInputChange(e)}
        />
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="absolute left-[10px] top-[10px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5233 12.4628L16.7355 15.6743L15.6743 16.7355L12.4628 13.5233C11.2678 14.4812 9.7815 15.0022 8.25 15C4.524 15 1.5 11.976 1.5 8.25C1.5 4.524 4.524 1.5 8.25 1.5C11.976 1.5 15 4.524 15 8.25C15.0022 9.7815 14.4812 11.2678 13.5233 12.4628ZM12.0188 11.9063C12.9706 10.9274 13.5022 9.61532 13.5 8.25C13.5 5.34975 11.1503 3 8.25 3C5.34975 3 3 5.34975 3 8.25C3 11.1503 5.34975 13.5 8.25 13.5C9.61532 13.5022 10.9274 12.9706 11.9063 12.0188L12.0188 11.9063Z"
            fill="#8E9DAD"
          />
        </svg>

        {/* Autocomplete Dropdown positioned below the input */}
        {options.length > 0 && (
          <div className="absolute left-0 w-full bg-[#03090d] shadow-lg mt-1 z-10">
            <ul className="list-none p-0 m-0 max-h-[200px] overflow-y-auto">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-[#1f2a38]"
                  value={option}
                  onClick={(e) => {
                    e.stopPropagation();
                    const mockEvent = {
                      target: {
                        value: option,
                        name: "", // Add any other properties that are required by handleInputChange
                      },
                    } as React.ChangeEvent<HTMLInputElement>;
                    setSearchValue(option);
                    setOptions([]); // Clear options once a selection is made
                    handleInputChange(mockEvent);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchInputContainer;
