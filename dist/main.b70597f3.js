// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
//测试监听，打印出则监听成功
// $('.addButton').on('click', () => {
//     console.log(1)
// })
//防止跳转页面后无法储存，通过数组（哈希表）保存下来,退出的时候，把新建的网住全部储存带hashMap，每次返回只需要渲染hashMap，即可导入之前全部的网址
var $siteList = $('.siteList'); //打印出APi
// console.log($siteList)

var $lastLi = $siteList.find('li.last'); //重要jQuery找到对应选择器
//从local Stora读取不在从hashMap中提取//首先尝试读取当前网站下的x

var x = localStorage.getItem('x'); //现在我们需要把需要获取的x（网址数据）储存到hashMAp中，而hashMa数组为对象，所有需要把x转换成对象，如果x成功变成对象

var xObject = JSON.parse(x); //JSON.parse() 方法用于将一个 JSON 字符串转换为对象。

var hashMap = xObject || [//（如果x成功变成对象就把对象放到hashMap中，如果不行就初始换含有两项的数组）如果xObject存在就用xObject，不存在就用默认hashMap数组
{
  logo: 'A',
  url: 'https://www.acfun.cn/'
}, // { logo: './images/images.png', logoType: 'image', url: 'https://juejin.im/' },
{
  logo: 'J',
  url: 'https://juejin.im/'
}]; // hashMap.forEach(node => {
//     const $li = $(`<li>
//                 <a href="https://www.acfun.cn/">
//                     <div class="site">
//                         <!-- site:网站-->
//                         <div class="logo">A</div>
//                         <div class="link">acfun.com</div>
//                     </div>
//                 </a>
//             </li>
//     `)
// })

var simplifyUrl = function simplifyUrl(url) {
  //replace删除原来的并替换成新的
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //正则表达式：删除 / 开头的内容--防止用户输入过多的url后缀
}; //优化代码//封装//先删除之前的在储存新的


var render = function render() {
  $siteList.find('li:not(.last)').remove(); //找到所有的node网址，唯独不着最后一个（新生成）进行清空，新生成不能删除！

  hashMap.forEach(function (node, index) {
    //删除功能需要索引值，通过forEach传入第二个参数idnex，获取索引
    // console.log(index)//打印当前网页的索引值
    var $li = $("<li>        \n                    <div class=\"site\">\n                        <div class=\"logo\">".concat(node.logo, "</div>\n                        <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n                        <div class='close'>\n                          <svg class=\"icon\">//\u76D1\u542C\u70B9\u51FB\uFF0C\u963B\u6B62\u5192\u6CE1\n                             <use xlink:href=\"#icon-close\"></use>\n                          </svg>                      \n                        </div>\n                    </div>                \n            </li>")).insertBefore($lastLi);
    $li.on('click', function () {
      //代替<a>标签
      window.open(node.url); //$li里的<a href="${node.url}"></a>删除，跳转页面node.url的操作通过winodw.open执行//原因<a>标签太粗糙了，不灵敏，通过js控制更好
    });
    $li.on('click', '.close', function (e) {
      //阻止冒泡防止触发跳转事件
      console.log('阻止');
      e.stopPropagation(); //js 阻止冒泡阻止跳转 

      console.log(hashMap); //拿到index索引后，删除数组需要通过splice()方法

      hashMap.splice(index, 1);
      render(); //删掉之后需要重新渲染！不然不会显示
    });
  });
};

render(); // $('.addButton').on('click', () => {
//     let url = window.prompt('请问你要添加的网址是什么?')
//     console.log(url)
//     if (url.indexOf('http') !== 0) {//帮助用户输入前缀//JavaScript indexOf() 方法
//         // alert('请输入http开头的网址')
//         url = 'https://' + url
//     }
//     console.log(url)
//     const $site = $(`
//            <li>
//                 <a href="${url}">
//                     <div class="site">
//                         <!-- site:网站-->
//                         <div class="logo">
//                             ${url[0]}
//                         </div>
//                         <div class="link">${url}</div>
//                     </div>
//                 </a>
//             </li>
//     `).insertBefore($lastLi)
// })

$('.addButton').on('click', function () {
  var url = window.prompt('请问你要添加的网址是什么?');
  console.log(url);

  if (url.indexOf('http') !== 0) {
    //帮助用户输入前缀//JavaScript indexOf() 方法
    // alert('请输入http开头的网址')
    url = 'https://' + url;
  }

  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    //logo为网址的首字母//toUpperCaase小写变大写
    logoType: 'text',
    url: url
  }); //重新渲染一遍，但需要删除之前的网址节点
  // hashMap.forEach(node => {
  //     const $li = $(`<li>
  //             <a href="${node.url}">
  //                 <div class="site">
  //                     <!-- site:网站-->
  //                     <div class="logo">${node.logo[0]}</div>
  //                     <div class="link">${node.url}</div>
  //                 </div>
  //             </a>
  //         </li>
  // `).insertBefore($lastLi)
  // })
  // $siteList.find('li:not(.last)').remove()//找到所有的node网址，唯独不着最后一个（新生成）进行清空，新生成不能删除！

  render();
}); //js 用户关闭页面之前会触发
//window.onbeforeunload(监听)
//当你关闭页面时，把hashMap数组变换字符串储存到网站下的localStorage
//保证数据不会丢失，用户离开/退出/填写时，把数据储存到localStora下，返回时直接渲染localStoral数据即可

window.onbeforeunload = function () {
  // console.log('页面关闭')
  //node只能储存字符串，不能存对象，所有要转成字符串
  var string = JSON.stringify(hashMap); //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。//js数组使用JSON.stringify()和toString()的区别
  // console.log(typeof hashMap)
  // console.log(hashMap)
  // console.log(typeof string)
  // console.log(string)
  //本地储存，设置为x
  // window.localStorage.setItem('x', string)

  localStorage.setItem('x', string);
}; //为社么要通过localStorage下储存呢？（或者说localStorage中的数据为什么不会被删除呢？）
//因为localStorage属于Cookie及其他网站的数据，只有手动删除才会删除（概率极小会被（硬盘满了）才会被浏览器删除），换句话说localStorage是安全的（非常保险）
//含有一种情况就是：开启无痕窗口，只存在于用户打开的页面的事件，关闭重新开启就会消失；正常的窗口会把localStorage一直储存！！
// 键盘事件


$(document).on('keypress', function (e) {
  // const key = e.key  //属性名与变量名为一样时,可以简写
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      //打开网址window.open
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.b70597f3.js.map