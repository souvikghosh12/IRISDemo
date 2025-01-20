import { useAuthContext } from "@/app/search/AuthContext/Authcontext";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../../Loader";

function Members() {
  const { onclickedRightSideData, setOnclickedRightSideData } =
    useAuthContext();
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [loadear, setLoader] = useState<boolean>(false);
  const [limit, setlimit] = useState<number>(10);

  useEffect(() => {
    setLoader(true);
    const formData = new FormData();
    formData.append("id", onclickedRightSideData?.id);
    formData.append("limit", limit as any);
    formData.append("offset", "0");
    axios
      .post("http://20.217.64.227/api/group/members", formData, {
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
      .post("http://20.217.64.227/api/group/members", formData, {
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
      {fetchedData.length > 0 &&
        fetchedData.map((row: any, index: number) => (
          <div
            key={index + 70 + row?.entity?.id}
            className="flex justify-between hover:cursor-pointer align-top border pt-3 pb-3 glass-morfing-effect border-gray-600 mb-3 p-2 rounded-2xl"
            onClick={() => {
              setOnclickedRightSideData((prev) => ({
                ...prev,
                params: "People",
                id: row?.entity?.id,
              }));
            }}
          >
            <div className="flex gap-5">
              <Image
                src={row?.entity?.profile_image_url}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="mt-1">
                <p className="font-[600] text-[#fff] text-[14px]">
                  {row?.entity?.phone_number}
                </p>
                <p className="flex gap-1 align-middle text-[#8E9DAD] text-[13px]">
                  <Image
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${row?.entity?.country?.alpha2_code}.svg`}
                    alt="Profile"
                    width={20}
                    height={20}
                  />
                  {row?.entity?.country?.name}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1 "></div>
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

export default Members;
