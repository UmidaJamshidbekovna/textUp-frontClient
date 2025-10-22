import { Checkbox, Spinner, Text, Box } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

export const BodyContent = ({
  isChecked,
  setIsChecked,
  contactCount = 0,
  isFetchingContacts = false,
  showCheckbox = true
}) => {
  const { t } = useTranslation();
  if (!showCheckbox) {
    return null;
  }



  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        gap="8px"
        mb="8px"
        cursor={isFetchingContacts ? "not-allowed" : "pointer"}
        opacity={isFetchingContacts ? 0.6 : 1}
        onClick={() => !isFetchingContacts && setIsChecked(!isChecked)}
      >
        <Checkbox
          isChecked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          isDisabled={isFetchingContacts}
          pointerEvents="none"
          colorScheme="purple"

        >
          {t("deleteAllGroupContacts")}
        </Checkbox>


      </Box>


      {
        isChecked && (
          <Box ml="32px" mt="4px">
            {isFetchingContacts ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Spinner size="sm" />
                <Text fontSize="sm" color="gray.600">
                  {t("loadingContacts")}
                </Text>
              </div>
            ) : (
              <Text fontSize="sm" color="gray.600">
                {contactCount > 0
                  ? t("contactsWillBeDeleted", { count: contactCount })
                  : t("noContactsToDelete")
                }
              </Text>
            )}
          </Box>
        )
      }
    </Box >
  );
};
