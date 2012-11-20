/**
 *  Simple front controller and routes manager
 *  @author Rinat Borovskikh <derrinat@gmail.com>
 * 
 */

/**
 *  Base controller for all project contollers.
 *  It implements main controller methods, such as render (template render) and send method.
 */
BaseController = function(request, response) {
    this.request  = request;
    this.response = response;

    this.render = function(template, vars) {
        return this.response.render(template, vars);
    };

    this.send = function(content) {
        return this.response.send(content);
    };
};

/**
 *  "DefineRoute" tries to resolve user request (according urlmanager and decode rules), 
 *  and invokes target request controller and action with request parameters. 
 *
 *  If target controller and action were not found, it initializes 404 error response.
 */
exports.DefineRoute = function(app)
{
    app.get('*', function(request,response) 
    {
        /* Calls urlmanager.resolve to resolve url */
        var resolved   = app.settings.urlmanager.resolve(request.url);
        
        if(resolved.controller)
        {
            /* invoke conroller it exists and start action */
            require('fs').exists(__dirname + '/controllers/' + resolved.controller + '.js', function(exists) {

                if(exists)
                {
                    var middleware = require('./controllers/' + resolved.controller);
                    var controller = new middleware.controller(request, response, app, resolved.params);
                    var action        = !resolved.action ? 'indexAction' : resolved.action + 'Action';
                    
                    if(typeof controller[action] == 'function') 
                    {
                        controller[action]();
                        delete controller;
                    } 
                }
                else
                {
                    app.settings.urlmanager.send404(request, response);
                }
            });
        }
        else
        {
            app.settings.urlmanager.send404(request, response);
        }
    })
}
