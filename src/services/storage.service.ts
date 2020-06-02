import { Injectable } from "@angular/core";
import { LocalUser } from "../models/localUser";
import { STORAGE_KES } from "../config/storage_kes.config";

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

}