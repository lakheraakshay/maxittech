// console.log(postCreatedOn)
const getTimeToShow = (postCreatedOn) => {
  // console.log(postCreatedOn,"d")
  const createdYear = new Date(postCreatedOn).getFullYear()
  const currDate = Date.now()
  if (createdYear > new Date(currDate).getFullYear()) { return { time: new Date(currDate).getFullYear() - createdYear, value: "year" } }
  else if (new Date(currDate).getMonth() > new Date(postCreatedOn).getMonth()) {

    return { time: new Date(currDate).getMonth() - new Date(postCreatedOn).getMonth(), value: "month" }
  }

  else if (new Date(currDate).getDate() > new Date(postCreatedOn).getDate()) {
    return { time: new Date(currDate).getDate() - new Date(postCreatedOn).getDate(), value: "day" }
  }
  else if (new Date(currDate).getHours() > new Date(postCreatedOn).getHours())
    return { time: new Date(currDate).getHours() - new Date(postCreatedOn).getHours(), value: "Hours" }
  else if (new Date(currDate).getMinutes() > new Date(postCreatedOn).getMinutes()) {

    // console.log(new Date(postCreatedOn).getMinutes())
    return { time: new Date(currDate).getMinutes() - new Date(postCreatedOn).getMinutes(), value: "Minutes" }
  }
}
export default getTimeToShow