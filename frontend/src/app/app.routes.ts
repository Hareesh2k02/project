import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { SuspendComponent } from './user/suspend/suspend.component';

export const routes: Routes = [
    {path:"",component:UserComponent},
    {path:"register",component:RegisterComponent},
    {path:"login",component:LoginComponent},
    {path:"admin",component:AdminComponent},
    {path:"admin-panel",component:AdminPanelComponent},
    {path:"suspend",component:SuspendComponent},
    {path:"**",component:LoginComponent}
];
