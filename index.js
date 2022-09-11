var main_container = document.querySelector('.main-container');
var country = document.querySelectorAll('.country');
let infected = document.querySelectorAll('.infected');
let recovered = document.querySelectorAll('.recovered');
let deaths = document.querySelectorAll('.deaths');
let update_btn = document.querySelector('.btn-update');
let inf_inc = document.querySelector('.btn-infected-inc');
let inf_dec = document.querySelector('.btn-infected-dec');
let rec_inc = document.querySelector('.btn-recovered-inc');
let rec_dec = document.querySelector('.btn-recovered-dec');
let dead_inc = document.querySelector('.btn-death-inc');
let dead_dec = document.querySelector('.btn-death-dec');
let list_sort_heading = document.querySelector('.list-sort-heading');
let search_ip = document.querySelector('.search-ip');
let view_full = document.querySelector('.btn-view-full');
let inf_world_count = document.querySelector('.card-text-infected');
let rec_world_count = document.querySelector('.card-text-recovered');
let death_world_count = document.querySelector('.card-text-deceased');
var api = "https://disease.sh/v3/covid-19/countries";
var world_api = "https://disease.sh/v3/covid-19/all";

function add_row(flag,country,infected,recovered,deceased)
{
    let created_div_1=document.createElement('div');
    created_div_1.classList.add("data-row");

    let country_div=document.createElement('div');
    country_div.innerHTML=`<img src="${flag}" class="flag"> &nbsp; ${country}`;
    country_div.classList.add("country")


    let infected_div=document.createElement('div');
    infected_div.innerHTML=infected
    infected_div.classList.add("infected")

    let recovered_div=document.createElement('div');
    recovered_div.innerHTML=recovered;
    recovered_div.classList.add("recovered")

    let death_div=document.createElement('div');
    death_div.innerHTML=deceased;
    death_div.classList.add("deaths");

    created_div_1.appendChild(country_div);
    created_div_1.appendChild(infected_div);
    created_div_1.appendChild(recovered_div);
    created_div_1.appendChild(death_div);

    main_container.appendChild(created_div_1);
}

function add_row_while_ip(start,end,flag,country,infected,recovered,deceased)
{
    let created_div_1=document.createElement('div');
    created_div_1.classList.add("data-row");

    let country_div=document.createElement('div');
    country_div.innerHTML=`<img src="${flag}" class="flag"> &nbsp;`;
    for(let i=0;i<start;i++)
    country_div.innerHTML+=`${country[i]}`;
    for(let i=start;i<end;i++)
    country_div.innerHTML+=`<span class='ip-dec'>${country[i]}</span>`;
    for(let i=end;i<country.length;i++)
    country_div.innerHTML+=`${country[i]}`;

    country_div.classList.add("country")


    let infected_div=document.createElement('div');
    infected_div.innerHTML=infected
    infected_div.classList.add("infected")

    let recovered_div=document.createElement('div');
    recovered_div.innerHTML=recovered;
    recovered_div.classList.add("recovered")

    let death_div=document.createElement('div');
    death_div.innerHTML=deceased;
    death_div.classList.add("deaths");

    created_div_1.appendChild(country_div);
    created_div_1.appendChild(infected_div);
    created_div_1.appendChild(recovered_div);
    created_div_1.appendChild(death_div);

    main_container.appendChild(created_div_1);
}

function update_data()
{
    main_container.innerHTML='';
    
    fetch(api)
    .then((raw_data)=>{return raw_data.json()})
    .then((d)=>{
        for(let i=0;i<d.length;i++)
        {
            add_row(d[i].countryInfo["flag"],d[i].country,d[i].cases,d[i].recovered,d[i].deaths)
        }
    })
}

function update_world_data()
{
    fetch(world_api)
    .then((d)=>{return d.json();})
    .then((d)=>{
        inf_world_count.innerHTML=d.cases;
        rec_world_count.innerHTML=d.recovered;
        death_world_count.innerHTML=d.deaths;
    })
}

function set_heading()
{
    country[0].style.backgroundColor="rgb(143, 97, 37)";
    infected[0].style.backgroundColor="rgb(199, 199, 22)";
    recovered[0].style.backgroundColor="rgb(28, 160, 28)";
    deaths[0].style.backgroundColor="rgb(211, 93, 93)";
}

function update_by_inc_inf()
{
    fetch(api)
    .then((raw_data)=>{return raw_data.json()})
    .then((d)=>{
       
        //InPlace Sorting

        for(i=0;i<d.length;i++)
            {
                for(j=i+1;j<d.length;j++)
                {
                    if(d[i].cases>d[j].cases)
                    {
                        temp=d[i];
                        d[i]=d[j];
                        d[j]=temp;
                    }
                }
            }

        main_container.innerHTML='';
        for(let i=0;i<d.length;i++)
        {
            add_row(d[i].countryInfo["flag"],d[i].country,d[i].cases,d[i].recovered,d[i].deaths)
        }
    })
}

function update_by_dec_inf()
{
    fetch(api)
    .then((raw_data)=>{return raw_data.json()})
    .then((d)=>{

        //InPlace Sorting
       for(i=0;i<d.length;i++)
            {
                for(j=i+1;j<d.length;j++)
                {
                    if(d[i].cases<d[j].cases)
                    {
                        temp=d[i];
                        d[i]=d[j];
                        d[j]=temp;
                    }
                }
            }

        main_container.innerHTML='';
        
        for(let i=0;i<d.length;i++)
        {
            add_row(d[i].countryInfo["flag"],d[i].country,d[i].cases,d[i].recovered,d[i].deaths)
        }
    })
}

function update_by_inc_rec()
{
    fetch(api)
    .then((raw_data)=>{return raw_data.json()})
    .then((d)=>{
        //InPlace Sorting
        for(i=0;i<d.length;i++)
            {
                for(j=i+1;j<d.length;j++)
                {
                    if(d[i].recovered>d[j].recovered)
                    {
                        temp=d[i];
                        d[i]=d[j];
                        d[j]=temp;
                    }
                }
            }
        main_container.innerHTML='';
        for(let i=0;i<d.length;i++)
        {
            add_row(d[i].countryInfo["flag"],d[i].country,d[i].cases,d[i].recovered,d[i].deaths)
        }
    })
}

function update_by_dec_rec()
{
    fetch(api)
    .then((raw_data)=>{return raw_data.json()})
    .then((d)=>{
        //InPlace Sorting
        for(i=0;i<d.length;i++)
            {
                for(j=i+1;j<d.length;j++)
                {
                    if(d[i].recovered<d[j].recovered)
                    {
                        temp=d[i];
                        d[i]=d[j];
                        d[j]=temp;
                    }
                }
            }

        main_container.innerHTML='';
        for(let i=0;i<d.length;i++)
        {
            add_row(d[i].countryInfo["flag"],d[i].country,d[i].cases,d[i].recovered,d[i].deaths)
        }
    })
}


function update_by_inc_deaths()
{
    fetch(api)
    .then((raw_data)=>{return raw_data.json()})
    .then((d)=>{
        //InPlace Sorting
        for(i=0;i<d.length;i++)
            {
                for(j=i+1;j<d.length;j++)
                {
                    if(d[i].deaths>d[j].deaths)
                    {
                        temp=d[i];
                        d[i]=d[j];
                        d[j]=temp;
                    }
                }
            }

        main_container.innerHTML='';
        for(let i=0;i<d.length;i++)
        {
            add_row(d[i].countryInfo["flag"],d[i].country,d[i].cases,d[i].recovered,d[i].deaths)
        }
    })
}


function update_by_dec_deaths()
{
    fetch(api)
    .then((raw_data)=>{return raw_data.json()})
    .then((d)=>{
       //InPlace Sorting
       for(i=0;i<d.length;i++)
       {
           for(j=i+1;j<d.length;j++)
           {
               if(d[i].deaths<d[j].deaths)
               {
                   temp=d[i];
                   d[i]=d[j];
                   d[j]=temp;
               }
           }
       }
        main_container.innerHTML='';
        for(let i=0;i<d.length;i++)
        {
            add_row(d[i].countryInfo["flag"],d[i].country,d[i].cases,d[i].recovered,d[i].deaths)
        }
    })
}


update_data();
update_world_data();
set_heading();


update_btn.addEventListener('click',function(){
    update_data();
    update_world_data();
    list_sort_heading.innerHTML='The List is Sorted Based on Alphabetical Ordering of Country Names';
})


inf_inc.addEventListener('click',function(){
    update_by_inc_inf();
    list_sort_heading.innerHTML='The List is in Increasing Order of Infected Cases';
})

inf_dec.addEventListener('click',function(){
    update_by_dec_inf();
    list_sort_heading.innerHTML='The List is in Decreasing Order of Infected Cases';
})

rec_inc.addEventListener('click',function(){
    update_by_inc_rec();
    list_sort_heading.innerHTML='The List is in Increasing Order of Recovered Cases'
})

rec_dec.addEventListener('click',function(){
    update_by_dec_rec();
    list_sort_heading.innerHTML='The List is in Decreasing Order of Recovered Cases'
})

dead_inc.addEventListener('click',function(){
    update_by_inc_deaths();
    list_sort_heading.innerHTML='The List is in Increasing Order of Deaths';
})

dead_dec.addEventListener('click',function(){
    update_by_dec_deaths();
    list_sort_heading.innerHTML='The List is in Decreasing Order of Deaths';
})


view_full.addEventListener('click',function(){
    list_sort_heading.innerHTML='The List is Sorted Based on Alphabetical Ordering of Country Names';
    search_ip.value='';
    update_data();
})


search_ip.addEventListener('input',function(){
    if(search_ip.value=='')
        list_sort_heading.innerHTML='The List is Sorted Based on Alphabetical Ordering of Country Names';

    let name=search_ip.value.toLowerCase();

    fetch(api)
    .then((d)=>{return d.json()})
    .then((d)=>{
        let count=0;
        main_container.innerHTML='';
        list_sort_heading.innerHTML='List Showing Those Countries Whose Name Somewhat or Fully Matches with your Search'
        
        for(let i=0;i<d.length;i++)
        {
            if(d[i].country.toLowerCase().includes(name))
            {
                count++;
                let start=d[i].country.toLowerCase().indexOf(name);
                let end=start+name.length;
                add_row_while_ip(start,end,d[i].countryInfo["flag"],d[i].country,d[i].cases,d[i].recovered,d[i].deaths)
            }
        }
        
        if(count==0)
        {
           main_container.innerHTML='<h3 class="not-found">Sorry,No Countries Match Your Search!!!</h3>'
        }
    })
})
