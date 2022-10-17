const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootData = null;
  }

  root() {
    return this.rootData;
  }

  add(data) {
    this.rootData = putData(this.rootData, data);

    function putData(node, data) {
      if (!node) {
        node = new Node(data);
        return node;
      }

      if (node.data === data) {
        return node;
      }

      if (node.data < data) {
        node.right = putData(node.right, data);
      }

      if (node.data > data) {
        node.left = putData(node.left, data);
      }

      return node;
    }
  }

  has(data) {
    return checkData(this.rootData, data);

    function checkData(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      if (node.data < data) {
        return checkData(node.right, data);
      } else {
        return checkData(node.left, data);
      }
    }
  }

  find(data) {
    return searchNode(this.rootData, data);

    function searchNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      if (node.data < data) {
        return searchNode(node.right, data);
      } else {
        return searchNode(node.left, data);
      }
    }
  }

  remove(data) {
    this.rootData = removeNode(this.rootData, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else if (node.data > data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {

        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let currentData = node.right.data;
        let nextNode = node.right.left;

        while (nextNode) {
          currentData = nextNode.data;
          nextNode = nextNode.left;
        }

        node.data = currentData;

        node.right = removeNode(node.right, currentData);

        return node;
      }
    }
  }

  min(firstNode = this.rootData) {
    if (!firstNode) {
      return null
    }

    let currentNode = firstNode.data
    let nextNode = firstNode.left

    while (nextNode) {
      currentNode = nextNode.data
      nextNode = nextNode.left
    }

    return currentNode
  }

  max(firstNode = this.rootData) {
    if (!firstNode) {
      return null
    }

    let currentNode = firstNode.data
    let nextNode = firstNode.right

    while (nextNode) {
      currentNode = nextNode.data
      nextNode = nextNode.right
    }

    return currentNode
  }
}

module.exports = {
  BinarySearchTree
};