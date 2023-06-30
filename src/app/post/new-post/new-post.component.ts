import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

permalink:any;
imgSrc:any='./assets/images.png';
selectedImg:any;
categories:any;
postForm!: FormGroup;
post:any;
formStatus:string= "Add";
docId:any;

constructor(private _categoryService: CategoriesService,
   private _fb: FormBuilder, 
   private _postService :PostService,
   private _route :ActivatedRoute){

    this._route.queryParams.subscribe(val=>{
      this.docId=val.id;
      if(this.docId){
      this._postService.loadoneData(val.id).subscribe(post=>{

        this.post=post;

        this.postForm = this._fb.group({
          title: [this.post.title,[Validators.required,Validators.minLength(10)]],
          permlink: [''],
          excerpt: [this.post.excerpt,[Validators.required,Validators.minLength(50)]],
          category: [`${this.post.category.categoryId}-${this.post.category.category}`,Validators.required],
          postImg: ['',Validators.required],
          content: [this.post.content,Validators.required],
        })
        this.imgSrc=this.post.postImgPath;
        this.formStatus="Edit";
      }
      );}
      else{
        this.postForm = this._fb.group({
          title: ['',[Validators.required,Validators.minLength(10)]],
          permlink: [''],
          excerpt: ['',[Validators.required,Validators.minLength(50)]],
          category: ['',Validators.required],
          postImg: ['',Validators.required],
          content: ['',Validators.required],
        })
      }
     
      
    })

  
}

ngOnInit(): void {
  this._categoryService.loadData().subscribe(val=>{
    this.categories = val;
  })
}

onTitleChange($event: any){
const title=$event.target.value;
this.permalink=title.replace(/\s/g,'-');

}

showPreview($event:any){
  const reader= new FileReader();
  reader.onload = (e) => {
    this.imgSrc = e.target?.result
  }
  console.log(this.imgSrc);
  reader.readAsDataURL($event.target.files[0]);
  this.selectedImg = $event.target.files[0];
}
get fc(){
  return this.postForm.controls
}

onSubmit(){
  // console.log(this.postForm.value);

  let splitted= this.postForm.value.category.split('-');
  console.log(splitted);

  const postData: Post = {
    title: this.postForm.value.title,
    
    category:{
      categoryId:splitted[0],
      category:splitted[1]
    },
    postImgPath:'',
    excerpt:this.postForm.value.excerpt,
    content:this.postForm.value.content,
    isFeatured: false,
    views:0,
    status:'new',
    createdAt:new Date(),
  }

  this._postService.uploadImage(this.selectedImg, postData, this.formStatus,this.docId);
  this.postForm.reset();
  this.imgSrc='./assets/images.png';
  this.permalink='';

}
//Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rerum iure tempore reprehenderit praesentium quia mollitia expedita iste unde modi iusto, fuga culpa esse minus amet et quae eos. Consequuntur laboriosam iusto laborum voluptatibus asperiores quisquam enim dolor accusamus maxime repellat, porro, consequatur nobis sit, odio officia ad fugit! Autem!
}

