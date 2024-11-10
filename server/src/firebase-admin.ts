import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import serviceAccount from '../../firebase.json';

const apps: number = getApps().length;
const firebase: App = apps ? getApp('server') : initializeApp({
  credential: cert(serviceAccount as any)
}, 'server');

export const authentication: Auth = getAuth(firebase);