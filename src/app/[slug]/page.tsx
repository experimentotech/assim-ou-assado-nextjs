import { HomePage } from "@/components/HomePage";
import { alimentosSlugList, alimentosSlugMap } from "@/data/foodSlugMap";
import {
  buildSubstitutionSlug,
  parseSubstitutionSlug,
} from "@/services/foodSlug";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

const normalizeBaseUrl = (url: string) => url.replace(/\/$/, "");

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const params: { slug: string }[] = [];
  for (const destinationSlug of alimentosSlugList) {
    for (const initialSlug of alimentosSlugList) {
      params.push({
        slug: buildSubstitutionSlug(destinationSlug, initialSlug),
      });
    }
  }
  return params;
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const resolvedParams = await Promise.resolve(params);
  const parsed = parseSubstitutionSlug(resolvedParams.slug);
  if (!parsed) return {};

  const toFood = alimentosSlugMap[parsed.destinationSlug];
  const fromFood = alimentosSlugMap[parsed.initialSlug];
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

  const toFood = alimentosSlugMap[parsed.destinationSlug];
  const fromFood = alimentosSlugMap[parsed.initialSlug];

  if (!toFood || !fromFood) {
    notFound();
  }

  return <HomePage initialFromFood={fromFood} initialToFood={toFood} />;
}
