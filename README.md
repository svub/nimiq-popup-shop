# Nimiq Pop-Up Shop

> The Nimiq Pop-Up Shop can turn any static HTML page into a shop using only decentralized (Web3) technology.

Yello! Nimiq is a blockchain that runs in your browser. You can pay anywhere directly from within your browser. No plugins needed. Cool, so now people can pay client-side - but you still need a server to run a shop. :(

Not any more!<br>**Nimiq, web crypto, and IPFS FTW!**

The shop is easy to integrate and runs its logic client side - no server needed. :)
The data is encrypted and stored on [IPFS](https://ipfs.io/).
Now that the server is gone, you could even deploy your shop itself to IPFS, no problem.

Support this effort by donating NIM to the developers!
[![Donate NIM](https://www.nimiq.com/accept-donations/img/donationBtnImg/gold-big.svg)](https://safe.nimiq.com/#_request/NQ76YRKFTFVXHXA3HATDDJ0KAH44KCVAKJNS_)

## How to use

**Checkout the deployed example!** As it works in static HTML, here is a dummy shop deployed to GitHub Pages: [https://svub.github.io/nimiq-popup-shop/](https://svub.github.io/nimiq-popup-shop/backend/). And to see the orders coming in, copy the content of [this file](https://svub.github.io/nimiq-popup-shop/demo-private-key.js) -- that's the private key for the demo store -- and then go to [backend/](https://svub.github.io/nimiq-popup-shop/backend/).

## How does it work?

Your website, or say, **your future web shop** is hosted statically somewhere on the web (e.g. [netlify.com](https://www.netlify.com/) or via [GitHub Pages](https://pages.github.com/)) and you added Nimiq Checkout buttons to it. Now, your visitors become customers. When they buy something, the order with all the details you need (e-mail, shipping address, it's in your hand) is encoded with a public key and stored as file on IPFS.
The hash of that file on IPFS is stored with the transaction when your customer pays you in NIM.
As the shop owner, you can access the statically hosted backend anywhere.
You enter your private key (it's safe because it's all client-side) and shop address.
All transactions for your shop will be fetched from the Nimiq blockchain, then the orders from IPFS and decrypted them with your key.
But that doesn't need to bother you, it's all packed in this lib so you can just add a button for viewers to become shoppers. :)

## Setup your own shop

To create a new shop configuration for your own shop, go to the [setup](https://svub.github.io/nimiq-popup-shop/setup.html).
Or check the section at the bottom about how to run the code and access the setup locally at [localhost:3333/backend/setup.html](http://localhost:3333/backend/setup.html).

During the setup, change the config to what you need and store the file as "nimiq-pop-up-shop-configuration.js".

```json
{
  "name": "Nimiq Pop-Up Shop",
  "address": "NQ07 0000 0000 0000 0000 0000 0000 0000 0000",
  "logo": "https://nimiq.com/favicon-96x96.png",
  "live": false,
  "id": "<automatically generated by the setup process>",
  "publicKey": "<the public key, generated by setup>",
}
```

Add this JavaScript to your page

```html
  <script src="https://raw.githubusercontent.com/svub/nimiq-popup-shop/master/dist/nimiq-shop.js">
```

And then use the web compenents anywhere in your shop or website:

```html
  <!--
    Configure your shop! (all optional)
    * collectmetadata: Called by the shop when a customer orders so you can return the metadata needed, e.g. shipping address - return false to signal that the user wants to cancel the checkout.
    * onsuccess: Checkout was finished successfully.
    * oncancel: The user has cancelled the checkout process.
    * onerror: Something went wrong, the customer could finish checkout.
    * config: URL to your config file (previous step) if it's not in the same folder and called "nimiq-pop-up-shop-configuration.js".
  -->
  <nimiq-shop collectmetadata="getMetadata" onerror="checkoutError" onsuccess="checkoutSuccess">

    <!-- A first product, price in NIM -->
    <nimiq-shop-checkout-button
      product="Product A"
      price="1.0"
      />

    ...

    <!-- And another product -->
    <nimiq-shop-checkout-button
      product="Product b"
      price="2.0"
      />

  </nimiq-shop>
```

## Contribute

This is an early prototype and there's lots to do and even more possibilities.
Check out the [issues](https://github.com/svub/nimiq-popup-shop/issues).

### Run example

```
# install dependencies (only once)
yarn
# run example
yarn start
# open browser
firefox http://localhost:3333
```

### Tests

Run tests using Headless Chrome
```
yarn test
```

More info about automated testing with Headless Chrome: https://developers.google.com/web/updates/2017/06/headless-karma-mocha-chai#run_your_tests

### WebComponent approach

Behind the scenes `LitElement` is used to provide `<nimiq-shop-checkout-button>` as a web component. `LitElement` is just _"a simple base class for creating fast, lightweight web components"_.
https://lit-element.polymer-project.org/


### TypeScript compiler options for `LitElement`
https://lit-element.polymer-project.org/guide/publish#transpiling-with-typescript
