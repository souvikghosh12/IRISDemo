import { useAuthContext } from "../../AuthContext/Authcontext";

function RightMessages() {
      const { onclickedRightSideData } = useAuthContext();
    
  return (
    <div>
      thi is messages
    </div>
  )
}

export default RightMessages
