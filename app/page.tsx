import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import { LogOut } from "lucide-react";
import LogoutButton from "./components/LogoutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";



async function getData() {
  const res = await fetch(process.env.NEXTAUTH_URL+"/api/protected",{
    method: "GET",
    credentials: 'include'
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    //throw new Error('Failed to fetch data')
  } else {
    //console.log(res)

    return res.text()
  }
 

}


export default async function Home() {

  const session = await getServerSession(authOptions);
  const data = await getData();
  return (
    <div className="p-10">
      <h1>Hello from the index page, this is public route</h1>

      {session ? (
        <div>
          <h1>you are logged in</h1>
          <h2>{data}</h2>
          <LogoutButton></LogoutButton>
        </div>

      ) : (
        <div> 
          <h1>please login to see something cool</h1>
          <Button asChild>
            <Link href='/auth'>Login</Link>
          </Button>
        </div>
      )}
    </div>
  );

}
