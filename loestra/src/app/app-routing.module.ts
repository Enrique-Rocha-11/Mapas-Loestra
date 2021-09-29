import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: '', 
    pathMatch: 'full'
  },
  {
    path: 'ruta/:id',
    loadChildren: () => import('./pages/ruta/ruta.module').then( m => m.RutaPageModule)
  },
  {
    path: 'mapa/:usuarios',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'marcadores',
    loadChildren: () => import('./pages/marcadores/marcadores.module').then( m => m.MarcadoresPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
