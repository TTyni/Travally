import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const selectUserFields = {
    playerid: true,
    password: true,
    username: true,
};
const registerUser = async (username, playerid, password) => {
    const user = await prisma.users.create({
        data: { username: username, password: password, playerid: playerid },
        select: selectUserFields
    });
    return user;
};
const getUser = async (username) => {
    const foundUser = await prisma.users.findUnique({
        where: { username: username }
    });
    return foundUser;
};
export { registerUser, getUser };
