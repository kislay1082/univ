import prisma from "@/lib/prismadb";

const getSearchAds = async ({ query }) => {
  try {
    const ads = await prisma.bookAd.findMany({
      where: {
        sold: false,
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Seller: {
          select: {
            id: true,
            name: true,
            image: true,
            rating: true,
            ratingCount: true,
          },
        },
      },
    });

    if (!ads) {
      return null;
    }

    return ads;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getSearchAds;
