import { useAuthContext } from "@/app/search/AuthContext/Authcontext";
import axios from "axios";
import { useEffect, useState } from "react";
import FileViewer from "../../FileViewer";
import SyncedSlider from "../../SyncedSlider";
import Loader from "../../Loader";

function Media() {
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [loadear, setLoader] = useState<boolean>(false);
  const { onclickedRightSideData } = useAuthContext();
  const [modal, setModal] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  useEffect(() => {
    setLoader(true);
    const formData = new FormData();
    formData.append("id", onclickedRightSideData?.id);
    formData.append("limit", "40");
    formData.append("offset", "0");
    axios
      .post("http://20.217.64.227/api/group/medias", formData, {
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

  return (
    <div className="h-[50vh]">
      {loadear && (
        <div className="relative top-[50%] left-[50%] transform translate-x-[-50%]">
          <Loader />
        </div>
      )}
      {fetchedData?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {fetchedData?.map((item, index) => (
            <div
              key={index}
              className=""
              onClick={() => {
                setModal(true);
                setSelectedIndex(index);
              }}
            >
              <FileViewer
                fileSrc={item?.message_media?.media_url}
                type="view"
              />
            </div>
          ))}
        </div>
      )}
      {fetchedData?.length > 0 && modal && (
        <div className="fixed w-[100vw] h-[100vh] overflow-hidden  top-0 left-0  bg-[#03090d] z-99">
          <SyncedSlider
            selectedIndex={selectedIndex}
            fetchedData={fetchedData}
            setModal={setModal}
          />
        </div>
      )}
      {fetchedData?.length === 0 && !loadear && (
        <div className="text-[#8e9dad] text-center text-[14px] relative top-[50%] left-[50%] transform translate-x-[-50%]">
          No data to show
        </div>
      )}
    </div>
  );
}

export default Media;
