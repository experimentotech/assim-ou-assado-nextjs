import { HomePage } from "@/components/HomePage";
import { foodsSlugMap } from "@/data/foodSlugMap";
import { substitutionPageUrls } from "@/data/substitutionPageUrls";
import { parseSubstitutionSlug } from "@/services/foodSlug";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

const normalizeBaseUrl = (url: string) => url.replace(/\/$/, "");

export const dynamicParams = false;

export const generateStaticParams = async () => {
  return substitutionPageUrls.map((slug) => ({
    slug,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const resolvedParams = await Promise.resolve(params);
  const parsed = parseSubstitutionSlug(resolvedParams.slug);
  if (!parsed) return {};

  const toFood = foodsSlugMap[parsed.destinationSlug];
  const fromFood = foodsSlugMap[parsed.initialSlug];
  if (!toFood || !fromFood) return {};

  const toTitle = toFood.nome;
  const fromTitle = fromFood.nome;
  const title = `Quanto de ${toTitle} para substituir ${fromTitle}`;
  const description = `Descubra quanto de ${toTitle} equivale a ${fromTitle} na substituição de alimentos.`;
  const canonicalUrl = baseUrl
    ? `${normalizeBaseUrl(baseUrl)}/${resolvedParams.slug}`
    : undefined;
  const imageUrl = baseUrl
    ? `${normalizeBaseUrl(baseUrl)}/appsharemeta_v4.jpeg`
    : undefined;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: canonicalUrl,
      title,
      description,
      siteName: "Assim ou Assado",
      images: imageUrl ? { url: imageUrl } : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? { url: imageUrl } : undefined,
    },
  };
};

export default async function FoodSubstitutionPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const parsed = parseSubstitutionSlug(resolvedParams.slug);
  if (!parsed) {
    notFound();
  }

  const toFood = foodsSlugMap[parsed.destinationSlug];
  const fromFood = foodsSlugMap[parsed.initialSlug];

  if (!toFood || !fromFood) {
    notFound();
  }

  return <HomePage initialFromFood={fromFood} initialToFood={toFood} />;
}
