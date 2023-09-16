"use client";

//Importerar use session (Här är fördelen med att använda session provider)
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  //Vi kollar ifall användaren är inloggad
  const session = useSession({
    required: true,
    //Om användaren inte är inloggad, skicka användaren till /signin sidan
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  return (
    <div>
      <div>{session?.data?.user?.email}</div>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

Home.requireAuth = true;
