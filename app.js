// Misc. Set-up functions
var faker = require('faker');

let liberals = []

let neutrals = []

let conservatives = []
//---------------------------- OOP Section ----------------------------
// Step 1
let voters = []

let democratCandidates = []

let republicanCandidates = []

let independentCandidates = []

// Step 2
class Person {
  constructor(name) {
    this.name = name;
  }
}

// Step 3
class Voter extends Person{
  constructor(name, ideology){
    super(name);
    this.ideology = ideology;
  }
}

// Step 4
class Candidate extends Person{
  constructor(name, party, votes = 0){
    super(name);
    this.party = party;
    this.votes = votes;
  }
}


// ------------------------------ jQuery ----------------------------------
$(function(){
// Step 1
    $('#voter-form').submit(function(el){
      el.preventDefault();
      let name = $('#voter-name').val();
      let ideology = $('#voter-ideology').val();
      let voterInstance = new Voter(name, ideology);
      voters.push(voterInstance);
      // console.log(voters)
      let li = $('<li class = "list-group-item" ></li>').text(voterInstance.name + " " + voterInstance.ideology)
      $('#voter-list .list-group').append(li)
    })
// Step 2
    $('#candidate-form').submit(function(el){
      el.preventDefault();
      let name = $('#candidate-name').val();
      let party = $('#candidate-party').val();
      let candidateInstance = new Candidate(name, party);
      // console.log(candidateInstance)
      if (candidateInstance.party === 'Independent'){
        independentCandidates.push(candidateInstance)
      }
      else if (candidateInstance.party === 'Democrat'){
        democratCandidates.push(candidateInstance)
      }
      else {
        republicanCandidates.push(candidateInstance)
      };
      let li = $('<li class = "list-group-item" ></li>').text(candidateInstance.name + " " + candidateInstance.party)
      $('#candidate-list .list-group').append(li)
    })
// Step 3 (BONUS)
    $('#randomize-btn').click(function(){
      for(let i=0; i<100; i++){
        let ideologyArr = ['Liberal','Conservative', 'Neutral']
        let randIdeology = ideologyArr[Math.floor(Math.random() * ideologyArr.length)]
        let randName = faker.name.findName()
        let randomizePeople = new Voter(randName,randIdeology)
        voters.push(randomizePeople)
        let li = $('<li class = "list-group-item" ></li>').text(randomizePeople.name + " " + randomizePeople.ideology)
      $('#voter-list .list-group').append(li)
      }
    })
// Step 4
    $('#vote-btn-div').click(function(){
      if(democratCandidates.length !== 0 && republicanCandidates.length !==0 && independentCandidates.length !==0){
        startVoting()
        pickWinner()
      }
      else {
        alert('Please choose a candidate to represent each party.')
      }
      // console.log(conservatives)
      // console.log(liberals)
      // console.log(neutrals)
    })
});

// --------------------------- The Vote Function -----------------------------

// Step 1
// Goes through the voters Array and executes a party picker function depending on their ideology.
function startVoting(){
  voters.forEach(function(guy){
      if (guy.ideology === 'Liberal'){
        liberalParty()
      }
      else if (guy.ideology === 'Neutral'){
        neutralParty()
      }
      else {
        conservativeParty()
      }
  })
}

// Party Pickers - Selects a party to vote for based on the percentage of likeliness that the particular ideology would choose each party. It then executes the voteAssign function.
function liberalParty(){
  let randDecimal = Math.random();
  if (randDecimal < 0.6) {
    //democrat vote
    voteAssign(democratCandidates)
  }
  else if (randDecimal < 0.8) {
    //independent vote
    voteAssign(independentCandidates)
  }
  else {
    //republican vote
    voteAssign(republicanCandidates)
  }
}

function neutralParty(){
  let randDecimal = Math.random();
  if (randDecimal < 0.5) {
    //independent vote
    voteAssign(independentCandidates)
  }
  else if (randDecimal < 0.75) {
    //democrat vote
    voteAssign(democratCandidates)
  }
  else {
    //republican vote
    voteAssign(republicanCandidates)
  }
}

function conservativeParty(){
  let randDecimal = Math.random();
  if (randDecimal < 0.6) {
    //republican vote
    voteAssign(republicanCandidates)
  }
  else if (randDecimal < 0.8) {
    //independent vote
    voteAssign(independentCandidates)
  }
  else {
    //democrat vote
    voteAssign(democratCandidates)
  }
}

// voteAssign picks picks a random candidate from an array of candidates and adds one vote to its "vote" property.
function voteAssign(arr){
  // console.log(arr)
  if (arr.length === 0){
    alert('No Candidates!')
  }
  else {
    let addVote = arr[Math.floor(Math.random() * arr.length)]
    addVote.votes += 1
  }
}


function pickWinner(){
let demWinner = democratCandidates.reduce(function(acc, current){
    if (acc.votes > current.votes){
      return acc
    }
    else {
      return current
    }
  })
let repWinner = republicanCandidates.reduce(function(acc, current){
    if (acc.votes > current.votes){
      return acc
    }
    else {
      return current
    }
  })
let indWinner = independentCandidates.reduce(function(acc, current){
      if (acc.votes > current.votes){
        return acc
      }
      else {
        return current
      }
    })
let winners = [demWinner, repWinner, indWinner]
let ultimateWinner = winners.reduce(function(acc, current){
      if (acc.votes > current.votes){
        return acc
      }
      else {
        return current
      }
    })
alert(ultimateWinner.name + " wins!")
}
