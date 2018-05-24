var $ =require("jquery");
import "materialize-css/dist/css/materialize.css"
import "../css/base.css"
import {Observable} from 'rxjs/Rx';
const getLoginPromise = (acc,pwd) => {
    return  new Promise((resolve, reject) => {
        try {
            $.ajax({
                type: 'post',
                url: 'http://localhost:8080/user/login',
                data:{
                    "account":acc,
                    "password":pwd
                },
                success: (s) => {
                    resolve(
                        s
                    );
                },
                error: (err) => {
                    console.log(err);
                    reject(err);
                }
            });
        }catch (e) {

        }

    })
}
const getRepos = (acc,pwd) => {
    const promise = getLoginPromise(acc,pwd);
    return Observable.fromPromise(promise);
};
function validate_required(field,alerttxt)
{
    if (field.value==null||field.value=="")
    {alert(alerttxt);return false}
    else {return true}
}
function isLoginSuccess(result){
    console.log(result);
    console.log(result.result);
    console.log(result.result==="ok");
    if (result.result ==="ok") {
        self.location = "main.html"
    }else {
        alert("用户名或密码错误！")
        document.getElementsByClassName("login-form").reset();
    }
    return result.result ==="ok"
}
// window.document.getElementById("login").addEventListener('click',ev => getRepos(document.getElementById("email").value,document.getElementById("password").value).subscribe(x =>console.log(x)))
$(()=>{
    try {
        Observable.fromEvent(document.getElementById("login"), 'click')
            .debounceTime(300)
            .filter(() =>validate_required(document.getElementById("email"),"请输入用户名"))
            .filter(() =>validate_required(document.getElementById("password"),"请输入密码"))
            .flatMap(()=>getRepos(document.getElementById("email").value,document.getElementById("password").value))
            .map((result)=> $.parseJSON(result))
            .filter(isLoginSuccess)
            .subscribe( x => console.log( x ));
    }catch (e) {
        console.log(e)
    }

})