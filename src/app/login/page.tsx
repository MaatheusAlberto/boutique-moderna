import { Header } from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db";

import { SignInForm } from "./components/sign-in-form";
import { SignUpForm } from "./components/sign-up-form";

export default async function LoginPage() {
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header categories={categories} />
      <main className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-8">
          <div className="w-full max-w-sm lg:max-w-md">
            <Tabs defaultValue="sign-in">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sign-in">Entrar</TabsTrigger>
                <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
              </TabsList>
              <TabsContent value="sign-in" className="w-full">
                <SignInForm />
              </TabsContent>
              <TabsContent value="sign-up" className="w-full">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
}
