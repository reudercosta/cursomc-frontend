import { Injectable } from "@angular/core";
import { LocalUser } from "../models/localUser";
import { STORAGE_KES } from "../config/storage_kes.config";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService{

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KES.localUser);
        if(usr == null){
            return null;
        }
        else{
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser) {
        if(obj==null){
            localStorage.removeItem(STORAGE_KES.localUser);
        }
        else{
            localStorage.setItem(STORAGE_KES.localUser, JSON.stringify(obj));
        }

    }

    getCart() : Cart {
        let str = localStorage.getItem(STORAGE_KES.cart);
        if(str != null){
            return JSON.parse(str);
        }
        else{
            return null;
        }
    }

    setCart(obj : Cart) {
        if(obj!=null){
            localStorage.setItem(STORAGE_KES.cart, JSON.stringify(obj));        
        }
        else{
            localStorage.removeItem(STORAGE_KES.cart);
        }

    }

}