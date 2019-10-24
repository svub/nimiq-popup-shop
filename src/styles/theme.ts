import { css } from 'lit-element';

// https://github.com/nimiq/nimiq-style/blob/master/src/theme.css
export default css`
  html {
    /* Nimiq color palette */
    --nimiq-blue:       #1F2348; /* rgb(31, 35, 72) */
    --nimiq-light-blue: #0582CA; /* rgb(5, 130, 202) */
    --nimiq-gold:       #E9B213; /* rgb(233, 178, 19) */
    --nimiq-green:      #21BCA5; /* rgb(33, 188, 165) */
    --nimiq-orange:     #FC8702; /* rgb(252, 135, 2) */
    --nimiq-red:        #D94432; /* rgb(216, 65, 51) */
    --nimiq-purple:     #5F4B8B; /* rgb(95, 75, 139) */
    --nimiq-pink:       #FA7268; /* rgb(250, 114, 104) */
    --nimiq-light-green:#88B04B; /* rgb(136, 176, 75) */
    --nimiq-brown:      #795548; /* rgb(121, 85, 72) */
    --nimiq-gray:       #F4F4F4;
    --nimiq-light-gray: #FAFAFA;

    /* Nimiq color palette adaptions on dark background */
    --nimiq-light-blue-on-dark: #0CA6FE; /* rgb(12, 166, 254) */
    --nimiq-red-on-dark:        #FF5C48; /* rgb(255, 92, 72) */

    /* Nimiq main colors darkened (hover states) */
    --nimiq-blue-darkened:       #151833; /* rgb(21, 24, 51) */
    --nimiq-light-blue-darkened: #0071C3; /* rgb(0, 113, 195) */
    --nimiq-gold-darkened:       #E5A212; /* rgb(229, 162, 18) */
    --nimiq-green-darkened:      #20B29E; /* rgb(32, 178, 158) */
    --nimiq-orange-darkened:     #FC7500; /* rgb(252, 117, 0) */
    --nimiq-red-darkened:        #D13030; /* rgb(209, 48, 48) */
    /* Background gradients */
    --nimiq-blue-bg:       radial-gradient(ellipse at bottom right, #260133, var(--nimiq-blue));
    --nimiq-light-blue-bg: radial-gradient(ellipse at bottom right, #265DD7, var(--nimiq-light-blue));
    --nimiq-gold-bg:       radial-gradient(ellipse at bottom right, #EC991C, var(--nimiq-gold));
    --nimiq-green-bg:      radial-gradient(ellipse at bottom right, #41A38E, var(--nimiq-green));
    --nimiq-orange-bg:     radial-gradient(ellipse at bottom right, #FD6216, var(--nimiq-orange));
    --nimiq-red-bg:        radial-gradient(ellipse at bottom right, #CC3047, var(--nimiq-red));
    --nimiq-purple-bg:     radial-gradient(ellipse at bottom right, #4D4C96, var(--nimiq-purple));
    --nimiq-pink-bg:       radial-gradient(ellipse at bottom right, #E0516B, var(--nimiq-pink));
    --nimiq-light-green-bg:radial-gradient(ellipse at bottom right, #70B069, var(--nimiq-light-green));
    --nimiq-brown-bg:      radial-gradient(ellipse at bottom right, #724147, var(--nimiq-brown));

    /* Background gradients darkened (hover states) */
    --nimiq-blue-bg-darkened:       radial-gradient(ellipse at bottom right, #180021, var(--nimiq-blue-darkened));
    --nimiq-light-blue-bg-darkened: radial-gradient(ellipse at bottom right, #2355C4, var(--nimiq-light-blue-darkened));
    --nimiq-gold-bg-darkened:       radial-gradient(ellipse at bottom right, #E58A1B, var(--nimiq-gold-darkened));
    --nimiq-green-bg-darkened:      radial-gradient(ellipse at bottom right, #3D9988, var(--nimiq-green-darkened));
    --nimiq-orange-bg-darkened:     radial-gradient(ellipse at bottom right, #EA5200, var(--nimiq-orange-darkened));
    --nimiq-red-bg-darkened:        radial-gradient(ellipse at bottom right, #BF2D46, var(--nimiq-red-darkened));

    /* Special colors */
    --nimiq-highlight-bg: rgba(31, 35, 72, 0.06); /* Based on Nimiq Blue */
    --nimiq-card-bg: white;
  }

  body {
    color: var(--nimiq-blue);
    background: var(--nimiq-gray);
    margin: 0;
  }

  .nq-blue {
    color: var(--nimiq-blue) !important;
  }

  .nq-light-blue {
    color: var(--nimiq-light-blue) !important;
  }

  .nq-gold {
    color: var(--nimiq-gold) !important;
  }

  .nq-green {
    color: var(--nimiq-green) !important;
  }

  .nq-orange {
    color: var(--nimiq-orange) !important;
  }

  .nq-red {
    color: var(--nimiq-red) !important;
  }

  .nq-purple {
    color: var(--nimiq-purple) !important;
  }

  .nq-pink {
    color: var(--nimiq-pink) !important;
  }

  .nq-light-green {
    color: var(--nimiq-light-green) !important;
  }

  .nq-brown {
    color: var(--nimiq-brown) !important;
  }

  .nq-blue-bg {
    background: var(--nimiq-blue);
    background-image: var(--nimiq-blue-bg);
  }

  .nq-light-blue-bg {
    background: var(--nimiq-light-blue);
    background-image: var(--nimiq-light-blue-bg);
  }

  .nq-gold-bg {
    background: var(--nimiq-gold);
    background-image: var(--nimiq-gold-bg);
  }

  .nq-green-bg {
    background: var(--nimiq-green);
    background-image: var(--nimiq-green-bg);
  }

  .nq-orange-bg {
    background: var(--nimiq-orange);
    background-image: var(--nimiq-orange-bg);
  }

  .nq-red-bg {
    background: var(--nimiq-red);
    background-image: var(--nimiq-red-bg);
  }

  .nq-purple-bg {
    background: var(--nimiq-purple);
    background-image: var(--nimiq-purple-bg);
  }

  .nq-pink-bg {
    background: var(--nimiq-pink);
    background-image: var(--nimiq-pink-bg);
  }

  .nq-light-green-bg {
    background: var(--nimiq-light-green);
    background-image: var(--nimiq-light-green-bg);
  }

  .nq-brown-bg {
    background: var(--nimiq-brown);
    background-image: var(--nimiq-brown-bg);
  }

  .nq-gray-bg {
    background: var(--nimiq-gray);
  }
`
