'use strict';

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
  me: async (ctx) => {
    strapi.log.info(ctx);
    const user = ctx.state.user;    
    // if (!user) {
    //   //return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);

    //   return ctx.send(null)
    // }

    // const data = await strapi.services.snippet.fetch({user:user.id});  

    // if(!data){
    //   return ctx.notFound();
    // }

    ctx.send('1212312');
  } 
};
