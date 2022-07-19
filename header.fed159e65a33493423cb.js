/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 202:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var global_navigation_1 = __webpack_require__(860);

var accordion_1 = __importDefault(__webpack_require__(968));

__webpack_require__(587);

window.setupDotcomChrome = function (rootElement) {
  if (!rootElement) return;
  (0, global_navigation_1.setup)(rootElement);
  (0, accordion_1.default)(rootElement); // Remove event listeners from header search button, then hide

  var searchButton = rootElement.querySelector(".header-search__toggle");

  if (searchButton) {
    var blankButton = searchButton === null || searchButton === void 0 ? void 0 : searchButton.cloneNode(true);
    blankButton.style.opacity = "0";
    searchButton === null || searchButton === void 0 ? void 0 : searchButton.replaceWith(blankButton);
  }
};

/***/ }),

/***/ 860:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

 // Responses handled here:
// - "menu-open" or "search-open" added as class to header
// - "menu-open" added as class to body
// - update aria-expanded to indicate menu state
// - update text of menu toggle button
// - reset scroll on menu content when menu is opened
// - menu can be closed by pressing esc key or veil-click

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.setup = exports.setHeaderElementPositions = void 0;

var body_scroll_lock_1 = __webpack_require__(509);

var keyboard_events_1 = __webpack_require__(348);

var media_breakpoints_1 = __webpack_require__(275);

function undoOutline() {
  this.style.outline = "none";
}

function toggleAriaExpanded(el) {
  el.setAttribute("aria-expanded", el.getAttribute("aria-expanded") === "true" ? "false" : "true");
}

function toggleMenu(el) {
  toggleAriaExpanded(el);
}

var TOGGLE_CLASSES = {
  mobile: "m-menu__toggle",
  search: "header-search__toggle",
  desktop: "m-menu--desktop__toggle"
};
var allTogglesSelector = Object.values(TOGGLE_CLASSES).map(function (className) {
  return ".".concat(className);
}).join(", ");

function setHeaderElementPositions(header, rootElement) {
  if (!header || !rootElement) return;

  var _a = header.getBoundingClientRect(),
      bottom = _a.bottom,
      height = _a.height;

  var bottomPx = "".concat(bottom, "px");
  var heightPx = "".concat(height, "px");
  header.querySelectorAll(".m-menu--desktop__menu").forEach(function (el) {
    // eslint-disable-next-line no-param-reassign
    el.style.top = heightPx;
  });
  var content = header.querySelector(".m-menu--mobile .m-menu__content");

  if (content) {
    content.style.top = bottomPx;
  }

  var cover = rootElement.querySelector(".m-menu--cover");

  if (cover) {
    cover.style.top = bottomPx;
  }
}

exports.setHeaderElementPositions = setHeaderElementPositions;

function setup(rootElement) {
  var _a, _b;

  if (!rootElement) return;
  rootElement.classList.add("js");
  var header = rootElement.querySelector(".header--new");
  if (!header) return;
  setHeaderElementPositions(header, rootElement);
  window.addEventListener("resize", function () {
    setHeaderElementPositions(header, rootElement);
  }); // On mobile, clicking Menu or the Search icon opens a menu

  header.querySelectorAll("button.".concat(TOGGLE_CLASSES.mobile, ", button.").concat(TOGGLE_CLASSES.search)).forEach(function (toggle) {
    toggle.addEventListener("click", function (event) {
      event.preventDefault(); // don't navigate the <a>

      toggleMenu(event.currentTarget);
    });
  }); // On desktop, clicking a menu item opens the submenu

  header.querySelectorAll("a.".concat(TOGGLE_CLASSES.desktop)).forEach(function (toggle) {
    toggle.addEventListener("click", function (event) {
      event.preventDefault(); // don't navigate the <a>

      toggleMenu(event.currentTarget);
    });
  }); // Show the modal search veil and disable scrolling when focusing
  // the search input on tablet

  var input = rootElement.querySelector("#search-header-desktop__input");

  if (input) {
    input.addEventListener("focus", function () {
      if ((0, media_breakpoints_1.isLGDown)()) {
        rootElement.classList.add("menu-open");
      }
    });
    input.addEventListener("blur", function () {
      rootElement.classList.remove("menu-open");
    });
  } // removes focus outline in Safari from open accordions


  rootElement.querySelectorAll(".m-menu__content .js-focus-on-expand").forEach(function (openAccordion) {
    openAccordion.addEventListener("focus", undoOutline);
  }); // On mobile, when a menu is opened/closed,

  var toggledMobileMenuObserver = new MutationObserver(function () {
    var mobileMenuToggle = header.querySelector("button.".concat(TOGGLE_CLASSES.mobile)); // Update Menu button text

    if (header.classList.contains("menu-open")) {
      // eslint-disable-next-line no-param-reassign
      rootElement.querySelector(".m-menu__content").scrollTop = 0;
      mobileMenuToggle.innerHTML = "Close";
    } else {
      mobileMenuToggle.innerHTML = "Menu";
    }

    if (header.classList.contains("search-open")) {
      // pass focus to search bar
      rootElement.querySelector(".m-menu__search #search-header-mobile__input").focus();
    }
  }); // When any navigation menu is expanded,

  var expandedMenuObserver = new MutationObserver(function (mutations) {
    var _a;

    var observedClassNames = mutations.flatMap(function (m) {
      return Array.from(m.target.classList);
    });
    var aMenuIsBeingExpanded = mutations.find(function (_a) {
      var oldValue = _a.oldValue,
          target = _a.target;
      return target.getAttribute("aria-expanded") === "true" && oldValue !== "true";
    }) !== undefined; // adjust theme color

    (_a = rootElement.querySelector('meta[name="theme-color"]')) === null || _a === void 0 ? void 0 : _a.setAttribute("content", aMenuIsBeingExpanded ? "#0b2f4c" : "#165c96"); // add/remove classes based on which menu is expanded
    // .menu-open on the document body
    // .menu-open or .search-open on the header

    if (aMenuIsBeingExpanded) {
      rootElement.classList.add("menu-open");
      (0, body_scroll_lock_1.disableBodyScroll)(header);

      if (observedClassNames.includes(TOGGLE_CLASSES.mobile)) {
        header.classList.add("menu-open");
        (0, body_scroll_lock_1.disableBodyScroll)(rootElement.querySelector(".m-menu__content"));
      } else if (observedClassNames.includes(TOGGLE_CLASSES.search)) {
        header.classList.add("search-open");
      }
    } else {
      // only do this if no other menu is expanded
      var anyOpen = Array.from(rootElement.querySelectorAll(allTogglesSelector)).find(function (el) {
        return el.getAttribute("aria-expanded") === "true";
      });

      if (!anyOpen) {
        (0, body_scroll_lock_1.clearAllBodyScrollLocks)();
        rootElement.classList.remove("menu-open");

        if (observedClassNames.includes(TOGGLE_CLASSES.mobile)) {
          header.classList.remove("menu-open");
        } else if (observedClassNames.includes(TOGGLE_CLASSES.search)) {
          header.classList.remove("search-open");
        }
      }
    } // Close the other desktop tabs programmatically


    if (aMenuIsBeingExpanded && observedClassNames.includes(TOGGLE_CLASSES.desktop)) {
      var thisMenu_1 = mutations.map(function (_a) {
        var target = _a.target;
        return target.getAttribute("aria-controls");
      })[0]; // close OTHER menus

      Array.from(rootElement.querySelectorAll(".".concat(TOGGLE_CLASSES.desktop))).filter(function (el) {
        return el.getAttribute("aria-controls") !== thisMenu_1 && el.getAttribute("aria-expanded") === "true";
      }).forEach(toggleAriaExpanded);
    }
  }); // monitor the header for classList changes

  toggledMobileMenuObserver.observe(header, {
    attributes: true,
    attributeFilter: ["class"]
  }); // monitor all the menu toggles for aria-expanded changes

  rootElement.querySelectorAll(allTogglesSelector).forEach(function (el) {
    expandedMenuObserver.observe(el, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["aria-expanded"]
    });
  }); // Scroll accordion into view on click
  // Note: we can't use `scrollIntoView`, Safari doesn't support it as of
  // 2022-02-28, and even if it did, the opening/closing animations of the
  // accordions makes the behavior janky on other browsers

  var menuContent = rootElement.querySelector(".m-menu--mobile .m-menu__content");

  if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    rootElement.querySelectorAll(".m-menu--mobile .c-accordion-ui__trigger").forEach(function (target) {
      return target.addEventListener("click", function () {
        // if (target.getAttribute("aria-expanded") === "true") {
        //   // return;
        // }
        var expandedDrawer = menuContent.querySelector(".c-accordion-ui__target[aria-expanded='true']");
        var targetBB = target.getBoundingClientRect();

        var yOffset = function () {
          if (expandedDrawer) {
            var bb = expandedDrawer.getBoundingClientRect();

            if (bb.y < targetBB.y) {
              return bb.height;
            }

            return 0;
          }

          return 0;
        }();

        var targetY = target.offsetTop - targetBB.height / 2 - yOffset;
        menuContent.scrollTo({
          behavior: "smooth",
          left: 0,
          top: targetY
        });
      }, false);
    });
  }

  function closeAllMenus() {
    rootElement.querySelectorAll(allTogglesSelector).forEach(function (el) {
      if (el.getAttribute("aria-expanded") === "true") {
        toggleAriaExpanded(el);
      }
    });
  } // menu click closes


  var menu_links = rootElement.querySelectorAll(".m-menu__link");

  for (var i = 0; i < menu_links.length; i += 1) {
    menu_links[i].addEventListener("click", closeAllMenus);
  } // T logo click closes


  (_a = header.querySelector(".navbar-logo")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", closeAllMenus); // Veil click or Esc key closes everything

  rootElement.addEventListener("keydown", function (e) {
    (0, keyboard_events_1.handleNativeEscapeKeyPress)(e, closeAllMenus);
  });
  if ((_b = header.previousElementSibling) === null || _b === void 0 ? void 0 : _b.classList.contains("m-menu--cover")) header.previousElementSibling.addEventListener("click", closeAllMenus);
  var transitDiv = rootElement.querySelector("#Transit-accordion");

  if (transitDiv) {
    transitDiv.getElementsByTagName("button")[0].click();
  }
}

exports.setup = setup;

function setupGlobalNavigation() {
  document.addEventListener("turbolinks:load", function () {
    setup(document.documentElement);
  }, {
    passive: true
  });
}

exports["default"] = setupGlobalNavigation;

/***/ }),

/***/ 348:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.handleReactExitKeyPress = exports.handleReactEnterKeyPress = exports.handleNativeEscapeKeyPress = exports.handleNativeEnterKeyPress = exports.isEscape = exports.isEnter = void 0;

var isEnter = function (key) {
  return key === "Enter" || key === 13;
};

exports.isEnter = isEnter;

var isEscape = function (key) {
  return key === "Escape" || key === 27;
};

exports.isEscape = isEscape; // for vanilla JS

var handleNativeEnterKeyPress = function (e, cb) {
  return (0, exports.isEnter)(e.key || e.keyCode) ? cb(e) : function () {};
};

exports.handleNativeEnterKeyPress = handleNativeEnterKeyPress;

var handleNativeEscapeKeyPress = function (e, cb) {
  return (0, exports.isEscape)(e.key || e.keyCode) ? cb(e) : function () {};
};

exports.handleNativeEscapeKeyPress = handleNativeEscapeKeyPress; // for React

var handleReactEnterKeyPress = function (e, onClick) {
  if (e.key === "Enter") {
    onClick();
  }
};

exports.handleReactEnterKeyPress = handleReactEnterKeyPress;

var handleReactExitKeyPress = function (e, onClick) {
  if (e.key === "Escape") {
    onClick();
  }
};

exports.handleReactExitKeyPress = handleReactExitKeyPress;

/***/ }),

/***/ 275:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useSMDown = exports.isSMDown = exports.isLGDown = void 0;

var react_1 = __webpack_require__(294); // Specify in pixels, but in numbers here for calculations


var mediaBreakpoints = {
  xs: 0,
  sm: 544,
  md: 800,
  lg: 1088,
  xxl: 1344
};

var isLGDown = function () {
  return window.matchMedia("(max-width: ".concat(mediaBreakpoints.lg, "px)")).matches;
};

exports.isLGDown = isLGDown;

var isSMDown = function () {
  return typeof document !== "undefined" ? window.matchMedia("(max-width: ".concat(mediaBreakpoints.sm, "px)")).matches : false;
};

exports.isSMDown = isSMDown;

var useSMDown = function () {
  var _a = (0, react_1.useState)((0, exports.isSMDown)()),
      isSmallBreakpoint = _a[0],
      setIsSmallBreakpoint = _a[1];

  (0, react_1.useEffect)(function () {
    var handleResize = function () {
      setIsSmallBreakpoint((0, exports.isSMDown)());
    };

    window.addEventListener("resize", handleResize);
    return function () {
      return window.removeEventListener("resize", handleResize);
    };
  }, []);
  return isSmallBreakpoint;
};

exports.useSMDown = useSMDown;

/***/ }),

/***/ 968:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Accordion element, with accessible keyboard interaction as
 * recommended by w3.org/WAI/ARIA/apg/patterns/accordion
 */

Object.defineProperty(exports, "__esModule", ({
  value: true
})); // toggles .is-expanded class on the accordion header <h3> wrapper to
// align with button.c-accordion-ui__trigger[aria-expanded] value

var addAccordionToggleObserver = function (btn) {
  return new MutationObserver(function (mutations) {
    mutations.forEach(function (_a) {
      var _b;

      var oldValue = _a.oldValue,
          target = _a.target;
      var newValue = target.getAttribute("aria-expanded");
      if (newValue === oldValue) return;
      (_b = target.parentElement) === null || _b === void 0 ? void 0 : _b.classList.toggle("is-expanded", newValue === "true" && oldValue !== "true");
    });
  }).observe(btn, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ["aria-expanded"]
  });
};

function setupAccordion(rootElement) {
  rootElement.querySelectorAll(".c-accordion-ui--no-bootstrap").forEach(function (accordion) {
    var accordionHeaders = accordion.querySelectorAll("button.c-accordion-ui__trigger");

    function toggleItem() {
      var _this = this;

      var isOpen = this.getAttribute("aria-expanded") === "true";
      accordionHeaders.forEach(function (btn) {
        btn.setAttribute("aria-expanded", btn == _this ? (!isOpen).toString() : "false");
      });
    }

    accordionHeaders.forEach(function (btn, btnIndex, btnList) {
      function toggleItemWithKeyboard(event) {
        switch (event.code) {
          case "Space":
            toggleItem.call(this); // same as click or Enter

            break;

          case "ArrowDown":
            if (btnIndex < btnList.length - 1) {
              btnList[btnIndex + 1].focus(); // move to next accordion header
            }

            break;

          case "ArrowUp":
            if (btnIndex > 0) {
              btnList[btnIndex - 1].focus(); // move to prior accordion header
            }

            break;
        } // Cancel the default action to avoid it being handled twice


        event.preventDefault();
      }

      btn.addEventListener("click", toggleItem, false);
      btn.addEventListener("keyup", toggleItemWithKeyboard, false);
      addAccordionToggleObserver(btn); // respond to aria-expanded change
    });
  });
}

exports["default"] = setupAccordion;

/***/ }),

/***/ 509:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearAllBodyScrollLocks": () => (/* binding */ clearAllBodyScrollLocks),
/* harmony export */   "disableBodyScroll": () => (/* binding */ disableBodyScroll),
/* harmony export */   "enableBodyScroll": () => (/* binding */ enableBodyScroll)
/* harmony export */ });
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Older browsers don't support event options, feature detect it.

// Adopted and modified solution from Bohdan Didukh (2017)
// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

var hasPassiveEvents = false;
if (typeof window !== 'undefined') {
  var passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true;
      return undefined;
    }
  };
  window.addEventListener('testPassive', null, passiveTestOptions);
  window.removeEventListener('testPassive', null, passiveTestOptions);
}

var isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);


var locks = [];
var documentListenerAdded = false;
var initialClientY = -1;
var previousBodyOverflowSetting = void 0;
var previousBodyPosition = void 0;
var previousBodyPaddingRight = void 0;

// returns true if `el` should be allowed to receive touchmove events.
var allowTouchMove = function allowTouchMove(el) {
  return locks.some(function (lock) {
    if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
      return true;
    }

    return false;
  });
};

var preventDefault = function preventDefault(rawEvent) {
  var e = rawEvent || window.event;

  // For the case whereby consumers adds a touchmove event listener to document.
  // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
  // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
  // the touchmove event on document will break.
  if (allowTouchMove(e.target)) {
    return true;
  }

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true;

  if (e.preventDefault) e.preventDefault();

  return false;
};

var setOverflowHidden = function setOverflowHidden(options) {
  // If previousBodyPaddingRight is already set, don't set it again.
  if (previousBodyPaddingRight === undefined) {
    var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
    var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

    if (_reserveScrollBarGap && scrollBarGap > 0) {
      var computedBodyPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'), 10);
      previousBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.paddingRight = computedBodyPaddingRight + scrollBarGap + 'px';
    }
  }

  // If previousBodyOverflowSetting is already set, don't set it again.
  if (previousBodyOverflowSetting === undefined) {
    previousBodyOverflowSetting = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
};

var restoreOverflowSetting = function restoreOverflowSetting() {
  if (previousBodyPaddingRight !== undefined) {
    document.body.style.paddingRight = previousBodyPaddingRight;

    // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
    // can be set again.
    previousBodyPaddingRight = undefined;
  }

  if (previousBodyOverflowSetting !== undefined) {
    document.body.style.overflow = previousBodyOverflowSetting;

    // Restore previousBodyOverflowSetting to undefined
    // so setOverflowHidden knows it can be set again.
    previousBodyOverflowSetting = undefined;
  }
};

var setPositionFixed = function setPositionFixed() {
  return window.requestAnimationFrame(function () {
    // If previousBodyPosition is already set, don't set it again.
    if (previousBodyPosition === undefined) {
      previousBodyPosition = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left
      };

      // Update the dom inside an animation frame 
      var _window = window,
          scrollY = _window.scrollY,
          scrollX = _window.scrollX,
          innerHeight = _window.innerHeight;

      document.body.style.position = 'fixed';
      document.body.style.top = -scrollY;
      document.body.style.left = -scrollX;

      setTimeout(function () {
        return window.requestAnimationFrame(function () {
          // Attempt to check if the bottom bar appeared due to the position change
          var bottomBarHeight = innerHeight - window.innerHeight;
          if (bottomBarHeight && scrollY >= innerHeight) {
            // Move the content further up so that the bottom bar doesn't hide it
            document.body.style.top = -(scrollY + bottomBarHeight);
          }
        });
      }, 300);
    }
  });
};

var restorePositionSetting = function restorePositionSetting() {
  if (previousBodyPosition !== undefined) {
    // Convert the position from "px" to Int
    var y = -parseInt(document.body.style.top, 10);
    var x = -parseInt(document.body.style.left, 10);

    // Restore styles
    document.body.style.position = previousBodyPosition.position;
    document.body.style.top = previousBodyPosition.top;
    document.body.style.left = previousBodyPosition.left;

    // Restore scroll
    window.scrollTo(x, y);

    previousBodyPosition = undefined;
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
  return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
};

var handleScroll = function handleScroll(event, targetElement) {
  var clientY = event.targetTouches[0].clientY - initialClientY;

  if (allowTouchMove(event.target)) {
    return false;
  }

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll.
    return preventDefault(event);
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the bottom of its scroll.
    return preventDefault(event);
  }

  event.stopPropagation();
  return true;
};

var disableBodyScroll = function disableBodyScroll(targetElement, options) {
  // targetElement must be provided
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
    return;
  }

  // disableBodyScroll must not have been called on this targetElement before
  if (locks.some(function (lock) {
    return lock.targetElement === targetElement;
  })) {
    return;
  }

  var lock = {
    targetElement: targetElement,
    options: options || {}
  };

  locks = [].concat(_toConsumableArray(locks), [lock]);

  if (isIosDevice) {
    setPositionFixed();
  } else {
    setOverflowHidden(options);
  }

  if (isIosDevice) {
    targetElement.ontouchstart = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        initialClientY = event.targetTouches[0].clientY;
      }
    };
    targetElement.ontouchmove = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        handleScroll(event, targetElement);
      }
    };

    if (!documentListenerAdded) {
      document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = true;
    }
  }
};

var clearAllBodyScrollLocks = function clearAllBodyScrollLocks() {
  if (isIosDevice) {
    // Clear all locks ontouchstart/ontouchmove handlers, and the references.
    locks.forEach(function (lock) {
      lock.targetElement.ontouchstart = null;
      lock.targetElement.ontouchmove = null;
    });

    if (documentListenerAdded) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }

    // Reset initial clientY.
    initialClientY = -1;
  }

  if (isIosDevice) {
    restorePositionSetting();
  } else {
    restoreOverflowSetting();
  }

  locks = [];
};

var enableBodyScroll = function enableBodyScroll(targetElement) {
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
    return;
  }

  locks = locks.filter(function (lock) {
    return lock.targetElement !== targetElement;
  });

  if (isIosDevice) {
    targetElement.ontouchstart = null;
    targetElement.ontouchmove = null;

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }
  }

  if (isIosDevice) {
    restorePositionSetting();
  } else {
    restoreOverflowSetting();
  }
};



/***/ }),

/***/ 587:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 418:
/***/ ((module) => {

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 408:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/** @license React v16.14.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var l=__webpack_require__(418),n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x=n?Symbol.for("react.forward_ref"):60112,y=n?Symbol.for("react.suspense"):60113,z=n?Symbol.for("react.memo"):60115,A=n?Symbol.for("react.lazy"):
60116,B="function"===typeof Symbol&&Symbol.iterator;function C(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E={};function F(a,b,c){this.props=a;this.context=b;this.refs=E;this.updater=c||D}F.prototype.isReactComponent={};F.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(C(85));this.updater.enqueueSetState(this,a,b,"setState")};F.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function G(){}G.prototype=F.prototype;function H(a,b,c){this.props=a;this.context=b;this.refs=E;this.updater=c||D}var I=H.prototype=new G;I.constructor=H;l(I,F.prototype);I.isPureReactComponent=!0;var J={current:null},K=Object.prototype.hasOwnProperty,L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,c){var e,d={},g=null,k=null;if(null!=b)for(e in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)K.call(b,e)&&!L.hasOwnProperty(e)&&(d[e]=b[e]);var f=arguments.length-2;if(1===f)d.children=c;else if(1<f){for(var h=Array(f),m=0;m<f;m++)h[m]=arguments[m+2];d.children=h}if(a&&a.defaultProps)for(e in f=a.defaultProps,f)void 0===d[e]&&(d[e]=f[e]);return{$$typeof:p,type:a,key:g,ref:k,props:d,_owner:J.current}}
function N(a,b){return{$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g,Q=[];function R(a,b,c,e){if(Q.length){var d=Q.pop();d.result=a;d.keyPrefix=b;d.func=c;d.context=e;d.count=0;return d}return{result:a,keyPrefix:b,func:c,context:e,count:0}}
function S(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>Q.length&&Q.push(a)}
function T(a,b,c,e){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0}}if(g)return c(e,a,""===b?"."+U(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+U(d,k);g+=T(d,f,c,e)}else if(null===a||"object"!==typeof a?f=null:(f=B&&a[B]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),k=
0;!(d=a.next()).done;)d=d.value,f=b+U(d,k++),g+=T(d,f,c,e);else if("object"===d)throw c=""+a,Error(C(31,"[object Object]"===c?"object with keys {"+Object.keys(a).join(", ")+"}":c,""));return g}function V(a,b,c){return null==a?0:T(a,"",b,c)}function U(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function W(a,b){a.func.call(a.context,b,a.count++)}
function aa(a,b,c){var e=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?X(a,e,c,function(a){return a}):null!=a&&(O(a)&&(a=N(a,d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(P,"$&/")+"/")+c)),e.push(a))}function X(a,b,c,e,d){var g="";null!=c&&(g=(""+c).replace(P,"$&/")+"/");b=R(b,g,e,d);V(a,aa,b);S(b)}var Y={current:null};function Z(){var a=Y.current;if(null===a)throw Error(C(321));return a}
var ba={ReactCurrentDispatcher:Y,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:J,IsSomeRendererActing:{current:!1},assign:l};exports.Children={map:function(a,b,c){if(null==a)return a;var e=[];X(a,e,null,b,c);return e},forEach:function(a,b,c){if(null==a)return a;b=R(null,null,b,c);V(a,W,b);S(b)},count:function(a){return V(a,function(){return null},null)},toArray:function(a){var b=[];X(a,b,null,function(a){return a});return b},only:function(a){if(!O(a))throw Error(C(143));return a}};
exports.Component=F;exports.Fragment=r;exports.Profiler=u;exports.PureComponent=H;exports.StrictMode=t;exports.Suspense=y;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ba;
exports.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(C(267,a));var e=l({},a.props),d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=J.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)K.call(b,h)&&!L.hasOwnProperty(h)&&(e[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)e.children=c;else if(1<h){f=Array(h);for(var m=0;m<h;m++)f[m]=arguments[m+2];e.children=f}return{$$typeof:p,type:a.type,
key:d,ref:g,props:e,_owner:k}};exports.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};exports.forwardRef=function(a){return{$$typeof:x,render:a}};exports.isValidElement=O;
exports.lazy=function(a){return{$$typeof:A,_ctor:a,_status:-1,_result:null}};exports.memo=function(a,b){return{$$typeof:z,type:a,compare:void 0===b?null:b}};exports.useCallback=function(a,b){return Z().useCallback(a,b)};exports.useContext=function(a,b){return Z().useContext(a,b)};exports.useDebugValue=function(){};exports.useEffect=function(a,b){return Z().useEffect(a,b)};exports.useImperativeHandle=function(a,b,c){return Z().useImperativeHandle(a,b,c)};
exports.useLayoutEffect=function(a,b){return Z().useLayoutEffect(a,b)};exports.useMemo=function(a,b){return Z().useMemo(a,b)};exports.useReducer=function(a,b,c){return Z().useReducer(a,b,c)};exports.useRef=function(a){return Z().useRef(a)};exports.useState=function(a){return Z().useState(a)};exports.version="16.14.0";


/***/ }),

/***/ 294:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(408);
} else {}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(202);
/******/ 	
/******/ })()
;
//# sourceMappingURL=header.fed159e65a33493423cb.js.map