export default function useSMSStatsText(stats = {}, t = () => {}) {
  const parts = [];

  parts.push(t("sms_stats.length", { count: stats?.length }));
  parts.push(t("sms_stats.sms_count", { count: stats?.smsParts }));

  if (stats?.linkCount > 0)
    parts.push(t("sms_stats.link_count", { count: stats?.linkCount }));
  //   if (stats?.latinCount > 0)
  //     parts.push(t("sms_stats.latin_count", { count: stats?.latinCount }));
  //   if (stats?.cyrillicCount > 0)
  //     parts.push(t("sms_stats.cyrillic_count", { count: stats?.cyrillicCount }));
  if (stats?.numberCount > 0)
    parts.push(t("sms_stats.number_count", { count: stats?.numberCount }));
  //   if (stats?.punctuationCount > 0)
  //     parts.push(
  //       t("sms_stats.punctuation_count", { count: stats?.punctuationCount })
  //     );
  //   if (stats?.symbolCount > 0)
  //     parts.push(t("sms_stats.symbol_count", { count: stats?.symbolCount }));
  //   if (stats?.spaceCount > 0)
  //     parts.push(t("sms_stats.space_count", { count: stats?.spaceCount }));
  //   if (stats?.newlineCount > 0)
  //     parts.push(t("sms_stats.newline_count", { count: stats?.newlineCount }));
  // if (stats?.otherCharacters > 0) parts.push(t('sms_stats.other_characters', { count: stats?.otherCharacters }));

  return parts.join(", ");
}
