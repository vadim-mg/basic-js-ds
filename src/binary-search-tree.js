const { NotImplementedError } = require("../extensions/index.js")

const { Node } = require("../extensions/list-tree.js")

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null
  }

  root() {
    return this.rootNode
  }

  add(data) {
    if (this.rootNode) {
      this._addData(this.rootNode, data)
    } else {
      this.rootNode = new Node(data)
    }
  }

  _getDirection = (data, parentData) => (data < parentData ? "left" : "right")

  _addData(parentNode, data) {
    if (data === parentNode.data) {
      return null
    }
    const direction = this._getDirection(data, parentNode.data)
    if (parentNode[direction]) {
      return this._addData(parentNode[direction], data)
    }
    parentNode[direction] = new Node(data)
  }

  has(data) {
    return this.find(data) ? true : false
  }

  find(data) {
    return this._getData(this.rootNode, data)
  }

  _getData(parentNode, searchData) {
    if (!parentNode) {
      return null
    }
    if (searchData === parentNode.data) {
      return parentNode
    }
    return this._getData(
      parentNode[this._getDirection(searchData, parentNode.data)],
      searchData
    )
  }

  _getParentNode(parentNode, childNode) {
    if (!parentNode) {
      return null
    }
    if (parentNode.left === childNode || parentNode.right === childNode) {
      return parentNode
    }
    const direction = this._getDirection(childNode.data, parentNode.data)
    return this._getParentNode(parentNode[direction], childNode)
  }

  remove(data) {
    const removedNode = this.find(data)
    if (!removedNode) {
      return
    }

    if (!this.rootNode) {
      return
    }
    this._remove(this.rootNode, removedNode)
  }

  _remove(parentNode, node, direction = null) {
    const workNode = direction ? parentNode[direction] : parentNode
    if (node.data > workNode.data) {
      this._remove(workNode, node, "right")
      return
    }
    if (node.data < workNode.data) {
      this._remove(workNode, node, "left")
      return
    }

    let insertingTree

    //if no child or only one childe
    if (!node.left || !node.right) {
      if (!node.left && !node.right) {
        insertingTree = null
      } else if (node.right) {
        insertingTree = node.right
      } else if (node.left) {
        insertingTree = node.left
      }

      if (parentNode.right === node) {
        parentNode.right = insertingTree
      }
      if (parentNode.left === node) {
        parentNode.left = insertingTree
      }
      return
    }

    //if both child present

    if (!node.right.left) {
      insertingTree = node.right
      insertingTree.left = node.left
      if (parentNode.right === node) {
        parentNode.right = insertingTree
      }
      if (parentNode.left === node) {
        parentNode.left = insertingTree
      }
      return
    } else {
      workNode.data = node.right.left.data
      this._remove(node.right, node.right.left, "left")
    }
  }

  min() {
    if (!this.rootNode) {
      return null
    }
    return this._getExtremum(this.rootNode, "min").data
  }

  /**
   *
   * @param {*} parentNode
   * @param {*} direction( max = "right", min = "left")
   * @returns
   */
  _getExtremum(parentNode, direction) {
    const treeDirections = {
      max: "right",
      min: "left",
    }
    const dir = treeDirections[direction]
    return parentNode[dir] ? this._getExtremum(parentNode[dir], direction) : parentNode
  }

  max() {
    if (!this.rootNode) {
      return null
    }
    return this._getExtremum(this.rootNode, "max").data
  }
}

module.exports = {
  BinarySearchTree,
}
