{
    const searchFrmElem = document.querySelector('#search_Result_Frm'); //검색어입력창
    const list_searchFrmElem = document.querySelector('#List_search_Frm'); //리스트 검색
    const listorderElem = document.querySelector('#list_order'); // 정렬방법 만들어야함!!!

    const pageContainerElem = document.querySelector('#page_container');
    const ulElem = pageContainerElem.querySelector('nav > ul');

    let currentPage = 1; //현재 페이지
    let maxPage = 1;
    const recordCount = 6; //레코드 수 화면에 뜨는 갯수
    const pagingCount = 5; //페이징의 페이징 수

    const iuser = document.querySelector('#iuser');

    if (searchFrmElem) { //검색창에 검색없으면 알람
        searchFrmElem.addEventListener('submit', (e) => {
            const searchVal = searchFrmElem.search_area.value;

            if (searchVal.length === 0) {
                localStorage.setItem("cast", null);
                getMaxPageVal();
                getList();
            } else {
                localStorage.setItem("cast", "sideSearch");
                localStorage.setItem("param", JSON.stringify({ 'searchVal' : searchVal}));
                getMaxPageVal("sideSearch");
                getList();
            }
            e.preventDefault();
        });
    }




    fetch("/json/MOCK_DATA.json") //json파일 가져오기
        .then(response => {
            return response.json();
        }).then(jsondata =>
        getSearchCompany(jsondata)
    );

    function getSearchCompany(json){
        var comList =json.result[0].companyList;
        const select_com = document.querySelector('#select_com>.accordion-body');
        for(var i=0; i<comList.length; i++) {
            let searchCompany = document.createElement('div');
            searchCompany.className = "form-check";
            searchCompany.innerHTML = `
                      <input class="form-check-input" type="checkbox" name="manufacturer" value="`+comList[i].company+`"  onchange="getSearchList()">
                        <label class="form-check-label" for="hyundai">
                       `+ comList[i].company+`
                        </label>
                `
            select_com.appendChild(searchCompany);
        }

    }



    function getSearchList() { //리스트 검색
            const com_query = 'input[name="manufacturer"]:checked';
        const compunyList = document.querySelectorAll(com_query);
        let compunyResult = [];
        compunyList.forEach((el) => {
            compunyResult.push(el.value)
        });

        const start_Mileage = document.getElementById('start_Mileage');
        let Min_Mileage= parseInt(start_Mileage.options[start_Mileage.selectedIndex].value);

        const end_Mileage = document.getElementById('end_Mileage');
        let Max_Mileage= parseInt(end_Mileage.options[end_Mileage.selectedIndex].value);

        const start_price = document.getElementById('start_price');
        let Min_price= parseInt(start_price.options[start_price.selectedIndex].value);

        const end_price = document.getElementById('end_price');
        let Max_price= parseInt(end_price.options[end_price.selectedIndex].value);

        const gearbox_query = 'input[name="gearbox"]:checked';
        const gearbox = document.querySelectorAll(gearbox_query);
        let gearboxResult = [];
        gearbox.forEach((el) => {
            gearboxResult.push(el.value)
        });

        const fuel_query = 'input[name="fuel"]:checked';
        const fuel = document.querySelectorAll(fuel_query);
        let fuelResult = [];
        fuel.forEach((el) => {
            fuelResult.push(el.value)
        });

        const aria_query = 'input[name="area"]:checked';
        const ariaList = document.querySelectorAll(aria_query);
        let ariaResult = [];
        ariaList.forEach((el) => {
            ariaResult.push(el.value)
        });

                myFetch.get('/ajax/vehicle/searchList', list => {
                    localStorage.setItem("cast", JSON.stringify(list));
                    makeRecordList(list);
                },{
                    'category' : "국산",
                    'compunyResult' : compunyResult,
                    'Min_Mileage' : Min_Mileage,
                    'Max_Mileage' : Max_Mileage,
                    'Min_price' : Min_price,
                    'Max_price' : Max_price,
                    'gearboxResult' : gearboxResult,
                    'fuelResult' : fuelResult,
                    'ariaResult' : ariaResult
                } );

    }




    //찜버튼 활성화
    function jjimEvent(pk, target){
        let selliboard = pk;

        let iElem = target.querySelector('i');
        if (iElem.classList.contains('fa-regular')){//찜
            iElem.classList.remove('fa-regular');
            iElem.classList.add('fa-solid');
            target.classList.add('btn-outline-danger');

            myFetch.get(`/ajax/vehicle/likes/${selliboard}`,data=>{
                // console.log(data);
            });
        }else { //찜 취소
            iElem.classList.remove('fa-solid');
            iElem.classList.add('fa-regular');
            target.classList.remove('btn-outline-danger');

            myFetch.delete(`/ajax/vehicle/dellikes/${selliboard}`);
        }
    }

    var ViewList = localStorage.getItem("cast");
        //글 리스트 정보 가져오기
        const getList = () => {

            if (ViewList != null) {
                if (ViewList === "home") {
                    var param = JSON.parse(localStorage.getItem("param"))
                    myFetch.get(`/ajax/vehicle/homSearch`, data => {
                        makeRecordList(data);
                    }, {
                        'manufacturer': param.manufacturer,
                        'model': param.model,
                        'detail_model': param.detail_model,
                        'currentPage': currentPage,
                        'recordCount': recordCount
                    });

                } else {
                    myFetch.get(`/ajax/vehicle/list`, data => {
                        makeRecordList(data);
                    }, {currentPage, recordCount});
                }
            }
        }




    getMaxPageVal(ViewList);


    //마지막 페이지 값 (once)

    function getMaxPageVal(root) {  // maxpage를 가져옴

        if(root != null){
        switch (root) {


            case "home": //홈
                var param = JSON.parse(localStorage.getItem("param"))
                var new_param = {
                    'manufacturer': param.manufacturer,
                    'model': param.model,
                    'detail_model': param.detail_model,
                    'currentPage': currentPage,
                    'recordCount': recordCount,
                    'category': "국산",
                    'root': "home"
                };
                break;
            case "sideSearch":  //모델명
                var param = JSON.parse(localStorage.getItem("param"))
                var new_param = {
                    'searchVal' : param.searchVal,
                    'currentPage': currentPage,
                    'recordCount': recordCount,
                    'category': "국산",
                    'root': "sideSearch"
                };
                break;
        }
        }else{
            var new_param = { //전체
                'currentPage': currentPage,
                'recordCount': recordCount,
                'category': "국산",
                'root': null
            };
        }

        myFetch.get(`/ajax/vehicle/maxpage`, data => {
            maxPage = data.result;
            console.log(maxPage)
            makePaging();
        }, new_param);
    }






    const makePaging = () => {
        ulElem.innerHTML = null;
        const calcPage = parseInt((currentPage - 1) / pagingCount);
        const startPage = (calcPage * pagingCount) + 1;
        const lastPage = (calcPage + 1) * pagingCount;
        if(startPage > 1) {
            makePagingItem('&lt;', () => {
                currentPage = startPage - 1;
                getList();
                makePaging();
            });
        }
        for(let i=startPage; i<=(lastPage > maxPage ? maxPage : lastPage); i++) {
            makePagingItem(i, () => {
                if(currentPage !== i) {
                    currentPage = i;
                    getList();
                }
            });
        }
        if(maxPage > lastPage) {
            makePagingItem('&gt;', () => {
                currentPage = lastPage + 1;
                getList();
                makePaging();
            });
        }
    }

    //페이징 item 만들기
    const makePagingItem = (val, cb) => {
        const liElem = document.createElement('li');
        liElem.className = 'page-item page-link pointer';
        liElem.innerHTML = val;
        liElem.addEventListener('click', cb);
        ulElem.appendChild(liElem);
    }

    //레코드 생성
    const makeRecordList = list => {
        const listdivElem = document.querySelector('.listdiv'); //결과창
        // console.log(list);
        if(listdivElem){
            listdivElem.innerHTML = '';
            list.forEach(item =>{
                const resultdiv = document.createElement('div');
                resultdiv.className = "col card_div";
                resultdiv.innerHTML = `
                    <div class="card shadow-sm bg-white h-100 " xmlns:c="http://www.w3.org/1999/html">
                        <input type="hidden" value="${item.selliboard}">
                        
                        <img class="card-img-top car_img h-50" src="/vehicleImg/${item.selliboard}/${item.mainimg}" alt="이미지없음">
                        <div class="card-body">
                            <h4 class="card-title">${item.detail_model}</h4>
                            <p class="card-text">${item.fuel}</p>
                            <p class="card-text">${item.price}만원</p>
                            <p class="card-text">판매지역: ${item.trading_area}</p>                            
                        </div>    
                    </div>
                `
                let fullBtnDiv = document.createElement('div');
                fullBtnDiv.classList.add('g-4')
                fullBtnDiv.innerHTML = `
                            <div class="d-flex justify-content-end align-items-center">
                                <button type="button" class="btn jjimBtn" onclick="jjimEvent(${item.selliboard}, this);">
                                    <i class="fa-regular fa-heart"></i>좋아요
                                </button>
                            </div>`;
                let nonBtnDiv = document.createElement('div');
                nonBtnDiv.classList.add('g-4')
                nonBtnDiv.innerHTML = `
                            <div class="d-flex justify-content-end align-items-center">                            
                                <button type="button" class="btn jjimBtn btn-outline-danger" onclick="jjimEvent(${item.selliboard}, this);">
                                    <i class="fa-solid fa-heart"></i>좋아요
                                </button>
                            </div>`;
                if(iuser){
                    myFetch.get(`/ajax/vehicle/sellike?selliboard=${item.selliboard}`,data=>{
                        switch (data){
                            case 1:
                                resultdiv.querySelector('.card').append(nonBtnDiv)
                                break;
                            case 0:
                                resultdiv.querySelector('.card').append(fullBtnDiv)
                                break;
                        }
                    });
                }
                listdivElem.appendChild(resultdiv);
                window.sessionStorage.getItem("loginUser")
                const detailElem = resultdiv.querySelector('.card-title');
                const imgElem = resultdiv.querySelector('.car_img');
                detailevent(imgElem);
                detailevent(detailElem);

                function detailevent(param) {
                    param.addEventListener('click', () => {
                        location.href = `/vehicle/detail?selliboard=${item.selliboard}`;
                    })
                }
            })
        }
    }

        getList(); //전체리스트 추출



}