import App from './src/app';

import API from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import config from './src/aws-exports';
import Amplify from 'aws-amplify';
Amplify.configure(config);
API.configure(config);
PubSub.configure(config);

export default App;