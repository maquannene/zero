(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fakeDelay; });
function fakeDelay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}


/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js + 1 modules
var react_router = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/react-loadable/lib/index.js
var lib = __webpack_require__(9);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./src/components/Loading.jsx
var Loading = __webpack_require__(7);

// EXTERNAL MODULE: ./src/helpers/fakeDelay.js
var fakeDelay = __webpack_require__(11);

// CONCATENATED MODULE: ./src/page/demo1/routes.jsx




var Home = lib_default()({
  loader: function loader() {
    return __webpack_require__.e(/* import() */ 6).then(__webpack_require__.bind(null, 19));
  },
  loading: Loading["a" /* default */]
});
var About = lib_default()({
  loader: function loader() {
    return Object(fakeDelay["a" /* default */])(2000).then(function () {
      return __webpack_require__.e(/* import() */ 5).then(__webpack_require__.bind(null, 20));
    });
  },
  loading: Loading["a" /* default */]
});
var News = lib_default()({
  loader: function loader() {
    return __webpack_require__.e(/* import() */ 2).then(__webpack_require__.bind(null, 33));
  },
  loading: Loading["a" /* default */]
});
// CONCATENATED MODULE: ./src/page/demo1/App.jsx



function App() {
  return react_default.a.createElement("div", null, react_default.a.createElement("h1", null, " \u52A8\u6001\u52A0\u8F7D APP "), react_default.a.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, react_default.a.createElement(react_router_dom["b" /* Link */], {
    to: '/'
  }, "root"), react_default.a.createElement(react_router_dom["b" /* Link */], {
    to: '/about'
  }, "about"), react_default.a.createElement(react_router_dom["b" /* Link */], {
    to: '/news'
  }, "news")), react_default.a.createElement(react_router["c" /* Switch */], null, react_default.a.createElement(react_router["a" /* Route */], {
    exact: true,
    path: "/",
    component: Home
  }), react_default.a.createElement(react_router["a" /* Route */], {
    exact: true,
    path: "/about",
    component: About
  }), react_default.a.createElement(react_router["a" /* Route */], {
    exact: true,
    path: "/news",
    component: News
  })));
}
// CONCATENATED MODULE: ./src/page/demo1/index.jsx




react_dom["render"](react_default.a.createElement(react_router_dom["a" /* HashRouter */], null, react_default.a.createElement(App, null)), document.getElementById('container'));

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Loading; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Loading(props) {
  var isLoading = props.isLoading,
      pastDelay = props.pastDelay,
      error = props.error;

  if (isLoading && pastDelay) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Loading...");
  } else if (error && !isLoading) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Error!");
  } else {
    return null;
  }
}

/***/ })

},[[31,0,1]]]);