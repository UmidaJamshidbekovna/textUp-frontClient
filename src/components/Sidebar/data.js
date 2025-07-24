import { FiMessageCircle } from "react-icons/fi";
import { LiaEnvelopeOpenTextSolid } from "react-icons/lia";

export const links = [
    {
        id: "smsInfo",
        label: "smsInfo",
        icon: <FiMessageCircle fontSize={"22px"} />,
        link: "/user/sms",
    },
    {
        id: "sendSms",
        label: "sendSms",
        icon: <LiaEnvelopeOpenTextSolid fontSize={"22px"} />,
        link: "/user/send-sms",
    },
]