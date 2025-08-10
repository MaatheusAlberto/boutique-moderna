import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { ProductList } from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header categories={categories} />
      <main className="mx-auto max-w-7xl">
        <div className="space-y-6 lg:space-y-12">
          <div className="px-5 lg:px-8">
            <Image
              src="/banner-01.png"
              alt="banner"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full rounded-lg lg:rounded-2xl"
            />
          </div>

          <ProductList products={products} title="Produtos em destaque" />

          <div className="px-5 lg:px-8">
            <CategorySelector categories={categories} />
          </div>

          <div className="px-5 lg:px-8">
            <Image
              src="/banner-02.png"
              alt="banner"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full rounded-lg lg:rounded-2xl"
            />
          </div>

          <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        </div>
      </main>
      <Footer />
    </>
  );
}
