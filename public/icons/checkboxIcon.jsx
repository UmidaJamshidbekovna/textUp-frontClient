import { createIcon } from "@chakra-ui/react";

export default createIcon({
    displayName: "checkboxIcon",
    viewBox: "0 0 20 20",
    path: (
        <>
            <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" fill="white" />
            <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" stroke="#D0D5DD" />
        </>
    ),
});