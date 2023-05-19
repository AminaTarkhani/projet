
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './pages/login/guards/auth.guard';

export const routes: Routes = [


  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage),
    canLoad: [AuthGuard]
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'maps',
    loadComponent: () => import('./pages/maps/maps.page').then( m => m.MapsPage)
  },
  {
    path: 'prospection',
    loadComponent: () => import('./pages/prospection/prospection.page').then( m => m.ProspectionPage)
  },
  {
    path: 'activation',
    loadComponent: () => import('./pages/activation/activation.page').then( m => m.ActivationPage)
  },
  {
    path: 'reservation',
    loadComponent: () => import('./pages/reservation/reservation.page').then( m => m.ReservationPage)
  },
  {
    path: 'sla',
    loadComponent: () => import('./pages/sla/sla.page').then( m => m.SlaPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'validation',
    loadComponent: () => import('./pages/prospection/validation/validation.page').then( m => m.ValidationPage)
  },  {
    path: 'formulaire',
    loadComponent: () => import('./pages/prospection/formulaire/formulaire.page').then( m => m.FormulairePage)
  },
  {
    path: 'activer',
    loadComponent: () => import('./pages/activation/activer/activer.page').then( m => m.ActiverPage)
  },
  {
    path: 'interfaceactivation',
    loadComponent: () => import('./pages/activation/interfaceactivation/interfaceactivation.page').then( m => m.InterfaceactivationPage)
  },
  {
    path: 'offres',
    loadComponent: () => import('./pages/activation/offres/offres.page').then( m => m.OffresPage)
  },
  {
    path: 'super-box',
    loadComponent: () => import('./pages/activation/offres/super-box/super-box.page').then( m => m.SuperBoxPage)
  },
  {
    path: 'fast-box',

    loadComponent: () => import('./pages/activation/offres/fast-box/fast-box.page').then( m => m.FastBoxPage)

  },




];

