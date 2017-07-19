import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'mt-about',
  templateUrl: './about.component.html',
  viewProviders: [Title]
})
export class AboutComponent implements OnInit {

  constructor(title: Title) {
    title.setTitle('Sobre')
  }

  ngOnInit() {
  }

}
