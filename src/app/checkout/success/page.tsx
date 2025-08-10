"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { categoryTable } from "@/db/schema";

const CheckoutSuccessPage = () => {
  const [categories, setCategories] = useState<
    (typeof categoryTable.$inferSelect)[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Header categories={categories} />
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="max-w-md text-center lg:max-w-lg">
          <Image
            src="/illustration.svg"
            alt="Success"
            width={300}
            height={300}
            className="mx-auto h-48 w-48 lg:h-72 lg:w-72"
          />
          <DialogTitle className="mt-4 text-xl lg:text-2xl">
            Pedido efetuado!
          </DialogTitle>
          <DialogDescription className="text-sm font-medium lg:text-base">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de &quot;Meus Pedidos&quot;.
          </DialogDescription>

          <DialogFooter className="flex flex-col gap-3 lg:flex-row lg:justify-center">
            <Button className="w-full rounded-full lg:w-auto" size="lg" asChild>
              <Link href="/my-orders">Ver meus pedidos</Link>
            </Button>
            <Button
              className="w-full rounded-full lg:w-auto"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutSuccessPage;
