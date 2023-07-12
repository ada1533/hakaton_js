// data start
let users = [
  {
    name: 'a',
    password: 'a',
    age: 30,
    isLogin: false,
    getMessages: [],
    sendMessages: [] 
  },
  {
    name: 'User 2',
    password: 'pass124',
    age: 33,
    isLogin: false,
    getMessages: [],
    sendMessages: []
  },
  {
    name: 'User 3',
    password: 'pass125',
    age: 21,
    isLogin: false,
    getMessages: [],
    sendMessages: []
  },
];
// data end

// users logic
let inSystem = '';

function changeInSystemUser(userName = ''){
  inSystem = userName;
  let h3 = document.querySelector('h3');
  inSystem ? h3.innerText = `User: ${inSystem} in system` : h3.innerText = `no users in system`;
}
// register 
function checkUniqueUserName(userName) {
  return users.some(item => item.name === userName)
};

function checkPasswords(pass, passConfirm) {
  return pass === passConfirm;
};


function createUser() {
  let userName = prompt('Enter user name');
  if(checkUniqueUserName(userName)) {
    alert('User already exist!');
    return;
  }
  let pass = prompt('Enter password');
  let passConfirm = prompt('Enter password confirmation');
  if(!checkPasswords(pass, passConfirm)) {
    alert('Passwords don\'t match!');
    return;
  }
  let age = +prompt('Enter age');
  let userObj = {
    name: userName,
    password: pass,
    age: age,
    isLogin: false,
    getMessages: [],
    sendMessages: []
  };
  users.push(userObj);
  console.log(users);
}

// login
function getUserObj(userName) {
  return users.find(item => item.name === userName);
}

function checkUserPassword(userName, pass) {
  let user = getUserObj(userName);
  return user.password === pass;
}

function loginUser() {
  let userName = prompt('Enter your name');
  if(!checkUniqueUserName(userName)){
    alert('User not found');
    return;
  }
  let pass = prompt('Enter password');
  if(!checkUserPassword(userName, pass)){
    alert('Password doesn\'t match this account!');
    return;
  }
  let user = getUserObj(userName);
  user.isLogin = true;
  changeInSystemUser(userName);
  console.log(users);
}

// delete user
function deleteUser() {
  if (!inSystem) {
    alert('Only authorized users can delete user!');
    return;
  }

  let pass = prompt('Enter your password:');
  let index = users.findIndex(user => user.password === pass);

  if (index === -1) {
    alert("Пароль не совпадает!");
    return;
  }

  users.splice(index, 1);
  console.log(users);
}

// massage group

// Send message
function sendMessage() {
  if (!inSystem) {
    alert('только авторизованные могут отправлять сообщения!');
    return;
  }

  let recipientName = prompt('имя получателя:');
  let sender = getUserObj(inSystem);
  let recipient = getUserObj(recipientName);

  if (!recipient) {
    alert('получатель с таким именем не найден');
    return;
  }

  let messageContent = prompt('введите сообщение:');
  
  let message = {
    id: generateUniqueId(),
    content: messageContent,
    from: sender.name
  };

  sender.sendMessages.push(message);
  recipient.getMessages.push(message);

  console.log(users);
}

// Delete message
function deleteMessage() {
  if (!inSystem) {
    alert('только авторизованные могут удалить сообщение!');
    return;
  }

  let loggedInUser = getUserObj(inSystem);
  let messageId = prompt('введите ID сообщения которую вы хотите удалить:');

  let messageIndex = -1;

  // проверка ID отправленных сообщений
  messageIndex = loggedInUser.sendMessages.findIndex(msg => msg.id === messageId);
  if (messageIndex !== -1) {
    loggedInUser.sendMessages.splice(messageIndex, 1);
    console.log(users);
    return;
  }

  // проверка ID полученных сообщений
  messageIndex = loggedInUser.getMessages.findIndex(msg => msg.id === messageId);
  if (messageIndex !== -1) {
    loggedInUser.getMessages.splice(messageIndex, 1);
    console.log(users);
    return;
  }

  alert('Сообщение не найдено!');
}

// генератор ID
function generateUniqueId() {
  return Date.now().toString();
}
