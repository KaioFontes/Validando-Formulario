//Validação de form.

class ValidaForm{
  constructor(){
    this.formulario = document.querySelector('.formulario');
    this.eventos();
  }

  //Methods
  eventos(){
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    })
  }

  handleSubmit(e){
    e.preventDefault();
    const campValid = this.isValid();
    const passwordValid = this.passwordValid();

    if(campValid && passwordValid){
      alert("Enviado com sucesso!!!");
      this.formulario.submit();
    }
  }

  isValid(){
    let valid = true;

    for(let errorText of this.formulario.querySelectorAll('.error-text')){
      errorText.remove();
    }

    for(let campo of this.formulario.querySelectorAll('.validar')){
      const label = campo.previousElementSibling.innerHTML;
      
      if(!campo.value){
        this.createError(campo,`O campo ${label} não deve estar em branco!!`);
        valid = false;
      }

      if(campo.classList.contains('cpf')){
        if(!this.cpfValid(campo)) valid = false;
      }

      if(campo.classList.contains('usuario')){
        if(!this.userValid(campo)) valid = false;
      }

    }

    return valid;
  }

  passwordValid(){
    let valid = true;
    const senha = this.formulario.querySelector('.senha');
    const repeatSenha = this.formulario.querySelector('.repetir-senha');

    if(senha.value !== repeatSenha.value){
      this.createError(senha,"As duas senhas devem ser iguais!!");
      this.createError(repeatSenha,"As duas senhas devem ser iguais!!");

      valid = false;
    }

    if(senha.value.length < 6 || senha.value.length > 12){
      this.createError(senha,"A senha deve conter entre 6 e 12 caracteres!!");
      this.createError(repeatSenha,"A senha deve conter entre 6 e 12 caracteres!!");

      valid = false;
    }


    return valid;
  }

  cpfValid(campo){
    const cpf = new ValidaCPF(campo.value);

    if(!cpf.valida()){
      this.createError(campo,"CPF Inválido!!")
      return false;
    }
  }

  userValid(campo){
    let valid = true;
    const user = campo.value;

    if(user.length < 3 || user.length > 12){
      this.createError(campo,"O Usuário deve conter entre 3 e 12 caracteres!!");

      valid = false;
    }

    if(!user.match(/^[a-zA-Z0-9]+$/g)){
      this.createError(campo,"O Usuário deve conter somente letras e números!!")
      valid = false;
    }

    return valid;
  }

  createError(campo,msg){
    const div = document.createElement('div')
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend',div);
  }
}

const valida = new ValidaForm();
