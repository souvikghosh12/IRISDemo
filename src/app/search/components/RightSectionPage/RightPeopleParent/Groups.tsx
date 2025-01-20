import { useAuthContext } from "@/app/search/AuthContext/Authcontext";
import Image from "next/image";
import CircularProgress from "../../CircularProgress";

function Groups({ data }: any) {
  const { setOnclickedRightSideData } = useAuthContext();

  function truncateText(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  return (
    <div>
      {data?.map((item: any, index: number) => (
        <div
          key={index + 1 + item?.group?.id}
          className="flex justify-between align-top border hover:cursor-pointer pt-3 pb-3 glass-morfing-effect border-gray-600 mb-3 p-2 rounded-2xl"
          onClick={() => {
            setOnclickedRightSideData((prev) => ({
              ...prev,
              params: "Groups",
              id: item?.group?.id,
            }));
          }}
        >
          <div className="flex gap-5">
            {item?.group?.profile_image_url && (
              <Image
                src={item?.group?.profile_image_url}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full object-contain"
              />
            )}
            <div className="">
              <p className="font-[600] text-[#fff] text-[14px]">
                {truncateText(String(item?.group?.group_name), 50)}
              </p>
              <p className="flex gap-1 align-middle text-[#8E9DAD] text-[12px]">
                Members :{" "}
                <span className="text-[#fff]">
                  {item?.group?.members_count}
                </span>
              </p>
              <p className="flex gap-1 align-middle text-[#8E9DAD] text-[12px]">
                Group Risk Score :{" "}
                <span className="text-[#fff]">
                  {item?.group?.group_risk_score && (
                    <CircularProgress percentage={item?.group?.risk_score} />
                  )}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2"></div>
        </div>
      ))}
    </div>
  );
}

export default Groups;
