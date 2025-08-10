"use client";

import { useRef, useState } from "react";

import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

export function ProductList({ title, products }: ProductListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (containerRef.current && window.innerWidth < 1024) {
      containerRef.current.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || window.innerWidth >= 1024) return;

    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);

    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    if (!containerRef.current || window.innerWidth >= 1024) return;

    setIsDragging(false);
    containerRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    if (!containerRef.current || window.innerWidth >= 1024) return;

    setIsDragging(false);
    containerRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current || window.innerWidth >= 1024)
      return;

    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="space-y-6">
      <h3 className="px-5 text-lg font-semibold lg:px-8 lg:text-xl">{title}</h3>
      <div
        ref={containerRef}
        className="lg:[&::-webkit-scrollbar]:auto flex w-full cursor-grab gap-4 overflow-x-auto px-5 lg:grid lg:cursor-default lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:px-8 xl:grid-cols-3 2xl:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            textContainerClassName="max-w-full lg:max-w-none"
          />
        ))}
      </div>
    </div>
  );
}
