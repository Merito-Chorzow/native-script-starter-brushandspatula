import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@Component({
  standalone: true,
  selector: "products-list",
  imports: [NativeScriptCommonModule],
  template: `
    <ActionBar title="Inventory" class="actionBar">
      <ActionItem text="Add" class="add-button" (tap)="goAdd()"></ActionItem>
      <ActionItem text="API demo" class="add-button" (tap)="goApi()">
      </ActionItem>
    </ActionBar>

    <GridLayout rows="auto, *" class="page">
      <StackLayout row="0" class="header">
        <Label text="Product list" class="title"></Label>
      </StackLayout>

      <ng-container *ngIf="items$ | async as items">
        <StackLayout
          *ngIf="items.length === 0; else list"
          row="1"
          class="empty"
        >
          <Label text="No items yet" class="emptyTitle"></Label>
          <Button text="Add first item" class="button" (tap)="goAdd()"></Button>
        </StackLayout>

        <ng-template #list>
          <ListView row="1" [items]="items" (itemTap)="onItemTap($event)">
            <ng-template let-item="item">
              <GridLayout columns="*, auto" class="card">
                <StackLayout>
                  <Label [text]="item.name" class="cardTitle"></Label>
                  <Label [text]="item.code" class="cardInfo"></Label>
                </StackLayout>
                <Label [text]="item.status" class="label"></Label>
              </GridLayout>
            </ng-template>
          </ListView>
        </ng-template>
      </ng-container>
    </GridLayout>
  `,
  styles: [
    `
      .actionBar {
        background-color: #0f3d2e;
        color: #ffffff;
      }
      .page {
        background-color: #eaf6ef;
        padding: 16;
      }
      .header {
        margin-bottom: 12;
      }
      .title {
        font-size: 22;
        color: #0b2a20;
        margin-bottom: 14;
      }

      .subtitle {
        margin-top: 4;
        color: #0b2a20;
        margin-bottom: 14;
      }

      .card {
        padding: 14;
        margin-bottom: 10;
        margin-bottom: 14;
      }

      .empty {
        padding: 18;
        background-color: #ffffff;
        border-width: 1;
        border-color: #cfe7d7;
        margin-bottom: 14;
      }
      .emptyTitle,
      .cardTitle {
        font-size: 18;
        color: #0b2a20;
        margin-bottom: 14;
      }
      .emptySubtitle,
      .cardInfo {
        margin-top: 6;
        color: #0b2a20;
        margin-bottom: 14;
      }

      .button,
      .add-button {
        background-color: #1e7a55;
        color: #ffffff;
        padding: 12;
      }
    `,
  ],
})
export class ProductsListComponent {
  items$: Observable<Product[]> = this.products.product$;

  constructor(
    private products: ProductsService,
    private router: Router,
  ) {}

  goAdd(): void {
    this.router.navigate(["/add"]);
  }

  goApi(): void {
    this.router.navigate(["/api"]);
  }

  onItemTap(args: any): void {
    const item = this.products.getProductValues()[args.index] as
      | Product
      | undefined;
    if (!item) return;
    this.router.navigate(["/products", item.id]);
  }
}
