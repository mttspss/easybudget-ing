import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { TransactionType } from "@/generated/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get array of transactions to import
    const transactions = await req.json();
    
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return NextResponse.json(
        { error: "No valid transactions provided" },
        { status: 400 }
      );
    }

    // Track categories we've already looked up or created
    const categoryCache: Record<string, string> = {};

    // Process each transaction
    const createdTransactions = await Promise.all(
      transactions.map(async (tx) => {
        const { date, description, amount, type, category } = tx;
        
        if (!type || !amount || !description || !date) {
          throw new Error("All transactions must have type, amount, description, and date");
        }

        // Handle category (use cache to avoid duplicate lookups/creations)
        let categoryId: string | undefined = undefined;
        
        if (category) {
          // Check if we've already processed this category
          if (categoryCache[category]) {
            categoryId = categoryCache[category];
          } else {
            // Try to find existing category first
            const existingCategory = await prisma.category.findFirst({
              where: {
                userId: user.id,
                name: category,
              },
            });

            if (existingCategory) {
              categoryId = existingCategory.id;
              // Cache for future transactions
              categoryCache[category] = categoryId;
            } else {
              // Create a new category
              const newCategory = await prisma.category.create({
                data: {
                  userId: user.id,
                  name: category,
                  emoji: "💸", // Default emoji
                },
              });
              categoryId = newCategory.id;
              // Cache for future transactions
              categoryCache[category] = categoryId;
            }
          }
        }

        // Create the transaction
        return prisma.transaction.create({
          data: {
            userId: user.id,
            type: type as TransactionType,
            amount: Number(amount),
            title: description,
            categoryId: categoryId,
            date: new Date(date),
            note: tx.note || null,
            imageUrl: tx.imageUrl || null,
          },
        });
      })
    );

    return NextResponse.json({
      message: `Successfully imported ${createdTransactions.length} transactions`,
      count: createdTransactions.length
    }, { status: 201 });
  } catch (error) {
    console.error("Bulk transaction import error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
} 