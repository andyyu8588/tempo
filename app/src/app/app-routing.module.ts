import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisComponent } from './components/analysis/analysis.component'
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WorkoutComponent } from './components/workout/workout.component';

const routes: Routes = [
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'analysis', component : AnalysisComponent},
  {path: 'settings', component : SettingsComponent},
  {path: 'workout', component : WorkoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
