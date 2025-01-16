import React from "react";
import { useAuthContext } from "../AuthContext/Authcontext";
import AllData from "./AllData";
import GroupesData from "./GroupesData";
import Messages from "./Messages";
import PeopleData from "./PeopleData";
import "@/app/search/components/css/SearchResultDataDetails.css";

function SearchResultDataDetails() {
  const { selectedsearchResultValue } = useAuthContext();
  return (
    <div>
      {selectedsearchResultValue === "all" && <AllData />}
      {selectedsearchResultValue === "Groups" && <GroupesData />}
      {selectedsearchResultValue === "Messages" && <Messages />}
      {selectedsearchResultValue === "People" && <PeopleData />}
    </div>
  );
}

export default SearchResultDataDetails;
