import { db } from "../components/firebase-config";

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'

const feedbackCollectionRef = collection(db, 'feedback')
class FeedbackServices {
    addFeedback = (newFeedback) => {
        return addDoc(feedbackCollectionRef, newFeedback)
    }
    getAllFeedback = () => {
        return getDocs(feedbackCollectionRef)
    }
    deleteFeedback = (id) => {
        const feedbackDoc = doc(db, 'feedback', id)
        return deleteDoc(feedbackDoc)
    }
    editFeedback = (id, updatedFeedback) => {
        const feedbackDoc = doc(db, 'feedback', id)
        return updateDoc(feedbackDoc, updatedFeedback)
    }

}

export default new FeedbackServices()