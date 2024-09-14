import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; 
import { SpinnerInterceptor } from './services/spinner.interceptor';
import { AppSpinner } from './components/spinner/appSpinner.component';
import { AppProduct } from './components/product/product.component';
import { AddProduct } from './components/product/addProduct/addProduct.component';
import { EditProduct } from './components/product/editProduct/editProduct.component';
import { DeleteProduct } from './components/product/deleteProduct/deleteProduct.component';
import { SellProduct } from './components/product/sellProduct/sellProduct.component';
import { PurchaseProduct } from './components/product/purchaseProduct/purchaseProduct.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AppSpinner,
    AppProduct,
    AddProduct,
    EditProduct,
    DeleteProduct,
    SellProduct,
    PurchaseProduct
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
