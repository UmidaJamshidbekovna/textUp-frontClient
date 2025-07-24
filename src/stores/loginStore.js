import { create } from "zustand";
import { persist } from "zustand/middleware";

const template = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "+998",
    address: "",
    passportNumber: "",
    zipCode: "",
    oked: "",
    companyName: "",
    companyAddress: "",
    passportSeries: "",
    TIN_or_JSHSHIR: { key: "TIN", value: "" },
    bankAccount: "",
    privacy_policy: false,
}

export const useLoginStore = create(
    persist(
        (set) => ({
            data: template,
            setData: (newData) =>
                set((state) => ({ data: { ...state.data, ...newData } })),
            resetData: () =>
                set({
                    data: template,
                }),
        }),
        { name: "login-data-storage" + process.env.NEXTAUTH_URL + "client" }
    )
);
