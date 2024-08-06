import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../_service/auth.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  @Output() key:EventEmitter<Number> = new EventEmitter
  val:Number=1
  
  constructor(private auth:AuthService){ }

  ngOnInit(): void {}

  nav(keys:Number){
    this.val = keys
    
    return this.key.emit(keys)
  }

}
