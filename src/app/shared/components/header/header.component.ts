import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  @Input() title: string = 'Realidad Aumentada App';
  @Input() showMenuButton: boolean = false;
  @Input() showBackButton: boolean = false;

   currentLang: string = 'es';

  constructor(private authSrv: AuthService
  ) {}

  ngOnInit() {
  }

  goBack() {
    window.history.back();
  }

  logout() {
    this.authSrv.logout();
  }
}
