import http from 'k6/http';
import { check } from 'k6';
import {MakeHash} from "../src/GenerateHash.js";
export const options = {
    stages: [
        { duration: '2s', target: 1 },
    ],
};
const Url = "https://alpha.hyperborea.tech:443"
const EndPointRegister = "/main/auth/register"
const EndPointCreateChat = "/main/chats"
const EndPointAuthorization = "/auth/authorization"


export default function () {
    const PayloadUserOne = {
        name: MakeHash(5),
        login: MakeHash(128),
        password: MakeHash(128),
        public_key: MakeHash(128),
    };

    const PayloadUserTwo = {
        name: MakeHash(5),
        login: MakeHash(128),
        password: MakeHash(128),
        public_key: MakeHash(128),
    };

    const PayloadAuthorizationUserOne = {
        login: PayloadUserOne["login"],
        password: PayloadUserOne["password"],
        publicKey: PayloadUserOne["public_key"],
        deviceName: "IPhone 14 Pro",
        deviceToken: MakeHash(128)
    };

    const UserOne = http.post(Url + EndPointRegister, JSON.stringify(PayloadUserOne), {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    check(UserOne, {
        'response code was 200': (UserOne) => UserOne.status === 200,
        'response code was 400': (UserOne) => UserOne.status === 400,
        'response code was 500': (UserOne) => UserOne.status === 500,
    });


    const UserTwo = http.post(Url + EndPointRegister, JSON.stringify(PayloadUserTwo), {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    check(UserTwo, {
        'response code was 200': (UserTwo) => UserTwo.status === 200,
        'response code was 400': (UserTwo) => UserTwo.status === 400,
        'response code was 500': (UserTwo) => UserTwo.status === 500,
    });


    const AuthorizationUserOne = http.post(Url + EndPointAuthorization, JSON.stringify(PayloadAuthorizationUserOne), {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    check(AuthorizationUserOne, {
        'response code was 200': (AuthorizationUserOne) => AuthorizationUserOne.status === 200,
        'response code was 502': (AuthorizationUserOne) => AuthorizationUserOne.status === 502,
        'response code was 500': (AuthorizationUserOne) => AuthorizationUserOne.status === 500,
        'response code was 444': (AuthorizationUserOne) => AuthorizationUserOne.status === 444,
        'response code was 400': (AuthorizationUserOne) => AuthorizationUserOne.status === 400,

    });

    const PayloadCreateChat = {
        "trusted": true,
        "identifier": UserTwo["body"]
    };

    const CreateChat = http.post(Url + EndPointCreateChat, JSON.stringify(PayloadCreateChat), {
        headers: {
            "Authorization": JSON.parse(AuthorizationUserOne["body"])["authToken"]
        }
    });

    console.log(JSON.parse(CreateChat["body"])["id"])
    check(CreateChat, {
        'response code was 200': (CreateChat) => CreateChat.status === 200,
        'response code was 502': (CreateChat) => CreateChat.status === 502,
        'response code was 400': (CreateChat) => CreateChat.status === 400,
        'response code was 401': (CreateChat) => CreateChat.status === 401,
        'response code was 403': (CreateChat) => CreateChat.status === 403,
        'response code was 500': (CreateChat) => CreateChat.status === 500,
    });
}
