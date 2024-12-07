import { createContext, useEffect, useState } from 'react'
// import { stats } from '../stats'
import { beginnerModules } from '../modules'
import axios from 'axios'

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
  const [stats, setStats] = useState([])
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingApi, setLoadingApi] = useState(false)
  // const [loadingTopics, setLoadingTopics] = useState(false)
  const [apiResponse, setApiResponse] = useState([])
  // const [beginnerModules, setBeginnerModules] = useState([...beginnerModules])

  function getWrongAnswers() {
    let wrongAnswersList = []

    beginnerModules.map((module, index1) => {
      wrongAnswersList.push({
        title: module.name,
        wrongAnswers: [],
      })

      module.questions.map((question, index2) => {
        if (question.answer !== stats[index1].answersList[index2].answer) {
          wrongAnswersList[index1].wrongAnswers.push({
            question: question.question,
            answer: stats[index1].answersList[index2].answer,
          })
        }
      })
    })
    return wrongAnswersList
  }

  function computeStrugglingLessons() {
    const strugglingLessons = []
    beginnerModules.map((module, index) => {
      if (
        stats[index].quizScore < module.passingScore &&
        stats[index].isFinished
      ) {
        return strugglingLessons.push(stats[index])
      }
    })

    return strugglingLessons
  }

  function computeExcellingLessons() {
    const excellingLessons = []
    beginnerModules.map((module, index) => {
      if (
        stats[index].quizScore >= module.passingScore &&
        stats[index].isFinished
      ) {
        return excellingLessons.push(stats[index])
      }
    })

    return excellingLessons
  }

  function timeFormat(time) {
    let hours = Math.floor((time / 60 / 60) % 24)
    let minutes = Math.floor((time / 60) % 60)
    let seconds = Math.floor(time % 60)

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    return hours + ':' + minutes + ':' + seconds
  }

  // async function fetchListOfTopics() {
  //   // setLoadingTopics(true)
  //   // const response = await axios.get('http://localhost:5000/api/topics/admin')
  //   // const result = await response.data

  //   // setBeginnerModules(beginnerModules)
  //   // setLoadingTopics(false)
  //   // if (result && result.topicList.length > 0) {
  //   // }
  // }

  async function fetchListOfModules() {
    setLoading(true)
    const response = await axios.get('http://localhost:5000/api/modules')
    const result = await response.data

    if (result && result.moduleList[0] && result.moduleList[0].modules.length) {
      setStats(result.moduleList[0].modules)
      setUserId(result.moduleList[0]._id)
      setLoading(false)
    }
  }
  

  async function fetchListOfApiResponse() {
    setLoadingApi(true)
    const response = await axios.post('http://localhost:5000/api/utils', {
      wrongAnswers: wrongAnswersList,
    })
    const result = await response.data

    if (result) {
      console.log('This is the API Response: ', result)
      setApiResponse(result)
      setLoadingApi(false)
    }
  }

  // async function handleDeleteATopic(getCurrentId, moduleId) {
  //   const response = await axios.delete(
  //     `http://localhost:5000/api/topics/admin/delete/${getCurrentId}?moduleId=${moduleId}`
  //   )
  //   const result = await response.data
  //   if (result?.message) {
  //     fetchListOfTopics()
  //   }
  // }

  // async function handleAddNewModule(title, keywords_split, description) {
  //   const response = await axios.post(
  //     'http://localhost:5000/api/topics/admin/add',
  //     {
  //       id: beginnerModules.length + 1,
  //       name: title,
  //       keywords: keywords_split,
  //       desc: description,
  //       passingScore: 5,
  //       duration: 60,
  //     }
  //   )

  //   const result = response?.data?.newlyCreatedTopic

  //   if (result) {
  //     fetchListOfTopics()
  //     createComponentOnServer(
  //       `Topic${beginnerModules.length + 1}`,
  //       beginnerModules.length + 1
  //     )
  //   }
  // }

  // async function createComponentOnServer(componentName, id) {
  //   const response = await fetch(
  //     'http://localhost:5000/api/topics/admin/generate-component',
  //     {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ componentName, id }),
  //     }
  //   )

  //   if (response.ok) {
  //     alert('Component created successfully on server!')
  //   } else {
  //     alert('Failed to create component.')
  //   }
  // }

  // function handleUpdateTimeFinished(getCurrentId, timeFinished) {
  //   let cpyStats = [...stats]
  //   const currentModule = cpyStats.find(
  //     (stat) => stat.moduleId === getCurrentId
  //   )
  //   currentModule.timeCompleted = timeFinished
  //   currentModule.isFinished = true

  //   handleUpdateAModule(cpyStats)
  // }

  function handleUpdateQuizScore(getCurrentId, quizScore) {
    let cpyStats = [...stats]
    const currentModule = cpyStats.find(
      (stat) => stat.moduleId === getCurrentId
    )

    currentModule.quizScore = quizScore
    currentModule.isFinished = true

    handleUpdateAModule(cpyStats)
  }

  function handleUpdateAnswer(getCurrentId, questionNo, answer) {
    console.log('Current Id of the module: ', getCurrentId)
    console.log('question No: ', questionNo)
    console.log('The user answer to the question No: ', answer)
    let cpyStats = [...stats]
    console.log('This is the the stats: ', cpyStats)
    const currentModule = cpyStats.find(
      (stat) => stat.moduleId === getCurrentId
    )
    console.log('These is the current Module: ', currentModule)

    const currentQuestion = currentModule.answersList.find(
      (question) => question.questionNum === questionNo
    )
    currentQuestion.answer = answer
    console.log(cpyStats)
    handleUpdateAModule(cpyStats)
  }

  async function handleUpdateAModule(modulesUpdated) {
    const response = await axios.put(
      `http://localhost:5000/api/modules/update/${userId}`,
      {
        modules: modulesUpdated,
      }
    )
  }

  const completedLessonsCounter =
    stats?.length > 0
      ? stats.reduce((acc, cur) => {
          if (cur.isFinished === true) {
            return acc + 1
          }
          return acc
        }, 0)
      : null

  const strugglingLessons =
    stats?.length > 0 ? computeStrugglingLessons() : null

  const excellingLessons = stats?.length > 0 ? computeExcellingLessons() : null

  const wrongAnswersList = stats?.length > 0 ? getWrongAnswers() : null

  useEffect(() => {
    fetchListOfModules()

    // fetchListOfTopics()
  }, [])

  console.log('These are the wrong answers of the user: ', wrongAnswersList)

  return (
    <GlobalContext.Provider
      value={{
        strugglingLessons,
        excellingLessons,
        stats,
        loading,
        completedLessonsCounter,
        wrongAnswersList,
        apiResponse,
        loadingApi,
        // beginnerModules,
        // loadingTopics,
        timeFormat,
        // handleUpdateTimeFinished,
        handleUpdateQuizScore,
        fetchListOfModules,
        // handleAddNewModule,
        // handleDeleteATopic,
        handleUpdateAnswer,
        fetchListOfApiResponse,
        fetchListOfModules,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
