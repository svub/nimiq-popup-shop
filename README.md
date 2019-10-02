# Nimiq PopUp Shop

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


## WebComponent approach

Behind the scenes `LitElement` is used to provide `<nimiq-shop-checkout-button>` as a web component. `LitElement` is just _"a simple base class for creating fast, lightweight web components"_.
https://lit-element.polymer-project.org/

# TypeScript compiler options for `LitElement`
https://lit-element.polymer-project.org/guide/publish#transpiling-with-typescript
