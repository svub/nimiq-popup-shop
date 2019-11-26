# Nimiq PopUp Shop

Yello! Nimiq is a blockchain that runs in your browser. You can pay anywhere directly from within your browser. No plugins needed. Cool, so now people can pay client-side - but you still need a server to run a shop. :(

**Nimiq, web crypto, and IPFS FTW!**

The shop is easy to integrate and runs its logic client side - no server needed. :)
The data is encrypted and stored on [IPFS](https://ipfs.io/).
Now that the server is gone, you could even deploy you shop itself to IPFS, no problem.

## How does it work?

Your website, or say, future web shop is hosted statically somewhere on the web (e.g. [netlify.com](https://www.netlify.com/) or via [GitHub Pages](https://pages.github.com/)) and you added Nimiq Checkout buttons to it. Now, your visitors become customers. When they buy something, the order with all the details you need (e-mail, shipping address, it's in your hand) is encoded with a public key and stored as file on IPFS.
The hash of that file on IPFS is stored with the transaction when your customer pays you in NIM.
As the shop owner, you can access the statically hosted backend anywhere.
You log in with your private key and shop address.
All transactions for your shop will be fetched from the Nimiq blockchain, then the orders from IPFS and decrypt them with your key.
But that doesn't need to bother you, it's all packed in this lib so you can just add a button for viewers to become shoppers. :)

## How to use

Go this page to create a shop configuration for you:

`// TODO :P`

Change in the config what you need and store the file as "/nimiq-pop-up-shop-configuration.json"

```json
{
  "name": "Nimiq Pop-Up Shop",
  "address": "NQ07 0000 0000 0000 0000 0000 0000 0000 0000",
  "logo": "https://nimiq.com/favicon-96x96.png",
  "live": false,
  "id": "nimiq-pop-shop-demo",
  "publicKey": "<the public key, prefilled by the setup process>"
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
    * collectmetadata: Called by the shop when a customer orders so you can return the metadata needed, e.g. shipping address
    * onerror: something went wrong, the customer didn't buy
    * onsuccess: and order was finished successfully
    * config: URL to your config file (previous step) if it's not at "/nimiq-pop-up-shop-configuration.json"
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
