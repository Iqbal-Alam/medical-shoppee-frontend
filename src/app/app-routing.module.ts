import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddProduct } from './components/product/addProduct/addProduct.component';
import { AppProduct } from './components/product/product.component';
import { SellProduct } from './components/product/sellProduct/sellProduct.component';
import { PurchaseProduct } from './components/product/purchaseProduct/purchaseProduct.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: 'medicine', component: AppProduct },
            { path: 'addMedicine', component: AddProduct },
            { path: 'sellMedicine', component: SellProduct },
            { path: 'purchaseMedicine', component: PurchaseProduct },
            { path: '', redirectTo: 'medicine', pathMatch: 'full' }  // Default route in main layout
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }  // Redirect to login by default
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
