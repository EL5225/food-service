-- CreateTable
CREATE TABLE "Resep" (
    "id" SERIAL NOT NULL,
    "name" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    "culture" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "alternatifIngredient" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Resep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResepImage" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "resepId" INTEGER NOT NULL,

    CONSTRAINT "ResepImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResepImage" ADD CONSTRAINT "ResepImage_resepId_fkey" FOREIGN KEY ("resepId") REFERENCES "Resep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
