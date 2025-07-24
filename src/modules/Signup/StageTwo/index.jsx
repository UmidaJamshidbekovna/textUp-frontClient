import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import { Box, Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useLoginStore } from '@/stores/loginStore'
import { useOtpSendMutation } from '@/services/auth.service'

// const requiredFields = ["zipCode", "oked", "companyAddress"];

const StageTwo = () => {
    const router = useRouter()
    const { t } = useTranslation()
    const { data, setData } = useLoginStore();

    // const allFieldsFilled = requiredFields.every(field => Boolean(data[field]))

    const { mutate: otpSendMutate, isLoading: otpSendLoading } = useOtpSendMutation({
        // onSuccess: res => console.log(res),
        onError: err => console.log(err),
        enabled: !!data.email,
    })

    return (
        <div className={styles.stageTwo}>

            <div className={styles.container}>

                <h2 className={styles.title}>{t("registration")}</h2>

                <p className={styles.desc}>{t("verifyInfoBeforeConfirm")}</p>

                <div className={styles.parties}>

                    <div className={styles.executor}>

                        <Box fontWeight={700} fontSize={"14px"} lineHeight={"20px"} mb={"8px"}>{t("executor")}</Box>

                        <Box fontWeight={700} fontSize={"14px"} lineHeight={"20px"} mb={"24px"}>&quot;ALOQAPRO&quot; MCH</Box>

                        <Box fontWeight={500} fontSize={"14px"} lineHeight={"20px"} mb={"10px"}>ТОШКЕНТ ШАҲАР ЮНУСОБОД ТУМАНИ Barhayot MFY, 12 mavzesi, 30-a-uy</Box>

                        <Box fontWeight={500} fontSize={"14px"} lineHeight={"20px"} mb={"10px"}>Bank rekvizitlari:</Box>

                        <Box fontWeight={500} fontSize={"14px"} lineHeight={"20px"} mb={"10px"}>X/P: 20208000107203152001</Box>

                        <Box fontWeight={500} fontSize={"14px"} lineHeight={"20px"} mb={"10px"}>XATB &quot;ALOQA BANK&quot;</Box>

                        <Flex gap={"15px"} mb={"10px"}>

                            <Box fontWeight={500} fontSize={"14px"} lineHeight={"20px"}>MFO: 00401</Box>

                            <Box fontWeight={500} fontSize={"14px"} lineHeight={"20px"}>STIR: 311927524</Box>

                            <Box fontWeight={500} fontSize={"14px"} lineHeight={"20px"}>OKED: 63110</Box>

                        </Flex>

                        <Box fontWeight={500} fontSize={"14px"} lineHeight={"20px"} mb={"10px"}>Telefon: +998 93 226 29 31</Box>

                        <Flex gap={"12px"} mb={"10px"}>

                            <Box fontWeight={500} fontSize={"14px"} lineHeight={"20px"}>E-mail: help@textup.uz</Box>

                            <Box fontWeight={500} fontSize={"14px"} lineHeight={"20px"}>Veb sayt: www.textup.uz</Box>

                        </Flex>

                    </div>

                    <div className={styles.customer}>

                        <Box fontWeight={700} fontSize={"14px"} lineHeight={"20px"} mb={"8px"}>{t("customer")}</Box>

                        <Box fontWeight={700} fontSize={"14px"} lineHeight={"20px"} mb={"24px"}>&Prime;{data.companyName}&Prime; MCHJ</Box>

                        <Box className={styles.clientInfo}>Tashkilot ma&Prime;lumotlari:</Box>

                        <Box className={styles.clientInfo}>
                            Pochta indeksi:
                            <input className={styles.inp} onChange={(e) => { setData({ zipCode: e.target.value }) }} type="text" value={data.zipCode} placeholder={t("enterZipCode")} />
                            , {data?.TIN_or_JSHSHIR?.key}: {data.TIN_or_JSHSHIR?.value}
                        </Box>

                        <Box className={styles.clientInfo}>
                            Yuridik manzil: <input className={styles.inp} onChange={(e) => { setData({ companyAddress: e.target.value }) }} type="text" value={data.companyAddress} placeholder={t("enterCompanyAddress")} />
                        </Box>

                        <Box className={styles.clientInfo}>XATB “DAVR BANK”</Box>

                        <Box className={styles.clientInfo}>Telefon: {data?.phone}</Box>

                        <Box className={styles.clientInfo}>E-mail: {data?.email}</Box>

                    </div>

                </div>

                <label className={styles.privacy_policy}>
                    <input type="checkbox" onChange={() => setData({ privacy_policy: !data.privacy_policy })} checked={data.privacy_policy} />
                    <div className={styles.offer} dangerouslySetInnerHTML={{ __html: t("acceptOffer") }} />
                </label>

                <Flex justifyContent={"flex-end"} gap={"8px"}>
                    <Button onClick={() => { router.push("/auth/signup/1") }} variant={"outline"}>{t("back")}</Button>
                    <Button
                        isLoading={otpSendLoading}
                        isDisabled={!data.privacy_policy}
                        onClick={() => {
                            otpSendMutate({
                                email: data.email,
                            }, {
                                onSuccess: (res) => {
                                    console.log(res)
                                    router.push("/auth/signup/3")
                                }
                            })
                        }}
                        w={"160px"}
                    >
                        {t("confirmation")}
                    </Button>
                </Flex>

            </div>

        </div>
    )
}

export default StageTwo
