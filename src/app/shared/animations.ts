import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const routeAnimations =
  trigger('routeAnimations', [
    transition('home => play, home => levels, levels => level, levels => instructions', [
      style({ position: 'relative' }),

      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),

      query(':enter', [
        style({ left: '100%', zIndex: 2 })
      ], { optional: true }),

      query(':leave', [
        style({ zIndex: 1 })
      ], { optional: true }),

      group([
        query(':leave', [
          animate('300ms ease-in-out', style({ left: '-25%' }))
        ], { optional: true }),

        query(':enter', [
          animate('300ms ease-in-out', style({ left: '0%' }))
        ], { optional: true }),
      ])
    ]),

    transition('play => home, levels => home, level => levels', [
      style({ position: 'relative' }),

      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),

      query(':enter', [
        style({ left: '-25%', zIndex: 1 })
      ], { optional: true }),

      query(':leave', [
        style({ zIndex: 2 })
      ], { optional: true }),

      query(':leave', animateChild(), { optional: true }),

      group([
        query(':leave', [
          animate('300ms ease-in-out', style({ left: '100%' }))
        ], { optional: true }),

        query(':enter', [
          animate('300ms ease-in-out', style({ left: '0%' }))
        ], { optional: true }),
      ])
    ]),

    transition('* => instructions', [
      query(':enter', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          transform: 'scale(0)',
          transformOrigin: 'bottom right',
          zIndex: 2
        })
      ], { optional: true }),

      group([
        query(':enter', [
          animate('300ms ease-in-out', style({ transform: 'scale(1)' }))
        ], { optional: true })
      ])
    ]),

    transition('instructions => *', [
      query(':leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          transformOrigin: 'bottom right',
          zIndex: 2
        })
      ], { optional: true }),

      group([
        query(':leave', [
          animate('300ms ease-in-out', style({ transform: 'scale(0)' }))
        ], { optional: true })
      ])
    ])
  ]);