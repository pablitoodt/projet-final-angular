import { Routes } from "@angular/router";

export const authRoutes: Routes = [
  {
    path: "login",
    loadComponent: () => import("@/components/auth/login/login.component").then(m => m.LoginComponent)
  }
];