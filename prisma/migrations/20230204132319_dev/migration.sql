-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER'
);

-- CreateTable
CREATE TABLE "founded" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "local" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" BLOB NOT NULL,
    "category" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "founded_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
