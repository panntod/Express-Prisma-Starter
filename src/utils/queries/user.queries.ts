import { Prisma, User } from "@prisma/client";

import prisma from "@/lib/prisma";

export const findAllUser = (
  where?: Prisma.UserWhereInput
): Promise<Array<User>> => {
  return prisma.user.findMany({ where });
};

export const findUser = (
  where: Prisma.UserWhereInput
): Promise<User | null> => {
  return prisma.user.findFirst({ where });
};

export const updateUserById = (
  user_id: number,
  data: Prisma.UserUpdateInput
): Promise<User> => {
  return prisma.user.update({ where: { id: user_id }, data });
};

export const deleteUserById = (user_id: number): Promise<User> => {
  return prisma.user.delete({ where: { id: user_id } });
};

export const createUser = (data: Prisma.UserCreateInput): Promise<User> => {
  return prisma.user.create({ data });
};
