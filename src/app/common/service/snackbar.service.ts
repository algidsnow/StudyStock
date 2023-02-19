import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class Snackbar{
    constructor(private _snackBar: MatSnackBar){

    }
    open(message){
        this._snackBar.open(message,'', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000,
            panelClass: 'snack-bar'
          });
    }
}