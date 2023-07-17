
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
  {
    path: 'detailprosp',
    loadComponent: () => import('./pages/prospection/detailprosp/detailprosp.page').then( m => m.DetailprospPage)
  },
  {
    path: 'raccordement',
    loadComponent: () => import('./pages/activation/offres/raccordement/raccordement.page').then( m => m.RaccordementPage)
  },
  {
    path: 'rac-fast-box',
    loadComponent: () => import('./pages/activation/offres/raccordement/rac-fast-box/rac-fast-box.page').then( m => m.RacFastBoxPage)
  },  {
    path: 'fixe-jdid',
    loadComponent: () => import('./pages/activation/offres/fixe-jdid/fixe-jdid.page').then( m => m.FixeJdidPage)
  },
  {
    path: 'reglement',
    loadComponent: () => import('./pages/activation/offres/fixe-jdid/reglement/reglement.page').then( m => m.ReglementPage)
  },
  {
    path: 'popover',
    loadComponent: () => import('./pages/maps/popover/popover.page').then( m => m.PopoverPage)
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./pages/reservations/components/confirmation/confirmation.page').then( m => m.ConfirmationPage)
  },
  {
    path: 'modalmap',
    loadComponent: () => import('./pages/reservations/components/modalmap/modalmap.page').then( m => m.ModalmapPage)
  },
  {
    path: 'placesselect',
    loadComponent: () => import('./pages/reservations/components/placesselect/placesselect.page').then( m => m.PlacesselectPage)
  },
  {
    path: 'flashbox',
    loadComponent: () => import('./pages/activation/offres/flashbox/flashbox.page').then( m => m.FlashboxPage)
  },






];

