// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};    /// Holds User ID objs 
    this.follows = {};  /// Holds UserIDS: - Set of User IDs Following -
    this.currentID = 0; /// Starts User Count at 0, increments as users are added.
  }


  addUser(name) {
    // Your code here
    let user = {
      id: ++this.currentID,
      name: name,
    };

    this.users[user.id] = user; /// Sets User Object as value to user ID 
    this.follows[user.id] = new Set(); /// Creates new obj with user id and a new set.
    return this.currentID
  }

  getUser(userID) {
    // Your code here
    return this.users[userID] || null;
  }

  follow(userID1, userID2) {
    // Your code here
    if(!this.users[userID2] || this.follows[userID1].has[userID2]) {
      return false;
    } else {
    this.follows[userID1].add(userID2)
    }
    return true;
  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID]
  }

  getFollowers(userID) {
    // Your code here
    const followers = new Set();
    for (let id in this.follows) {
      if (this.follows[id].has(userID)) {
        followers.add(Number(id))
      }
    }
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    let recommended = []
    let queue = [[userID]]
    let visited = new Set([userID])

    while (queue.length > 0) {
      let currPath = queue.shift()
      let currUser = currPath[currPath.length - 1]
      console.log(currPath, currUser)

      // if currPath is greater than 2 & the seperation degree = degree passed in as arg;
      // cannot evaluate for a path of 2 bc degree is less than 1 => prevents infinite loop (gatekeeper)
      if (currPath.length > 2 && currPath.length - 2 <= degrees) {
        console.log(currPath.length)
        // & if user is not same as passed in arg + does not follow currUser;
        if (currUser !== userID && !this.follows[userID].has(currUser)) {
          // add currUser to recommended
          recommended.push(currUser)
        }
      }
2
      
      // iterate through currUser's followers
      let follows = [...this.getFollows(currUser)]
      console.log(follows)

      // for each ID, if we havent visited add to visited + push the currPath + id into queue
      follows.forEach((id) => {
        if (!visited.has(id)) {
          visited.add(id)
          queue.push([...currPath, id])
        }
      })
    }
    let res = [...recommended]
     return res
  }



};

module.exports = SocialNetwork;