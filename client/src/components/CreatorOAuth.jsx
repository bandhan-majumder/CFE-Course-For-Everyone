import React from "react";
import { Button } from "@/components/ui/button";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import { app } from "@/firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { googleSignInSuccess } from "@/features/creator/creatorSlice";

export default function CreatorOAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider)

      const response = await axios.post('/api/creator/oAuth', {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        profilePicture: resultsFromGoogle.user.photoURL,
      })

      console.log("response is : ", response)
      if(response.data.success){
        dispatch(googleSignInSuccess(response.data))
        alert("Signed in successfully")
        navigate("/")
      } else {
        console.log("Else: ", response)
        alert("Error signing in with Google:");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <Button
        variant="outline"
        className="w-full bg-red-600 text-white rounded-full"
        onClick={handleGoogleSignIn}
      >
        <AiFillGoogleCircle className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>

    </div>
  );
}
