import { prisma } from "../utils/prisma";

export async function assertAdmin(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId as string, 10) },
    select: { role: true },
  });

  if (!user || user.role !== "admin") {
    throw new Error(
      "Unauthorized: Bạn không có quyền thực hiện hành động này.",
    );
  }

  return user;
}
