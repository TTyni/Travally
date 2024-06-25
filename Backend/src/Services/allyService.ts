import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addField = async (obj) => {
    return await prisma.x_world.create(obj)
}

const getByFieldid = async (fieldid: number) => {
    return await prisma.x_world.findUnique({
        where: { fieldid: fieldid },
    });
};

const getAllFields = async () => {
    return await prisma.x_world.findMany();
}

const getPlayerByFieldid = async (fieldid: number) => {
    return await prisma.x_world.findUnique({ where: { fieldid: fieldid } })
}

const getAlliance = async (allianceid: number) => {
    const foundAlliance = await prisma.x_world.findMany({
        where: { allianceid: allianceid },
        select: { playerid: true, playername: true }
    })

    return foundAlliance;
}

const getAllAlliances = async () => {
    const foundAlliance = await prisma.x_world.findMany({
        select: { allianceid: true, alliance: true }
    })

    return foundAlliance;
}

const deleteByid = async (fieldid) => {
    const deletedField = await prisma.x_world.delete({
        where: { fieldid: fieldid }
    })
}


export { getByFieldid, getAllFields, getPlayerByFieldid, getAlliance, getAllAlliances, deleteByid, addField }