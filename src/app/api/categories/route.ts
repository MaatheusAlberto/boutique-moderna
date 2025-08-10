import { db } from "@/db";

export async function GET() {
  try {
    const categories = await db.query.categoryTable.findMany({});
    return Response.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return Response.json([], { status: 500 });
  }
}
