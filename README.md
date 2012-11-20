Dynamic routing generator and a simple URL manager
======
Hi everybody!

Here is a robust dynamic routing generator and a simple URL manager for your express application. These components work together to make a dynamic route based on a given URL.
It’s very easy to get it work, simply follow 4 steps to get it started.

1. Clone a repository and run "npm install" in order to have all dependencies installed.
2. Define decode rules for your URL`s and put them into component/urlmanager/decoderules.js (please look at the example below).
3. Create your controllers with actions to process requested URL`s and put them into controller folder (please look at an examples below).
4. Start your application (node app.js), call URL in your browser and enjoy it!

A bit more details.
All requests will be processed by the front controller, which is, basically, the main one and all other controllers extend the main one. The front controller tries to resolve an URL and to call a related  target controller with a target action. Both of them (controller and action) are defined based on a rewrite rules. So basically URL`s will be resolved in accordance with decode rules in /components/urlmanager/decoderules.js.

The folder "controllers" stores our target controllers. Each target controller should have default action named "indexAction", which will be called when target action is not defined. All other action should be named according to naming convention (such as “productAction” etc - please refer to catalog controller as an example).

All decode rules (which are being used to process a request and create a dynamic route) are stored in component/urlmanager/decoderules.js (please look at the decode rule example for product page URL).

Encode rules for user’s URLs are stored in component/urlmanager/encoderules.js. URLManager also provides an URL construct method which is being called from a target controller and which allow us to create an encoded smart URL based on a raw one.

The "views" folder contains all the templates which are called from a certain controller to render some information which is being passed from the controller.

URL test examples:

youdomain.com:3000/catalog/

youdomain.com:3000/catalog/canon-eos-600D-1.html