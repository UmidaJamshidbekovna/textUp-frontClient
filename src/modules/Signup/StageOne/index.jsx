import styles from './styles.module.scss'
import { Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { FaCheck } from "react-icons/fa6";
import { useLoginStore } from '@/stores/loginStore';
import CustomTextInput from '@/components/Inputs/CustomTextInput';
import { useState } from 'react';
import PhoneNumberInput from '@/components/Inputs/PhoneNumberInput';
import { GoEye, GoEyeClosed } from "react-icons/go";

const requiredKeys = [
    "firstName", "lastName", "email", "phone", "password", "address",
    "companyName", "inn", "pinfl", "bankAccount",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const StageOne = () => {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const { data, setData, resetData } = useLoginStore();
    const router = useRouter();
    const { t } = useTranslation();

    const validateTINorJSHSHIR = () => {
        const { key, value } = data.TIN_or_JSHSHIR || {};
        if (key === "JSHSHIR" && value?.length !== 14) {
            return t("JSHSHIRLength");
        }
        if (key === "TIN" && value?.length !== 9) {
            return t("TINLength");
        }
        return "";
    };

    const isStepOneComplete = () =>
        data.firstName && data.lastName && emailRegex.test(data.email)
        && data.phone?.length > 9 && data.password?.length >= 6 && data.address;

    const isTINorJSHSHIRValid = () => {
        const { key, value } = data.TIN_or_JSHSHIR || {};
        if (key === "TIN") return value?.length === 9;
        if (key === "JSHSHIR") return value?.length === 14;
        return false;
    };

    const isStepTwoComplete = () =>
        requiredKeys
            .filter(key => key !== "inn" && key !== "pinfl") // Исключаем старые поля
            .every(key => Boolean(data[key] || data[key]?.id)) &&
        isTINorJSHSHIRValid();

    const step = isStepTwoComplete() ? 2 : isStepOneComplete() ? 1 : 0;

    const handleClick = () => setShow(!show);

    const handleChange = (e, key) => {
        const value = e.target.value;
        setData({ [key]: value });

        const newErrors = {};
        if (key === "email") {
            newErrors.email = emailRegex.test(value) ? "" : t("invalidEmail");
        }
        if (key === "password") {
            newErrors.password = value.length >= 6 ? "" : t("passwordTooShort");
        }
        setErrors(prev => ({ ...prev, ...newErrors }));
    };

    return (
        <div className={styles.stageOne}>
            <div className={styles.container}>
                <div className={styles.stepper}>
                    {[1, 2].map(i => (
                        <div key={i} className={styles.stepWrapper}>
                            <div className={styles.iconWrapper} style={{ borderColor: step >= i ? "#22c348" : "var(--primary-color)" }}>
                                <div className={styles.iconBody} style={{ background: step >= i ? "#22c348" : "var(--primary-color)" }}>
                                    {step >= i ? <FaCheck className={styles.faCheck} /> : <Text color={"#fff"}>{i}</Text>}
                                </div>
                            </div>
                            {i === 1 && (
                                <div className={styles.lineBody}>
                                    <div className={styles.line} style={{ height: step >= 1 ? "100%" : "0" }} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.steps}>
                    <div className={styles.stepOne}>
                        <h2 className={styles.title}>{t("registration")}</h2>

                        <div className={styles.inputs}>
                            <CustomTextInput
                                label={t("firstName")}
                                placeholder={t("enterFirstName")}
                                onChange={(e) => handleChange(e, "firstName")}
                                value={data.firstName}
                            />

                            <CustomTextInput
                                label={t("lastName")}
                                placeholder={t("enterLastName")}
                                onChange={(e) => handleChange(e, "lastName")}
                                value={data.lastName}
                            />

                            <InputGroup display={"flex"} flexDirection={"column"}>
                                <Text fontWeight={500} fontSize={"14px"} mb='6px'>{t("phoneNumber")}</Text>
                                <PhoneNumberInput
                                    placeholder={t("enterPhoneNumber")}
                                    onChange={(e) => setData({ phone: e.target.value })}
                                    value={data.phone}
                                />
                            </InputGroup>

                            <CustomTextInput
                                label={t("email")}
                                placeholder={t("enterEmail")}
                                onChange={(e) => handleChange(e, "email")}
                                value={data.email}
                                error={errors.email}
                            />

                            <InputGroup className={styles.passwordInp} mb={errors.password ? "0" : "24px"}>
                                <Text className={styles.text} mb={"6px"}>{t("password")}</Text>
                                <Input
                                    onChange={(e) => handleChange(e, "password")}
                                    value={data.password}
                                    minH={"44px"}
                                    type={show ? "text" : 'password'}
                                    placeholder={t("enterPassword")}
                                    _focusVisible={{ outline: "none" }}
                                />
                                <InputRightElement top={"auto"} bottom={"0"}>
                                    <button type='button' onClick={handleClick}>
                                        {show ? <GoEye /> : <GoEyeClosed />}
                                    </button>
                                </InputRightElement>
                                {errors.password && <Text color="red.500" fontSize="12px">{errors.password}</Text>}
                            </InputGroup>

                            <CustomTextInput
                                label={t("address")}
                                placeholder={t("enterAddress")}
                                onChange={(e) => handleChange(e, "address")}
                                value={data.address}
                            />
                        </div>
                    </div>

                    {/** Step 2 (Legal Entity Info) */}
                    <div className={styles.stepTwo} style={{ display: step > 0 ? "block" : "none" }}>
                        <h2 className={styles.title}>{t("legalEntityInfo")}</h2>

                        <div className={styles.inputs}>
                            <CustomTextInput
                                label={t("companyName")}
                                placeholder={t("enterCompanyName")}
                                onChange={(e) => handleChange(e, "companyName")}
                                value={data.companyName}
                            />

                            <InputGroup display={"flex"} flexDirection={"column"}>
                                <Flex gap={"10px"} mb={"6px"}>
                                    {["TIN", "JSHSHIR"].map(type => (
                                        <label key={type} style={{ fontSize: "14px", fontWeight: "500" }}>
                                            <input
                                                type="radio"
                                                name="legalEntityType"
                                                value={type}
                                                checked={data.TIN_or_JSHSHIR?.key === type}
                                                onChange={(e) => setData({ TIN_or_JSHSHIR: { key: e.target.value, value: "" } })}
                                            />
                                            {" "}
                                            {t(type.toLowerCase())}
                                        </label>
                                    ))}
                                </Flex>

                                <CustomTextInput
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        const maxLength = data.TIN_or_JSHSHIR?.key === "JSHSHIR" ? 14 : 9;
                                        setData({
                                            TIN_or_JSHSHIR: {
                                                key: data.TIN_or_JSHSHIR?.key,
                                                value: value.slice(0, maxLength)
                                            }
                                        });
                                    }}
                                    type='number'
                                    value={data.TIN_or_JSHSHIR?.value || ""}
                                    error={validateTINorJSHSHIR()}
                                />
                            </InputGroup>

                            <CustomTextInput
                                label={t("accountNumber")}
                                placeholder={t("enterAccountNumber")}
                                onChange={(e) => setData({ bankAccount: e.target.value.slice(0, 20) })}
                                value={data.bankAccount}
                                type='number'
                            />

                        </div>

                        <div className={styles.footer}>
                            <Button
                                onClick={() => {
                                    router.push("/auth/login")
                                    resetData()
                                }}
                                variant={"outline"}
                            >
                                {t("back")}
                            </Button>
                            <Button
                                isDisabled={!isStepTwoComplete()}
                                onClick={() => router.push("/auth/signup/2")}
                                className={styles.btn}
                            >
                                {t("next")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default StageOne;
