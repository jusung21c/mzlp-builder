

startBuilder(buildername){
    makeLangSelPanel();
}

makeLangSelPanel(buildername){
    getLangList()
    langSelListener(buildername)
}

getLangList(){
    return "존재하는 언어 리스트"
}

langSelListener(buildername){
    okListener{
        //Selected List
        makeDetailSelPanel(buildername,selectedlanglist);
    };
    cancelListener{

    };
}

makeDetailSelPanel(buildername,selectedlanglist){
    //세부파일선택 뷰 만든다
    getDetailSelList(buildername,selectedlanglist)를 통해 뷰 생성
    detailSelListener(buildername,selectedlanglist)
}

getDetailSelList(buildername,langlist){
    //빌더네임, 랭귀지리스트로 해당 파일 리스팅
    return list(obj);
}

detailSelListener(){
    okListener(){
        //해당 빌더 인스턴스 배열 생성
    };
    cancelListener(){

    };
}


builderContents