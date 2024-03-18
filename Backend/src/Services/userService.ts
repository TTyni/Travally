import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface dataType {
    username?: string,
    playerid?: number,
    password?: string,
}

const selectUserFields = {
    playerid: true,
    password: true,
    username: true,
};

const registerUser = async (username: string, playerid: number, password: string) => {
    const user = await prisma.users.create({
        data: { username: username, password: password, playerid: playerid },
        select: selectUserFields
    })
    return user;
}

// const getUser = async (username: string) => {
//     const foundUser = await prisma.users.findUnique({
//         where: { username: username }
//     })
//     return foundUser;
// }


export { registerUser }