

if (document.getElementById('language_selector')!=null) {
    document.getElementById('language_selector').addEventListener('change',()=>{
        let value=document.getElementById('language_selector').value;
        let path=window.location.pathname;
        console.log(path+value.slice(1))
        window.location.href=path+value.slice(1);
        // let re=path.includes('/ar/') || path.includes('/ur/');
        // if (re) {
        //     path=path.slice(3);
        // }
    
        // fetch(re?value+path:value).then((response)=>response.text()).then((data)=>{
        //     document.getElementById('themeContent').innerHTML = new DOMParser()
        //     .parseFromString(data, 'text/html')
        //     .getElementById('themeContent').innerHTML;
        //     if (value=="/ur" || value=="/ar") {
        //         document.getElementById('themeBody').classList.remove('ltr-direction');
        //         document.getElementById('themeBody').classList.add('rtl-direction');
        //     }else{
        //         document.getElementById('themeBody').classList.remove('rtl-direction');
        //         document.getElementById('themeBody').classList.add('ltr-direction');
        //     }
        // });
    })
}


