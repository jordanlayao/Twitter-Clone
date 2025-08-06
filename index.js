import { tweetsData } from '/data.js'
import { v4 as uuidv4 } from 'uuid'

// Track which replies are currently visible
let visibleReplies = new Set()

// Track which tweet we're replying to
let replyingToTweetId = null

document.addEventListener('click', function(e){
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like)
  }
  else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet)
  }
  else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply)
  }
  else if (e.target.dataset.replyTo) {
    handleReplyToClick(e.target.dataset.replyTo)
  }
  else if (e.target.id === 'tweet-btn') {
    handleTweetBtnClick()
  }
  else if (e.target.classList.contains('reply-btn')) {
    handleReplySubmit()
  }
  else if (e.target.classList.contains('cancel-reply-btn')) {
    handleCancelReply()
  }
})

function handleLikeClick(tweetId){
  const targetTweetObj = tweetsData.filter(function(tweet){
    return tweet.uuid === tweetId
  })[0]
  
  if (targetTweetObj.isLiked){
    targetTweetObj.likes--
  }

  else {
    targetTweetObj.likes++
  }

  targetTweetObj.isLiked = !targetTweetObj.isLiked

  render()
}

const textInput = document.getElementById('text-input')

function handleRetweetClick(tweetId){
  const targetTweetObj = tweetsData.filter(function(tweet){
      return tweet.uuid === tweetId
  })[0]
  
  if(targetTweetObj.isRetweeted){
      targetTweetObj.retweets--
  }
  else{
      targetTweetObj.retweets++
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
  render() 
}

function handleReplyClick(replyId){
  const repliesElement = document.getElementById(`replies-${replyId}`)
  const isHidden = repliesElement.classList.contains('hidden')
  
  if (isHidden) {
    // Show replies
    repliesElement.classList.remove('hidden')
    visibleReplies.add(replyId)
  } else {
    // Hide replies
    repliesElement.classList.add('hidden')
    visibleReplies.delete(replyId)
  }
}

function handleReplyToClick(tweetId){
  // Hide any existing reply inputs
  hideAllReplyInputs()
  
  replyingToTweetId = tweetId
  
  // Show reply input for this specific tweet
  const replyInput = document.getElementById(`reply-input-${tweetId}`)
  if (replyInput) {
    replyInput.classList.remove('hidden')
    const textarea = replyInput.querySelector('textarea')
    if (textarea) {
      textarea.focus()
    }
  }
}

function handleReplySubmit(){
  if (replyingToTweetId) {
    const replyInput = document.getElementById(`reply-input-${replyingToTweetId}`)
    const textarea = replyInput.querySelector('textarea')
    
    if (textarea && textarea.value.trim()) {
      const targetTweet = tweetsData.find(tweet => tweet.uuid === replyingToTweetId)
      
      if (targetTweet) {
        const newReply = {
          handle: '@Scrimba',
          profilePic: 'images/scrimbalogo.png',
          tweetText: textarea.value
        }
        
        targetTweet.replies.push(newReply)
        
        // Clear and hide reply input
        textarea.value = ''
        replyInput.classList.add('hidden')
        replyingToTweetId = null
        
        // Re-render to show the new reply
        render()
      }
    }
  }
}

function handleCancelReply(){
  if (replyingToTweetId) {
    const replyInput = document.getElementById(`reply-input-${replyingToTweetId}`)
    const textarea = replyInput.querySelector('textarea')
    
    if (textarea) {
      textarea.value = ''
    }
    if (replyInput) {
      replyInput.classList.add('hidden')
    }
    replyingToTweetId = null
  }
}

function hideAllReplyInputs(){
  const replyInputs = document.querySelectorAll('.reply-input-container')
  replyInputs.forEach(input => {
    input.classList.add('hidden')
  })
}

function handleTweetBtnClick(){
  
  if(textInput.value){
    tweetsData.unshift({
        handle: `@Scrimba`,
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: textInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    })
render()
textInput.value = ''
}
}


function getFeedHtml() {

  let feedHtml = ``

  tweetsData.forEach (function (tweet) {
    
    let likeIconClass = ''
    if (tweet.isLiked){
      likeIconClass = 'liked'
    }

    let retweetIconClass = ''
    if(tweet.isRetweeted){
      retweetIconClass = 'retweeted'
    }

    let repliesHtml = ''

    if (tweet.replies.length > 0) {
      tweet.replies.forEach(function(reply){
        repliesHtml+= `
        <div class="tweet-reply">
          <div class="tweet-inner">
          <img src="${reply.profilePic}" class="profile-pic">
              <div>
                  <p class="handle">${reply.handle}</p>
                  <p class="tweet-text">${reply.tweetText}</p>
              </div>
          </div>
        </div>
        `
      })
    }
    
    feedHtml += `
    
    <div class="tweet">
      <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
          <div>
              <p class="handle">${tweet.handle}</p>
              <p class="tweet-text">${tweet.tweetText}</p>
              <div class="tweet-details">
                  <span class="tweet-detail">
                      <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                      ${tweet.replies.length}
                  </span>
                  <span class="tweet-detail">
                      <i class="fa-solid fa-reply" data-reply-to="${tweet.uuid}"></i>
                  </span>
                  <span class="tweet-detail">
                      <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                      ${tweet.likes}
                  </span>
                  <span class="tweet-detail">
                      <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                      ${tweet.retweets}
                  </span>
              </div>   
          </div>            
      </div>
      <div id="replies-${tweet.uuid}" class="${visibleReplies.has(tweet.uuid) ? '' : 'hidden'}">
        ${repliesHtml}
      </div>
      
      <!-- Reply Input for this specific tweet -->
      <div id="reply-input-${tweet.uuid}" class="reply-input-container hidden">
        <div class="tweet-input-area">
          <img src="images/scrimbalogo.png" class="profile-pic">
          <textarea placeholder="Your reply"></textarea>
        </div>
        <div class="reply-buttons">
          <button class="reply-btn" data-tweet-id="${tweet.uuid}">Reply</button>
          <button class="cancel-reply-btn" data-tweet-id="${tweet.uuid}">Cancel</button>
        </div>
      </div>
    </div>
    `
  })

  return feedHtml
}

function render(){
  
  document.getElementById('feed').innerHTML = getFeedHtml()

}

render()