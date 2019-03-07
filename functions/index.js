const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/**
 * Friends and Friend Requests related functions
 */

/* exports.onFriendCreated = functions.firestore.document('users/{userId}/friends/{friendId}')
    .onCreate((snap, context) => {
        return admin.firestore().collection("users").doc(context.params.userId).get()
            .then((res) => {
                const username = res.data().username;
                admin.firestore().collection("users").doc(context.params.friendId).collection('friends').doc(context.params.userId).set({
                    lastMessage: username + " has accepted your friend request",
                    createdAt: new Date()
                })
            })
            .catch((error) => {
                console.log("create friend error: ", error);
            })

    }); */