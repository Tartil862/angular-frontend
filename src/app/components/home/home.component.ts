import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
  }

  private setupScrollAnimations(): void {
    const sections: NodeListOf<HTMLElement> = document.querySelectorAll('.section');

    const checkVisibility = (): void => {
      sections.forEach((section: HTMLElement) => {
        const sectionTop: number = section.getBoundingClientRect().top;
        const sectionBottom: number = section.getBoundingClientRect().bottom;

        if (sectionTop < window.innerHeight && sectionBottom >= 0) {
          section.classList.add('visible');
        } else {
          section.classList.remove('visible');
        }
      });
    };

    // Initial check on page load
    checkVisibility();

    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
  }
}