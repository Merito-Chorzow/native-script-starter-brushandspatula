import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ProductsService {
  private nextId = 1;

  private readonly _product$ = new BehaviorSubject<Product[]>([]);
  readonly product$ = this._product$.asObservable();

  constructor(private http: HttpClient) {}


  getProductValues(): Product[] {
    return this._product$.value;
  }

  getProductById(id: number): Product | undefined {
    return this._product$.value.find(x => x.id === id);
  }

  addProductToList(input: Omit<Product, "id">): Product {
    const created: Product = { ...input, id: this.nextId++ };
    this._product$.next([created, ...this._product$.value]);
    return created;
  }

  removeProductFromTheList(id: number): void {
    this._product$.next(this._product$.value.filter(x => x.id !== id));
  }

  getFromDemoApi() {
  return this.http.get<any[]>("https://jsonplaceholder.typicode.com/posts");
}

}
