-- Tabela para armazenar os usuários:
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL UNIQUE,
    "password" VARCHAR NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMP WITH TIME ZONE
);

-- Tabela para armazenar as URLs encurtadas:
CREATE TABLE "urls" (
    "id" SERIAL PRIMARY KEY,
    "original_url" VARCHAR NOT NULL,
    "short_code" VARCHAR(6) NOT NULL UNIQUE,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "user_id" INTEGER,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMP WITH TIME ZONE,
    CONSTRAINT "FK_urls_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL
);