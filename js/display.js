const seeMoreBtn = document.getElementById('see-more-btn');
const loader = document.getElementById('loader');
const modalContainer = document.getElementById('modal-container');
const modal = document.getElementById('my-modal-5');

let cacheSortAllData = [];
let cacheAllData = [];
let tempData = [];


// Display all data
const displayData = (data, isShowAll, isSort) => {
    if (isShowAll === true) {
        tempData = [...cacheAllData];
    }
    else if (isSort === true) {
        tempData = [...data];
    }
    else {
        tempData = [...data];
    }

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    tempData.forEach(element => {
        const { id, image, features, name, published_in } = element;
        cardContainer.innerHTML += `
        <div class="border rounded-md shadow-md p-6">
            <div class="mb-6">
                <img class="h-48 w-96" src="${image ? image : '/images/loadFailed.jpg'}" alt="">
            </div>
            <div>
                <h3 class="text-2xl font-semibold mb-4">Features</h3>
                <ol class="list-decimal ml-8">
                    ${features && features.length > 0 ? features.map(item => `<li>${item}</li>`).join('') : 'No data Found'}
                </ol>
            </div>
            <hr class="my-4">
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="text-2xl font-semibold mb-4">${name ? name : 'No data Found'}</h3>
                    <p><span><i class="fa-solid fa-calendar-days"></i></span> ${published_in ? moment(published_in).format('L') : 'No data Found'}</p>
                </div>
                <div>
                    <button onclick="loadIndividualData('${id ? id : ''}')" class="btn btn-xs btn-circle btn-outline"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
        `
    });
}


// Display individual data
const displayIndividualData = (data) => {
    const { description, pricing, features, integrations, image_link, accuracy, input_output_examples } = data;

    const allPricePlane = [];
    if (pricing) {
        pricing.forEach(element => {
            allPricePlane.push(element);
        });
    }

    const allFeatures = [];
    if (features) {
        for (const index in features) {
            allFeatures.push(features[index].feature_name);
        }
    }

    modalContainer.innerHTML = `
    <div class="bg-orange-50 border border-orange-300 rounded-md shadow-md p-6">
        <h4 class="font-semibold text-2xl mb-6">${description ? description : 'No data Found'}</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
            <div class="bg-white rounded-md p-4">
                <p class="text-green-600 font-bold">${allPricePlane.length > 0 && allPricePlane[0].price ? allPricePlane[0].price : 'Free of Cost/'}</p>
                <p class="text-green-600 font-bold">${allPricePlane.length > 0 && allPricePlane[0].plan ? allPricePlane[0].plan : 'Basic'}</p>
            </div>
            <div class="bg-white rounded-md p-4">
                <p class="text-orange-600 font-bold">${allPricePlane.length > 0 && allPricePlane[1].price ? allPricePlane[1].price : 'Free of Cost/'}</p>
                <p class="text-orange-600 font-bold">${allPricePlane.length > 0 && allPricePlane[1].plan ? allPricePlane[1].plan : 'Pro'}</p>
            </div>
            <div class="bg-white rounded-md p-4">
                <p class="text-red-600 font-bold">${allPricePlane.length > 0 && allPricePlane[2].price ? allPricePlane[2].price : 'Free of Cost/'}</p>
                <p class="text-red-600 font-bold">${allPricePlane.length > 0 && allPricePlane[2].plan ? allPricePlane[2].plan : 'Enterprise'}</p>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
                <h4 class="text-2xl font-semibold mb-4">Features</h4>
                <ul class="list-disc ml-8">
                    ${allFeatures.length > 0 ? allFeatures.map(item => `<li>${item}</li>`).join('') : 'No data Found'}
                </ul>
            </div>
            <div>
                <h4 class="text-2xl font-semibold mb-4">Integrations</h4>
                <ul class="list-disc ml-8">
                    ${integrations && integrations.length > 0 ? integrations.map(item => `<li>${item}</li>`).join('') : 'No data Found'}
                </ul>
            </div>
        </div>
    </div>
    <div class="order-first md:order-last border rounded-md shadow-md p-6">
        <div class="relative inline-flex">
            <img src="${image_link && image_link.length > 0 ? image_link.find(img => img) : '/images/loadFailed.jpg'}" alt="">
            ${accuracy && accuracy.score ? `<div class="absolute inline-flex bg-red-500 text-white text-xs rounded-md py-1 px-4 top-1 right-1">${accuracy.score * 100}% accuracy</div>` : ''}
        </div>
        <div class="text-center mt-6">
            <h3 class="text-2xl font-semibold">${input_output_examples && input_output_examples.length > 0 ? input_output_examples[0].input : 'Can you give any example?'}</h3>
            <p class="py-4">${input_output_examples && input_output_examples.length > 0 ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
        </div>
    </div>
    `
}