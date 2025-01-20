import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../AuthContext/Authcontext";
import RightPeopleParent from "./RightSectionPage/RightPeopleParent";
import RightMessages from "./RightSectionPage/RightMessages";
import RightGroups from "./RightSectionPage/RightGroups";

function RightSideDataContainer() {
  const { onclickedRightSideData } = useAuthContext();
    return <div>
      {onclickedRightSideData.params==="People" && <RightPeopleParent />}
      {onclickedRightSideData.params==="Messages" && <RightMessages />}
      {onclickedRightSideData.params==="Groups" && <RightGroups />}
  </div>;
}

export default RightSideDataContainer;
