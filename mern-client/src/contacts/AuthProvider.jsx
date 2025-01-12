import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); // Store the user's role as null initially

  // Create user with email and password
  const createUser = (email, password, role) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Save user role to Firestore
        return setDoc(doc(db, "users", user.uid), {
          role: role, // Store the role (e.g., "food-manager" or "inner-pantry")
        })
          .then(() => {
            setUserRole(role); // Set the role after successful registration
          })
          .catch((error) => {
            console.error("Error saving role to Firestore:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setLoading(false);
      });
  };

  // Google login
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        // Fetch the role from Firestore after Google login
        return getDoc(doc(db, "users", user.uid))
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUserRole(docSnap.data().role); // Set the role from Firestore
            } else {
              console.log("No role found for this user");
            }
          })
          .catch((error) => {
            console.error("Error fetching role from Firestore:", error);
          });
      })
      .catch((error) => {
        console.error("Error logging in with Google:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Email login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Fetch the user's role from Firestore
        return getDoc(doc(db, "users", user.uid))
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUserRole(docSnap.data().role); // Set the role from Firestore
            } else {
              console.log("No role found for this user");
            }
            // Return userCredential so it can be used later
            return userCredential;
          })
          .catch((error) => {
            console.error("Error fetching role from Firestore:", error);
          });
      })
      .catch((error) => {
        console.error("Error logging in with email:", error);
        throw error; // Rethrow the error to handle it in the calling function
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Logout function
  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
        setUserRole(null); // Reset the role when logging out
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        setLoading(false);
      });
  };

  // Listen for user state changes and fetch user role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch the user's role from Firestore when the user logs in
        getDoc(doc(db, "users", currentUser.uid))
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUserRole(docSnap.data().role); // Set the role
            } else {
              console.log("No role found for this user");
            }
          })
          .catch((error) => {
            console.error("Error fetching role from Firestore:", error);
          });
      } else {
        setUser(null);
        setUserRole(null); // Reset the role when logged out
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    createUser,
    loginWithGoogle,
    loading,
    login,
    logOut,
    userRole, // Provide the role in the context value
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
