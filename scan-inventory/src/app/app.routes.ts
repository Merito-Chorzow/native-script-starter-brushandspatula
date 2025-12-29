import { Routes } from "@angular/router";
import { ProductsListComponent } from "./products/products-list.component";
import { AddProductComponent } from "./products/add-product.component";
import { ProductDetailsComponent } from "./products/product-details.component";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "products" },
  { path: "products", component: ProductsListComponent },
  { path: "add", component: AddProductComponent },
  { path: "products/:id", component: ProductDetailsComponent },
];
