// export default router;
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import express, {Request, Response, NextFunction} from 'express'
const router = express.Router();

// var fetch = require('../fetch');
import fetch from "../fetch";

import {appConfig} from '../authConfig';
const {GRAPH_ME_ENDPOINT} = appConfig;

// custom middleware to check auth state
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }

    next();
};

router.get('/id',
    isAuthenticated, // check if user is authenticated
    async function (req: Request, res: Response, next: NextFunction) {
        res.render('id', { idTokenClaims: req.session.account!.idTokenClaims });
    }
);

router.get('/profile',
    isAuthenticated, // check if user is authenticated
    async function (req: Request, res: Response, next: NextFunction) {
        try {
            const graphResponse = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken!);
            res.render('profile', { profile: graphResponse });
        } catch (error) {
            next(error);
        }
    }
);

export default router;