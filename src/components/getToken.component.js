import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class getToken extends Component {
  render() {
    const { user } = this.props.auth0;
    const getAccessTokenSilently  = this.props.auth0;
    const token = await getAccessTokenSilently({
        audience: 'https://api.example.com/',
        scope: 'read:parcels',
      });
      console.log("Token", token)
    return <div>Hello {user.name}</div>;
  }s
}

export default withAuth0(getToken);
