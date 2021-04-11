import localizeFilter from '../filters/localize.filter'

export default {
    'logout': localizeFilter('Message_Logout'),
    'login': localizeFilter('Message_LoginInSystem'),
    'auth/user-not-found': localizeFilter('Message_FirebaseUserNotFound'),
    'auth/wrong-password': localizeFilter('Message_FirebasePasswordWrong'),
    'auth/email-already-in-use': localizeFilter('Message_FirebaseEmailExist')
}