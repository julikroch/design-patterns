// Iterator pattern

class CustomList {
  constructor() {
    this.list = [];
  }

  add(item) {
    this.list.push(item);
  }

  getIterator() {
    return new ListIterator(this);
  }
}

class ListIterator {
  constructor(list) {
    this.list = list.list;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.list.length;
  }

  next() {
    return this.list[this.index++];
  }
}

const customList = new CustomList();
customList.add("item1");
customList.add("item2");
customList.add("item3");

const iterator = customList.getIterator();
while (iterator.hasNext()) {
  console.log(iterator.next());
}
