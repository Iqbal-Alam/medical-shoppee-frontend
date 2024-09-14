import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
    selector: 'app-spinner',
    templateUrl: './appSpinner.component.html',
    styleUrls: ['./appSpinner.component.scss']
})
export class AppSpinner implements OnInit {
    showSpinner = false;

    constructor(private spinnerService: SpinnerService) { }

    ngOnInit(): void {
        this.spinnerService.spinnerState$.subscribe((show) => {
            this.showSpinner = show;
        });
    }



}