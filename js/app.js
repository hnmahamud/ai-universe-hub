// Load all data from api
const loadData = async () => {
    loadingVisibility(true);
    try {
        const URL = `https://openapi.programming-hero.com/api/ai/tools`;
        const res = await fetch(URL);
        const data = await res.json();
        cacheAllData = [...data.data.tools];
        if (data.data.tools.length > 6) {
            loadingVisibility(false);
            displayData(data.data.tools.slice(0, 6), false, false);
            seeMoreBtnVisibility(true);
        }
        else {
            loadingVisibility(false);
            displayData(data.data.tools, false, false);
            seeMoreBtnVisibility(false);
        }
    }
    catch (error) {
        seeMoreBtnVisibility(false);
        console.log(error);
    }
}


// Load individual data
const loadIndividualData = async (toolId) => {
    try {
        const URL = `https://openapi.programming-hero.com/api/ai/tool/${toolId}`;
        const res = await fetch(URL);
        const data = await res.json();
        modalShow(true);
        displayIndividualData(data.data);
    }
    catch (error) {
        console.log(error);
    }
}


// Sort all data by date
const sortDataByDate = () => {
    cacheAllData.sort((a, b) => {
        return new Date(b.published_in) - new Date(a.published_in);
    })
    cacheSortAllData = [...cacheAllData];
    if (seeMoreBtn.classList.contains('hidden')) {
        displayData(cacheAllData, false, true);
    }
    else {
        seeMoreBtnVisibility(true);
        displayData(cacheAllData.slice(0, 6), false, true);
    }
}


// See more button visibility
const seeMoreBtnVisibility = (isShow) => {
    if (isShow) {
        seeMoreBtn.classList.remove('hidden');
    }
    else {
        seeMoreBtn.classList.add('hidden');
    }
}


// Loading animation visibility
const loadingVisibility = (isShow) => {
    if (isShow) {
        loader.classList.remove('hidden');
    }
    else {
        loader.classList.add('hidden');
    }
}


// Modal Visibility
const modalShow = (isOpen) => {
    if (isOpen === true) {
        modalContainer.innerHTML = '';
        modal.checked = true;
    }
    else {
        modal.checked = false;
    }
}