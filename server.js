const Express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const routes = require('./routes');

const app = new Express();
const port = 3000;
app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: ['bambarbia', 'kergudu'],
  })
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'Roux Meetups';

app.use(Express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  try {
    const names = await speakerService.getNames();
    response.locals.speakerNames =names;
    // console.log(response.locals);
    return next();
  } catch(err){
    return next(err);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakerService,
  })
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express is listening on port ${port}`);
});
