import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('500ms', style({ opacity: 0 }))]),
]);

export const fadeInUpOutDown = trigger('fadeInUpOutDown', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(24px)' }),
    animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    animate('500ms', style({ opacity: 0, transform: 'translateY(24px)' })),
  ]),
]);

export const fadeInDownOutUp = trigger('fadeInDownOutUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-24px)' }),
    animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    animate('500ms', style({ opacity: 0, transform: 'translateY(-24px)' })),
  ]),
]);
