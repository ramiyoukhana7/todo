import { firebaseAuth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/signin",
  },
  //Vi speciferar vilken provider vi använder
  providers: [
    //I det här fallet använder vi email och lösenord
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      //Credentials from signin funktionen (Email och lösenord)
      //skickas till authorize funktionen
      async authorize(credentials): Promise<any> {
        //Vi kallar på firebase funktionen att logga in med email och lösenord
        return await signInWithEmailAndPassword(
          firebaseAuth,
          (credentials as any).email,
          (credentials as any).password
        )
          //Sedan kollar vi ifall användarens credentials matchar med vår databas
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            } else {
              return null;
            }
          })
          .catch((error) => console.log(error));
      },
    }),
  ],
};

export default nextAuth(authOptions);
