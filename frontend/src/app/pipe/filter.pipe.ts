import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})

export class FilterPipe implements PipeTransform {
  
  transform(value: Array<{name:String,author:String}>, search:string):any[]{
    if(!value)return [];
    if(!search)return value;
    return value.filter((val)=>{
      return val['name'].toLowerCase().includes(search)
    })
    
  }

}
