import App from './src/app';

import API from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import config from './src/aws-exports';
import Amplify, { Storage, Auth } from 'aws-amplify';
API.configure(config);
PubSub.configure(config);
Storage.configure(config);
Auth.configure({
    region: config.aws_cognito_region,
    userPoolId: config.aws_user_pools_id,
    userPoolWebClientId: config.aws_user_pools_web_client_id
})

Auth.signIn('admin@hotmai.com', 'admin123')
    .then(x => console.log('SUCCESS:: ', x))
    .catch(x => console.log('ERROR:: ', x));

export default App;