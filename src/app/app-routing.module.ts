import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule), canActivate: [AuthService]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule), canActivate: [AuthService]
  },
  {
    path: 'ranking',
    loadChildren: () => import('./pages/ranking/ranking.module').then( m => m.RankingPageModule)
  },
  {
    path: 'mis-retos',
    loadChildren: () => import('./pages/mis-retos/mis-retos.module').then( m => m.MisRetosPageModule), canActivate: [AuthService]
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then( m => m.FavoritosPageModule), canActivate: [AuthService]
  },
  {
    path: 'news-page',
    loadChildren: () => import('./pages/news-page/news-page.module').then( m => m.NewsPagePageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
