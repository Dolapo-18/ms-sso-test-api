/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// var express = require('express');
import express  from 'express'

// const authProvider = require('../auth/AuthProvider');
import authProvider from '../auth/AuthProvider'
// const { REDIRECT_URI, POST_LOGOUT_REDIRECT_URI } = require('../authConfig');
import { appConfig } from '../authConfig';

const router = express.Router();

const { REDIRECT_URI, POST_LOGOUT_REDIRECT_URI } = appConfig;

router.get('/signin', authProvider.login({
    scopes: [],
    redirectUri: REDIRECT_URI!,
    successRedirect: '/'
}));

router.get('/acquireToken', authProvider.acquireToken({
    scopes: ['User.Read'],
    redirectUri: REDIRECT_URI,
    successRedirect: '/users/profile'
}));

router.post('/redirect', authProvider.handleRedirect());

router.get('/signout', authProvider.logout({
    postLogoutRedirectUri: POST_LOGOUT_REDIRECT_URI
}));

export default router;