import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { tick } from '@angular/core/testing';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit{

  categoryArray!: Array<any>;
  formCategory!:string;
  formStatus:string='Add';
  categoryId:any;

  constructor(private _categoryService :CategoriesService){}

  ngOnInit(): void{
    this._categoryService.loadData().subscribe(val=>{console.log(val);
    this.categoryArray = val;
    })
  }
 
 onSubmit(formData:any){
  let categoryData: Category = {
    category: formData.value.category
  }
  if(this.formStatus == 'Add'){
  this._categoryService.saveData(categoryData);
  formData.reset();}
  else if(this.formStatus=='Edit'){
    this._categoryService.updateData(this.categoryId,categoryData);
    formData.reset();
    this.formStatus='Add';
  }
 }

 onEdit(category: string, id:any){
    this.formCategory=category;
    this.formStatus='Edit';
    this.categoryId=id;
 }

 onDelete(id:any){
  this._categoryService.deleteData(id);
 }
}