/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

require('dotenv').config({ path: '.env.dev' });
// import dotEnv from 'dotenv';
// dotEnv.config();


/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL Node configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/configuration.md
 */
export type configType = {
    auth: {
        clientId: string;
        authority: string;
        clientSecret: string;
        cloudDiscoveryMetadata: string;
        authorityMetadata: string
    },
    system: {
        loggerOptions: {
            loggerCallback: any;
            piiLoggingEnabled: boolean;
            logLevel: number
        }
    }
}


const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID!, // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: process.env.CLOUD_INSTANCE + process.env.TENANT_ID!, // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        clientSecret: process.env.CLIENT_SECRET!, // Client secret generated from the app registration in Azure portal
        // cloudDiscoveryMetadata: '',
        // authorityMetadata: ''
    },
    system: {
        loggerOptions: {
            loggerCallback(_loglevel: any, message: string, _containsPii: any) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 3,
        }
    }
} as unknown as configType;

const REDIRECT_URI = process.env.REDIRECT_URI;
const POST_LOGOUT_REDIRECT_URI = process.env.POST_LOGOUT_REDIRECT_URI;
const GRAPH_ME_ENDPOINT = process.env.GRAPH_API_ENDPOINT + "v1.0/me";

export const appConfig = {
    msalConfig,
    REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI,
    GRAPH_ME_ENDPOINT
}

// module.exports = {
//     msalConfig,
//     REDIRECT_URI,
//     POST_LOGOUT_REDIRECT_URI,
//     GRAPH_ME_ENDPOINT
// };