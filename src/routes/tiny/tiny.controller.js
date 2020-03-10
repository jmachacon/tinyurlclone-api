const Tiny = require('../../models/tiny.model');
const shortid = require("shortid");

module.exports = {
    generate(req, reply) {
        
       if (!req.query.url) {
           return reply.response({er: 'url is required field'}).code(400);
       }
        const hash = shortid.generate();
        const tiny = {
            url: req.query.url,
            hash: hash,
            hostname: req.headers.host
        };
        return Tiny.findOne({ url: req.query.url }, tiny)
        .then(result => {
            if(!result){
                return Tiny.create(tiny).then(doc=>{
                    return reply.response(doc);
                }).catch(err2=> {
                    console.log(err2);
                    return reply.response(err2).code(500);
                });
            }else{
                return reply.response(result);
            }
        }).catch(err=> {
            console.log(err);
            return reply.response(err).code(500);
        });
   },
   findHash(req, reply) {
        if (!req.params.hash) {
            return reply.response({err: 'hash is required param'}).code(400);
        }
        return Tiny.findOne({ hash:req.params.hash, hostname: req.headers.host})
        .then(result => {
            if(result){
                return reply.redirect(result.url).permanent();
            }
            return reply.response({ 'message' : 'hash not found'});
        }).catch(err=> {
            console.log(err);
            return reply.response(err).code(500);
        });
    },
};