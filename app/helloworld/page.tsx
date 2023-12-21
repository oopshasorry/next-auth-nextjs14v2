import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SigninWithGithub from "../components/SignInWithGithub";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";
import SignInForm from "../components/SignInForm";
import SigninWithAzureB2C from "../components/SignInWithAzureB2C";


export default async function AuthRoute() {
    const session = await getServerSession(authOptions)

    if(session){
        return redirect('/')
    }
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>HELLO!!</CardTitle>
                    <CardDescription>Meow</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col">
                        <SignInForm></SignInForm>
                        <SigninWithGithub></SigninWithGithub>
                        <SigninWithAzureB2C></SigninWithAzureB2C>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

}