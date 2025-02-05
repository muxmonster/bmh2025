import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvideridService } from '../../services/providerid.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  code: string = '';
  client_id: string = '01946440-ff64-7797-9c16-ad7e5f1b149c';
  redirect_uri: string = 'http://localhost:4200/home';
  access_token: string = '';
  mophUrl: string = `https://moph.id.th/oauth/redirect?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code`;

  constructor(
    private route: ActivatedRoute,
    private networkService: ProvideridService,
    private routeRoot: Router,
  ) {}

  ngOnInit(): void {
    this.code = '';
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
    });

    if (this.code != '' && this.code != undefined) {
      this.networkService.getAccessTokenHealthID(this.code).subscribe({
        next: (data: any) => {
          console.log(data);
          sessionStorage.setItem('token', data['data']['access_token']);
          this.networkService
            .getAccessTokenProviderID(data['data']['access_token'])
            .subscribe({
              next: (data: any) => {
                this.access_token = data['data']['access_token'];
                this.networkService
                  .getProfileProviderID(this.access_token)
                  .subscribe({
                    next: (data: any) => {
                      sessionStorage.setItem(
                        'name_th',
                        data['data']['name_th'],
                      );
                      sessionStorage.setItem(
                        'hash_cid',
                        data['data']['hash_cid'],
                      );
                      sessionStorage.setItem(
                        'position_type',
                        data['data']['organization'][0]['position_type'],
                      );
                    },
                    error: (err: any) => {
                      console.log('Profile error: ' + err['error']['message']);
                      this.routeRoot.navigate(['']);
                    },
                  });
              },
              error: (err: any) => {
                console.log(
                  'Token ProviderID error: ' + err['error']['message'],
                );
                this.routeRoot.navigate(['']);
              },
            });
        },
        error: (err: any) => {
          console.log('Token HealthID error: ' + err['error']['message']);
          this.routeRoot.navigate(['']);
        },
        complete: () => {
          this.routeRoot.navigate(['auth']);
        },
      });
    }
  }
}
