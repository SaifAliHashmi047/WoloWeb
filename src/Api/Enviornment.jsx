export const BASE_URL = "https://api.woloafric.com/";
// export const BASE_URL = 'http://ec2-13-60-208-112.eu-north-1.compute.amazonaws.com/'

export const api = {
  // auth
  signup: "api/v1/user/signup",
  verifyUser: "api/v1/user/verify",
  resendOtp: "api/v1/user/sendOTP",
  completeProfile: "api/v1/user/completeprofile/",
  refreshToken: "api/v1/user/refresh/",
  login: "api/v1/user/login?q=web",
  forgotPassword: "api/v1/user/forgotpassword",
  verifyOTPResetPassword: "api/v1/user/verifyOTPResetPassword",
  resetPassword: "api/v1/user/resetPassword",
  getallPreference: "api/v1/preference/getall",
  addpreferences: "api/v1/user/addpreferences",
  logout: "api/v1/user/logout",
  socialLogin: "api/v1/user/socialLogin",

  // user
  userProfile: "api/v1/user/me",
  updateProfile: "api/v1/user/",

  // termsandCondition
  termsandCondition: "api/v1/termsandcondition/getall",

  // Privacy
  privacy: "api/v1/privacy/getall",

  // Transactions
  transactions: "api/v1/transaction/getall?page=",

  // Card
  cards: "api/v1/card/mycards",
  createCard: "api/v1/card/create",
  deleteCard: "api/v1/card/delete/",
  purchaseCourse: "api/v1/course/purchasecourse",

  // Preference
  preference: "api/v1/preference/getall",
  // updateResource
  updateResource: "api/v1/resource/update/",
  // Quiz Submit
  quizSubmit: "api/v1/quizresult/create",
  quizResult: "api/v1/quizresult/myresult?limit=",
  // Lecture
  videoWatching: "api/v1/lecture/makelecturewatching/",
  videoWatched: "api/v1/lecture/makelecturewatched/",
  updateLecture: "api/v1/lecture/update/",
  updateModule: "api/v1/module/update/",
  updateQuiz: "api/v1/quiz/update/",

  // Notification
  notification: "api/v1/user/mynotifications?page=",
  // Disscussions
  creatDiscussion: "api/v1/discussion/create/",
  allDiscussions: "api/v1/discussion/getallposts/",
  // Disscussions
  createReview: "api/v1/review/create/",
  allReviews: "api/v1/review/",
  tutorProfileReview: "api/v1/course/tutorreviews/",

  // Course
  createCourse: "api/v1/course/create",
  courseandReviewsCount: "api/v1/course/tutortotalcoursesandreviews/",
  tutorCourse: "api/v1/course/tutorcourses/",
  oneCourse: "api/v1/course/getone/",
  createAgoraToken: "api/v1/agora-token/uuid/0",
  bookAgoraSlot: "api/v1/slots/create",
  getAllSlots: "api/v1/slots?courseId=",
  allSesions: "api/v1/session/getall?creator=",
  updateCourse: "api/v1/course/update/",
  updateSession: "api/v1/session/update/",
  addModuleorResource: "api/v1/course/addmodulesresourcesorsessions/",
  likePost: "api/v1/discussion/likepost/",
  dislikePost: "api/v1/discussion/dislikepost/",
  allPostComments: "api/v1/discussion/getallcommentofpost/",
  createcomment: "api/v1/discussion/createcomment/",
  completeCourse: "api/v1/course/completecourse/",
  // Bank
  getAllBanks: "api/v1/user/getbanks",
  addBank: "api/v1/user/addbankaccount",
  myBank: "api/v1/user/mybank",
  withdraw: "api/v1/user/withdraw",

  // Student Courses
  getStudentCourses: "api/v1/course/coursespage?page=",
  postStudentSaveCourse: "api/v1/course/savecourse/",
  postStudentUnSaveCourse: "api/v1/course/unsavecourse/",
  postStudentHomeCourse: "api/v1/course/home?page=",

  //AddModule
  addModule: "api/v1/module/create/",
  addLectures: "api/v1/module/addlectures/",
  //course checkout
  checkoutCourse: "api/v1/course/purchasecourse/web/checkout",
  getMyCourses: "api/v1/course/getMyCourses/",
  fileUpload: "api/v1/user/upload",
};
