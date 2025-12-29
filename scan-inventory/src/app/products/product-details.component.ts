import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { ProductsService } from "./products.service";
import { Product } from "./product.model";
import {
  Haptics,
  HapticNotificationType,
  HapticImpactType,
} from "@nativescript/haptics";

@Component({
  standalone: true,
  selector: "product-details",
  imports: [NativeScriptCommonModule],
  template: `
    <ActionBar title="Details" class="actionBar"> </ActionBar>

    <ScrollView class="page">
      <StackLayout *ngIf="product; else notFound" class="card">
        <Label [text]="product.name" class="title"></Label>
        <Label [text]="product.code" class="label"></Label>
        <Label [text]="product.status" class="label"></Label>
        <Label text="Description" class="label"></Label>
        <Label [text]="product.description || '(none)'" class="label"></Label>
        <Button text="Delete" class="button" (tap)="delete()"> </Button>
        <Button text="Back to list" class="button" (tap)="goBack()"> </Button>
        <Image
          *ngIf="product?.photoData"
          [src]="product.photoData"
          class="photo"
          stretch="aspectFit"
        ></Image>
      </StackLayout>
    </ScrollView>
  `,
  styles: [
    `
      .actionBar {
        background-color: #0f3d2e;
        color: #ffffff;
      }

      .page {
        background-color: #eaf6ef;
      }

      .card {
        margin: 16;
        padding: 16;
        background-color: #ffffff;
        border-width: 1;
        border-color: #cfe7d7;
      }

      .title {
        font-size: 22
        color: #0b2a20;
      }

      .label {
        margin-bottom: 10;
        color: #0b2a20;
      }

      .button, .add-button {
        background-color: #1e7a55;
        color: #ffffff;
        padding: 12;
        margin: 20;
      }
    `,
  ],
})
export class ProductDetailsComponent {
  isHapticsSupported: boolean = Haptics.isSupported();

  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private products: ProductsService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (!Number.isNaN(id)) {
      this.product = this.products.getProductById(id);
    }
  }

  goBack(): void {
    this.router.navigate(["/products"]);
  }

  delete(): void {
    if (!this.product) return;
    this.products.removeProductFromTheList(this.product.id);
    if (this.isHapticsSupported) {
      Haptics.impact(HapticImpactType.HEAVY);
      Haptics.notification(HapticNotificationType.WARNING);
    }
    this.goBack();
  }
}
