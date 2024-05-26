type ButtonInfo = {
    id: number,
    text: string,
    className: string,
    path: string
}


export const buttonsInfo:ButtonInfo[] =  [  // todo  save in config file
{
    id: 1,
    text: "Log in",
    className: 'login_btn',
    path: "login"
},
{
    id: 2,
    text: "Register",
    className: 'register_btn',
    path: "register"
}
]