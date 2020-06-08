
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Rx";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(public storage : StorageService){

    }    
    
    intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        console.log("passou");
        return next.handle(req)
        .catch((error,caugth) => {

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
                
            }
            if(!errorObj.status){
                errorObj = JSON.parse(error);
            }

            console.log("Error detectado pelo interceptor!");
            console.log(errorObj);
            switch(errorObj.status){
                case 403:
                    this.handle403();
                break;    

            }

            return Observable.throw(errorObj);
        }) as any;
        
    }
    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};