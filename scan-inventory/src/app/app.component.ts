import { Component } from "@angular/core";
import { NativeScriptRouterModule } from "@nativescript/angular";

@Component({
  standalone: true,
  selector: "app",
  imports: [NativeScriptRouterModule],
  template: `<page-router-outlet></page-router-outlet>`,
})
export class AppComponent {}
