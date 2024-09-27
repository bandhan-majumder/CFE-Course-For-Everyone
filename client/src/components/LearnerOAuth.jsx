import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "@/firebase";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  clearError,
} from "@/features/learner/learnerSlice";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LearnerOAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear error when component mounts
    dispatch(clearError());

    // Clear error when component unmounts
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);
  const { error: errorMessage } = useSelector((state) => state.learner);

  const handleGoogleSignIn = async () => {
    dispatch(signInStart());
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const response = await axios.post("/api/learner/oAuth", {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      });

      if (response.data.success) {
        dispatch(signInSuccess(response.data));
        navigate("/learner/dashboard");
        alert("Successfully signed in");
      } else {
        dispatch(
          signInFailure(
            response.error.message ||
              "error signing up with Google. Try manual sign up."
          )
        );
      }
    } catch (error) {
      dispatch(signInFailure(error.message || "Error signing in with Google"));
      alert("Error signing in");
    }
  };

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
