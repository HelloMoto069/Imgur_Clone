let TimerId;
  function debounce(func, delay) {
    if (TimerId) {
      clearTimeout(TimerId);
    }

    TimerId = setTimeout(() => {
      func();
    }, delay);

  }

  async function main() {
    let text = document.getElementById("search-box").value;

    let headersList = {
      Authorization: "Client-ID 25c92b941ab2238",
    };
    let items = await fetch(
      `https://api.imgur.com/3/gallery/t/${text}/top/all`,
      {
        method: "GET",
        headers: headersList,
      }
    );
    let { data } = await items.json();

    // data?.items?.forEach((d) => {
    //   console.log("title", d?.title);
    // });

    appendSearch(data.items);
  }

  function appendSearch(data) {
    let searchitem = document.getElementById("searchitem");
    searchitem.innerHTML = null;
    data?.forEach((data) => {
      let p = document.createElement("p");
      p.textContent = data.title;
      searchitem.append(p);
    });
  }

  let nav = document.getElementById("nav");
  let searchitem = document.getElementById("searchitem");
  window.onscroll = () => {
    if (
      document.body.scrollTop > 10 ||
      document.documentElement.scrollTop > 10
    ){
        searchitem.style.display = "none";

    }else{
        searchitem.style.display = "block";
    }
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
    nav.setAttribute("class","navShadow")
      nav.style.backgroundImage =
        "url('https://s.imgur.com/desktop-assets/desktop-assets/homebg.e52b5cdf24f83bcd55f9f1318855f2ef.png')";
    } else {
      nav.style.background = "transparent";
      nav.removeAttribute('class');
    }
  };
  async function getImg() {
    let headersList = {
      Authorization: "Client-ID fe6cbe383cc4efa",
    };

    let d = await fetch(
      "https://api.imgur.com/3/gallery/hot/viral/1/month?showViral=true&mature=true&album_previews=true",
      {
        method: "GET",
        headers: headersList,
      }
    );

    let { data } = await d.json();
    appendData(data);


    // data.forEach((data)=>{
    //     console.log(data.images?.[0]?.type);

    // })
  }
  getImg();
  let one = document.getElementById("one");
  let two = document.getElementById("two");
  let three = document.getElementById("three");
  let four = document.getElementById("four");
  let i = 0;

  function appendData(d) {
    d.forEach((data) => {
      //   console.log(data?.images?.[0]);
      if (
        data?.images?.[0].link &&
        (data?.images?.[0].type == "image/jpeg" ||
          data?.images?.[0].type == "image/gif" ||
          data?.images?.[0].type == "image/png")
      ) {
        let mainDiv = document.createElement("div");
        mainDiv.setAttribute("class", "maindiv");

        let imgdiv = document.createElement("div");
        imgdiv.setAttribute("class", "imgdiv");
        let img = document.createElement("img");
        img.src = data?.images?.[0].link;
        img.setAttribute("loop", "infinite");
        imgdiv.append(img);

        let details = document.createElement("div");
        details.setAttribute("class", "detailsdiv");

        let span = document.createElement("div");
        span.innerHTML = data?.title;
        span.setAttribute("class", "title_span");

        let smalldiv = document.createElement("div");
        smalldiv.setAttribute("class", "smalldiv");

        let upvote = document.createElement("div");
        upvote.textContent = "U: " + data.ups;
        let comment = document.createElement("div");
        comment.textContent = "C: " + data.comment_count;
        let watch = document.createElement("div");
        let views = Math.round(data.views / 1000);
        watch.textContent = "V: " + views + "k";

        smalldiv.append(upvote, comment, watch);

        details.append(span, smalldiv);

        mainDiv.append(imgdiv, details);
        if (i % 4 === 0) {
          one.append(mainDiv);
        } else if (i % 4 === 1) {
          two.append(mainDiv);
        } else if (i % 4 === 2) {
          three.append(mainDiv);
        } else if (i % 4 === 3) {
          four.append(mainDiv);
        }
      }
      i++;
    });
  }