import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'delete-product',
    templateUrl: './deleteProduct.component.html',
    styleUrls: ['./deleteProduct.component.scss']
})
export class DeleteProduct {

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<DeleteProduct>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }
    ngOnInit(): void { }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
