import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { ProductList } from "@/components/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;

  const [productVariant, categories] = await Promise.all([
    db.query.productVariantTable.findFirst({
      where: eq(productVariantTable.slug, slug),
      with: {
        product: {
          with: {
            variants: true,
          },
        },
      },
    }),
    db.query.categoryTable.findMany({}),
  ]);

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header categories={categories} />
      <main className="mx-auto max-w-7xl">
        <div className="flex flex-col space-y-6 lg:space-y-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:px-8">
            <div className="lg:order-1">
              <Image
                src={productVariant.imageUrl}
                alt={productVariant.name}
                sizes="100vw"
                height={0}
                width={0}
                className="h-auto w-full object-cover lg:rounded-2xl"
              />
            </div>

            <div className="space-y-6 px-5 lg:order-2 lg:flex lg:flex-col lg:justify-center lg:px-0">
              <div>
                <VariantSelector
                  selectedVariantSlug={productVariant.slug}
                  variants={productVariant.product.variants}
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold lg:text-2xl">
                  {productVariant.product.name}
                </h2>
                <h3 className="text-muted-foreground text-sm lg:text-base">
                  {productVariant.name}
                </h3>
                <h3 className="text-lg font-semibold lg:text-xl">
                  {formatCentsToBRL(productVariant.priceInCents)}
                </h3>
              </div>

              <ProductActions productVariantId={productVariant.id} />

              <div>
                <p className="text-shadow-amber-600 lg:text-base">
                  {productVariant.product.description}
                </p>
              </div>
            </div>
          </div>

          <ProductList title="Talvez você goste" products={likelyProducts} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductVariantPage;
