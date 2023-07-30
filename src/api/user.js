import fireStoreDatabase from "../Config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import CryptoJS from "crypto-js";

export const CreateUser = async (user) => {
  try {
    const qry = query(
      collection(fireStoreDatabase, "users"),
      where("email", "==", user.email)
    );

    const querySnapshot = await getDocs(qry);
    if (querySnapshot.size > 0) {
      throw new Error("User already exists");
    } else {
      const encryptedPassword = CryptoJS.AES.encrypt(
        user.password,
        "befit"
      ).toString();

      user.password = encryptedPassword;
    }

    const docRef = collection(fireStoreDatabase, "users");
    await addDoc(docRef, user);
    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    return error;
  }
};

export const LoginUser = async (user) => {
  try {
    const qry = query(
      collection(fireStoreDatabase, "users"),
      where("email", "==", user.email)
    );

    const querySnapshot = await getDocs(qry);

    if (querySnapshot.size > 0) {
      // Decrypt password
      const encryptedPassword = querySnapshot.docs[0].data().password;
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, "befit");
      const password = bytes.toString(CryptoJS.enc.Utf8);

      if (password === user.password) {
        return {
          success: true,
          message: "User logged in successfully",
          user: {
            ...querySnapshot.docs[0].data(),
            id: querySnapshot.docs[0].id,
          },
        };
      } else {
        throw new Error("Invalid Credentials");
      }
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await getDocs(collection(fireStoreDatabase, "users"));

    const usersList = users.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
        key: doc.id,
      };
    });

    return {
      success: true,
      usersList,
    };
  } catch (error) {
    return error;
  }
};
export const updateUserById = async (user) => {
  try {
    await setDoc(doc(fireStoreDatabase, "users", user.id), user);
    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getUserById = async (id) => {
  try {
    const res = await getDoc(doc(fireStoreDatabase, "users", id));
    return {
      success: true,
      user: {
        ...res.data(),
        id: res.id,
      },
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};
