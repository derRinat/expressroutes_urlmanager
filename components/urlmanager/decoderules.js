/**
 * URLManager decode rules list
 * Each rule is a simple object with next attributes:
 *  rule                   - URL decode rule
 *  params                 - Params to extract from URL in accordance with regexp matches
 *  contoller              - Request controller
 *  action    (optional)   - Controller action, default action is indexAction, if not defined in rule 
 */

exports.decoderules = [
        
        {
            'rule': '\/catalog\/(.*)\-([0-9]+).html$',
            'params': {'name':1, 'id':2},
            'controller': 'catalog',
            'action': 'getById'     
        }
        
];
