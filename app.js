/** 
 *  Express application bootstrap
 *  @author Rinat Borovskikh <derrinat@gmail.com> 
 */


/**
 * Initializes all necessary modules, plugins and modes 
 */

var express     = require('express'),
    cons        = require('consolidate'),
    http        = require('http'),
    path        = require('path'),
    urlmanager  = require('./components/urlmanager/urlmanager');

/**
 * Creates an instace of express application 
 */
var app = express();

/**
 * Associate swig template engine with *.twig extensions 
 */
app.engine('.twig', cons.swig);

/**
 *  Register custom components
 */
app.set('urlmanager', urlmanager);

/**
 * Configure the application 
 */
app.configure(function(){
    app.set('port', 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'twig');
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

/**
 *  Include routing manager
 */
require('./front_controller.js').DefineRoute(app);
    
        
/**
 * Create an instace of a web-server 
 */
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port %d", app.get('port'));
});
