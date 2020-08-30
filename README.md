<h1 align="center">Book-Store web app</h1>
<h4 align="center">Search for books, add them to your cart, place an order, and track your shipment!</h4>
<p align="center">
<img src="client/public/logo144x144.png" />
<p/>
<h3 align="center"><a href="https://bookstore-709eb.web.app/">...Visit the Book Store...</a></h3>
  
## 
##

<h4 align="center">React-App<h4>
<h4 align="center">Built without any front-end css-framework<h4>
  

<h4 align="center">Dependencies...</h4>
  
```javascript   
    // FRONT-END                                      // BACK-END
    "react": "^16.6.0",                               "firebase-functions": "^3.6.1",
    "react-dom": "^16.6.0",                           "axios": "^0.18.0",
    "react-router": "^5.2.0",                         "express": "^4.16.3",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.1"
```

## 
##

<h3 align="center">Database...</h3>
<p align="center">| -->> Firebase realtime REST API database <<-- |</p>
<p align="center">NoSQL database that adds or changes data by making API calls.</p>
<p align="center"><a href="https://firebase.google.com/docs/reference/rest/database">documentation...</a></p>

## 
##

<h3 align="center">Back-End...</h3>
<p align="center">| -->> Firebase cloud functions <<-- |</p>
<p align="center"><strong>Serverless cloud based web app!</strong></p>
<p align="center">I set up the node/express back-end as a function that accepts request from the bookstore application</p>
<p align="center"><a href="https://firebase.google.com/docs/functions">documentation...</a></p>

## 
##

<h3 align="center">Main Page</h3>
<h5 align="center"><a href="https://bookstore-709eb.web.app/">https://bookstore-709eb.web.app/</a></h5>
<br />
<p align="center">Components used</p>
<p align="center"> Mainbody -- BookSearch -- SearchResults -- Pagination -- Filter -- Modal -- BookDetails</p>
<h4 align="center"> I have left comments in all the code explaining in more detail how everything works</h4>

<br />
<p align="center">
<img src="README_ASSETS/searchPage.gif" />
<p/>

## 
##

<h3 align="center">Cart Page</h3>
<h5 align="center"><a href="https://bookstore-709eb.web.app/cart">https://bookstore-709eb.web.app/cart</a></h5>
<br />
<p align="center">Components used</p>
<p align="center"> Mainbody -- Cart -- Orders -- CartItems</p>

<br />
<p align="center">
<img src="README_ASSETS/cartPage.gif" />
<p/>

## 
##

<h3 align="center">Placing an order</h3>
<h5 align="center"><a href="https://bookstore-709eb.web.app/orderhistory">https://bookstore-709eb.web.app/orderhistory</a></h5> 
<br />
<p align="center">Components used</p>
<p align="center"> Mainbody -- Checkout -- OrderHistory -- Shipment Tracker -- OrderDetails</p>

<br />
<p align="center">
<img src="README_ASSETS/placingOrder.gif" />
<p/>

## 
##

<h3 align="center">Developer comments</h3>
<p>This is an upgrade to an earlier version of this app that only made queries and saved books. I wanted to challenge myself by taking it one step further and adding a shopping cart feature as well as being able to order your items and track the shipment.<br />
I also used as little dependencies as possible to push myself to figure everything out on my own; such as styling, all done by me using css, no bootstrap or any other css framework. Instead of using a rater module, I also created my own Rater component to display stars based on the book rating. <br />
The most challenging was configuring the pagination with the filter component. pagination on its own wasn't too hard to figure out, but when adding filters and changing the list, I would lose part of the list, or lose the state when adding an item to the cart wouldn't be recognized when changing to a different filter. I was able to get around this by creating a state for all results as well as a filtered state, also making sure to adjust any "if'' checks to listen to the correct state. <br />
I'm also really proud of being able to create an errorhandler that I am able to wrap around my containers to handle any errors. This was built using an axios instance with the errorhandler and then axios interceptors to intercept any requests and responses; sending it through on success and throwing an error modal to the screen whenever an error is caught. This can still be improved by adding authentication or using redux and redux-saga to create a global state for more leaner code.</p>
<br />
<p>Thanks for checking out my web app. <br />
Feel free to follow me on github or reach out to me via linkedin.
</p>
<p><a href="https://www.linkedin.com/in/abdullah-canbolat-6ab794109/">https://www.linkedin.com/in/abdullah-canbolat-6ab794109/</a></p>








