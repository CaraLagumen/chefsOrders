import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AuthService, AuthResponseData } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnDestroy {
  isLoginMode = false;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private dataStorageService: DataStorageService
  ) {}

  onSignup() {
    this.isLoginMode = false;
  }

  onLogin() {
    this.isLoginMode = true;
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);

    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.dataStorageService.fetchRecipes().subscribe();
        this.dataStorageService.fetchShoppingList().subscribe();
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCompFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
