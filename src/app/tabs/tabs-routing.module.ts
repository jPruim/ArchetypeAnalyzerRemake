import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'quiz',
        loadChildren: () => import('../pages/question/question.module').then(m => m.QuestionPageModule)
      },
      {
        path: 'results',
        loadChildren: () => import('../pages/results/results.module').then(m => m.ResultsPageModule)
      },
      {
        path: 'contribute',
        loadChildren: () => import('../pages/contribute/contribute.module').then(m => m.ContributePageModule)
      },
      {
        path: 'help',
        loadChildren: () => import('../pages/help/help.module').then(m => m.HelpPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/quiz',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/quiz',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
