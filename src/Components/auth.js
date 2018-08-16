import Chatkit from '@pusher/chatkit-server';

export const chatkitAuth = new Chatkit.default({
    instanceLocator: instance,
    key: authCode,
});

export function createUser(iD, uName) {
    chatkitAuth.createUser({
        id: iD,
        name: uName,
    })
        .then(() => {
            console.log('User created successfully');
        }).catch((err) => {
            console.log(err);
        });
}

export function updateUsers(iD, uName, avURL, customData){
    
    chatkit.updateUser({
        id: iD,
        name: uName,
        avatarURL: avURL,
        customData: customData,
    })
        .then(() => {
            console.log('User updated successfully');
        }).catch((err) => {
            console.log(err);
        });
}

// const tokenProvider = ()=> PCTokenProvider(
//    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/a5f41850-d55a-4b17-9826-f1bdfe22240e/token",
//      {
//         req -> PCTokenProviderRequest in
//             req.addQueryItems([URLQueryItem(name: "user_id", value: userId)])
//         return req
//     }
// )