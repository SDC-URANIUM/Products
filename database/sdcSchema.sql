CREATE TABLE "Products"(
    "product_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slogan" VARCHAR(255) NOT NULL,
    "description" VARCHAR(511) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "default_price" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Products" ADD PRIMARY KEY("product_id");
CREATE TABLE "Styles"(
    "style_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sale_price" VARCHAR(255) NOT NULL,
    "original_price" VARCHAR(255) NULL,
    "default?" BOOLEAN NOT NULL
);
ALTER TABLE
    "Styles" ADD PRIMARY KEY("style_id");
CREATE TABLE "Photos"(
    "_id" INTEGER NOT NULL,
    "style_id" INTEGER NOT NULL,
    "thumbnail_url" VARCHAR(255) NOT NULL,
    "url" VARCHAR NOT NULL
);
ALTER TABLE
    "Photos" ADD PRIMARY KEY("_id");
CREATE TABLE "SKUs"(
    "id" INTEGER NOT NULL,
    "style_id" INTEGER NOT NULL,
    "size" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL
);
ALTER TABLE
    "SKUs" ADD PRIMARY KEY("id");
CREATE TABLE "Features"(
    "_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "feature" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Features" ADD PRIMARY KEY("_id");
CREATE TABLE "Related"(
    "_id" INTEGER NOT NULL,
    "current_product_id" INTEGER NOT NULL,
    "related_product_id" INTEGER NOT NULL
);
ALTER TABLE
    "Related" ADD PRIMARY KEY("_id");
ALTER TABLE
    "Styles" ADD CONSTRAINT "styles_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "Products"("product_id");
ALTER TABLE
    "Related" ADD CONSTRAINT "related_current_product_id_foreign" FOREIGN KEY("current_product_id") REFERENCES "Products"("product_id");
ALTER TABLE
    "Features" ADD CONSTRAINT "features_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "Products"("product_id");
ALTER TABLE
    "Photos" ADD CONSTRAINT "photos_style_id_foreign" FOREIGN KEY("style_id") REFERENCES "Styles"("style_id");
ALTER TABLE
    "SKUs" ADD CONSTRAINT "skus_style_id_foreign" FOREIGN KEY("style_id") REFERENCES "Styles"("style_id");