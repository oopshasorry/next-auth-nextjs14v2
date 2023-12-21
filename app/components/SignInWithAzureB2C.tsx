"use client"

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";


export default function SigninWithAzureB2C() {

    return (

        <Button
            onClick={() =>
                signIn('azure-ad-b2c', {
                    callbackUrl: `${window.location.origin}`,
                })
            }
            className="mt-5"
            variant={"secondary"}>
            Login with Azure
        </Button>
    );
}

