interface Person {
  name: string,
  age: number
}

function Say(person: Person): Person {
  return person
}

module.exports = {
  Say
}
