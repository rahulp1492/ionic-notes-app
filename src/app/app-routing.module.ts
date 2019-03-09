import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home/home.page';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: 'add_note', component: EditorComponent, pathMatch: 'full' },
  { path: 'edit_note/:slug', component: EditorComponent, pathMatch: 'full' }
    // { path: 'test', loadChildren: './home/home.module#HomePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
