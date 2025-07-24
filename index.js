import { tweetsData } from '/data.js'

const textInput = document.getElementById('text-input')
const tweetBtn = document.getElementById('tweet-btn')

tweetBtn.addEventListener('click', function(){
  console.log(textInput.value)
})