
(function( $ ) {
    $.Shop = function( element ) {
        this.$element = $( element ); // top-level element
        this.init();
    };

    $.Shop.prototype = {

        init: function() {
            // initializes properties and methods
              // Properties

              this.cartPrefix = "winery-"; // prefix string to be prepended to the cart's name in session storage
              this.cartName = this.cartPrefix + "cart"; // cart's name in session storage
              this.shippingRates = this.cartPrefix + "shipping-rates"; // shipping rates key in session storage
              this.total = this.cartPrefix + "total"; // total key in the session storage
              this.storage = sessionStorage; // shortcut to sessionStorage object
  
              this.$formAddToCart = this.$element.find( "form.add-to-cart" ); // forms for adding items to the cart
              this.$formCart = this.$element.find( "#shopping-cart" ); // Shopping cart form
              this.$checkoutCart = this.$element.find( "#checkout-cart" ); // checkout form cart
              this.$checkoutOrderForm = this.$element.find( "#checkout-order-form" ); // checkout user details form
              this.$shipping = this.$element.find( "#sshipping" ); // element that displays the shipping rates
              this.$subTotal = this.$element.find( "#stotal" ); // element that displays the subtotal charges
              this.$shoppingCartActions = this.$element.find( "#shopping-cart-actions" ); // cart actions links
              this.$updateCartBtn = this.$shoppingCartActions.find( "#update-cart" ); // update cart button
              this.$emptyCartBtn = this.$shoppingCartActions.find( "#empty-cart" ); // empty cart button
              this.$userDetails = this.$element.find( "#user-details-content" ); // element that displays the user's information
              this.$paypalForm = this.$element.find( "#paypal-form" ); // PayPal form
  
              this.currency = "&euro;"; // HTML entity of the currency to be displayed in layout
              this.currencyString = "€"; // currency symbol as text string
              this.paypalCurrency = "EUR"; // PayPal's currency code
              this.paypalBusinessEmail = "yourbusiness@email.com"; // your PayPal Business account email address
              this.paypalURL = "https://www.sandbox.paypal.com/cgi-bin/webscr"; // URL of the PayPal form
  
              // object containing patterns for form validation
              this.requiredFields = {
                  expression: {
                      value: /^([w-.]+)@((?:[w]+.)+)([a-z]){2,4}$/
                  },
  
                  str: {
                      value: ""
                  }
  
              };
  
              // public methods invocation
        }

        

    };

    $(function() {
        var shop = new $.Shop( "#site" ); // object's instance
    });

})( jQuery );




$.Shop.prototype = {
    // empties session storage

    _emptyCart: function() {
        this.storage.clear();
    }


    /* Add an object to the cart as a JSON string
    * @param values Object the object to be added to the cart
    * @returns void
    */
/* 
    _addToCart: function( values ) {
        var cart = this.storage.getItem( this.cartName );
        var cartObject = this._toJSONObject( cart );
        var cartCopy = cartObject;
        var items = cartCopy.items;
        items.push( values );

        this.storage.setItem( this.cartName, this._toJSONString( cartCopy ) );
    }


_validateForm: function( form ) {
    var self = this;
    var fields = self.requiredFields;
    var $visibleSet = form.find( "fieldset:visible" );
    var valid = true;

    form.find( ".message" ).remove();

$visibleSet.each(function() {

    $( this ).find( ":input" ).each(function() {
    var $input = $( this );
    var type = $input.data( "type" );
    var msg = $input.data( "message" );

    if( type == "string" ) {
        if( $input.val() == fields.str.value ) {
            $( "<span class='message'/>" ).text( msg ).
            insertBefore( $input );

            valid = false;
        }
    } else {
        if( !fields.expression.value.test( $input.val() ) ) {
            $( "<span class='message'/>" ).text( msg ).
            insertBefore( $input );

            valid = false;
        }
    }

});
});

return valid;
}



_saveFormData: function( form ) {
    var self = this;
    var $visibleSet = form.find( "fieldset:visible" );

    $visibleSet.each(function() {
        var $set = $( this );
        if( $set.is( "#fieldset-billing" ) ) {
            var name = $( "#name", $set ).val();
            var email = $( "#email", $set ).val();
            var city = $( "#city", $set ).val();
            var address = $( "#address", $set ).val();
            var zip = $( "#zip", $set ).val();
            var country = $( "#country", $set ).val();

            self.storage.setItem( "billing-name", name );
            self.storage.setItem( "billing-email", email );
            self.storage.setItem( "billing-city", city );
            self.storage.setItem( "billing-address", address );
            self.storage.setItem( "billing-zip", zip );
            self.storage.setItem( "billing-country", country );
        } else {
            var sName = $( "#sname", $set ).val();
            var sEmail = $( "#semail", $set ).val();
            var sCity = $( "#scity", $set ).val();
            var sAddress = $( "#saddress", $set ).val();
            var sZip = $( "#szip", $set ).val();
            var sCountry = $( "#scountry", $set ).val();

            self.storage.setItem( "shipping-name", sName );
            self.storage.setItem( "shipping-email", sEmail );
            self.storage.setItem( "shipping-city", sCity );
            self.storage.setItem( "shipping-address", sAddress );
            self.storage.setItem( "shipping-zip", sZip );
            self.storage.setItem( "shipping-country", sCountry );

        }
    });
}
 */


};


