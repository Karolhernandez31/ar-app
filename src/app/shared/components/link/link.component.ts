import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  standalone: false
})
export class LinkComponent  implements OnInit {
  @Input() title: string = 'Register';
  @Input() description: string = 'Don\'t have an account?';
  @Input() route: string = '/register';

  constructor(private router: Router) { }

  ngOnInit() {}

  navigate(){
    this.router.navigate([this.route]);
  }

}
