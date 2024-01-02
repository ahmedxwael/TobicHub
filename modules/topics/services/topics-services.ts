import prisma from "@/prisma";

type GetTopicComments = {
  topicId: string;
  isApproved: boolean;
};

export async function getTopicComments({
  topicId,
  isApproved,
}: GetTopicComments) {
  const where = isApproved ? { topicId, isApproved: true } : { topicId };

  try {
    const comments = await prisma.comment.findMany({
      where,
      include: {
        user: true,
      },
    });

    return comments as any;
  } catch (error) {
    return undefined;
  }
}
