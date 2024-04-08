import prisma from "@/lib/prismadb";

const getPurchases = async (userId) => {
  try {
    const purchases = await prisma.order.findMany({
      where: {
        BuyerId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        BookAd: {
          select: {
            id: true,
            title: true,
            description: true,
            image: true,
            createdAt: true,
            Seller: {
              select: {
                id: true,
                name: true,
                image: true,
                email: true,
                rating: true,
                ratingCount: true,
              },
            },
          },
        },
      },
    });

    if (!purchases) {
      return null;
    }

    return purchases;
  } catch (error) {
    return null;
  }
};

export default getPurchases;
