import http from 'k6/http';
import { check } from 'k6';

const url = "https://reqres.in/"
const end_point_get_user = "api/users?page=2"
const end_point_post_user= "api/users"

const body_user = {
    name: "morpheus",
    job: "leader"
}

export const options = {
    stages: [
        { duration: '30s', target: 1 },
    ],
};

export default function () {
    const GetUsers = http.get(url + end_point_get_user);
    check(GetUsers, {
        'response code was 200': (CreateChat) => CreateChat.status === 200,
        'response code was 404': (CreateChat) => CreateChat.status === 404,
        'response code was 500': (CreateChat) => CreateChat.status === 500,
    });

    const CreateUser = http.post(url + end_point_post_user, JSON.stringify(body_user), {
    headers: {
        'Content-Type': 'application/json',
    },
});
    check(CreateUser, {
        'response code was 201': (CreateChat) => CreateChat.status === 201,
        'response code was 404': (CreateChat) => CreateChat.status === 404,
        'response code was 500': (CreateChat) => CreateChat.status === 500,
    });
}