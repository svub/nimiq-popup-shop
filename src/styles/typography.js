import { css } from 'lit-element'

// https://github.com/nimiq/nimiq-style/blob/master/src/typography.css
export default css`
  html {
    font-size: 8px;
    --nimiq-size: 8px;

    font-family: 'Muli', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    font-size: 2.25rem; /* 18px */
  }

  .nq-h1,
  .nq-style h1 {
    font-size: 3rem;
    line-height: 1.2;
    font-weight: bold;
    margin: 3rem 0;
  }

  .nq-h2,
  .nq-style h2 {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: bold;
    margin: 2.5rem 0;
  }

  .nq-h3,
  .nq-style h3 {
    font-size: 2rem;
    line-height: 1.2;
    font-weight: bold;
    margin: 2rem 0;
  }

  .nq-text,
  .nq-style p {
    font-size: 2rem;
    line-height: 1.3125;
    color: rgba(31, 35, 72, 0.7); /* Based on Nimiq Blue */
    margin: 2rem 0;
  }

  .nq-text-s {
    font-size: 1.75rem;
    line-height: 1.2;
    font-weight: 600;
    margin: 1rem 0;
  }

  .nq-label {
    font-size: 1.75rem;
    line-height: 0.857;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.107em;
    margin: 1rem 0;
    color: rgba(31, 35, 72, 0.7); /* Based on Nimiq Blue */
  }

  .nq-notice {
    font-weight: 600;
    font-size: 2rem;
  }

  .nq-notice.info {
    color: var(--nimiq-light-blue);
  }

  .nq-notice.success {
    color: var(--nimiq-green);
  }

  .nq-notice.warning {
    color: var(--nimiq-orange);
  }

  .nq-notice.error {
    color: var(--nimiq-red);
  }

  .nq-link,
  .nq-text a,
  .nq-style a {
    color: var(--nimiq-light-blue);
    text-decoration: none;
  }

  .nq-link:active,
  .nq-link:hover {
    text-decoration: underline;
  }

  .nq-list,
  .nq-style ul,
  .nq-style ol {
    font-size: 2rem;
    margin: 2rem 0;
  }

  .nq-list li,
  .nq-style li {
    margin: 0.5rem 0;
  }
`
