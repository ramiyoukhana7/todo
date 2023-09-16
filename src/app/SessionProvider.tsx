"use client";
//Importerar SessionProvider för ge Next Auth tillgång till session state
import { SessionProvider as Provider } from "next-auth/react";

//Vi idientiferar children med typescript
type Props = {
  children: React.ReactNode;
};

export default function SessionProvider({ children }: Props) {
  return (
    //Vi wrappar children (vår react komponent) med session provider för att ge next auth tillgång hela projektet
    //På så sätt har Next Auth tillgång session state över hela projektet
    <Provider>{children}</Provider>
  );
}
