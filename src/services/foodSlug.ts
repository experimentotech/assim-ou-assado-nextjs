export const buildSubstitutionSlug = (
  destinationSlug: string,
  initialSlug: string,
): string => {
  return `quanto-de-${destinationSlug}-para-substituir-${initialSlug}`;
};

export const parseSubstitutionSlug = (
  slug: string,
): { destinationSlug: string; initialSlug: string } | null => {
  const match = slug.match(/^quanto-de-(.+)-para-substituir-(.+)$/);
  if (!match) return null;
  return { destinationSlug: match[1], initialSlug: match[2] };
};
