import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  Query,
  setDoc,
  where,
} from "firebase/firestore";
import fireStoreDatabase from "../Config/firebaseConfig";

export const addDoctor = async (values) => {
  try {
    console.log(values);
    await setDoc(doc(fireStoreDatabase, "doctors", values.id), values);
    return {
      success: true,
      message: "Applied successfully,Please wait for approval",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const getDoctorById = async (id) => {
  try {
    const qry = query(
      collection(fireStoreDatabase, "doctors"),
      where("id", "==", id)
    );

    const doctorSnapshot = await getDocs(qry);
    //  console.log(doctorSnapshot);
    if (doctorSnapshot.size > 0) {
      return {
        success: true,
        message: "Doctor found",
        data: doctorSnapshot.docs[0].data(),
      };
    } else {
      throw new Error("Doctor not found");
    }
  } catch (error) {
    return error;
  }
};

export const getAllDoctors = async () => {
  try {
    const doctors = await getDocs(collection(fireStoreDatabase, "doctors"));
    const doctorsList = doctors.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
        key: doc.id,
      };
    });

    return {
      success: true,
      doctorsList: doctorsList,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateDoctorById = async (doctor) => {
  try {
    await setDoc(doc(fireStoreDatabase, "doctors", doctor.id), doctor);
    return {
      success: true,
      message: "Doctor updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
