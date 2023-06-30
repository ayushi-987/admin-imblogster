import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _fire: AngularFirestore, private _toastr:ToastrService) { }
  saveData(data:any){
    this._fire.collection('categories').add(data).then(docRef => {console.log(docRef,"docref");
       this._toastr.success('Category added successfully...!');})
    .catch(err=>console.log(err,"errors"));
  }
  loadData(){
    return this._fire.collection('categories').snapshotChanges().pipe(
      map( actions=>{
        return actions.map(a=>{
          const data= a.payload.doc.data();
          const id= a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }

  updateData(id:any,EditData:any){
    this._fire.collection('categories').doc(id).update(EditData).then(
      docRef=>{this._toastr.success('Category updated successfully..!');})
  }

  deleteData(id:any){
    this._fire.collection('categories').doc(id).delete().then(
      docref=>{this._toastr.success('Category deleted..!');}
    )
  }
}
