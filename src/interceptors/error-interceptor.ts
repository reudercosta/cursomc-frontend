import { StorageService } from "../services/storage.service";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{ 
    constructor(public storage : StorageService, public alertContrl: AlertController){

    }    
    
    intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        console.log("passou");
        return next.handle(req).catch((error,caugth) => {

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
                
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log("Error detectado pelo interceptor!");
            console.log(errorObj);
            switch(errorObj.status){
                case 401:
                    this.handle401();
                break;    

                case 403:
                    this.handle403();
                break;
                
                default:
                    this.handlerDefaultError(errorObj);

            }

            return Observable.throw(errorObj);
        }) as any;
        
    }
    handle403(){
        this.storage.setLocalUser(null);
    }

    handle401(){
        let alert = this.alertContrl.create({
            title: 'Erro 401: Falha de Autenticaçao',
            message: 'Email ou Senha incorretos',
            enableBackdropDismiss: false,
            buttons:[
                {
                    text: 'OK'
                }
            ]
        });
       alert.present();
    }

    handlerDefaultError(errorObj){
        let alert = this.alertContrl.create({
            title: 'Erro'+errorObj.status+ ' : ' +errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons:[
                {
                    text: 'OK'
                }
            ]
        });
       alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};