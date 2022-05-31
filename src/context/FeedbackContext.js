import { createContext, useState, useEffect } from 'react'
import feedbackServices from '../sevices/feedback.services'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedback
  const fetchFeedback = async () => {
    // const response = await fetch(`/feedback?_sort=id&_order=desc`)
    // const data = await response.json()
    const data = await feedbackServices.getAllFeedback()
    console.log(data.docs);
    setFeedback(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    // setFeedback(FeedbackData)
    setIsLoading(false)
  }

  // Add feedback
  const addFeedback = async (newFeedback) => {
    try {
      await feedbackServices.addFeedback(newFeedback)
      fetchFeedback()
    } catch (error) {
      console.log(error);
    }
    // fetchFeedback()
    // const response = await fetch('/feedback', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newFeedback),
    // })

    // const data = await response.json()

    // setFeedback([newFeedback, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await feedbackServices.deleteFeedback(id)
      fetchFeedback()
      // await fetch(`/feedback/${id}`, { method: 'DELETE' })
      // setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update feedback item
  const updateFeedback = async (id, updItem) => {
    await feedbackServices.editFeedback(id, updItem)
    fetchFeedback()
    // const response = await fetch(`/feedback/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(updItem),
    // })

    // const data = await response.json()

    // setFeedback(feedback.map((item) => (item.id === id ? updItem : item)))
    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
