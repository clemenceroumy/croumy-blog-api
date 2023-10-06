import * as process from "process";

export default () => ({
    firebase: {
        service_account: String(process.env.FIREBASE_SERVICE_ACCOUNT),
    },
    hltb: {
        userId: String(process.env.HLTB_USER_ID)
    },
    spotify: {
        clientId: String(process.env.SPOTIFY_CLIENT_ID),
        clientSecret: String(process.env.SPOTIFY_CLIENT_SECRET),
    }
})