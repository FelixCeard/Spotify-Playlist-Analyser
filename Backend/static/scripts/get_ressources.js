$('document').ready(() => {
    const template_content = $("#hide #content #collab");
    const App_position = $("#App")[0]

    // console.log(template_content);
    function create_content (title_text, content_text) {
        let elem = template_content.clone()
        let titel = $('header span', elem)[0]
        titel.innerText = title_text
        let content = $('.content', elem)[0]
        content.innerText = content_text
        // console.log(childr);
        elem = elem[0]
        
        App_position.appendChild(elem)
    }
    function create_content_DOM (title_text, DOM) {
        let elem = template_content.clone()
        let titel = $('header span', elem)[0]
        titel.innerText = title_text
        let content = $('.content', elem)[0]
        content.appendChild(DOM)
        // console.log(childr);
        elem = elem[0]
        
        App_position.appendChild(elem)
    }
    
    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
    product = urlParams.get('url');
    
    let e = fetch('/getplaylist?url=' + product).then(response => response.json());
    let a = e.then(data => {
        console.log(data);

        if (data.is_collab === true){
            create_content("Collab playlist", "✅");
        }
        $("#name")[0].innerText = data.name;
        if (data.icon != "0") {
            let image = document.createElement("img")
            image.src = data.icon
            $("#profile_image")[0].appendChild(image)
        }
        create_content("Number of followers", data.followers)
        num_tracks = data.track_infos.length
        console.log(num_tracks);
        // track repartion
        let repartion = document.createElement('canvas')
        repartion.id = 'repartition'
        repartion.width = 900
        repartion.height = 900
        create_content_DOM('repartitions of the tracks', repartion)

        let users = []
        let count = []
        Object.entries(data.total_track_count).forEach(([key, value]) => {
            users.push(key);
            count.push(value);
        });
        // console.log(count);
        let ctx = repartion.getContext('2d')
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: users,
                datasets: [{
                    // label: '# of Votes',
                    data: count,
                    backgroundColor: [
                        '#2a9d8f',
                        '#f4a261',
                        '#264653',
                        '#e9c46a',
                        '#e76f51'
                    ],
                    borderColor: [
                        '#2a9d8f',
                        '#f4a261',
                        '#264653',
                        '#e9c46a',
                        '#e76f51'
                    ],
                    borderWidth: 1
                }],
                
            },
            options: {},
            
        });
    });
});

