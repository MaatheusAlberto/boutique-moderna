import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductItem from "@/components/common/product-item";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  const [category, categories] = await Promise.all([
    db.query.categoryTable.findFirst({
      where: eq(categoryTable.slug, slug),
    }),
    db.query.categoryTable.findMany({}),
  ]);

  if (!category) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header categories={categories} />
      <main className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="space-y-6 lg:space-y-8">
          <h2 className="text-xl font-semibold lg:text-2xl">{category.name}</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;
