function allList(){
    localStorage.setItem("cast", null);  //국산클릭하여 리스트를 뿌렸다는 의미
}

const sellingMycar = document.querySelector('#selling_mycar');
const loginUserInfrm = document.querySelector('.loginUserInfrm');
if(sellingMycar){
    sellingMycar.addEventListener('click', () => {
        if(loginUserInfrm === null){
            alert('로그인해야 이용할 수 있는 서비스입니다.');
            location.href = '/user/login';
            return;
        }
        location.href = '/vehicle/write';
    })
}
