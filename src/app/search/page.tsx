"use client";
import { useState } from "react";
import SearchInputContainer from "./components/SearchInputContainer";
import SearchResultButton from "./components/SearchResultButton";
import SearchResultData from "./components/SearchResultData";
import RightSideDataContainer from "./components/RightSideDataContainer";

function page() {
  return (
    <div>
      <SearchInputContainer />
      <SearchResultButton />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
        <SearchResultData />
        <RightSideDataContainer />
      </div>
    </div>
  );
}

export default page;
