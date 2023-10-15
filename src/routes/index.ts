/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
*/
import express, { Request, Response, NextFunction } from 'express';
import { AccountInfo, AuthorizationCodeRequest, AuthorizationUrlRequest } from "@azure/msal-node";


import "express-session";
declare module "express-session" {
  export interface SessionData {
    isAuthenticated: boolean,
    account: AccountInfo,
    tokenCache: string,
    accessToken: string,
    idToken: string,
    pkceCodes: {
      challengeMethod: string,
      challenge: string,
      verifier: string
    },
    authCodeUrlRequest: AuthorizationUrlRequest,
    authCodeRequest: AuthorizationCodeRequest
  }
}




const router = express.Router();

router.get('/', function (req: Request, res: Response, next: NextFunction) {
    res.render('index', {
        title: 'MSAL Node & Express Web App',
        isAuthenticated: req.session.isAuthenticated,
        username: req.session.account?.username,
    });
});

export default router;
