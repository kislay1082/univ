import prisma from "@/lib/prismadb";

const getAdById = async (id) => {
  try {
    const ads = await prisma.bookAd.findUnique({
      where: {
        id
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
    return null;
  }
};

export default getAdById;
