const regex_nonempty = /^(?!\s*$).+$/;
const regex_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regex_password = /^[a-zA-Z0-9]{3,8}$/;

export const regex={
    name: regex_nonempty,
    email:regex_email,
    password:regex_password,
    role:regex_nonempty
}