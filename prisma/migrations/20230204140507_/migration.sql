/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_founded" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "local" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "category" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "founded_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_founded" ("category", "description", "id", "image", "local", "userId") SELECT "category", "description", "id", "image", "local", "userId" FROM "founded";
DROP TABLE "founded";
ALTER TABLE "new_founded" RENAME TO "founded";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
