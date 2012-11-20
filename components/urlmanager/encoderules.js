/**
 * URLManager encode rules list
 * Each rule is simple key:value property
 *  key     - raw url
 *  value   - encoded url (smart url)
 */
 
exports.encoderules = 
{
    '\/catalog\/product\/[\?]name=(.*)&id=([0-9]+)$' : '/catalog/$1-$2.html',
};
