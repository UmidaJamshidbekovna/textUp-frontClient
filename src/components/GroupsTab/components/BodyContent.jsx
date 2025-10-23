import { Checkbox, Box } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

export const BodyContent = ({
  isChecked,
  setIsChecked,
  showCheckbox = true
}) => {
  const { t } = useTranslation();

  if (!showCheckbox) {
    return null;
  }

  return (
    <Box>
      <Checkbox
        isChecked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        colorScheme="purple"
      >
        {t("deleteAllGroupContacts")}
      </Checkbox>
    </Box>
  );
};
