export const data = [
    {
        id: 1,
        organization_name: "OOO TEXTUP",
        status: "rejected",
        message: "Rad etilish sababi: Текст не принят согласно Пункт 2. Пожалуйста, заново ознакомьтесь с Инструкцией. / Punkt 2 ga asosan matn qabul qilinmadi. Iltimos, qaytadan Yuriqnoma bilan tanishib chiqing.",
        sender_name: "4546",
        template_types: [
            `<b>mobiuz:</b>
            Servis turdagi - 85 so'm`,
            `<b>beeline:</b>
            Servis turdagi - 85 so'm`,
            `<b>ucell:</b>
            Servis turdagi - 85 so'm`,
            `<b>humans:</b>
            Servis turdagi - 85 so'm`,
            `<b>uzmobile:</b>
            Servis turdagi - 85 so'm`,
            `<b>uzmobile_cdma:</b>
            Servis turdagi - 85 so'm`,
            `<b>perfectum:</b>
            Servis turdagi - 85 so'm`,
        ],
        original_text: `<p><b>1234 sizning</b> <hr/> Kiritilgan - 12 ta belgidan iborat, jami SMS - 1 dona</p>`,
        dates: ["<b>Matn qabul qilindi:</b> 19.02.2025 13:53", "<b>Matn rad etildi:</b> 19.02.2025 13:53"],
    },
    {
        id: 2,
        organization_name: "OOO TEXTUP",
        status: "approved",
        message: "",
        sender_name: "4546",
        template_types: [
            `<b>mobiuz:</b>
            Servis turdagi - 85 so'm`,
            `<b>beeline:</b>
            Servis turdagi - 85 so'm`,
            `<b>ucell:</b>
            Servis turdagi - 85 so'm`,
            `<b>humans:</b>
            Servis turdagi - 85 so'm`,
            `<b>uzmobile:</b>
            Servis turdagi - 85 so'm`,
            `<b>uzmobile_cdma:</b>
            Servis turdagi - 85 so'm`,
            `<b>perfectum:</b>
            Servis turdagi - 85 so'm`,
        ],
        original_text: `<p><b>1234 sizning</b> <hr/> Kiritilgan - 12 ta belgidan iborat, jami SMS - 1 dona</p>`,
        dates: ["<b>Matn qabul qilindi:</b> 19.02.2025 13:53", "<b>Matn rad etildi:</b> 19.02.2025 13:53"],
    },
]

export const keys = [
    {
        id: "name",
        key: "name",
        label: "templateName",
    },
    {
        id: "senderName",
        key: "sender_name",
        label: "senderName",
    },
    // {
    //     id: "templateType",
    //     key: "template_types",
    //     label: "templateType",
    // },
    {
        id: "originalText",
        key: "content",
        label: "originalText",
    },
    // {
    //     id: "originalText",
    //     key: "original_text",
    //     label: "originalText",
    // },
    {
        id: "dates",
        key: "createdAt",
        label: "date",
    },
]

export const template_types = [
    `<b>mobiuz:</b>
    Servis turdagi - 85 so'm`,
    `<b>beeline:</b>
    Servis turdagi - 85 so'm`,
    `<b>ucell:</b>
    Servis turdagi - 85 so'm`,
    `<b>humans:</b>
    Servis turdagi - 85 so'm`,
    `<b>uzmobile:</b>
    Servis turdagi - 85 so'm`,
    `<b>uzmobile_cdma:</b>
    Servis turdagi - 85 so'm`,
    `<b>perfectum:</b>
    Servis turdagi - 85 so'm`,
]

export const statusStyles = {
    active: {
        color: "#067647",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "18px",
        padding: "2px 6px",
        border: "1px solid #ABEFC6",
        borderRadius: "16px",
        textAlign: "center",
        bg: "#ECFDF3",
    },
    inactive: {
        color: "#344054",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "18px",
        padding: "2px 6px",
        border: "1px solid #D0D5DD",
        borderRadius: "16px",
        textAlign: "center",
        bg: "#F9FAFB",
    },
    in_verify: {
        color: "#B54708",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "18px",
        padding: "2px 6px",
        border: "1px solid #FEDF89",
        borderRadius: "16px",
        textAlign: "center",
        bg: "#FFFAEB",
    },
    blocked: {
        color: "#B42318",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "18px",
        padding: "2px 6px",
        border: "1px solid #FECACA",
        borderRadius: "16px",
        textAlign: "center",
        bg: "#FEF2F2",
    },
    cancelled: {
        color: "#B42318",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "18px",
        padding: "2px 6px",
        border: "1px solid #FECDCA",
        borderRadius: "16px",
        textAlign: "center",
        bg: "#FEF3F2",
    },
};