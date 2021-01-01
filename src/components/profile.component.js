import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  render() {
    // `this.props.auth0` has all the same properties as the `useAuth0` hook
    const { user } = this.props.auth0;

    const {getAccessTokenSilently}  = this.props.auth0;
    const token = getAccessTokenSilently({
        audience: 'https://pamw-damian-smugorzewski-api.herokuapp.com'
      });
      console.log("Token", token)

    console.log(user);
    var name = user === undefined ? "test" : user.name;
    return <div>Hello {name}</div>;
  }
}

export default withAuth0(Profile);