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
    if (containerRef.current) {
      containerRef.current.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);

    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;

    setIsDragging(false);
    containerRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    if (!containerRef.current) return;

    setIsDragging(false);
    containerRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">{title}</h3>
      <div
        ref={containerRef}
        className="flex w-full cursor-grab gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden"
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
            textContainerClassName="max-w-full "
          />
        ))}
      </div>
    </div>
  );
}
