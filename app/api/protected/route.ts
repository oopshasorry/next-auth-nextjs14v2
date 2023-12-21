'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth"


export async function GET (request: Request){

    const session = await getServerSession(authOptions);
    console.log(session)

    if (session){
        console.log("wow")
        return new Response('Noice :D', {
            status: 200,
          })
    } else {
        console.log("401")
        return new Response('NO Go AWAY!!!', {
            status: 401,
          })
    }
    
}

