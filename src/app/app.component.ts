import { Component, ViewChildren, QueryList } from '@angular/core';
import { Platform, IonRouterOutlet, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { HttpclientService } from './httpclient.service';

@Component({
  selector: 'app-root',
  providers: [HttpclientService],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private httpClient: HttpclientService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private toast: ToastController
    ) { this.initializeApp(); }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribe(async () => {
        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
          if (outlet && outlet.canGoBack()) {
            // check whether this line works well or remove it
            outlet.pop();
          } else if (this.router.url === '/') {
            if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
              // this.platform.exitApp(); // Exit from app
              navigator['app'].exitApp(); // work in ionic 4
            } else {
              this.toast.create({
                mode: 'md',
                message: 'Press back again to exit',
                duration: 2000,
                position: 'bottom'
              }).then(toast => toast.present());
                this.lastTimeBackPress = new Date().getTime();
            }
          }
        });
      });
    });
  }
}
