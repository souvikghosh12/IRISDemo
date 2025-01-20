import { useAuthContext } from "@/app/search/AuthContext/Authcontext";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../Loader";

function MessageHistory() {
  const { onclickedRightSideData, setOnclickedRightSideData } =
    useAuthContext();
  const [loadear, setLoader] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [limit, setlimit] = useState<number>(10);
  function formatTimestamp(timestamp: any) {
    const date = new Date(timestamp);

    // Extract and format the components
    const day = String(date.getDate()).padStart(2, "0"); // Two-digit day
    const month = date.toLocaleString("default", { month: "short" }); // Short month name
    const year = date.getFullYear(); // Full year
    const hours = String(date.getHours()).padStart(2, "0"); // Two-digit hour
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Two-digit minutes

    return `${day} ${month} ${year} | ${hours}:${minutes}`;
  }

  useEffect(() => {
    setLoader(true);
    const formData = new FormData();
    formData.append("id", onclickedRightSideData?.id);
    formData.append("limit", (limit as number).toString());
    formData.append("offset", (0 as number).toString());
    axios
      .post("http://20.217.64.227/api/entity/messages", formData, {
        headers: {
          "Client-Secret": "asdfdsgvbrggre",
        },
      })
      .then((res) => {
        console.log(res);

        setFetchedData(res?.data?.data?.result);
      })
      .catch((err) => {
        console.log(err);
        setFetchedData([]);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [onclickedRightSideData]);

  useEffect(() => {
    const formData = new FormData();
    formData.append("id", onclickedRightSideData?.id);
    formData.append("limit", (limit as number).toString());
    formData.append("offset", (0 as number).toString());
    axios
      .post("http://20.217.64.227/api/entity/messages", formData, {
        headers: {
          "Client-Secret": "asdfdsgvbrggre",
        },
      })
      .then((res) => {
        console.log(res);

        setFetchedData(res?.data?.data?.result);
      })
      .catch((err) => {
        console.log(err);
        setFetchedData([]);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [limit]);

  return (
    <div className="h-[50vh] overflow-y-auto">
      {loadear && (
        <div className="relative top-[50%] left-[50%] transform translate-x-[-50%]">
          <Loader />
        </div>
      )}
      {fetchedData &&
        fetchedData?.length > 0 &&
        !loadear &&
        fetchedData?.map((item: any, index: number) => (
          <div
            key={index + 2 + item?.id}
            className="flex justify-between align-top   border pt-3 pb-3 glass-morfing-effect border-gray-600 mb-3 p-2 rounded-2xl cursor-pointer"
            onClick={() => {
              setOnclickedRightSideData((prev) => ({
                ...prev,
                params: "Messages",
                id: item?.id,
              }));
            }}
          >
            <div className="w-full">
              <div className="flex justify-between mb-4 w-full">
                <p className="flex gap-1 align-middle text-[#8E9DAD] text-[12px] leading-[16px]">
                  Group:{" "}
                  <span className="text-[#fff] font-[600]">
                    {item?.group_name}
                  </span>
                </p>
                <p className=" text-[12px] leading-[12px] text-[#8E9DAD]">
                  {formatTimestamp(item?.timestamp)}
                </p>
              </div>
              <p> {item?.message_text}</p>
            </div>
            <div className="flex flex-col gap-1 mt-2"></div>
          </div>
        ))}
      {fetchedData?.length > 0 && !loadear && (
        <p
          className="text-[#108de5] text-center cursor-pointer w-fit m-auto font-[600] pb-5 text-[14px]"
          onClick={() => setlimit((prev) => prev + 10)}
        >
          Show more
        </p>
      )}
      {fetchedData?.length === 0 && !loadear && (
        <div className="text-[#8e9dad] text-center text-[14px] relative top-[50%] left-[50%] transform translate-x-[-50%]">
          No data to show
        </div>
      )}
    </div>
  );
}

export default MessageHistory;
