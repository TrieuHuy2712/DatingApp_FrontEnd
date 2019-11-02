import { AuthService } from './_services/auth.service';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BsDropdownModule, TabsModule} from 'ngx-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { NavComponent } from './nav/nav.component';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptor, ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberListComponent } from './member/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { MemberCardComponent } from './member/member-card/member-card.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver.';
import { NgxGalleryModule } from 'ngx-gallery';

export function tokenGetter(){
   return localStorage.getItem('token');
}
export class CustomHammerConfig extends HammerGestureConfig{
   overrides={
      pinch:{enable:false},
      rotate:{enable:false}
   };
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule,
      TabsModule.forRoot(),
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      JwtModule.forRoot({
         config:{
            tokenGetter:tokenGetter,
            whitelistedDomains:['localhost:5000'],
            blacklistedRoutes:['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      ErrorInterceptorProvider,
      MemberDetailResolver,
      MemberListResolver,
      {provide: HAMMER_GESTURE_CONFIG, useClass:CustomHammerConfig}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
