import React from "react";
import { Button } from "@/components/ui/button";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import { app } from "@/firebase";
import axios from "axios";

export default function LearnerOAuth() {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider)

      const response = await axios.post('/api/learner/oAuth', {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      })

      if(response.data.success){
        alert(response.data.message)
        navigate("/learner/dashboard")
      } else {
        console.log(response)
        alert("Error signing in with Google:");
      }
    } catch (error) {
      alert("Recheck your internet connection and try again later");
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
