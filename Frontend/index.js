const col = [
    "#FF7A85",
    "#262D59",
    "#FFEDF0",
    "#F2A35E",
    "#BF5841"
]

function type_animation(text, t){
    let speed = 10; // later 100, realistic
    for (let i = 0; i < text.length; i++) {
        let element = text[i];
        t.add({
            target: title,
            duration: speed,
            complete: function (anime) {
                title.textContent += element
            }
        })
    }
}

function wait(t, time) {
    t.add({
        target: "body",
        duration: time
    })
}

function remove_text(t, n=null){
    let speed = 10; // later 100, realistic
    if (n != null) {
        for (let i = 0; i < n; i++) {
            // const element = array[i];
            t.add({
                target: title,
                duration: speed,
                complete: function (anime) {
                    title.textContent = title.textContent.slice(0,-1);
                    // title.textContent += element
                }
            })
        } 
    }else {
        for (let i = 0; i < title.textContent.length; i++) {
            // const element = array[i];
            t.add({
                target: title,
                duration: speed,
                complete: function (anime) {
                    title.textContent = title.textContent.slice(0,-1);
                    // title.textContent += element
                }
            })
        } 
    }
}

$('document').ready(() => {
    // starting with
    $('#main').css(`background-color`, col[0]);

    // append title
    let title = document.createElement('Span');
    title.innerText = answer.name;
    title.id = 'title'
    title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    let height = $(window).height();
    
    $('#main #centered')[0].append(title);
    
    // first animation
    let t1 = anime.timeline({
        loop: false
    });

    t1.add({
        targets: '.letter',
        duration: 10, // need to be min 1000
        opacity: [0,1], 
        easing: 'easeInQuad',
        delay: anime.stagger(25),
        endDelay: 10, // also 1000
    });
    t1.add({
        targets: title,
        rotateX: [0,90],
        easing: 'easeInQuad',
        duration: 200,
        delay: 400,
        complete: function (anim) {
            title.textContent = `Wow`;
        }
    })
    t1.add({
        target: title,
        rotateX: 0,
        easing: 'linear',
        duration: 200,
        complete: function (an) {
            title.style.transform = "rotateX(0)";
        }
    })
    type_animation("...", t1)
    wait(t1, 1000)
    type_animation(` you have ${answer.followers} followers`, t1);
    wait(t1, 2000)
    remove_text(t1);
    
    $("body").css("background-color", col[1]);
    t1.add({
        targets: '#main',
        easing: 'linear',
        duration: 300,
        width: 0,
        delay: 500,
        endDelay: 0,
        complete: function (anim) {
            $("#main").css("background-color", col[1]);
            $('#main').css('width', '100%');
            // title.innerText = "'C̴̡͍͙͓͕̩̾́̍̊̇́̍͛̽̕͠ơ̴̡̢͖̪͖͖̠͙̜̯̍͆͝n̷͍̺̬͕̳͕̼̟̭͖̥̎͘ğ̸̡̛̖̜̗̖̳̻͔̲̩̯̺̟͎̐͒̏̊́̐̿͠͝ͅṛ̷̛̒̓̈́̿̿͒̌͂̇̇̔ā̵̡̲̳̫̼͙̗̮̩͎͓̜̫̳͉́͋̒̀̈́̂̇̔̇̂̓͆̃t̴͍͎͇͈̘̒̏͂̐̒̋͋̌̿̚͝ư̶̲̝̻̦̭͔͚̼͎̌̾̒̇̌͜ͅͅľ̶̨̧̧͚͙̜̲͓̜͇͒̕͘a̵͎͓̹̰̘̠̠͍̺̞͛͜͝ţ̷̻̰̥̬̯̘̥͕̺̣͌͌͗͗͊̊͌̊̑́̆̃͝i̷̢̪͕͎͎̳͕̗̓̒̀̎̀́͑̅̕͘͝͠o̶̲̩̣̗͔͒̈͝n̶̜͉̯̤͕̫͖̥̗̜̝͊̍̑̅͐̈ͅs̶̨̡͕̹̜̬̲̖̪̜̼̳̅́̈́͆̇̈́̋'"
            title.innerText = 'congratulation'
            title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    }
    });
    
    // .add({
    //     target: title,
    //     easing: 'linear',
    //     opacity: [0,1],
    //     color: col[2],
    //     duration: 800,
    //     delay: anime.stagger(25)
    // })
    t1.add({
        targets: '.letter',
        duration: 10, // need to be min 1000
        opacity: [0,1], 
        easing: 'easeInQuad',
        delay: anime.stagger(25),
        endDelay: 10, // also 1000
    });
    t1.pause;
    
    $('#title').ready( () => 
        t1.play
    );
})
