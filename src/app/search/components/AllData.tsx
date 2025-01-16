"use Client";

import { object } from "framer-motion/client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CircularProgress from "./CircularProgress";
import { useAuthContext } from "../AuthContext/Authcontext";
import axios from "axios";
import Loader from "./Loader";
interface SearchResultData {
  all_result: any;
}
function AllData() {
  const {
    selectedsearchResultValue,
    setSelectedsearchResultValue,
    selectedOptions,
    SelectedData,
    SearchedValue,
  } = useAuthContext();
  const [searchAllData, setSearchAllData] = useState({});
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    fetchAllData();
  }, [selectedOptions, SelectedData, SearchedValue, selectedsearchResultValue]);

  const fetchAllData = () => {
    const findData = selectedOptions[selectedsearchResultValue];
    const formData = new FormData();
    formData.append("search", SearchedValue ? SearchedValue.toString() : "");
    formData.append("orderby_field", "risk_score");
    formData.append(
      "orderby_type",
      SelectedData === "Advanced Sorting"
        ? ""
        : SelectedData?.includes("Asc")
        ? "asc"
        : "desc"
    );
    formData.append(
      "risk_score",
      findData?.RiskScore.toString() === "none"
        ? ""
        : findData?.RiskScore.toString()
    );
    setLoader(true);
    axios
      .post("http://20.217.64.227/api/search-keyword", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Client-Secret": "asdfdsgvbrggre",
        },
      })
      .then((data) => {
        const searchData = data.data.data as SearchResultData;
        console.log(searchData.all_result, "All Data");
        setSearchAllData(searchData.all_result);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  function truncateText(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  return (
    <div className=" ml-3 mr-3 p-2">
      {loader && (
        <div className="relative top-[50%] left-[50%] transform translate-x-[-50%]  h-[50vh]">
          <Loader />
        </div>
      )}
      {searchAllData &&
        !loader &&
        (searchAllData as any)["entitys"]?.Result?.length > 0 &&
        Object.keys(searchAllData).includes("entitys") && (
          <div className="rounded-2xl">
            <div className="border border-gray-600 p-2 rounded-2xl">
              <h3 className="text-base font-[600] text-[#fff] md:block hidden">
                People ({(searchAllData as any)["entitys"]?.count} of{" "}
                {(searchAllData as any)["entitys"]?.total_count} results)
              </h3>
              <div className="flex flex-col gap-2 mt-2 ">
                {(searchAllData as any)["entitys"]?.Result?.slice(0, 3).map(
                  (item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between hover:cursor-pointer align-top border pt-3 pb-3 glass-morfing-effect border-gray-600 p-2 rounded-2xl"
                    >
                      <div className="flex gap-5">
                        <Image
                          src={item?.profile_image_url}
                          alt="Profile"
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <div className="mt-1">
                          <p className="font-[600] text-[#fff] text-[14px]">
                            {item?.phone_number}
                          </p>
                          <p className="flex gap-1 align-middle text-[#8E9DAD] text-[13px]">
                            {" "}
                            <Image
                              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item?.country?.alpha2_code}.svg`}
                              alt="Profile"
                              width={20}
                              height={20}
                            />
                            {item?.country?.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 mt-2">
                        <h3 className=" font-[600] text-[#108de5] align-middle text-[13px] font-weight-[600] vertical-align: middle flex gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="mt-[2px]"
                          >
                            <path
                              d="M12 4.7C12 4.52319 11.9297 4.35362 11.8047 4.2286C11.6797 4.10357 11.5101 4.03333 11.3333 4.03333L5.99996 4C5.82315 4 5.65358 4.07024 5.52855 4.19526C5.40353 4.32029 5.33329 4.48986 5.33329 4.66667C5.33329 4.84348 5.40353 5.01305 5.52855 5.13807C5.65358 5.2631 5.82315 5.33333 5.99996 5.33333H9.70663L4.19329 10.86C4.13081 10.922 4.08121 10.9957 4.04737 11.0769C4.01352 11.1582 3.99609 11.2453 3.99609 11.3333C3.99609 11.4213 4.01352 11.5085 4.04737 11.5897C4.08121 11.671 4.13081 11.7447 4.19329 11.8067C4.25527 11.8692 4.329 11.9187 4.41024 11.9526C4.49148 11.9864 4.57862 12.0039 4.66663 12.0039C4.75463 12.0039 4.84177 11.9864 4.92301 11.9526C5.00425 11.9187 5.07798 11.8692 5.13996 11.8067L10.6666 6.28V10C10.6666 10.1768 10.7369 10.3464 10.8619 10.4714C10.9869 10.5964 11.1565 10.6667 11.3333 10.6667C11.5101 10.6667 11.6797 10.5964 11.8047 10.4714C11.9297 10.3464 12 10.1768 12 10V4.7Z"
                              fill="#108DE5"
                            ></path>
                          </svg>
                          Learn More
                        </h3>
                      </div>
                    </div>
                  )
                )}
                <p
                  className="text-[#108de5] text-center cursor-pointer w-fit m-auto font-[600] text-[14px]"
                  onClick={() => setSelectedsearchResultValue("People")}
                >
                  Show more
                </p>
              </div>
            </div>
          </div>
        )}
      {searchAllData &&
        !loader &&
        (searchAllData as any)["groups"]?.Result?.length > 0 &&
        Object.keys(searchAllData).includes("groups") && (
          <div className="rounded-2xl mt-3">
            <div className="border border-gray-600 p-2 rounded-2xl">
              <h3 className="text-base font-[600] text-[#fff] md:block hidden">
                Groups ({(searchAllData as any)["groups"]?.count} of{" "}
                {(searchAllData as any)["groups"]?.total_count} results)
              </h3>
              <div className="flex flex-col gap-2 mt-2 ">
                {(searchAllData as any)["groups"]?.Result?.slice(0, 3).map(
                  (item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between hover:cursor-pointer align-top border pt-3 pb-3 glass-morfing-effect border-gray-600 p-2 rounded-2xl"
                    >
                      <div className="flex gap-5">
                        <Image
                          src={item?.profile_image_url}
                          alt="Profile"
                          width={50}
                          height={50}
                          className="rounded-full object-contain"
                        />
                        <div className="">
                          <p className="font-[600] text-[#fff] text-[14px]">
                            {item?.group_name}
                          </p>
                          <p className="flex gap-1 align-middle text-[#8E9DAD] text-[12px]">
                            Members :{" "}
                            <span className="text-[#fff]">
                              {item?.member_count}
                            </span>
                          </p>
                          <div className="flex gap-1 align-middle text-[#8E9DAD] text-[12px]">
                            Group Risk Score :{" "}
                            <span className="text-[#fff]">
                              <CircularProgress percentage={item?.risk_score} />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 mt-2">
                        <h3 className=" font-[600] text-[#108de5] align-middle text-[13px] font-weight-[600] vertical-align: middle flex gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="mt-[2px]"
                          >
                            <path
                              d="M12 4.7C12 4.52319 11.9297 4.35362 11.8047 4.2286C11.6797 4.10357 11.5101 4.03333 11.3333 4.03333L5.99996 4C5.82315 4 5.65358 4.07024 5.52855 4.19526C5.40353 4.32029 5.33329 4.48986 5.33329 4.66667C5.33329 4.84348 5.40353 5.01305 5.52855 5.13807C5.65358 5.2631 5.82315 5.33333 5.99996 5.33333H9.70663L4.19329 10.86C4.13081 10.922 4.08121 10.9957 4.04737 11.0769C4.01352 11.1582 3.99609 11.2453 3.99609 11.3333C3.99609 11.4213 4.01352 11.5085 4.04737 11.5897C4.08121 11.671 4.13081 11.7447 4.19329 11.8067C4.25527 11.8692 4.329 11.9187 4.41024 11.9526C4.49148 11.9864 4.57862 12.0039 4.66663 12.0039C4.75463 12.0039 4.84177 11.9864 4.92301 11.9526C5.00425 11.9187 5.07798 11.8692 5.13996 11.8067L10.6666 6.28V10C10.6666 10.1768 10.7369 10.3464 10.8619 10.4714C10.9869 10.5964 11.1565 10.6667 11.3333 10.6667C11.5101 10.6667 11.6797 10.5964 11.8047 10.4714C11.9297 10.3464 12 10.1768 12 10V4.7Z"
                              fill="#108DE5"
                            ></path>
                          </svg>
                          Learn More
                        </h3>
                      </div>
                    </div>
                  )
                )}
                <p
                  className="text-[#108de5] text-center cursor-pointer w-fit m-auto font-[600] text-[14px]"
                  onClick={() => setSelectedsearchResultValue("Groups")}
                >
                  Show more
                </p>
              </div>
            </div>
          </div>
        )}
      {searchAllData &&
        !loader &&
        (searchAllData as any)["messages"]?.Result?.length > 0 &&
        Object.keys(searchAllData).includes("messages") && (
          <div className="rounded-2xl mt-3 mb-3">
            <div className="border border-gray-600 p-2 rounded-2xl">
              <h3 className="text-base font-[600] text-[#fff] md:block hidden">
                Messages ({(searchAllData as any)["messages"]?.count} of{" "}
                {(searchAllData as any)["messages"]?.total_count} results)
              </h3>
              <div className="flex flex-col gap-2 mt-2 ">
                {(searchAllData as any)["messages"]?.Result?.slice(0, 3).map(
                  (item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between hover:cursor-pointer align-top border pt-2 pb-2 glass-morfing-effect border-gray-600 p-2 rounded-2xl"
                    >
                      <div className="">
                        <div className="">
                          <p className=" text-[16px] ">
                            {truncateText(item?.message_text, 50)}
                          </p>

                          <p className="flex gap-1 align-middle text-[#8E9DAD] text-[13px]">
                            Sender:{" "}
                            <span className="text-[#fff]">{item?.entity}</span>
                          </p>
                          <p className="flex gap-1 align-middle text-[#8E9DAD] text-[13px]">
                            Group:{" "}
                            <span className="text-[#fff]">
                              {item?.group_name}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 mt-2">
                        <h3 className=" font-[600] text-[#108de5] align-middle text-[13px] font-weight-[600] vertical-align: middle flex gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="mt-[2px]"
                          >
                            <path
                              d="M12 4.7C12 4.52319 11.9297 4.35362 11.8047 4.2286C11.6797 4.10357 11.5101 4.03333 11.3333 4.03333L5.99996 4C5.82315 4 5.65358 4.07024 5.52855 4.19526C5.40353 4.32029 5.33329 4.48986 5.33329 4.66667C5.33329 4.84348 5.40353 5.01305 5.52855 5.13807C5.65358 5.2631 5.82315 5.33333 5.99996 5.33333H9.70663L4.19329 10.86C4.13081 10.922 4.08121 10.9957 4.04737 11.0769C4.01352 11.1582 3.99609 11.2453 3.99609 11.3333C3.99609 11.4213 4.01352 11.5085 4.04737 11.5897C4.08121 11.671 4.13081 11.7447 4.19329 11.8067C4.25527 11.8692 4.329 11.9187 4.41024 11.9526C4.49148 11.9864 4.57862 12.0039 4.66663 12.0039C4.75463 12.0039 4.84177 11.9864 4.92301 11.9526C5.00425 11.9187 5.07798 11.8692 5.13996 11.8067L10.6666 6.28V10C10.6666 10.1768 10.7369 10.3464 10.8619 10.4714C10.9869 10.5964 11.1565 10.6667 11.3333 10.6667C11.5101 10.6667 11.6797 10.5964 11.8047 10.4714C11.9297 10.3464 12 10.1768 12 10V4.7Z"
                              fill="#108DE5"
                            ></path>
                          </svg>
                          Learn More
                        </h3>
                      </div>
                    </div>
                  )
                )}
                <p
                  className="text-[#108de5] text-center cursor-pointer w-fit m-auto font-[600] text-[14px]"
                  onClick={() => setSelectedsearchResultValue("Messages")}
                >
                  Show more
                </p>
              </div>
            </div>
          </div>
        )}

      {searchAllData &&
        (searchAllData as any)["entitys"]?.Result?.length === 0 &&
        (searchAllData as any)["messages"]?.Result?.length === 0 &&
        (searchAllData as any)["groups"]?.Result?.length === 0 && (
          <div className="flex justify-center mt-5">
            <button className=" text-[#8e9dad] text-[14px] font-[400] rounded-2xl p-2 w-1/4">
              No result Found
            </button>
          </div>
        )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(AllData), { ssr: false });
