Things to change

Do on click on buttons in FriendAppBar, if none show posts
Add redux state so if user clicks about it stores about in redux store.
If about, under friend load about component instead of posts etc
Above now done, need to move posts, about and friends to seperate components so at end can just put posts component instead of rewriting whole posts component

Maybe in FriendsPosts add if statement to check if getting posts of logged in users friends or not. Idea - Maybe pass to friends posts component props of isloggedinuser: false so in posts comopnent const isLoggedInUser?.props = props; if !loggedInUser in useEffect do different api call but set it to same setPosts state

Add footer to bottom of each page to sort out whitespace issue

Add post props to all LikeComment calls