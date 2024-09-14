import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditProduct } from './editProduct/editProduct.component';
import { DeleteProduct } from './deleteProduct/deleteProduct.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [DatePipe]
})
export class AppProduct implements OnInit {

    displayedColumns: string[] = [];
    dataSource = new MatTableDataSource<any>();
    isMobileView: boolean = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
Object: any;


    constructor(private apiService: ApiService, private datePipe: DatePipe, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.getMedicine();
        // this.apiService.getData('medicines').subscribe(data => {
        //     if (data.length > 0) {
        //         const keys = Object.keys(data[0]);
        //         console.log('data', data, keys);
        //         this.dataSource.data = data;
        //         this.displayedColumns = [...keys, 'actions']; // Extract columns from data
        //         this.dataSource.paginator = this.paginator;
        //         this.dataSource.sort = this.sort;
        //     }
        // });
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    formatDate(date: Date): string {
        return this.datePipe.transform(date, 'shortDate') || '';
    }

    editItem(data: any): void {
        console.log('Edit:', data);
        const dialogRef = this.dialog.open(EditProduct, {
            width: '600px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Form data:', result);
                this.apiService.updateData('medicine', result.id, result).subscribe(
                    response => {
                      if (response) {
                        console.log('Item updated successfully:', response);
                        this._snackBar.open(response?.message, 'Close', {
                            horizontalPosition: 'center',
                            verticalPosition: 'top',
                            duration: 5000
                        });
                        this.getMedicine();
                      } else {
                        console.log('Received null response or error.');
                        this._snackBar.open('Received null response or error.', 'Close', {
                            horizontalPosition: 'center',
                            verticalPosition: 'top',
                            duration: 5000
                        });
                      }
                    },
                    error => {
                      console.error('An error occurred:', error);
                      this._snackBar.open('Error whil updating record', 'Close', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        duration: 5000
                    });
                });
            }
        });
    }

    deleteItem(data: any): void {
        const dialogRef = this.dialog.open(DeleteProduct, {
            width: '600px',
            data: { message: `Are you sure you want to delete ${data.medicine_name} ?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deleteData('medicine', data.id).subscribe(response => {
                    console.log('Item deleted successfully', response);
                    this._snackBar.open(response, 'Close', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        duration: 5000
                    });
                    // Handle successful deletion (e.g., update UI, show a message, etc.)
                }, error => {
                    console.error('Error deleting item', error);
                    this._snackBar.open(error, 'Close', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        duration: 5000
                    });
                    // Handle error (e.g., show an error message)
                });
            }
        });
    }

    getMedicine(): void {
        this.apiService.getData('medicines').subscribe(
            response => {
                if (response) {
                    console.log('Item updated successfully:', response);
                    const keys = Object?.keys(response[0]).filter(column => column !== 'id');
                    console.log('response', response, keys);
                    this.dataSource.data = response;
                    this.displayedColumns = [...keys, 'actions']; // Extract columns from data
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                
                } else {
                    console.log('Received null response or error.');
                }
            },
            error => {
                console.error('An error occurred:', error);
                this._snackBar.open('Error whil updating record', 'Close', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 5000
            });
        });
           
    }

    


}