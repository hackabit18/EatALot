## Our Idea

In a country where internet penetration has proliferated, farmers still haven’t witnessed it's power, given the fact that most of them (262 million) have an access to it.

We want to build a platform for the farmers, where they sell crops directly to the highest bidder, eliminating middle men.
However, some farmers don’t have the infrastructure/services/tools at their disposal. We solve this through a feature where farmers can view the facilities/services/shops nearest to their geolocation, and can buy items/services at the best price.

X-factor of our product is that we ensure quality check on crops using machine learning models trained on reliable training data-sets, thereby predicting the crop’s specific species, if it is diseased/healthy, for long will it remain fresh, etc.
We’ll incorporate image processing and classification algorithms to analyse user's leaf and/or soil samples to perform the above. 
We are currently identifying only on the most common types of infectious diseases in crop plants. However, we will be expanding this list much further and also include more features to heighten the AI capabilities of both the mobile and the web application.

Moreover, if one sells through a mandi, we’ll provide the average/maximum/minimum selling prices, so that they don't sell below the Minimum Selling Prices (MSP) set by the Government of India. We are also currently working on integrating AR into the mobile application which will show the users how fresh the products are/ if it is infected.

The mobile/web app will be available in 4 major languages— Hindi, Bengali, Tamil and English.

## Tools and Technologies used

* We  used Angular 6.0.8 at the front-end along with HTML, CSS and JS, with Bootstrap 4 to make it responsive.
* At the back-end, we used NodeJS and ExpressJS, with MongoDB as the database.
* The hybrid mobile application was developed using Ionic 4.
* The image processing part is done using Python and we have used OpenCV to process the image and use sci-kit-learn, Tensorflow and Keras to do the machine learning part.

## How to use the application

We have created both a mobile application and a web application for the end-users.

#### Using the web application

* Open myMandi website.
* If you're a first time user, register yourself in the website by clicking on the signup button and provide all the necessary details. If you're a farmer, click on the "register as farmer" option. Similarly, you will find options for registering as buyers and vendors.
* Once registered, you can login as buyer, farmer and vendor by clicking on the log in button in the homepage. 
* If you are a farmer/vendor and you want to sell your crops/farm equipment/service, first login as farmer/vendor and click on post a new crop/service card in the dashboard of the user, fil up the form for the new crop/product/service and post it. The new product/service will be added to the product list under the chosen category. 
* Similarly, if you want to buy something, login as farmer/buyer and click on "categories" button on the top, select the relevant category, find the product you want, select the quantiy required and place the order. You can also post a review for the product. 
* Placing an order will send a notification to the concerned farmer/vendor that you are willing to buy their product. They can either accept or reject your order. If they accept, the buyer will be notified that the offer has been accepted and will be provided with the contact details of the farmer. 
* To change the language of the website, click on the language button in the bottom of the website, select one of english, hindi, tamil and bengali.

#### Using the mobile application

* Using the mobile application is nearly the same as on the website. 
* The AR feature is exclusive to mobile users and to use this feature, click on Capture button in the app and point  it towards any crop (currently it supports only fruits and vegetables). The device will show the relevant information. 

## Future Insights

The scope of this project in the future is great as literacy and internet connectivity both penetrates deep into the country. What we are, and what we aspire to be, is a platform through with farmers in India can interact with their buyers and vendors without much influence from the middle men. We will be working on this project to make it a successful alternative to the existing, redundant mandi system present in some states in India. 
