import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
      id: "1",
      logradouro:"Rua 15 de Novembro",
      numero:"300",
      complemento: "apto 200",
      bairro: "Santa Mônica",
      cep:"48290038",
      cidade:{
        id:"1",
        nome:"Uberlândia",
        estado:{
          id:"1",
          nome:"Minas Gerais"
              }
              }
      },
      {
        id: "2",
        logradouro:"Rua Alexandre toledo silva",
        numero:"405",
        complemento: null ,
        bairro: "Centro",
        cep:"48290038",
        cidade:{
          id:"3",
          nome:"São Paulo",
          estado:{
            id:"2",
            nome:"São Paulo"
          }
        }
      } 
              ];

  }
}
