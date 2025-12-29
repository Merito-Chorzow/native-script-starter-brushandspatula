import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { Observable, of } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { ProductsService } from "../products/products.service";

@Component({
  standalone: true,
  selector: "api-demo",
  imports: [NativeScriptCommonModule],
  template: `
    <ActionBar title="API demo" class="actionBar">
      <ActionItem text="Back" (tap)="goBack()"></ActionItem>
    </ActionBar>

    <StackLayout class="page">
      <Button
        text="Get data from Mock API"
        class="button"
        (tap)="getData()"
      ></Button>

      <Label *ngIf="error" text="API error" class="error"></Label>

      <ListView *ngIf="posts$ | async as posts" [items]="posts">
        <ng-template let-item="item">
          <StackLayout class="card">
            <Label [text]="item.title" class="title"></Label>
            <Label [text]="item.body" class="body"></Label>
          </StackLayout>
        </ng-template>
      </ListView>
    </StackLayout>
  `,
  styles: [
    `
      .page {
        padding: 20;
        background-color: #eaf6ef;
      }

      .button {
        background-color: #1e7a55;
        color: #ffffff;
        padding: 12;
        margin-bottom: 20;
      }

      .error {
        color: #d83a3a;
        margin-top: 10;
      }

      .card {
        padding: 14;
        margin-bottom: 12;
        background-color: #ffffff;
        border-width: 1;
        border-color: #cfe7d7;
      }

      .title {
        font-size: 16;
        font-weight: bold;
        color: #0b2a20;
      }

      .body {
        margin-top: 6;
        color: #0b2a20;
      }
    `,
  ],
})
export class ApiDemoComponent {
  error = false;
  posts$: Observable<any[]> = of([]);

  constructor(
    private products: ProductsService,
    private router: Router,
  ) {}

  goBack(): void {
    this.router.navigate(["/products"]);
  }

  getData(): void {
    this.error = false;
    this.posts$ = this.products.getFromDemoApi().pipe(
      tap(() => {}),
      catchError(() => {
        this.error = true;
        return of([]);
      }),
    );
  }
}
