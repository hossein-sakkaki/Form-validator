class FormValidator{
    constructor(reg_form){
        this.__myForm = reg_form;
        this.submitHandler();
        this.focusHandler();
    }
    submitHandler(){
        this.__myForm.addEventListener('submit',(event)=>{
            event.preventDefault();
        });
    }
    focusHandler(){
        this.__myForm.addEventListener('focusin',(event)=>{
            event.target.classList.add("display-online");

        });

        this.__myForm.addEventListener('focusout',(event)=>{
            event.target.classList.remove("display-online");
            let data_validate = event.target.dataset.validate;
            var div_sibling = event.target.nextElementSibling;
            if (data_validate){
                div_sibling.innerHTML = ""
                let func_name_array = data_validate.split(" ");
                for (let index = 0; index < func_name_array.length; index++) {
                    const func_name = func_name_array[index];
                    var err_message = this[func_name](event.target);
                    if (err_message.length > 0){
                        div_sibling.innerHTML += "- " + err_message +"<br>";
                        if (err_message.length > 0){
                            div_sibling.classList.remove("display-hide");
                        }else{
                            div_sibling.classList.add("display-hide");
                        }
                    }
                }
            }
        });
    }
    
    notEmpty(el){
        if(el.value === ""){
            return "Do not leave this field empty";
        }
        return "";
    }
    validateEmail(el){
        const regex_contain = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!regex_contain.test(el.value)){
            return "Email is not valid"
        }
        return "";
    }
    validatePassword(el){
        const regex_contain = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (!regex_contain.test(el.value)){
            return "Password is not valid";
        }
        return "";
    }
    retypePassword(el){
        let password = document.getElementById("password");
        if ( password.value !== el.value ){
            return "It's diffrent";
        }
        return "";
    }
    validatPhone(el){
        const regex_contain = /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!regex_contain.test(el.value)){
            return "Phone number is not currect";
        }
        return "";
    }
}

var reg_form = document.getElementById("validator-form");
new FormValidator(reg_form);