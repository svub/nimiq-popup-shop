# Nimiq PopUp Shop


## How to use

```
  <!-- anywhere in your shop -->

  <!-- A first product -->
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
```

## Run example

```
# install dependencies (only once)
yarn
# run example
yarn start
# open browser 
firefox http://localhost:3333
```

## Tests

Run tests using Headless Chrome
```
yarn test
```

More info about automated testing with Headless Chrome: https://developers.google.com/web/updates/2017/06/headless-karma-mocha-chai#run_your_tests

## WebComponent approach

Behind the scenes `LitElement` is used to provide `<nimiq-shop-checkout-button>` as a web component. `LitElement` is just _"a simple base class for creating fast, lightweight web components"_.
https://lit-element.polymer-project.org/


## TypeScript compiler options for `LitElement`
https://lit-element.polymer-project.org/guide/publish#transpiling-with-typescript
