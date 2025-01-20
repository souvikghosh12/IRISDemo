import { useAuthContext } from "@/app/search/AuthContext/Authcontext";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import FileViewer from "../../FileViewer";
import SyncedSlider from "../../SyncedSlider";

function Messages() {
  const [loadear, setLoader] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const { onclickedRightSideData, setOnclickedRightSideData } =
    useAuthContext();
  const [limit, setlimit] = useState<number>(10);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);

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
    formData.append("limit", limit as any);
    formData.append("offset", "0");
    axios
      .post("http://20.217.64.227/api/group/messages", formData, {
        headers: {
          "Client-Secret": "asdfdsgvbrggre",
        },
      })
      .then((res) => {
        console.log(res?.data?.data, "res?.data?.data");
        setFetchedData(res?.data?.data?.result);
      })
      .catch((err) => {
        console.log(err);
        setFetchedData([]);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);
  useEffect(() => {
    const formData = new FormData();
    formData.append("id", onclickedRightSideData?.id);
    formData.append("limit", limit as any);
    formData.append("offset", "0");
    axios
      .post("http://20.217.64.227/api/group/messages", formData, {
        headers: {
          "Client-Secret": "asdfdsgvbrggre",
        },
      })
      .then((res) => {
        console.log(res?.data?.data, "res?.data?.data");
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
    <div className="h-[50vh] ">
      {loadear && (
        <div className="relative top-[50%] left-[50%] transform translate-x-[-50%]">
          <Loader />
        </div>
      )}
      {fetchedData &&
        fetchedData?.length > 0 &&
        !loadear &&
        fetchedData?.map((item: any, index: number) => (
          <>
            {item?.message_text && (
              <div
                key={index + 2 + item?.id}
                className="flex justify-between align-top   border pt-3 pb-3 glass-morfing-effect border-gray-600 mb-3 p-2 rounded-2xl cursor-pointer"
              >
                <div className="w-full">
                  <div
                    onClick={() => {
                      setOnclickedRightSideData((prev) => ({
                        ...prev,
                        params: "Messages",
                        id: item?.id,
                      }));
                    }}
                  >
                    <p> {item?.message_text}</p>
                    <div className="flex justify-between mb-4 w-full mt-3">
                      <h3 className="flex gap-1 align-middle text-[12px] leading-[12px]  text-[#8E9DAD] ">
                        <span className=" font-[600]">
                          {item?.entity.phone_number}
                        </span>
                      </h3>
                      <p className=" text-[12px] leading-[12px]  text-[#8E9DAD]">
                        {formatTimestamp(item?.timestamp)}
                      </p>
                    </div>
                  </div>
                  <button className="text-[12px] leading-[12px]  text-[#8E9DAD] underline">
                    Translate
                  </button>
                </div>
                <div className="flex flex-col gap-1 mt-2"></div>
              </div>
            )}
            {item.message_media && (
              <>
                <div
                  key={index + 10 + item?.id}
                  className="flex justify-between align-top   border pt-3 pb-3 glass-morfing-effect border-gray-600 mb-3 p-2 rounded-2xl cursor-pointer"
                  onClick={() => {
                    setSelectedIndex(index);
                    setModal(true);
                  }}
                >
                  <div className="w-full">
                    <div className="w-[140px] h-[140px] object-cover mb-3  group-massage-section">
                      <FileViewer
                        fileSrc={item?.message_media?.media_url}
                        type="view"
                      />
                    </div>
                    <div className="flex justify-between mb-4 w-full mt-3">
                      <h3 className="flex gap-1 align-middle text-[12px] leading-[12px]  text-[#8E9DAD] ">
                        <span className=" font-[600]">
                          {item?.entity.phone_number}
                        </span>
                      </h3>
                      <p className=" text-[12px] leading-[12px]  text-[#8E9DAD]">
                        {formatTimestamp(item?.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-2"></div>
                </div>
                {fetchedData?.length > 0 && modal && (
                  <div className="fixed w-[100vw] h-[100vh] overflow-hidden  top-0 left-0  bg-[#03090d] ">
                    <SyncedSlider
                      selectedIndex={selectedIndex}
                      fetchedData={fetchedData}
                      setModal={setModal}
                    />
                  </div>
                )}
              </>
            )}
          </>
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

export default Messages;
