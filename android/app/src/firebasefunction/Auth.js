import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast'

// import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk-next';


export async function signUp(userEmail, password) {
    let success = true;
    await firebase
        .auth()
        .createUserWithEmailAndPassword(userEmail, password)
        .then(async user => {
            success = user
        })
        .catch(function (error) {
            success = false;
            Toast.show(error.code + ': ' + error.message);
        });
    return success;
}

export async function signIn(email, password, rememberme) {
    let success = false;
    await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async user => {

            success = { res: true, user: user.user.uid }
        })
        .catch(function (error) {
            success = { res: false, error: error.message };
        });
    return success;
}

export async function checkEmailAlreadyInUse(email, callback) {
    let emails = await firebase
        .auth()
        .fetchSignInMethodsForEmail(email.trim());

    callback(emails.length > 0)
}

export async function connectAccount(email, password, callback) {
    await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async user => {
            if (user.user.emailVerified) {
                callback({ ...user, success: true })
            }
            else {
                success = false
                await user.user.sendEmailVerification();
                // alert(`A verification link has been sent to ${email.trim()}, please verify and try connecting again`)
                alert(`A verification link has been sent to ${email.trim()}\nPlease check your spam folder if not initially found.  Click on the link to verify your email address and then please log into Click and go again.`)

            }
        })
        .catch(function (error) {
            alert(error.code + ': ' + error.message);
            callback({ ...error, success: false })
        });
}

export async function getCurrentUserId() {
    var user = firebase.auth().currentUser;

    if (user != null) {
        return user.uid;
    }
    else {
        // Toast.show('Seccion Expired Please Login Again')
    }
}
export async function Logout() {
    await firebase.auth().signOut().catch(error => { });
}

export async function ResetPassword(email) {
    let success = true
    await firebase
        .auth().sendPasswordResetEmail(email)
        .then(function (user) {
            success = true
            // alert('Please check your email...', user)
        }).catch(function (e) {
            success = e.message
        })
    return success
}

export async function getCurrentUserToken() {

    return await firebase.auth().currentUser.getIdToken()
}

// export async function googleAuthentication(setLoading) {
//     setLoading(true)
//     try {
//         await GoogleSignin.hasPlayServices({
//             showPlayServicesUpdateDialog: true,
//         });

//         const userInfo = await GoogleSignin.signIn();
//         const credential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)

//         const user = await auth().signInWithCredential(credential)
//         return user


//     } catch (error) {
//         setLoading(false)
//         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//             // user cancelled the login flow
//         } else if (error.code === statusCodes.IN_PROGRESS) {
//             Error('Google authentication is in progress already')
//             // operation (e.g. sign in) is in progress already
//         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//             Error('Play services not available or outdated')
//             // play services not available or outdated
//         } else {
//             Toast.show(error.message)
//             // some other error happened
//         }
//         // 
//     }
// }

// export async function appleAuthentication(setLoading) {
//     setLoading(true)
//     try {
//         const appleAuthRequestResponse = await appleAuth.performRequest({
//             requestedOperation: appleAuth.Operation.LOGIN,
//             requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//         });
//         if (!appleAuthRequestResponse.identityToken) {
//             setLoading(false)
//             Toast.show('Apple Sign-In failed - no identity token returned')
//         }
//         const { identityToken, nonce } = appleAuthRequestResponse;
//         const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
//         const user = await auth().signInWithCredential(appleCredential)
//         return user
//     }
//     catch (error) {
//         setLoading(false)
//         Toast.show(error.message)
//     }

// }

// export async function facebookAuthentication(setLoading) {
//     setLoading(true)
//     try {
//         const result = await LoginManager.logInWithPermissions(["public_profile", "email"])

//         if (result.isCancelled) {

//         }
//         else {
//             const data = await AccessToken.getCurrentAccessToken();
//             if (!data) {
//                 setLoading(false)
//                 Toast.show('Something went wrong obtaining the users access token')
//             }
//             const credential = await auth.FacebookAuthProvider.credential(data.accessToken);
//             let imageURL = ''
//             const graphRequest = new GraphRequest(
//                 '/me',
//                 {
//                     accessToken: data.accessToken,
//                     parameters: {
//                         fields: {
//                             string: 'picture.height(961)',
//                         },
//                     },
//                 },
//                 (error, result) => {
//                     if (error) {
//                         console.error(error);
//                     } else {
//                         imageURL = result.picture.data.url;
//                     }
//                 },
//             );
//             new GraphRequestManager().addRequest(graphRequest).start();
//             var user = await auth().signInWithCredential(credential)
//             user.user.photoURL = imageURL.length > 0 ? imageURL : user.user.photoURL
//             return user
//         }
//     } catch (error) {
//         setLoading(false)
//         Toast.show(error.message)
//     }

// }