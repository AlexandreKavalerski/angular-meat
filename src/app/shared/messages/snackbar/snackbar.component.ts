import { Component, OnInit } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'

import { NotificationService } from '../notification.service'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'


@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')), //(duracao, delay, tipo velocidade)
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]

})
export class SnackbarComponent implements OnInit {

  message: string = '';
  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier
      .do(message => {
        this.message = message
        this.snackVisibility = 'visible'
    }).switchMap(message => Observable.timer(2500))
      .subscribe(timer => this.snackVisibility = 'hidden')
    //.subscribe adiciona um listener no observable e só a partir daquele ponto o observable me notificationService
    //o .do permite executar uma ação no instante em que a mensagem chega
    //o .map converte/transforma um objeto em outro
    //o .switchMap transforma/converte/troca os eventos emitidos
    //o .switchMap também faz o unsubscribe se, quando a nova mensagem chegar, o subscribe antigo ainda estiver ativo
    //ao usar o .switchMap, estou encadeando 2 observables, por isso não preciso de 2 subscribes independentes, basta 1 e o único subscribe corresponde a toda a configuração
  }

}
