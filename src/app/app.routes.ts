import { Routes } from '@angular/router';
import { LandingPageComponent } from '@/components/landing-page/landing-page.component';
import { AuthGuard } from './guards/auth/auth.guard';


const appTitle = "Projet final Angular";

export const routes: Routes = [
  {
    path: "",
    title: `Accueil - ${appTitle}`,
    pathMatch: "full",
    loadComponent: () => import("@/components/landing-page/landing-page.component").then(m => m.LandingPageComponent)
  },
  {
    path: "rick-morty",
    title: `Page sur Rick et Morty - ${appTitle}`,
    canActivate: [AuthGuard],
    loadComponent: () => import("@/components/rick-morty/rick-morty.component").then(m => m.RickMortyComponent)
  },
  {
    path: "auth",
    loadChildren: () => import("./routes/auth.routes").then(m => m.authRoutes)
  },
  {
    path:"erreur/404",
    title: `Erreur 404 - ${appTitle}`,
    loadComponent: () => import("@/components/error/error.component").then(m => m.ErrorComponent)
  },
  {
    path:"**",
    redirectTo: "erreur/404"
  }
];
