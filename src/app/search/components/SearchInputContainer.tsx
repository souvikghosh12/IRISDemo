import "@/app/search/components/css/SearchInputContainer.css";
import { useAuthContext } from "../AuthContext/Authcontext";
import axios from "axios";

function SearchInputContainer() {
  const { searchValue, setSearchValue,  setSearchedValue } =
    useAuthContext();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchedValue(searchValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    fetch("http://20.217.64.227/api/search-keyword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Secret": "asdfdsgvbrggre",
      },
      body: JSON.stringify({
        search: e.target.value,
        orderby_field: "",
        orderby_type: "",
        risk_score: "",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <form
      className="mt-[.6rem] mb-[.6rem] ml-3 mr-3 border border-gray-600  rounded flex items-center justify-between form-container-search-input"
      onSubmit={handleSearch}
    >
      <div className="relative full-width-flex-box">
        <input
          type="search"
          name=""
          id=""
          className="search-input"
          placeholder="Search anything (message, group, users etc.)"
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
      </div>

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchInputContainer;
