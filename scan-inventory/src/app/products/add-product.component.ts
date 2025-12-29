import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from "@nativescript/angular";
import {Haptics, HapticNotificationType, HapticImpactType} from "@nativescript/haptics";
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

      .error {
        color: #d83a3a;
        margin-top: 4;
      }

      .button, .add-button  {
        background-color: #1e7a55;
        color: #ffffff;
        padding: 12;
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
  });

  constructor(
    private formBuilder: FormBuilder,
    private products: ProductsService,
    private router: Router,
  ) {}

  goBack(): void {
    this.router.navigate(["/products"]);
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
    });

    if(this.isHapticsSupported){
    Haptics.impact(HapticImpactType.HEAVY);
    Haptics.notification(HapticNotificationType.SUCCESS);
    }

    this.router.navigate(["/products", created.id]);
  }
}
