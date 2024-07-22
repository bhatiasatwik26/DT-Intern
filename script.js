const cardContainer = document.querySelector('.card-container');
const list = document.querySelector('.journeyList');
const journeyHeading = document.querySelector('.journeyHead');
const btn = document.querySelector('.journey .top div'); 
const tab = document.querySelector('.journey');
const bottom = document.querySelector('.bottom');
let ApiData = null;

const initialise = () =>{
    btn.addEventListener('click',()=>{
        if(tab.classList.contains('hide')){
            tab.classList.remove('hide');
            btn.innerHTML = '<i class="ri-arrow-left-line"></i>';
            updateDocument(ApiData);
        }else{
            tab.classList.add('hide');
            list.innerHTML = '<p class="float">1</p>'     
            btn.innerHTML = '<i class="ri-arrow-right-line"></i>';
        }  
    });
    fetchData();
}

const fetchData = async()=>{
    const data = await fetch('https://dev.deepthought.education/assets/uploads/files/files/others/ddugky_project.json');
     ApiData = await data.json();
    updateDocument(ApiData);
}

const updateDocument = (data) => {
    // Setting title
    document.querySelector('.title-name').innerText = data?.title;

    // Setting description heading
    document.querySelector('.box h2').innerText = data?.tasks[0]?.task_title;

    // Setting description
    document.querySelector('.box p').innerText = data?.tasks[0]?.task_description ;

    // Setting journey heading

    // Setting assets
    const cardList = data?.tasks[0]?.assets;
    
    list.innerHTML = '';
    // cardContainer.innerHTML = '';
    cardList.forEach(card => {
        const listItem = document.createElement('li');
        listItem.innerText = card.asset_title;
        list.appendChild(listItem);
        if(card.asset_content_type == "video")
        {
            addVideoCard(card , cardContainer);
        }
        else if(card.asset_content_type == "threadbuilder")
        {
            addThreadCard(card , cardContainer);
        }
        else if(card?.asset_content_type == "article" && card?.asset_type == "input_asset")
        {
            addWriteCard(card , cardContainer);
        }
        else
        {
            addOtherCard(card , cardContainer); 
        }
    });
    
}
const addVideoCard = (card , cardContainer) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `
                <div class="top">
                    ${card?.asset_title}
                </div>
                <div class="mid">
                    <p><b>Description:</b>${card?.asset_description}</p>
                </div>
                <div class="bottom">
                    <iframe width="560" height="315" src="${card?.asset_content}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>`;
    cardContainer.appendChild(cardElement);
}
const addThreadCard = (card , cardContainer) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `
                <div class="top">
                    ${card?.asset_title}
                </div>
                <div class="mid">
                    <p><b>Description:</b> ${card?.asset_description}</p>
                </div>
                <div class="bottom">
                   <div class=main>
                        <div class="th-1">
                            Sub thread 1
                            <input type="text"/>
                        </div>
                        <div class="th-2">
                            Sub Interpret-1
                            <input type="text"/>
                        </div>

                   </div>
                </div>`;
    cardContainer.appendChild(cardElement);
}
const addOtherCard = (card , cardContainer) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `
                <div class="top">
                    ${card?.asset_title}
                </div>
                <div class="mid">
                    <p><b>Description:</b> ${card?.asset_description}</p>
                </div>
                <div class="bottom-2">
                    <h1>Introduction</h1>
                   <div>
                       The 4SA MEthod, how to bring a idea into progress?
                    </div>
                    <div>
                        <h1>Thread A</h1>
                        <div>
                            <div>
                               How are you going to develop your stratergy ? Which method are you going to use to develop a stratergy ? What if the project is lengthy?
                            </div>
                            <div>
                                Example 1
                            </div>
                        </div>
                        <input type="text"></textarea>
                    </div>
                </div>;`
    cardContainer.appendChild(cardElement);
}
const addWriteCard = (card , cardContainer) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `
                <div class="top">
                    ${card?.asset_title}
                </div>
                <div class="mid">
                    <p><b>Description:</b> ${card?.asset_description}</p>
                </div>
                <div class="bottom-2">
                   <div>
                        <h1>Title</h1>
                        <input type="text"></textarea>
                    </div>
                    <div>
                        <h1>Content</h1>
                        <div>
                            <div>
                                <p>File</p>
                                <p>Edit</p>
                                <p>View</p>
                                <p>Insert</p>
                                <p>Format</p>
                                <p>Tools</p>
                                <p>Help</p>
                            </div>
                            <div>
                                <i class="ri-corner-up-left-line"></i>
                                <i class="ri-corner-up-right-line"></i>
                                <i class="ri-expand-line"></i>
                            </div>
                        </div>
                        <input type="text"></textarea>
                    </div>
                </div>;`
    cardContainer.appendChild(cardElement);
}

initialise();