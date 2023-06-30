import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit{

  
postArray:any;

  constructor( private _postService:PostService){}

  ngOnInit(): void {
    this._postService.loadData().subscribe(val=>{console.log(val,"valueee");
    this.postArray=val;
  });
  }

  Delete(postImg:any,id:any){
    this._postService.deleteImage(postImg,id);
  }

  featured(id:any,val:any){
    const featureData={isFeatured:val};
    this._postService.featureData(id,featureData);
  }

}
