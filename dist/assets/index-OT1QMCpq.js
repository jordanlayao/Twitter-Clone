(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(i){if(i.ep)return;i.ep=!0;const n=r(i);fetch(i.href,n)}})();const o=[{handle:"@TrollBot66756542 💎",profilePic:"images/troll.jpg",likes:27,retweets:10,tweetText:`Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
          Guaranteed return on investment. HMU DMs open!!`,replies:[],isLiked:!1,isRetweeted:!1,uuid:"4b161eee-c0f5-4545-9c4b-8562944223ee"},{handle:"@Elon ✅",profilePic:"images/musk.png",likes:6500,retweets:234,tweetText:"I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀",replies:[{handle:"@TomCruise ✅",profilePic:"images/tcruise.png",tweetText:"Yes! Sign me up! 😎🛩"},{handle:"@ChuckNorris ✅",profilePic:"images/chucknorris.jpeg",tweetText:"I went last year😴"}],isLiked:!1,isRetweeted:!1,uuid:"3c23454ee-c0f5-9g9g-9c4b-77835tgs2"},{handle:"@NoobCoder12",profilePic:"images/flower.png",likes:10,retweets:3,tweetText:"Are you a coder if you only know HTML?",replies:[{handle:"@StackOverflower ☣️",profilePic:"images/overflow.png",tweetText:"No. Onviosuly not. Go get a job in McDonald's."},{handle:"@YummyCoder64",profilePic:"images/love.png",tweetText:"You are wonderful just as you are! ❤️"}],isLiked:!1,isRetweeted:!1,uuid:"8hy671sff-c0f5-4545-9c4b-1237gyys45"}],s=[];for(let t=0;t<256;++t)s.push((t+256).toString(16).slice(1));function f(t,e=0){return(s[t[e+0]]+s[t[e+1]]+s[t[e+2]]+s[t[e+3]]+"-"+s[t[e+4]]+s[t[e+5]]+"-"+s[t[e+6]]+s[t[e+7]]+"-"+s[t[e+8]]+s[t[e+9]]+"-"+s[t[e+10]]+s[t[e+11]]+s[t[e+12]]+s[t[e+13]]+s[t[e+14]]+s[t[e+15]]).toLowerCase()}let c;const g=new Uint8Array(16);function m(){if(!c){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");c=crypto.getRandomValues.bind(crypto)}return c(g)}const w=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),p={randomUUID:w};function y(t,e,r){if(p.randomUUID&&!t)return p.randomUUID();t=t||{};const l=t.random??t.rng?.()??m();if(l.length<16)throw new Error("Random bytes length must be >= 16");return l[6]=l[6]&15|64,l[8]=l[8]&63|128,f(l)}document.addEventListener("click",function(t){t.target.dataset.like?h(t.target.dataset.like):t.target.dataset.retweet?v(t.target.dataset.retweet):t.target.dataset.reply?k(t.target.dataset.reply):t.target.id==="tweet-btn"&&b()});function h(t){const e=o.filter(function(r){return r.uuid===t})[0];e.isLiked?e.likes--:e.likes++,e.isLiked=!e.isLiked,d()}const u=document.getElementById("text-input");function v(t){const e=o.filter(function(r){return r.uuid===t})[0];e.isRetweeted?e.retweets--:e.retweets++,e.isRetweeted=!e.isRetweeted,d()}function k(t){document.getElementById(`replies-${t}`).classList.toggle("hidden")}function b(){u.value&&(o.unshift({handle:"@Scrimba",profilePic:"images/scrimbalogo.png",likes:0,retweets:0,tweetText:u.value,replies:[],isLiked:!1,isRetweeted:!1,uuid:y()}),d(),u.value="")}function x(){let t="";return o.forEach(function(e){let r="";e.isLiked&&(r="liked");let l="";e.isRetweeted&&(l="retweeted");let i="";e.replies.length>0&&e.replies.forEach(function(n){i+=`
        <div class="tweet-reply">
          <div class="tweet-inner">
          <img src="${n.profilePic}" class="profile-pic">
              <div>
                  <p class="handle">${n.handle}</p>
                  <p class="tweet-text">${n.tweetText}</p>
              </div>
          </div>
        </div>
        `}),t+=`
    
    <div class="tweet">
      <div class="tweet-inner">
        <img src="${e.profilePic}" class="profile-pic">
          <div>
              <p class="handle">${e.handle}</p>
              <p class="tweet-text">${e.tweetText}</p>
              <div class="tweet-details">
                  <span class="tweet-detail">
                      <i class="fa-regular fa-comment-dots" data-reply="${e.uuid}"></i>
                      ${e.replies.length}
                  </span>
                  <span class="tweet-detail">
                      <i class="fa-solid fa-heart ${r}" data-like="${e.uuid}"></i>
                      ${e.likes}
                  </span>
                  <span class="tweet-detail">
                      <i class="fa-solid fa-retweet ${l}" data-retweet="${e.uuid}"></i>
                      ${e.retweets}
                  </span>
              </div>   
          </div>            
      </div>
      <div id="replies-${e.uuid}">
        ${i}
      </div>
    </div>
    `}),t}function d(){document.getElementById("feed").innerHTML=x()}d();
