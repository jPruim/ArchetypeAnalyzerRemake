import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'quiz',
        loadChildren: () => import('../pages/question/question.module').then(m => m.QuestionPageModule)
      },
      {
        path: 'report',
        loadChildren: () => import('../pages/report/report.module').then(m => m.ReportPageModule)
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
        redirectTo: '/app/quiz',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/quiz',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
