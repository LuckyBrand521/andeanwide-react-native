import {connect} from 'react-redux';

export default async function authHeader() {
  const accessToken = await ss.getData('access_token');
  try {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
  } catch (error) {
    return '';
  }
}
