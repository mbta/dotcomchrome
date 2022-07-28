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

var react_1 = __webpack_require__(363); // Specify in pixels, but in numbers here for calculations


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
        btn.setAttribute("aria-expanded", btn === _this ? (!isOpen).toString() : "false");
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

          default:
            return;
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

/***/ 363:
/***/ ((module) => {

module.exports = React;

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
//# sourceMappingURL=header.b48e5b3c4badeeb0b644.js.map