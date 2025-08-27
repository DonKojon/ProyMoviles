import { Routes } from '@angular/router';
import { LandpageComponent } from './component/landpage/landpage.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { RolesComponent } from './component/roles/roles.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { ProductosComponent } from './component/productos/productos.component';
import { ProveedoresComponent } from './component/proveedores/proveedores.component';
import { PedidosComponent } from './component/pedidos/pedidos.component';
import { ReportesComponent } from './component/reportes/reportes.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'proveedores', component: ProveedoresComponent },
    { path: 'pedidos', component: PedidosComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'roles', component: RolesComponent },
    { path: 'landpage', component: LandpageComponent },
];
