/**
 * URLManager component
 * 
 * @author Rinat Borovskikh <derrinat@gmail.com>
 */

/**
 * This returns url parameters object (key:value)
 * 
 * @param  array matches
 * @param  object params
 * @return object toreturn
 */
function extractParams(matches, params)
{
    var toreturn = {}
    
    if(Object.keys(params).length> 0)
    {
        for(key in params)
        {
            toreturn[key] = matches[params[key]]
        }
    }    
    return toreturn;
}

/**
 * This implements URL parameter values in smart url
 * 
 * @param  array  matches parameters array
 * @param  strung rule URL template
 * @return string completed smart URL
 */
function embedParams(matches, rule)
{
    return rule.replace(/\$(.+?)/g, function(index) { return matches[index.replace('$', '')]});
}

/**
 * This gets url and tries to resolve it 
 * If URL wasnt resolved with decode rules, it checks controller file in controllers directory. 
 * In case not found, it returns false, else controller object 
 * 
 * @param string url URL to resolve 
 * @return object toreturn
 */
exports.resolve = function(url)
{
    
    /* Try to resolve URL with decode rules from decode rules list */
    var decoderules = require('./decoderules').decoderules,
        toreturn    = {};
    
    for(var i=0; i<decoderules.length; i++)
    {
        var matches = url.match(decoderules[i].rule);
        if(matches != null)
        {
            toreturn.controller = decoderules[i].controller;
            toreturn.action         = decoderules[i].action;
            toreturn.params        = extractParams(matches, decoderules[i].params);
            return toreturn;
        }
    }
    
    /* Default     behavior, parse URL and try to extract controller and action (in success case returns contoller object) */
    var urlparts  = require('url').parse(url, true),
        pathparts = urlparts['pathname'].split('/').filter(function(val){return val !='';});
    
    if(pathparts.length>0)
    {
        toreturn.controller = typeof pathparts[0] != 'undefined' ? pathparts[0] : false;
        toreturn.action        = typeof pathparts[1] != 'undefined' ? pathparts[1] : false;
        toreturn.params        = urlparts['query'];
        return toreturn;
    }
    
    return false
}

/**
 * This gets raw URL and tries to make smart URL in accordance with defined encode rules
 * 
 * @param strung url raw URL to encode
 * @return strung url decoded and prepared URL string
 */

exports.construct = function(url)
{
    var toreturn    = url,
        encoderules = require('./encoderules').encoderules;
    
    if(Object.keys(encoderules).length> 0)
    {
        for(rule in encoderules)
        {
            var matches = url.match(rule);
            
            if(matches != null)
            {
                toreturn = embedParams(matches, encoderules[rule]);
                break;
            }    
        }
    }
    
    return require('../common/strings').urlPrepare(toreturn);
}

/**
 * This just renders 404 template and sends 404 response
 * 
 * @param object request
 * @param object response
 */
exports.send404 = function(request, response)
{
    response.status(404);
    response.render('404', { url: request.url });
    return;
}
