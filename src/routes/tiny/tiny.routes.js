const TinyController = require('./tiny.controller');
module.exports = [
   {
       config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
       path: '/',
       method: 'GET',
       handler: TinyController.generate
   },
   {
       path: '/{hash}',
       method: 'GET',
       handler: TinyController.findHash
   }
];