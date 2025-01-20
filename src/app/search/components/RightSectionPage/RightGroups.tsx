import Image from "next/image";
import { useAuthContext } from "../../AuthContext/Authcontext";
import Loader from "../Loader";
import axios from "axios";
import { useEffect, useState } from "react";
import CircularProgress from "../CircularProgress";
import Messages from "./RightGroups/Messages";
import Members from "./RightGroups/Members";
import Media from "./RightGroups/Media";
import Summary from "./RightGroups/Summary";
import ChartComponent from "./RightGroups/ChartComponent";

function RightGroups() {
  const { onclickedRightSideData } = useAuthContext();
  const [fetchedData, setFetchedData] = useState<any>({});
  const [loadear, setLoader] = useState<boolean>(false);
  const [selectedDropdown, setSelectedDropdown] = useState<string>("Messages");

  useEffect(() => {
    setLoader(true);
    const formData = new FormData();
    formData.append("id", onclickedRightSideData?.id);
    axios
      .post("http://20.217.64.227/api/group", formData, {
        headers: {
          "Client-Secret": "asdfdsgvbrggre",
        },
      })
      .then((res) => {
        console.log(res, "res?.data?.data");

        setFetchedData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [onclickedRightSideData]);
  const handleClick = (e: any) => {
    setSelectedDropdown(e.target.value);
  };

  console.log(fetchedData, "fetchedData in right groups");
  
  return (
    <div className="mt-4 ml-4">
      {loadear && (
        <div className="relative top-[50%] left-[50%] transform translate-x-[-50%]  h-[50vh]">
          <Loader />
        </div>
      )}
      {!loadear && (
        <>
          <div className=" pr-4 grid grid-cols-2 gap-4">
            <div className="">
              <div className="flex gap-4 items-center">
                <div className="flex gap-4 items-center">
                  {(fetchedData as any)?.profile_image_url && (
                    <Image
                      src={(fetchedData as any)?.profile_image_url}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="rounded-full border-[#108de5] border-[1px]"
                    />
                  )}
                  <p className="font-[600] text-[#fff] text-[14px]">
                    {(fetchedData as any)?.group_name}
                  </p>
                </div>
                <div>
                  <p className="font-[600] text-[#fff] text-[12px]">
                    {(fetchedData as any)?.phone_number}
                  </p>
                  <p className="flex gap-1 align-middle text-[#8E9DAD] text-[12px]">
                    {" "}
                    {(fetchedData as any)?.country?.alpha2_code && (
                      <Image
                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${
                          (fetchedData as any)?.country?.alpha2_code
                        }.svg`}
                        alt="Profile"
                        width={20}
                        height={20}
                      />
                    )}
                    {(fetchedData as any)?.country?.name}
                  </p>
                </div>
              </div>
              <div className="flex gap-20 mt-4 items-center ">
                <div>
                  <p className="font-[400] text-[12px] text-[#8E9DAD] leading-6">
                    Member Count:
                  </p>
                  <p className="font-[600] text-[14px] text-[#fff]">
                    {(fetchedData as any)?.members_count}
                  </p>
                </div>
                <div>
                  <p className="font-[400] text-[12px] text-[#8E9DAD] leading-6">
                    Classification:
                  </p>
                  <p className="font-[600] text-[14px] text-[#fff]">
                    {(fetchedData as any)?.classification}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="font-[400] text-[12px] text-[#8E9DAD] leading-6">
                  Risk Score:
                </p>
                <div>
                  <CircularProgress
                    percentage={(fetchedData as any)?.risk_score}
                  />
                </div>
              </div>
              <div className="mt-4 w-100">
                <button
                  className="join-grp-btn w-100"
                  style={{ maxWidth: "100%" }}
                >
                  JOIN LINK
                </button>
              </div>
            </div>
            <div>
              <ChartComponent />
            </div>
          </div>

          <div className="flex gap-3 mt-9 w-100 pr-4 border-b-[1px] border-[#8e9dad82]">
            <button
              onClick={handleClick}
              value={"Messages"}
              className={`${
                selectedDropdown === "Messages"
                  ? "border-b-[3px] border-[#fff] font-[600] text-[14px]"
                  : "font-[600] text-[14px]"
              }`}
            >
              Messages
            </button>
            <button
              onClick={handleClick}
              value={"Members"}
              className={`${
                selectedDropdown === "Members"
                  ? "border-b-[3px] border-[#fff] font-[600] text-[14px]"
                  : "font-[600] text-[14px]"
              }`}
            >
              Members
            </button>
            <button
              onClick={handleClick}
              value={"Media"}
              className={`${
                selectedDropdown === "Media"
                  ? "border-b-[3px] border-[#fff] font-[600] text-[14px]"
                  : "font-[600] text-[14px]"
              }`}
            >
              Media
            </button>
            <button
              onClick={handleClick}
              value={"Summary"}
              className={`${
                selectedDropdown === "Summary"
                  ? "border-b-[3px] border-[#fff] font-[600] text-[14px]"
                  : "font-[600] text-[14px]"
              }`}
            >
              Summary
            </button>
          </div>
          <div className="mt-2 p-2 border-[1px] border-[#8e9dad82] rounded-s-md  max-h-[450px] overflow-y-auto mr-2">
            {selectedDropdown === "Messages" && <Messages />}
            {selectedDropdown === "Members" && <Members />}

            {selectedDropdown === "Media" && (
              <div className="h-[50vh]">
                <Media />
              </div>
            )}

            {selectedDropdown === "Summary" && (
              <div className="h-[50vh]">
                <Summary />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default RightGroups;
