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
})({"js/index.js":[function(require,module,exports) {
console.log('parcel works');
$(document).ready(function () {
  // Setup the a11y nav
  $('.nav').setup_navigation(); // RWD Nav Pattern

  $('body').addClass('js');
  var $menu = $('#menu'),
      $menulink = $('.menu-link'),
      $menuTrigger = $('.has-subnav > a');
  $menulink.click(function (e) {
    e.preventDefault();
    $menulink.toggleClass('active');
    $menu.toggleClass('active');
  });
  $menuTrigger.click(function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('active').next('ul').toggleClass('active');
  });
});
var keyCodeMap = {
  48: "0",
  49: "1",
  50: "2",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: "8",
  57: "9",
  59: ";",
  65: "a",
  66: "b",
  67: "c",
  68: "d",
  69: "e",
  70: "f",
  71: "g",
  72: "h",
  73: "i",
  74: "j",
  75: "k",
  76: "l",
  77: "m",
  78: "n",
  79: "o",
  80: "p",
  81: "q",
  82: "r",
  83: "s",
  84: "t",
  85: "u",
  86: "v",
  87: "w",
  88: "x",
  89: "y",
  90: "z",
  96: "0",
  97: "1",
  98: "2",
  99: "3",
  100: "4",
  101: "5",
  102: "6",
  103: "7",
  104: "8",
  105: "9"
};

$.fn.setup_navigation = function (settings) {
  settings = jQuery.extend({
    menuHoverClass: 'show-menu'
  }, settings); // Add ARIA role to menubar and menu items

  $(this).attr('role', 'menubar').find('li').attr('role', 'menuitem');
  var top_level_links = $(this).find('> li > a'); // Added by Terrill: (removed temporarily: doesn't fix the JAWS problem after all)
  // Add tabindex="0" to all top-level links 
  // Without at least one of these, JAWS doesn't read widget as a menu, despite all the other ARIA
  //$(top_level_links).attr('tabindex','0');
  // Set tabIndex to -1 so that top_level_links can't receive focus until menu is open

  $(top_level_links).next('ul').attr('data-test', 'true').attr({
    'aria-hidden': 'true',
    'role': 'menu'
  }).find('a').attr('tabIndex', -1); // Adding aria-haspopup for appropriate items

  $(top_level_links).each(function () {
    if ($(this).next('ul').length > 0) $(this).parent('li').attr('aria-haspopup', 'true');
  });
  $(top_level_links).hover(function () {
    $(this).closest('ul').attr('aria-hidden', 'false').find('.' + settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex', -1);
    $(this).next('ul').attr('aria-hidden', 'false').addClass(settings.menuHoverClass).find('a').attr('tabIndex', 0);
  });
  $(top_level_links).focus(function () {
    $(this).closest('ul').find('.' + settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex', -1);
    $(this).next('ul').attr('aria-hidden', 'false').addClass(settings.menuHoverClass).find('a').attr('tabIndex', 0);
  }); // Bind arrow keys for navigation

  $(top_level_links).keydown(function (e) {
    if (e.keyCode == 37) {
      e.preventDefault(); // This is the first item

      if ($(this).parent('li').prev('li').length == 0) {
        $(this).parents('ul').find('> li').last().find('a').first().focus();
      } else {
        $(this).parent('li').prev('li').find('a').first().focus();
      }
    } else if (e.keyCode == 38) {
      e.preventDefault();

      if ($(this).parent('li').find('ul').length > 0) {
        $(this).parent('li').find('ul').attr('aria-hidden', 'false').addClass(settings.menuHoverClass).find('a').attr('tabIndex', 0).last().focus();
      }
    } else if (e.keyCode == 39) {
      e.preventDefault(); // This is the last item

      if ($(this).parent('li').next('li').length == 0) {
        $(this).parents('ul').find('> li').first().find('a').first().focus();
      } else {
        $(this).parent('li').next('li').find('a').first().focus();
      }
    } else if (e.keyCode == 40) {
      e.preventDefault();

      if ($(this).parent('li').find('ul').length > 0) {
        $(this).parent('li').find('ul').attr('aria-hidden', 'false').addClass(settings.menuHoverClass).find('a').attr('tabIndex', 0).first().focus();
      }
    } else if (e.keyCode == 13 || e.keyCode == 32) {
      // If submenu is hidden, open it
      e.preventDefault();
      $(this).parent('li').find('ul[aria-hidden=true]').attr('aria-hidden', 'false').addClass(settings.menuHoverClass).find('a').attr('tabIndex', 0).first().focus();
    } else if (e.keyCode == 27) {
      e.preventDefault();
      $('.' + settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex', -1);
    } else {
      $(this).parent('li').find('ul[aria-hidden=false] a').each(function () {
        if ($(this).text().substring(0, 1).toLowerCase() == keyCodeMap[e.keyCode]) {
          $(this).focus();
          return false;
        }
      });
    }
  });
  var links = $(top_level_links).parent('li').find('ul').find('a');
  $(links).keydown(function (e) {
    if (e.keyCode == 38) {
      e.preventDefault(); // This is the first item

      if ($(this).parent('li').prev('li').length == 0) {
        $(this).parents('ul').parents('li').find('a').first().focus();
      } else {
        $(this).parent('li').prev('li').find('a').first().focus();
      }
    } else if (e.keyCode == 40) {
      e.preventDefault();

      if ($(this).parent('li').next('li').length == 0) {
        $(this).parents('ul').parents('li').find('a').first().focus();
      } else {
        $(this).parent('li').next('li').find('a').first().focus();
      }
    } else if (e.keyCode == 27 || e.keyCode == 37) {
      e.preventDefault();
      $(this).parents('ul').first().prev('a').focus().parents('ul').first().find('.' + settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex', -1);
    } else if (e.keyCode == 32) {
      e.preventDefault();
      window.location = $(this).attr('href');
    } else {
      var found = false;
      $(this).parent('li').nextAll('li').find('a').each(function () {
        if ($(this).text().substring(0, 1).toLowerCase() == keyCodeMap[e.keyCode]) {
          $(this).focus();
          found = true;
          return false;
        }
      });

      if (!found) {
        $(this).parent('li').prevAll('li').find('a').each(function () {
          if ($(this).text().substring(0, 1).toLowerCase() == keyCodeMap[e.keyCode]) {
            $(this).focus();
            return false;
          }
        });
      }
    }
  }); // Hide menu if click or focus occurs outside of navigation

  $(this).find('a').last().keydown(function (e) {
    if (e.keyCode == 9) {
      // If the user tabs out of the navigation hide all menus
      $('.' + settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex', -1);
    }
  });
  $(document).click(function () {
    $('.' + settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex', -1);
  });
  $(this).click(function (e) {
    e.stopPropagation();
  });
};
},{}],"../../.nvm/versions/node/v12.16.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52168" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.nvm/versions/node/v12.16.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map