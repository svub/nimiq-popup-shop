import { css } from 'lit-element'

// https://github.com/nimiq/nimiq-style/blob/master/src/buttons.css
export default css`
  .nq-button::-moz-focus-inner,
  .nq-button-s::-moz-focus-inner {
    border: 0;
  }

  .nq-button {
    position: relative;
    height: 7.5rem;
    line-height: 2.5rem;
    background-image: var(--nimiq-blue-bg);
    color: white;
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.094em;
    border: none;
    padding: 0 4rem;
    border-radius: 500px;
    min-width: 25rem;
    margin: 2rem auto;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: transform 450ms var(--nimiq-ease),
      box-shadow 450ms var(--nimiq-ease);
    will-change: box-shadow;
    text-decoration: none;
    display: block;
    text-align: center;
    font-family: inherit;
  }

  a.nq-button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nq-button:not([disabled])::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 500px;
    background-image: var(--nimiq-blue-bg-darkened);
    opacity: 0;
    transition: opacity 300ms var(--nimiq-ease);
    z-index: -1;
  }

  .nq-button:hover,
  .nq-button:focus {
    box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.2);
    transform: translate3D(0, -2px, 0);
  }

  .nq-button:hover::before,
  .nq-button:active::before,
  .nq-button:focus::before {
    opacity: 1;
  }

  .nq-button:active {
    outline: none;
    box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.2);
    transform: translate3D(0, 1px, 0);
    transition: transform 200ms cubic-bezier(0.41, 0.34, 0.26, 1.55),
      box-shadow 200ms cubic-bezier(0.41, 0.34, 0.26, 1.55) !important;
  }

  .nq-button-s,
  .nq-button-pill {
    display: inline-block;
    font-size: 1.75rem;
    line-height: 3.375rem;
    height: 3.375rem;
    text-decoration: none;
    font-weight: bold;
    padding: 0 1.5rem;
    background-color: rgba(31, 35, 72, 0.07); /* Based on Nimiq Blue */
    color: var(--nimiq-blue);
    border-radius: 1.6875rem;
    transition: color 300ms var(--nimiq-ease),
      background-color 300ms var(--nimiq-ease);
    will-change: color, background-color;
    border: none;
    cursor: pointer;
    position: relative;
    font-family: inherit;
  }

  .nq-button-s[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .nq-button-s::before,
  .nq-button-pill::before {
    content: '';
    display: block;
    position: absolute;
    left: -1.5rem;
    top: -1.5rem;
    right: -1.5rem;
    bottom: -1.5rem;
  }

  .nq-button-s:hover,
  .nq-button-s:active,
  .nq-button-s:focus {
    color: var(--nimiq-blue-darkened);
    background: rgba(31, 35, 72, 0.12); /* Based on Nimiq Blue */
  }

  .nq-button-s[disabled]:hover {
    background: rgba(31, 35, 72, 0.07); /* Based on Nimiq Blue */
  }

  .nq-button-pill {
    color: white;
    background: var(--nimiq-blue);
    background-image: var(--nimiq-blue-bg);
  }

  .nq-button-pill:hover,
  .nq-button-pill:active,
  .nq-button-pill:focus {
    background: var(--nimiq-blue-darkened);
    background-image: var(--nimiq-blue-bg-darkened);
  }

  /* Color variations */

  /* light blue */
  .nq-button.light-blue {
    background: var(--nimiq-light-blue);
    background-image: var(--nimiq-light-blue-bg);
  }

  .nq-button.light-blue::before {
    background-image: var(--nimiq-light-blue-bg-darkened);
  }

  .nq-button.light-blue.inverse {
    color: var(--nimiq-light-blue);
  }

  .nq-button.light-blue.inverse:hover,
  .nq-button.light-blue.inverse:active,
  .nq-button.light-blue.inverse:focus {
    color: var(--nimiq-light-blue-darkened);
  }

  .nq-button-s.light-blue {
    color: var(--nimiq-light-blue);
    background: rgba(5, 130, 202, 0.1); /* Based on Nimiq Light Blue */
  }

  .nq-button-s.light-blue:hover,
  .nq-button-s.light-blue:active,
  .nq-button-s.light-blue:focus {
    color: var(--nimiq-light-blue-darkened);
    background: rgba(5, 130, 202, 0.2); /* Based on Nimiq Light Blue */
  }

  .nq-button-s.light-blue[disabled]:hover {
    color: var(--nimiq-light-blue);
    background: rgba(5, 130, 202, 0.1); /* Based on Nimiq Light Blue */
  }

  .nq-button-pill.light-blue {
    background: var(--nimiq-light-blue);
    background-image: var(--nimiq-light-blue-bg);
  }

  .nq-button-pill.light-blue:hover,
  .nq-button-pill.light-blue:active,
  .nq-button-pill.light-blue:focus {
    background: var(--nimiq-light-blue-darkened);
    background-image: var(--nimiq-light-blue-bg-darkened);
  }

  /* green */
  .nq-button.green {
    background: var(--nimiq-green);
    background-image: var(--nimiq-green-bg);
  }

  .nq-button.green::before {
    background-image: var(--nimiq-green-bg-darkened);
  }

  .nq-button.green.inverse {
    color: var(--nimiq-green);
  }

  .nq-button.green.inverse:hover,
  .nq-button.green.inverse:active,
  .nq-button.green.inverse:focus {
    color: var(--nimiq-green-darkened);
  }

  .nq-button-s.green {
    color: var(--nimiq-green);
    background: rgba(33, 188, 165, 0.1); /* Based on Nimiq Green */
  }

  .nq-button-s.green:hover,
  .nq-button-s.green:active,
  .nq-button-s.green:focus {
    color: var(--nimiq-green-darkened);
    background: rgba(33, 188, 165, 0.2); /* Based on Nimiq Green */
  }

  .nq-button-s.green[disabled]:hover {
    color: var(--nimiq-green);
    background: rgba(33, 188, 165, 0.1); /* Based on Nimiq Green */
  }

  .nq-button-pill.green {
    background: var(--nimiq-green);
    background-image: var(--nimiq-green-bg);
  }

  .nq-button-pill.green:hover,
  .nq-button-pill.green:active,
  .nq-button-pill.green:focus {
    background: var(--nimiq-green-darkened);
    background-image: var(--nimiq-green-bg-darkened);
  }

  /* orange */
  .nq-button.orange {
    background: var(--nimiq-orange);
    background-image: var(--nimiq-orange-bg);
  }

  .nq-button.orange::before {
    background-image: var(--nimiq-orange-bg-darkened);
  }

  .nq-button.orange.inverse {
    color: var(--nimiq-orange);
  }

  .nq-button.orange.inverse:hover,
  .nq-button.orange.inverse:active,
  .nq-button.orange.inverse:focus {
    color: var(--nimiq-orange-darkened);
  }

  .nq-button-s.orange {
    color: var(--nimiq-orange);
    background: rgba(252, 135, 2, 0.1); /* Based on Nimiq Orange */
  }

  .nq-button-s.orange:hover,
  .nq-button-s.orange:active,
  .nq-button-s.orange:focus {
    color: var(--nimiq-orange-darkened);
    background: rgba(252, 135, 2, 0.2); /* Based on Nimiq Orange */
  }

  .nq-button-s.orange[disabled]:hover {
    color: var(--nimiq-orange);
    background: rgba(252, 135, 2, 0.1); /* Based on Nimiq Orange */
  }

  .nq-button-pill.orange {
    background: var(--nimiq-orange);
    background-image: var(--nimiq-orange-bg);
  }

  .nq-button-pill.orange:hover,
  .nq-button-pill.orange:active,
  .nq-button-pill.orange:focus {
    background: var(--nimiq-orange-darkened);
    background-image: var(--nimiq-orange-bg-darkened);
  }

  /* red */
  .nq-button.red {
    background: var(--nimiq-red);
    background-image: var(--nimiq-red-bg);
  }

  .nq-button.red::before {
    background: var(--nimiq-red-bg-darkened);
  }

  .nq-button.red.inverse {
    color: var(--nimiq-red);
  }

  .nq-button.red.inverse:hover,
  .nq-button.red.inverse:active,
  .nq-button.red.inverse:focus {
    color: var(--nimiq-red-darkened);
  }

  .nq-button-s.red {
    color: var(--nimiq-red);
    background: rgba(216, 65, 51, 0.1); /* Based on Nimiq Red */
  }

  .nq-button-s.red:hover,
  .nq-button-s.red:active,
  .nq-button-s.red:focus {
    color: var(--nimiq-red-darkened);
    background: rgba(216, 65, 51, 0.2); /* Based on Nimiq Red */
  }

  .nq-button-s.red[disabled]:hover {
    color: var(--nimiq-red);
    background: rgba(216, 65, 51, 0.1); /* Based on Nimiq Red */
  }

  .nq-button-pill.red {
    background: var(--nimiq-red);
    background-image: var(--nimiq-red-bg);
  }

  .nq-button-pill.red:hover,
  .nq-button-pill.red:active,
  .nq-button-pill.red:focus {
    background: var(--nimiq-red-darkened);
    background-image: var(--nimiq-red-bg-darkened);
  }

  /* gold */
  .nq-button.gold {
    background: var(--nimiq-gold);
    background-image: var(--nimiq-gold-bg);
  }

  .nq-button.gold:before {
    background: var(--nimiq-gold-bg-darkened);
  }

  .nq-button.gold.inverse {
    color: var(--nimiq-gold);
  }

  .nq-button.gold.inverse:hover,
  .nq-button.gold.inverse:active,
  .nq-button.gold.inverse:focus {
    color: var(--nimiq-gold-darkened);
  }

  .nq-button-pill.gold {
    background: var(--nimiq-gold);
    background-image: var(--nimiq-gold-bg);
  }

  .nq-button-pill.gold:hover,
  .nq-button-pill.gold:active,
  .nq-button-pill.gold:focus {
    background: var(--nimiq-gold-darkened);
    background-image: var(--nimiq-gold-bg-darkened);
  }

  /* Special styles */

  .nq-button.inverse {
    background: white;
    color: var(--nimiq-blue);
    transition: transform 450ms var(--nimiq-ease),
      box-shadow 450ms var(--nimiq-ease), color 300ms var(--nimiq-ease);
  }

  .nq-button.inverse::before {
    background: #eff0f2; /* Indigo 7% */
  }

  .nq-button-s.inverse {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .nq-button-s.inverse:hover,
  .nq-button-s.inverse:focus,
  .nq-button-s.inverse:active {
    background: rgba(255, 255, 255, 0.25);
  }

  .nq-button[disabled] {
    background: rgba(31, 35, 72, 0.07);
    color: rgba(31, 35, 72, 0.3);
    box-shadow: none !important;
    transform: none;
    cursor: not-allowed;
  }

  .nq-button[disabled]:hover,
  .nq-button[disabled]:active {
    transform: none;
  }

  .nq-button.inverse[disabled],
  .nq-button.inverse[disabled]:hover,
  .nq-button.inverse[disabled]:active {
    background: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.5);
  }

  /* Focus Ring for Tabs – can be optimized in the future with better :focus-visible support */

  .nq-button::after,
  .nq-button-s::after,
  .nq-button-pill::after {
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px solid rgba(5, 130, 202, 0.5); /* Based on Nimiq Light Blue */
    border-radius: 500px;
    opacity: 0;
  }

  .nq-button.inverse::after,
  .nq-button-s.inverse::after,
  .nq-button-pill.inverse::after {
    border-color: rgba(255, 255, 255, 0.4);
  }

  .nq-button:focus,
  .nq-button-s:focus,
  .nq-button-pill:focus {
    outline: none;
  }

  .nq-button:focus::after,
  .nq-button-s:focus::after,
  .nq-button-pill:focus::after {
    opacity: 1;
  }
`
