//元素节点包装类
class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  //设置元素节点属性的方法
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  //添加元素属性子孩子的方法
  appendChild(vchild) {
    vchild.mountTo(this.root);
  }
  //挂载
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}
//文本节点包装类
class TextWrapper {
  constructor(type) {
    this.root = document.createTextNode(type);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

export class Component {
  constructor() {
    this.children = [];
  }
  setAttribute(name, value) {
    this[name] = value;
  }
  appendChild(vchild) {
    this.children.push(vchild);
  }
  mountTo(parent) {
    let vdom = this.render();
    vdom.mountTo(parent);
  }
}

export let ToyReact = {
  //创建DOM节点的方法
  createElement(type, attributes, ...children)  {
    console.log(children);
    let element;
    //检测是一个HTML内置标签还是自定义标签
    if (typeof type === 'string')
      element = new ElementWrapper(type)
    else
      element = new type;
    //为节点添加属性
    for (let name in attributes) {
      element.setAttribute(name, attributes[name]);
    }
    /**
     * 注意这里如果是自定义的组件，不能够直接将节点挂载到其身上
     * 因为它本身的节点还尚未生成，因此是以数组的形式保存孩子
     */
    const insertChildren = children => {
      for (let child of children) {
        if (typeof child === 'object' && child instanceof Array) {
          insertChildren(child);
        } else {
          if (!(child instanceof Component)
          && !(child instanceof ElementWrapper)
          && !(child instanceof TextWrapper))
            child = String(child);
          if (typeof child === 'string')
            child = new TextWrapper(child);
          element.appendChild(child);
        }
      }
    }
    insertChildren(children);
    //返回DOM节点
    return element;
  },

  render(vdom, element) {
    vdom.mountTo(element);
  }
}