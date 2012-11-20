/**
 * Project Controller example, implements defined actions (default action is indexAction)
 * @autor Rinat Borovskikh <derrinat@gmail.com> 
 */

var CatalogController = function(request, result, app, params) {
    
    // extend BaseController to use predefined render, send etc.
    BaseController.call(this,request, result);
    this.urlmanager = app.settings.urlmanager;
    
    /* controller default action */
    this.indexAction = function() {
        
        var    products = [
                        {'name': 'Canon EOS 600D', 'link': this.urlmanager.construct('/catalog/product/?name=canon-eos-600D&id=1')},
                        {'name': 'Nikon D5200', 'link': this.urlmanager.construct('/catalog/product/?name=nikon-d5200&id=2')},
                        {'name': 'Sony SLT-A57K', 'link': this.urlmanager.construct('/catalog/product/?name=sony-slt-a57k&id=3')}
                       ];
        
        this.render('catalog/index', {'products':products});
                
    };
    
    
    this.getByIdAction = function() {
        this.render('catalog/detail', {'name':params.name, 'id':params.id, 'catalogLink':'/catalog/'});
    };
};

exports.controller = CatalogController;
