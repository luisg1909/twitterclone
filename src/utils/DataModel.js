class User {
    constructor(username, Firstname, Lastname, Email , Month , Day ,Year ,Password,AboutMe
      , Work, Education, Interests , Networks , Hometown ,Relationship ,ProfilePic ,BgPic) {
      this.username = username;
      this.Firstname = Firstname;
      this.Lastname = Lastname;
      this.Email = Email; 
      this.Month = Month;
      this.Day = Day;
      this.Year = Year;
      this.Password = Password;
      this.ProfilePic = ProfilePic;     
      this.BgPic = BgPic;  
      this.AboutMe = AboutMe;
      this.Work = Work;
      this.Education = Education; 
      this.Interests = Interests;
      this.Networks = Networks;
      this.Hometown = Hometown;
      this.Relationship = Relationship;
      
    }
  }

  
  class Friend {
    constructor(username, friendId, status ) {
      this.username = username;
      this.friendId = friendId;
      this.status = status;
    }
  }
  class Message {
    constructor(username, friendId, message ) {
      this.username = username;
      this.friendId = friendId;
      this.message = message;
    }
  }

  
  class Post {
    constructor(username, content, image = '', dateCreated = new Date(),kind) {
     
      this.username = username;
      this.content = content;      
      this.dateCreated = dateCreated;
      this.image = image;
      this.kind = kind; 
    }
  }
  
  export { User, Post,Friend,Message };
  