# What is really the difference between Cookie, Session and Tokens that nobody is talking about ?

출처 : [Dev.to](https://dev.to/dev_emmy/what-is-really-the-difference-between-cookie-session-and-tokens-when-it-comes-to-authentication-4164)

To understand the difference between cookies, sessions and tokens we need to get back on the basics. Let's say you want to login to your bank account and you are provided with login screen where you can input your username and password and when you hit the submit button your username and password goes to the bank server.

Then the server need to verify that you are really who you claim to be, so the bank will check against the database to see if your credentials match and if everything looks good the server will return your account overview page but will also create a session in the database with your login event and gives back to you the session_id inform of a cookie, in other words you have exchanged your username and password for this cookie containing the seesion_id, You send your username and password and then you recieve a cookie with a session_id. So the server will store the session information in the database while you will only have the session_id in the cookie which is stored in the file system of your computer, the session_id is randomly generated so it would be hard to guess, and when you logout, the session will be deleted on the server side but also the server will instruct your browser to delete the cookie containing the session_id as well.

Next time when you login and you tend to request a page, your browser will automatically send a cookie containing a session_id which the server will check to see if it is still valid.It is essential to know that the next time your username and password are nolonger required in order to identify you.

Think of a cookie like your Gym_membership_card, it stores your membershipID, additional with other details and when you scan it at the entry, it checks if your membership is still valid and let's you in. So as like with your gym card, a cookie with your session_id only works with a specific website, like you can not use your gym card to enter office building forexample hte same goes to your cookie, you can not use it log into another different website.

So bank server will keep the session active as long as you keep interacting with the server, if for sometimes you are inactive and after that you visit a new page, the server will notice this period of inactivity and prompt you to provide your username and password again as a security measure.
So the approach mentioned above is called a cookie-based authentication.

Accordingly this approach used a session on the server to handle the authentication.The cookie is only a medium used to transport the sessionID and it is used because it is convinient, the browser will always send a cookie with every request. The same goes with membership_card, It is just convinient to have a card instead of showing you ID everytime but you can probably load the card on your phone and use your phone to get in, so the storage has changed but the concept remains the same, I mean in this case the bank stores the session information on the server side and you cannot see the contents of it but at the same time it can store othe information on the client side on your browser using another cookie forexample: which was the lastpage you visited or what is your preffered font-size or color or anyother less sensitive information.

## WHY SERVERS DOES NOT STORE ALOT OF INFORMATION IN THE COOKIES ?
But let's talk about why server doesn't store alot of information in the cookies, this is because the cookies cannot be trusted as they are coming from the client, this is why servers prefer to work with their databases where ideally only valid infromation exists.

An alternative to this is to store information on the client and to sign it, in this scenario anyone holding the signature can quickly check if the data was manipulated or not and one way to do this is to use JSON WEB TOKENS, so basically cookie-based authentication has worked really well for many years but it is slowly becoming outdated atleast in some cases.

Let's say now that you want to install an app on your phone which can help you with your financies and help keep track of your spendings using your bank account information, and what you don't want to do is to give your username and password to this app which is not associated with your bank, in this case your bank will redirect you to your bank account you will give in your username and password and your bank will ask you "hey John would you like to give this app access to your transactions?" and if you click yes the app will receive a token granting access to your transactions but the app will only view transactions, it will not be able to wire transfers or to see other details which you would normally be able to see when you login in your bank account. This token is like a randomly generated password if you would wish to say, it like when you we're at the hotel and you get a 1 day wifi password. Am sure you might have seen a similar procedure to this approach anytime you have used Facebook, Google or MicroSoft to grant information for your user profile to a third-party website.
So in this exchange you never exchange you username and password, if you later want you can easily revoke access to your bank account by invalidating the token that was generated. So one of the most commonly used protocols for such scenario's are both openID Connect but also JON WEB TOKENS.

## SO YOU ARE PROBABLY WONDERING WHAT IS THE DIFFERENCE BETWEEN A TOKEN AND A SESSION STORED IN A COOKIE:
The difference is that tokens are typically following a standard while sessions are implemented as needed by the server.
Additionally, tokens tend not to need a session on the server but they may have one.

In the case of JWT tokens, the token contain the session information as well, it contains actual data about you as a user.
When using tokens it is essential to notice that now the interaction typically involves multiple parties that may or may not trust one another. So you trust your bank with your bank login{username and password} but you may not trust this third-party app that you found in the AppStore

Another difference is that a token has a limited lifetime and a new token needs to be generated once it expires, the technical term is "refreshed"

A token can also grant access to a subset of data a particular user or entity has, eg: you have only granted access to your transactions but not to other information.

Most of the time tokens are being sent using HTTP headers and not cookies, the reason for that is nowadays many interactions happen out of browsers for-example from apps on your phone and it simply does not make sense to use cookies for that.

"Cookies are sent as HTTP headers but the browsers handles them differently than the other headers"

## CONCLUSION
So both session-based/cookie-based and token-based approaches are widespread and typically they are used in parallel for-example a session/cookie based approach is deployed when using the website but token-based approach is preferred when using the app from the same service. So it is essential to understand how both work.

I hope that was useful and now are able to differentiate between cookies, sessions and tokens.
