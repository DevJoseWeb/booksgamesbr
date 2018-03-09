import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.sass']
})
export class EditDialogComponent {

    newAndamento: string;

  constructor(
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
  onNoClick(): void {
    this.dialogRef.close();
  }

  updateAndamento(): void {
    this.afs.collection('issues').doc(this.data.uid).update({ andamento: this.newAndamento })
    this.dialogRef.close();
  }
}