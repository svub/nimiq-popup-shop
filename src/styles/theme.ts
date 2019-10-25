import { css } from 'lit-element'

// https://github.com/nimiq/nimiq-style/blob/master/src/theme.css
export default css`
  html {
    /* Nimiq color palette */
    --nimiq-blue: #1f2348; /* rgb(31, 35, 72) */
    --nimiq-light-blue: #0582ca; /* rgb(5, 130, 202) */
    --nimiq-gold: #e9b213; /* rgb(233, 178, 19) */
    --nimiq-green: #21bca5; /* rgb(33, 188, 165) */
    --nimiq-orange: #fc8702; /* rgb(252, 135, 2) */
    --nimiq-red: #d94432; /* rgb(216, 65, 51) */
    --nimiq-purple: #5f4b8b; /* rgb(95, 75, 139) */
    --nimiq-pink: #fa7268; /* rgb(250, 114, 104) */
    --nimiq-light-green: #88b04b; /* rgb(136, 176, 75) */
    --nimiq-brown: #795548; /* rgb(121, 85, 72) */
    --nimiq-gray: #f4f4f4;
    --nimiq-light-gray: #fafafa;

    /* Nimiq color palette adaptions on dark background */
    --nimiq-light-blue-on-dark: #0ca6fe; /* rgb(12, 166, 254) */
    --nimiq-red-on-dark: #ff5c48; /* rgb(255, 92, 72) */

    /* Nimiq main colors darkened (hover states) */
    --nimiq-blue-darkened: #151833; /* rgb(21, 24, 51) */
    --nimiq-light-blue-darkened: #0071c3; /* rgb(0, 113, 195) */
    --nimiq-gold-darkened: #e5a212; /* rgb(229, 162, 18) */
    --nimiq-green-darkened: #20b29e; /* rgb(32, 178, 158) */
    --nimiq-orange-darkened: #fc7500; /* rgb(252, 117, 0) */
    --nimiq-red-darkened: #d13030; /* rgb(209, 48, 48) */
    /* Background gradients */
    --nimiq-blue-bg: radial-gradient(
      ellipse at bottom right,
      #260133,
      var(--nimiq-blue)
    );
    --nimiq-light-blue-bg: radial-gradient(
      ellipse at bottom right,
      #265dd7,
      var(--nimiq-light-blue)
    );
    --nimiq-gold-bg: radial-gradient(
      ellipse at bottom right,
      #ec991c,
      var(--nimiq-gold)
    );
    --nimiq-green-bg: radial-gradient(
      ellipse at bottom right,
      #41a38e,
      var(--nimiq-green)
    );
    --nimiq-orange-bg: radial-gradient(
      ellipse at bottom right,
      #fd6216,
      var(--nimiq-orange)
    );
    --nimiq-red-bg: radial-gradient(
      ellipse at bottom right,
      #cc3047,
      var(--nimiq-red)
    );
    --nimiq-purple-bg: radial-gradient(
      ellipse at bottom right,
      #4d4c96,
      var(--nimiq-purple)
    );
    --nimiq-pink-bg: radial-gradient(
      ellipse at bottom right,
      #e0516b,
      var(--nimiq-pink)
    );
    --nimiq-light-green-bg: radial-gradient(
      ellipse at bottom right,
      #70b069,
      var(--nimiq-light-green)
    );
    --nimiq-brown-bg: radial-gradient(
      ellipse at bottom right,
      #724147,
      var(--nimiq-brown)
    );

    /* Background gradients darkened (hover states) */
    --nimiq-blue-bg-darkened: radial-gradient(
      ellipse at bottom right,
      #180021,
      var(--nimiq-blue-darkened)
    );
    --nimiq-light-blue-bg-darkened: radial-gradient(
      ellipse at bottom right,
      #2355c4,
      var(--nimiq-light-blue-darkened)
    );
    --nimiq-gold-bg-darkened: radial-gradient(
      ellipse at bottom right,
      #e58a1b,
      var(--nimiq-gold-darkened)
    );
    --nimiq-green-bg-darkened: radial-gradient(
      ellipse at bottom right,
      #3d9988,
      var(--nimiq-green-darkened)
    );
    --nimiq-orange-bg-darkened: radial-gradient(
      ellipse at bottom right,
      #ea5200,
      var(--nimiq-orange-darkened)
    );
    --nimiq-red-bg-darkened: radial-gradient(
      ellipse at bottom right,
      #bf2d46,
      var(--nimiq-red-darkened)
    );

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
