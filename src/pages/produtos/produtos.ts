import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[] = [];
  page : number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingController : LoadingController) { // construtor loading da tela produto

  }

  ionViewDidLoad() {
    
    this.loadData(); // carrega os dados da tela produto

  }

  loadData(){
    let categoria_id = this.navParams.get('categoria_id');
    let load = this.presentLoading(); // chamando o loading da tela produto
    this.produtoService.findByCategoria(categoria_id, this.page, 10) // argumentos para carregar a página scrinizados com o backend ProdutosResource
    .subscribe(response => {
        load.dismiss(); // finalizando o loading da telaproduto
        let start = this.items.length; // controlar o carregamento de imagens para evitar repetições - start inicia com valor de itens da lista antes do carregamento
        this.items = this.items.concat(response['content']); // concatenando pagina com lista de produtos q serão vizualizados "infiniteScroll"
        let end = this.items.length-1; // controlar o carregamento de imagens para evitar repetições - end ínicia  o com valor de itens da lista depois do carregamento menos -1, assim só carregará os de 10 em 10 conforme declarado em na chamada do mátodo findByCategoria
        console.log(this.page);
        console.log(this.items);
        this.loaddImageUrls(start, end);
        }, 
        error => {
          load.dismiss(); // finalizando o loading da telaproduto caso dê algum erro
        });
  }


  loaddImageUrls(start : number, end: number){ // esse método busca as imagens no bucket e recebe as váriaveis start e end declaradas no método loadData
    for(var i=start; i<=end; i++){
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

presentLoading() { // loading da tela produto
  let loading = this.loadingController.create({
    content: 'Agorde...'
  });
  loading.present();
  return loading;
}

doRefresh(refresher) { //refresh da tela produtos
  this.loadData(); // carrega os dados da tela produto
  setTimeout(() => {
    refresher.complete();
  }, 1000);
}



doInfinite(event) { // chamada do infiniteScroll
  this.page++; // incrementando a número de paginas
  this.loadData(); // recarregando a nova pagina que será concatenada com a anterior
  setTimeout(() => {
      event.complete();
  }, 1000);
}


}