import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import Orders from "./components/orders";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    return redirect("/");
  }

  const [orders, categories] = await Promise.all([
    db.query.orderTable.findMany({
      where: eq(orderTable.userId, session?.user.id),
      with: {
        items: {
          with: {
            productVariant: {
              with: {
                product: true,
              },
            },
          },
        },
      },
    }),
    db.query.categoryTable.findMany({}),
  ]);

  return (
    <>
      <Header categories={categories} />
      <main className="mx-auto max-w-7xl px-5 py-6 lg:px-8 lg:py-8">
        <div className="space-y-6">
          <h1 className="text-xl font-semibold lg:text-2xl">Meus Pedidos</h1>
          <Orders
            orders={orders.map((order) => ({
              id: order.id,
              totalPriceInCents: order.totalPriceInCents,
              status: order.status,
              createdAt: order.createdAt,
              items: order.items.map((item) => ({
                imageUrl: item.productVariant.imageUrl,
                productName: item.productVariant.product.name,
                productVariantName: item.productVariant.name,
                priceInCents: item.productVariant.priceInCents,
                quantity: item.quantity,
              })),
            }))}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
