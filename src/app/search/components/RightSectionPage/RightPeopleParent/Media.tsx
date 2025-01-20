import { useEffect, useState } from "react";
import SyncedSlider from "../../SyncedSlider";
import axios from "axios";

function Media() {
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [loadear, setLoader] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);
    const formData = new FormData();
    formData.append("id", "1");
    axios
      .post("http://20.217.64.227/api/entity/medias", formData, {
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
        setFetchedData([]);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <div className="relative top-[50%] left-[50%] transform translate-x-[-50%]">
      {fetchedData?.length === 0 && !loadear && (
        <div className="text-[#8e9dad] text-center text-[14px] ">
          No data to show
        </div>
      )}
    </div>
  );
}

export default Media;
