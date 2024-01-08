import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";

import { TableStorageAdapter } from "@auth/azure-tables-adapter"
import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables"
import AzureADB2C from "next-auth/providers/azure-ad-b2c";


const credential = new AzureNamedKeyCredential(
    process.env.AZURE_ACCOUNT as string,
    process.env.AZURE_ACCESS_KEY as string
);
const authClient = new TableClient(
    process.env.AZURE_TABLES_ENDPOINT as string,
    "auth",
    credential
);
export const authOptions ={
    
    adapter:TableStorageAdapter(authClient),

    pages: {
        signIn: '/auth',
    //     //signOut: '/auth/signout',
    //     //error: '/auth/error', // Error code passed in query string as ?error=
    //     //verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth' // New users will be directed here on first sign in (leave the property out if not of interest)
       },
       
      session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "database",
      
        // Seconds - How long until an idle session expires and is no longer valid.
        //maxAge: 30 * 24 * 60 * 60, // 30 days
        maxAge: 5 * 60, // 5 minutes
      
        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        //updateAge: 24 * 60 * 60, // 24 hours
        updateAge: 0, // Update always

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        // generateSessionToken: () => {
        //   return randomUUID?.() ?? randomBytes(32).toString("hex")
        // }
      },
    
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET_ID as string,
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        }),
        AzureADB2C({
            tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
            clientId: process.env.AZURE_AD_B2C_CLIENT_ID as string,
            clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET as string,
            primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
            authorization: { params: { scope: "offline_access openid" } },
            checks:["pkce"],
            client: {
                token_endpoint_auth_method: 'none'
            },
        })
    ]
} satisfies NextAuthOptions