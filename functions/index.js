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

 /* generate default initial chat message */
exports.onFriendCreated = functions.firestore.document('users/{userId}/friends/{friendId}')
    .onCreate((snap, context) => {
        return admin.firestore().collection("users").doc(context.params.userId).collection('friends').doc(context.params.friendId).collection('chats').add({
            content: "Let's start chat",
            userId: context.params.friendId,
            createdAt: new Date()
        })
            .catch((error) => {
                console.log("generate initial chat message error: ", error);
            })

    });