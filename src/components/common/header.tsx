"use client";

import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { categoryTable } from "@/db/schema";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";

interface HeaderProps {
  categories?: (typeof categoryTable.$inferSelect)[];
}

export const Header = ({ categories = [] }: HeaderProps) => {
  const { data: session } = authClient.useSession();
  const displayCategories = categories.slice(0, 5);

  return (
    <header className="mx-auto max-w-7xl px-5 py-5 lg:px-8 lg:py-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo-boutique.svg"
            alt="BOUTIQUE MODERNA"
            width={150}
            height={40}
            className="lg:h-12 lg:w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="text-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-4 lg:flex">
            {session?.user ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session?.user?.image as string | undefined}
                  />
                  <AvatarFallback className="text-xs">
                    {session?.user?.name?.split(" ")?.[0]?.[0]}
                    {session?.user?.name?.split(" ")?.[1]?.[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {session?.user?.name?.split(" ")?.[0]}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => authClient.signOut()}
                  className="text-sm"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <Button asChild variant="ghost" size="sm">
                <Link href="/login" className="text-sm">
                  Entrar
                </Link>
              </Button>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="px-5">
                {session?.user ? (
                  <>
                    <div className="flex justify-between space-y-6">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={session?.user?.image as string | undefined}
                          />
                          <AvatarFallback>
                            {session?.user?.name?.split(" ")?.[0]?.[0]}
                            {session?.user?.name?.split(" ")?.[1]?.[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold">
                            {session?.user?.name}
                          </h3>
                          <span className="text-muted-foreground block text-xs">
                            {session?.user?.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => authClient.signOut()}
                      >
                        <LogOutIcon />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Olá. Faça seu login!</h2>
                    <Button size="icon" asChild variant="outline">
                      <Link href="/login">
                        <LogInIcon />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Cart />
        </div>
      </div>
    </header>
  );
};
