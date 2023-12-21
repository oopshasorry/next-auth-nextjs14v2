"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function SignInForm() {
    const [email, setEmail] = useState<null | string>(null);
    const { pending } = useFormStatus();//broken

    async function SignInWithEmail() {
        const signInResult = await signIn("email", {
            email: email,
            callbackurl: `${window.location.origin}`,
            redirect: false,
        });
        if(!signInResult?.ok){
            return toast({
                title: "well shit this didn't work...",
                description: "Something went wrong, please try again",
                variant: "destructive",
            });
        }
        console.log(pending);
        return toast ({
            title: "Check your email",
            description: "a magic link has been sent to you"+ {pending},
        })
    }
    return (
        <form action={SignInWithEmail}>
            <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input onChange={(e) => setEmail(e.target.value)}name="email" type="email" placeholder="name@example.com"></Input>
            </div>
            <Button type="submit" className="mt-4 w-full" aria-disabled={pending}>Login with email</Button>
        </form>
    );
}