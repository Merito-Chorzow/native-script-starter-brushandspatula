import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from "@nativescript/angular";
import { Haptics, HapticNotificationType } from "@nativescript/haptics";
import * as Camera from "@nativescript/camera";
import { ImageSource } from "@nativescript/core";
import { ProductsService } from "./products.service";

@Component({
  standalone: true,
  selector: "add-product",
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <ActionBar title="New item" class="actionBar">
      <ActionItem text="Back" class="add-button" (tap)="goBack()"></ActionItem>
    </ActionBar>

    <ScrollView class="page">
      <StackLayout class="card" [formGroup]="form">
        <TextField formControlName="name" hint="Name" class="input"></TextField>
        <TextField formControlName="code" hint="Code" class="input"></TextField>
        <TextField
          formControlName="status"
          hint="Status"
          class="input"
        ></TextField>
        <TextView
          formControlName="description"
          hint="Description"
          rows="4"
          class="input"
        ></TextView>

        <Button text="Take photo" class="button" (tap)="takePhoto()"></Button>

        <Image
          *ngIf="form.value.photoData"
          [src]="form.value.photoData"
          class="photo"
          stretch="aspectFit"
        ></Image>

        <Button
          text="Save"
          class="button"
          [isEnabled]="form.valid"
          (tap)="save()"
        ></Button>
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
        margin: 20;
        padding: 20;
        background-color: #ffffff;
      }

      .input {
        border-color: #cfe7d7;
        padding: 20;
        background-color: #ffffff;
        margin: 20;
      }

      .button,
      .add-button {
        background-color: #1e7a55;
        color: #ffffff;
        padding: 12;
        margin: 20;
      }

      .photo {
        margin: 20;
        height: 220;
        border-width: 1;
        border-color: #cfe7d7;
        background-color: #ffffff;
      }
    `,
  ],
})
export class AddProductComponent {
  isHapticsSupported: boolean = Haptics.isSupported();

  form = this.formBuilder.group({
    name: ["", [Validators.required]],
    code: ["", [Validators.required]],
    status: [""],
    description: [""],
    photoData: [""],
  });

  constructor(
    private formBuilder: FormBuilder,
    private products: ProductsService,
    private router: Router,
  ) {}

  goBack(): void {
    this.router.navigate(["/products"]);
  }

  async takePhoto(): Promise<void> {
    if (Camera.isAvailable) {
      await Camera.requestPermissions();

      const takePicture = await Camera.takePicture({
        width: 1280,
        height: 1280,
        keepAspectRatio: true,
        saveToGallery: false,
      });

      const source = await ImageSource.fromAsset(takePicture);
      const base64 = source.toBase64String("jpeg", 80);
      this.form.patchValue({ photoData: `data:image/jpeg;base64,${base64}` });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;

    const created = this.products.addProductToList({
      name: String(v.name),
      code: String(v.code),
      status: String(v.status ?? ""),
      description: String(v.description ?? ""),
      photoData: String(v.photoData ?? ""),
    });

    if (this.isHapticsSupported) {
      Haptics.notification(HapticNotificationType.SUCCESS);
    }

    this.router.navigate(["/products", created.id]);
  }
}
