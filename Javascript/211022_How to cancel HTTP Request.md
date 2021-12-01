# How to cancel an HTTP request in Node.js

If you’re making an HTTP request in Node.js there’s a good chance you’ll want to cancel it if it takes too long to receive a response. Or perhaps you have a slightly more complex situation where you’re making multiple requests in parallel, and if one request fails you want to cancel all of them. These sound like reasonable things to want to do, but solving these problems is often much less straightforward. You might even end up with a hacky workaround involving setTimeout() (it’s ok, I’ve been there too!).

Fortunately there’s a JavaScript API which gives us a standard way to cancel asynchronous tasks such as an in-flight HTTP request: the Abort API. This small but powerful API has been available in some web browsers since 2017, and now it’s available in Node.js too. Let’s take a look at what the Abort API is, how it works, and how we can use it to cancel an HTTP request in Node.js.

출처 : https://simonplend.com/how-to-cancel-an-http-request-in-node-js/