import fireStoreDatabase from "../Config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import moment from "moment/moment";
export const bookDoctorAppointment = async (values) => {
  try {
    await addDoc(collection(fireStoreDatabase, "appointments"), values);
    return { success: true, message: "Appointment booked successfully" };
  } catch (error) {
    console.error(error.message);
    return { success: false, message: error.message };
  }
};

export const getDoctorAppointmentsById = async (doctorId, date) => {
  try {
    const qry = query(
      collection(fireStoreDatabase, "appointments"),
      where("doctorId", "==", doctorId),
      where("date", "==", date)
    );

    const snapShot = await getDocs(qry);
    const data = snapShot.docs.map((doc) => doc.data());
    return { success: true, data };
  } catch (error) {
    console.error(error.message);
    return { success: false, message: error.message };
  }
};

export const getDoctorAppointmentsByDoctorId = async (doctorId) => {
  try {
    const qry = query(
      collection(fireStoreDatabase, "appointments"),
      where("doctorId", "==", doctorId)
    );

    const snapShot = await getDocs(qry);
    const appointments = snapShot.docs.map((doc) => {
      return {
        ...doc.data(),
        key: doc.id,
      };
    });
    return { success: true, appointments };
  } catch (error) {
    console.error(error.message);
    return { success: false, message: error.message };
  }
};

export const getDoctorAppointmentsByUserId = async (userId) => {
  try {
    const qry = query(
      collection(fireStoreDatabase, "appointments"),
      where("userId", "==", userId)
    );

    const snapShot = await getDocs(qry);
    const appointments = snapShot.docs.map((doc) => {
      return {
        ...doc.data(),
        key: doc.id,
      };
    });
    return { success: true, appointments };
  } catch (error) {
    console.error(error.message);
    return { success: false, message: error.message };
  }
};

export const updateAppointmentStatus = async (userId, bookedOn, data) => {
  try {
    const qry = query(
      collection(fireStoreDatabase, "appointments"),
      where("userId", "==", userId),
      where("bookedOn", "==", bookedOn)
    );

    //  console.log(userId);

    const id = (await getDocs(qry)).docs[0].id;

    //  console.log(id);

    const res = await setDoc(doc(fireStoreDatabase, "appointments", id), data);

    //  console.log(data);

    return { success: true, message: "Appointment updated successfully" };
  } catch (error) {
    console.error(error.message);
    return { success: false, message: error.message };
  }
};
