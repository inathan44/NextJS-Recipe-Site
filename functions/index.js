const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
  try {
    const userDoc = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      // Add any additional user data you want to store
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Create the user document in Firestore
    await admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set(JSON.parse(JSON.stringify(user)));

    console.log('User document created successfully');
  } catch (error) {
    console.error('Error creating user document:', error);
  }
});
