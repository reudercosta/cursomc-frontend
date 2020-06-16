import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingController : LoadingController) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    let load = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response => {
      load.dismiss();
        this.items = response['content'];
        this.loaddImageUrls();
        }, 
        error => {
          load.dismiss();
        });
  }
  loaddImageUrls(){
    for(var i=0; i<this.items.length; i++){
        let item = this.items[i];
        this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response =>{
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error=>{});
    }
}
showDetail(produto_id : string){
  this.navCtrl.push('ProdutoDetailPage', {produto_id : produto_id});
}

presentLoading() {
  let loading = this.loadingController.create({
    content: 'Agorde...'
  });
  loading.present();
  return loading;
}

}