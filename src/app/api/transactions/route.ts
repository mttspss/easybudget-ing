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

    const { type, amount, categoryId, category, emoji, date, title, note, imageUrl } = await req.json();

    if (!type || !amount) {
      return NextResponse.json(
        { error: "Type and amount are required" },
        { status: 400 }
      );
    }

    // If we have a category name but no categoryId, find or create the category
    let finalCategoryId = categoryId;
    if (category && !categoryId) {
      // Try to find an existing category with the same name
      const existingCategory = await prisma.category.findFirst({
        where: {
          userId: user.id,
          name: category,
        },
      });

      if (existingCategory) {
        finalCategoryId = existingCategory.id;
      } else {
        // Create a new category
        const newCategory = await prisma.category.create({
          data: {
            userId: user.id,
            name: category,
            emoji: emoji || "💸", // Use provided emoji or default
          },
        });
        finalCategoryId = newCategory.id;
      }
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        type: type as TransactionType,
        amount: Number(amount),
        title: title || note || "Untitled", // Use title, or note as fallback, or default
        categoryId: finalCategoryId || undefined,
        date: date ? new Date(date) : new Date(),
        note,
        imageUrl,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Transaction creation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
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

    const url = new URL(req.url);
    const fromParam = url.searchParams.get("from");
    const toParam = url.searchParams.get("to");

    let fromDate: Date;
    let toDate: Date = new Date();

    if (fromParam && toParam) {
      fromDate = new Date(fromParam);
      toDate = new Date(toParam);
    } else {
      // Default: last 30 days
      fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 30);
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: fromDate,
          lte: toDate,
        },
      },
      include: {
        category: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
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

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    // Check if transaction exists and belongs to user
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    if (transaction.userId !== user.id) {
      return NextResponse.json(
        { error: "You are not authorized to delete this transaction" },
        { status: 403 }
      );
    }

    // Delete the transaction
    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
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

    const { id, type, amount, categoryId, category, emoji, date, title, note, imageUrl } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    // Check if transaction exists and belongs to user
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    if (transaction.userId !== user.id) {
      return NextResponse.json(
        { error: "You are not authorized to edit this transaction" },
        { status: 403 }
      );
    }

    // If we have a category name but no categoryId, find or create the category
    let finalCategoryId = categoryId;
    if (category && !categoryId) {
      // Try to find an existing category with the same name
      const existingCategory = await prisma.category.findFirst({
        where: {
          userId: user.id,
          name: category,
        },
      });

      if (existingCategory) {
        finalCategoryId = existingCategory.id;
      } else {
        // Create a new category
        const newCategory = await prisma.category.create({
          data: {
            userId: user.id,
            name: category,
            emoji: emoji || "💸", // Use provided emoji or default
          },
        });
        finalCategoryId = newCategory.id;
      }
    }

    // Update the transaction
    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        type: type as TransactionType,
        amount: amount !== undefined ? Number(amount) : undefined,
        title: title || undefined,
        categoryId: finalCategoryId || undefined,
        date: date ? new Date(date) : undefined,
        note: note !== undefined ? note : undefined,
        imageUrl: imageUrl !== undefined ? imageUrl : undefined,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error) {
    console.error("Transaction update error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
} 