const Express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = Express.Router();
module.exports = (params) => {

  const {speakerService} =params;

  router.get('/', async(request, response) => {
    // visit Counter
    // if(!request.session.visitcount){
    //   request.session.visitcount = 0;
    // }
    // request.session.visitcount += 1;
    // console.log(`number of visits: ${request.session.visitcount}`);
    const topSpeakers = await speakerService.getList();
    console.log(topSpeakers);
    response.render('layout', { pageTitle: 'Welcome', template: 'index' });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));
  return router;
};
