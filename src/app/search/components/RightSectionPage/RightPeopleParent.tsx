import { useEffect, useState } from "react";
import { useAuthContext } from "../../AuthContext/Authcontext";
import axios from "axios";
import Image from "next/image";
import CircularProgress from "../CircularProgress";
import Loader from "../Loader";
import PersonalDetails from "./RightPeopleParent/PersonalDetails";
import Groups from "./RightPeopleParent/Groups";
import Media from "./RightPeopleParent/Media";
import MessageHistory from "./RightPeopleParent/MessageHistory";

function RightPeopleParent() {
  const { onclickedRightSideData } = useAuthContext();
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [loadear, setLoader] = useState<boolean>(false);
  const [selectedDropdown, setSelectedDropdown] =
    useState<string>("Personal Details");

  useEffect(() => {
    setLoader(true);
    const formData = new FormData();
    formData.append("id", onclickedRightSideData?.id);
    axios
      .post("http://20.217.64.227/api/entity", formData, {
        headers: {
          "Client-Secret": "asdfdsgvbrggre",
        },
      })
      .then((res) => {
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

  return (
    <div className="mt-4 ml-4">
      {loadear && (
        <div className="relative top-[50%] left-[50%] transform translate-x-[-50%]  h-[50vh]">
          <Loader />
        </div>
      )}
      {!loadear && (
        <>
          <div className="flex gap-20 items-center ">
            <div className="flex gap-4 items-center">
              {(fetchedData as any)?.profile_image_url && (
                <Image
                  src={(fetchedData as any)?.profile_image_url}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              )}
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
            <div>
              <p className="font-[400] text-[12px] text-[#8E9DAD] leading-6">
                Classification:
              </p>
              <p className="font-[600] text-[14px] text-[#fff]">
                {(fetchedData as any)?.classification}
              </p>
            </div>
            <div>
              <p className="font-[400] text-[12px] text-[#8E9DAD] leading-6">
                Risk Score:
              </p>
              <div>
                {(fetchedData as any)?.risk_score && (
                  <CircularProgress
                    percentage={(fetchedData as any)?.risk_score}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-9 w-100 pr-4">
            <button disabled className="join-grp-btn">
              Start Conversation
            </button>
            <button disabled className="join-grp-btn">
              External Enrichment
            </button>
          </div>
          <div className="flex gap-3 mt-9 w-100 pr-4 border-b-[1px] border-[#8e9dad82]">
            <button
              onClick={handleClick}
              value={"Personal Details"}
              className={`${
                selectedDropdown === "Personal Details"
                  ? "border-b-[3px] border-[#fff] font-[600] text-[14px]"
                  : "font-[600] text-[14px]"
              }`}
            >
              Personal Details
            </button>
            <button
              onClick={handleClick}
              value={"Groups"}
              className={`${
                selectedDropdown === "Groups"
                  ? "border-b-[3px] border-[#fff] font-[600] text-[14px]"
                  : "font-[600] text-[14px]"
              }`}
            >
              Groups
            </button>
            <button
              onClick={handleClick}
              value={"Message History"}
              className={`${
                selectedDropdown === "Message History"
                  ? "border-b-[3px] border-[#fff] font-[600] text-[14px]"
                  : "font-[600] text-[14px]"
              }`}
            >
              Message History
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
          </div>
          <div className="mt-2 p-2 border-[1px] border-[#8e9dad82] rounded-s-md  max-h-[450px] overflow-y-auto mr-2">
            {selectedDropdown === "Personal Details" && (
              <PersonalDetails fetchedData={fetchedData} />
            )}
            {selectedDropdown === "Groups" && (
              <Groups data={(fetchedData as any)?.group_memberships} />
            )}

            {selectedDropdown === "Message History" && (
              <div className="h-[50vh]">
                <MessageHistory />
              </div>
            )}

            {selectedDropdown === "Media" && (
              <div className="h-[50vh]">
                <Media />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default RightPeopleParent;
