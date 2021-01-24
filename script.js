const delay = ms => {
  return new Promise(r => setTimeout(() => r(), ms))
}

const url_v = 'https://api.github.com/repos/Zplattyr/demo/contents/db.json'
const url_v_d = 'https://api.github.com/repos/Zplattyr/demo/contents/db.json'
const url_c = 'https://api.github.com/repos/Zplattyr/command/contents/db.json'

var final = ''

async function read_2(url) {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data.content)
        if (data.content == ""){
          console.log('waiting...')
          await delay(10000)
          await read_2(url)
        }
        console.log(data)
        if (data.content != ""){
          console.log(data.content)
          final = data
          return data
        }
}

async function read(url) {
        const response = await fetch(url)
        const data = await response.json()
        return data
}

async function write_command(sha) {
  path = 'C:\\Users\\aleks\\youtube\\run.bat'
  json = {
        "message": "new command",
        "content": btoa(unescape(encodeURIComponent(path))),
        'sha': sha,
    }
  const response = await fetch(url_c,{
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentails: 'include',
    body: JSON.stringify(json),
    headers: {
        'Authorization': 'To' + 'ken 139771ef4288' + 'ce1f9f4c83eec6d' + '4d0cc388ebeb3'
    }
  })
  var data = await response.json()
  console.log(data)
}

var ssylka = document.querySelector('.ssylka')
  ssylka.addEventListener('click', async function(evt) {

    try {
      table.classList.remove('visible')
      await delay(200)
    } catch {}
    var table = document.querySelector('.table');
    var tbody = table.children[0]
    tbody.innerHTML = ""
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "Название";
    cell2.innerHTML = "Канал";

    // var data = await read(url_v_d)
    // var sha = data.sha
    // json = {
    //       "message": "delete",
    //       "content": btoa(unescape(encodeURIComponent(""))),
    //       'sha': sha,
    //   }
    // const response = await fetch(url_v_d,{
    //   method: 'PUT',
    //   mode: 'cors',
    //   cache: 'no-cache',
    //   credentails: 'include',
    //   body: JSON.stringify(json),
    //   headers: {
    //       'Authorization': 'Token 88c2efe6d8e71af2aafbbca79a18ee73d0236140'
    //   }
    // })
    //
    //
    // var data = await read(url_c)
    // var sha = data.sha
    // await write_command(sha)
    //
    // await delay(20000)

    var data = await read_2(url_v)
    var data = final
    console.log(data)
    var data = decodeURIComponent(atob(data.content).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    var data = JSON.parse(data)
    var data = data.videos
    console.log(data)

    function bbb(i) {
      var row = table.insertRow(data[i].id);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = "<a href='" + data[i].link+ "' target='_blank' class='name'>" + data[i].name + "<a>";
      cell2.innerHTML = data[i].author;
    }
    try{
        for(var i=0;i<20;i++){
          bbb(i)
        }
    } catch {}
    await delay(200)
    table.classList.add('visible')

});
