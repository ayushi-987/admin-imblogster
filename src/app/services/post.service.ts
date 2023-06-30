import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private _storage: AngularFireStorage, private _fire: AngularFirestore, private _toastr: ToastrService,
    private _router:Router) { }

  uploadImage(selectedImage: any, postData:any, formStatus:any,id:any){
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath,"filePath");

    this._storage.upload(filePath,selectedImage).then(()=>{
      console.log("Image uploaded successfully");
      this._storage.ref(filePath).getDownloadURL().subscribe(URL=>{
        postData.postImgPath=URL;
        console.log(postData);

        if(formStatus=='Edit')
        {
          this.updateData(id,postData);
        }else{
          this._fire.collection('posts').add(postData).then(docRef=>{this._toastr.success("Post created successfully");
          this._router.navigate(['/posts'])
        })
        }
      })
    })

  }

  loadData(){
    return this._fire.collection('posts').snapshotChanges().pipe(
      map( actions=>{ 
        return actions.map(a=>{
          const data= a.payload.doc.data();
          const id= a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }

  loadoneData(id:any){
     return this._fire.collection('posts').doc(id).valueChanges();
  }

  updateData(id:any,postData:any){
    this._fire.collection('posts').doc(id).update(postData).then(()=>{
      this._toastr.success("Post Updated Successfully");
      this._router.navigate(['/posts'])
    })
  }

  deleteImage(postImgPath:any,id:any){
    this._storage.storage.refFromURL(postImgPath).delete().then(()=>
      {this.deleteData(id);}
    )
  }

  deleteData(id:any){
    this._fire.collection('posts').doc(id).delete().then(
      docref=>{this._toastr.success('Post deleted..!');}
    )
  }

  featureData(id:any,val:any){
    this._fire.collection('posts').doc(id).update(val).then(
      docref=>{
        this._toastr.success('Feature Update..!');
      }
    )
  }

}
