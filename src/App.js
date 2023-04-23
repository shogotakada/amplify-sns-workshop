import React from 'react';
import {Amplify} from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AllPosts from './containers/AllPosts';
import PostsBySpecifiedUser from './containers/PostsBySpecifiedUser';



Amplify.configure(awsconfig);





const App = () => {



  return (
    <Authenticator>
    {({ signOut, user }) => (
        <HashRouter>
        <Switch>
          <Route exact path='/' component={AllPosts} />
          <Route exact path='/global-timeline' component={AllPosts} />
          <Route exact path='/:userId' component={PostsBySpecifiedUser}/>
          <Redirect path="*" to="/" />
        </Switch>
      </HashRouter>
    )}
  </Authenticator>
  )
}

export default App;