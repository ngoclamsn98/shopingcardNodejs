const signInput = document.querySelectorAll('.form-control');
const email = document.querySelector('.email');
const checkpass = document.querySelector('.check');
const button = document.querySelector('.button');
var trangThai=true;
var trangThai1=true;
var trangThai2=true;
var trangThai3=true;

for(let i=0;i<signInput.length;i++){
  if(signInput[i].value===''){
    button.onclick=function(){
      return false;
    }
    signInput[i].onchange=function(){
      if(signInput[i].value){
        button.onclick=function(){
          return true;
        }
      }else{
        return false;
      }
    }
  }

  signInput[i].addEventListener('change',(e)=>{
    if(e.target.name.includes('username')){
      if(e.target.value.length<=5){
        if(!e.target.nodeName.includes('SPAN')&&trangThai){
          const span = document.createElement('div');
          span.textContent='Username không hợp lệ';
          span.style.color='red';
          span.style.marginLeft='65px';
          e.target.style.borderColor='red';
          const div=e.target.previousElementSibling.parentElement;
          div.insertBefore(span,e.target.nextSibling);
          trangThai=false;
        }else{
          trangThai=true;
        }
      }else{
        e.target.style.borderColor='#7ed617';
        if(e.target.nextSibling){
          const div=e.target.previousElementSibling.parentElement;
          div.removeChild(e.target.nextSibling);
        }
      }
    }
    if(e.target.name.includes('password')){
      if(e.target.value.length<=5){
        if(!e.target.nodeName.includes('SPAN')&&trangThai1){
          const span = document.createElement('div');
          span.textContent='Mật Khẩu quá Yếu';
          span.style.color='red';
          span.style.marginLeft='65px';
          e.target.style.borderColor='red';
          const div=e.target.previousElementSibling.parentElement;
          div.insertBefore(span,e.target.nextSibling);
          trangThai1=false;
        }else{
          trangThai1=true;
        }
      }else{
        e.target.style.borderColor='#7ed617';
        if(e.target.nextSibling){
          const div=e.target.previousElementSibling.parentElement;
          div.removeChild(e.target.nextSibling);
        }
      }
    }
  })
}

signInput[3].addEventListener('change',(e)=>{
  if(signInput[3].value!=signInput[2].value){
    if(!e.target.nodeName.includes('SPAN')&&trangThai2){
      const span = document.createElement('div');
      span.textContent='Xác Nhận Mật Khẩu Không Đúng !';
      span.style.color='red';
      span.style.marginLeft='65px';
      signInput[3].style.borderColor='red';
      const div=signInput[3].previousElementSibling.parentElement;
      div.insertBefore(span,signInput[3].nextSibling);
      trangThai2=false;
    }else{
      trangThai2=true;
    }
  }else{
    signInput[3].style.borderColor='#7ed617';
    if(signInput[3].nextSibling){
      const div=signInput[3].previousElementSibling.parentElement;
      div.removeChild(signInput[3].nextSibling);
    }
  }
})

document.addEventListener('DOMContentLoaded',()=>{
  // for(let i=0;i<signInput.length;i++){
    email.onchange=function(e){
      fetch('http://localhost:3000/user/sign/check',{
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({taikhoan:email.value})
      })
      .then(res=>res.text())
      .then(data=>{
        const dulieu = JSON.parse(data);
        if(!dulieu.trangthai&&trangThai3){
          const span = document.createElement('span');
          span.textContent=`Xin lỗi, Email đã được sử dụng. Vui lòng thử lại.`;
          span.className='error';
          const div=signInput[1].previousElementSibling.parentElement;
          div.insertBefore(span,signInput[1].nextSibling);
          email.classList.remove('ok');
          email.classList.add('canhbao');
          trangThai3=false;
        }else{
          if(signInput[1].nextSibling){
            const div=signInput[1].previousElementSibling.parentElement;
            div.removeChild(signInput[1].nextSibling);
          }
            email.classList.add('ok');
            email.classList.remove('canhbao');
            trangThai3=true;
        }
      })
      .catch(err=>{console.log(err);return Promise.reject(err);});
    }
  // }
})
