-- CreateTable
CREATE TABLE "x_world" (
    "fieldid" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "tribeid" INTEGER NOT NULL,
    "villageid" INTEGER NOT NULL,
    "villagename" TEXT NOT NULL,
    "playerid" INTEGER NOT NULL,
    "playername" TEXT NOT NULL,
    "allianceid" INTEGER NOT NULL,
    "alliancetag" TEXT NOT NULL,
    "population" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "capital" BOOLEAN NOT NULL,
    "city" BOOLEAN NOT NULL,
    "harbor" BOOLEAN NOT NULL,
    "victorypoints" INTEGER NOT NULL,

    CONSTRAINT "x_world_pkey" PRIMARY KEY ("fieldid")
);

-- CreateTable
CREATE TABLE "users" (
    "username" TEXT NOT NULL,
    "playerid" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("playerid")
);

-- CreateTable
CREATE TABLE "incomings" (
    "fielddata" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "arrivaltime" TIMESTAMP(3) NOT NULL,
    "allianceid" INTEGER NOT NULL,

    CONSTRAINT "incomings_pkey" PRIMARY KEY ("fielddata")
);
