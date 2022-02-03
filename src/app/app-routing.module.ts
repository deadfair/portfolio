import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmobaGameComponent } from './amoba-game/components/amoba-game/amoba-game.component';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { SnakeGameComponent } from './snake-game/components/snake-game/snake-game.component';

const routes: Routes = [
  {
    path:"",
    // component:LandingPageComponent,
    redirectTo:"/portfolio",
    pathMatch:"full"
  },
  {
    path:"portfolio",
    component:LandingPageComponent,
  },
  {
    path:"snake",
    component:SnakeGameComponent
  },
  {
    path:"amoba",
    component:AmobaGameComponent
  },
  {
    path:"**",
    component:LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
