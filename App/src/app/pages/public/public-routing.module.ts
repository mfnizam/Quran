import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPage } from './public.page';

const routes: Routes = [
  {
    path: '',
    component: PublicPage,
    children: [
      {
        path: 'beranda',
        loadChildren: () => import('./beranda/beranda.module').then(m => m.BerandaPageModule)
      },
      {
        path: 'quran',
        loadChildren: () => import('./quran/quran.module').then( m => m.QuranPageModule)
      },
      {
        path: 'voice',
        loadChildren: () => import('./voice/voice.module').then( m => m.VoicePageModule)
      },
      {
        path: 'murottal',
        loadChildren: () => import('./murottal/murottal.module').then(m => m.MurottalPageModule)
      },
      {
        path: 'akun',
        loadChildren: () => import('./akun/akun.module').then(m => m.AkunPageModule)
      },
      {
        path: '',
        redirectTo: 'beranda',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'kalender',
    loadChildren: () => import('./kalender/kalender.module').then( m => m.KalenderPageModule)
  },
  {
    path: 'kiblat',
    loadChildren: () => import('./kiblat/kiblat.module').then( m => m.KiblatPageModule)
  },
  {
    path: 'tahsin',
    loadChildren: () => import('./tahsin/tahsin.module').then( m => m.TahsinPageModule)
  },
  {
    path: 'tahsin/detail',
    loadChildren: () => import('./tahsin/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'akun/edit',
    loadChildren: () => import('./akun/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'quran/detail',
    loadChildren: () => import('./quran/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'murottal/playlist',
    loadChildren: () => import('./murottal/playlist/playlist.module').then( m => m.PlaylistPageModule)
  },
  {
    path: 'murottal/qori',
    loadChildren: () => import('./murottal/qori/qori.module').then( m => m.QoriPageModule)
  },
  {
    path: 'murottal/detail',
    loadChildren: () => import('./murottal/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'murottal/surat',
    loadChildren: () => import('./murottal/surat/surat.module').then( m => m.SuratPageModule)
  },
  {
    path: '',
    redirectTo: 'beranda',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'beranda',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicPageRoutingModule {}
