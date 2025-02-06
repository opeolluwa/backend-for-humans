// jshint multistr:true

(function (w, d) {
  "use strict";

  var HLJS_LN_NAME = "hljs-ln",
    LINE_NAME = "hljs-ln-line",
    NUMBER_LINE_NAME = "hljs-ln-n",
    BREAK_LINE_REGEXP = /\r\n|\r|\n/g;

  if (w.hljs) {
    w.hljs.initLineNumbersOnLoad = initLineNumbersOnLoad;
    w.hljs.lineNumbersBlock = lineNumbersBlock;
    w.hljs.lineNumbersValue = lineNumbersValue;

    addStyles();
    initLineNumbersOnLoad();
  } else {
    w.console.error("highlight.js not detected!");
  }

  function addStyles() {
    var css = d.createElement("style");
    css.type = "text/css";
    css.innerHTML = `
            .${HLJS_LN_NAME} { display: block; }
            .${LINE_NAME}  { counter-increment: line-number-count; }
            .${NUMBER_LINE_NAME} {
                display: inline-block;
                text-align: right;
                margin-right: 2.0rem;
            }
            .${NUMBER_LINE_NAME}:before {
                content: counter(line-number-count);
            }
        `;
    d.getElementsByTagName("head")[0].appendChild(css);
  }

  function initLineNumbersOnLoad(options) {
    if (d.readyState === "interactive" || d.readyState === "complete") {
      documentReady(options);
    } else {
      w.addEventListener("DOMContentLoaded", function () {
        documentReady(options);
      });
    }
  }

  function documentReady(options) {
    try {
      var blocks = d.querySelectorAll("code.hljs,code.nohighlight");

      for (var i in blocks) {
        if (blocks.hasOwnProperty(i)) {
          if (!isPluginDisabledForBlock(blocks[i])) {
            lineNumbersBlock(blocks[i], options);
          }
        }
      }
    } catch (e) {
      w.console.error("LineNumbers error: ", e);
    }
  }

  function isPluginDisabledForBlock(element) {
    return element.classList.contains("nohljsln");
  }

  function lineNumbersBlock(element, options) {
    if (typeof element !== "object") return;

    async(function () {
      element.innerHTML = lineNumbersInternal(element, options);
    });
  }

  function lineNumbersValue(value, options) {
    if (typeof value !== "string") return;

    var element = document.createElement("code");
    element.innerHTML = value;

    return lineNumbersInternal(element, options);
  }

  function lineNumbersInternal(element, options) {
    var internalOptions = mapOptions(element, options);

    return addLineNumbersBlockFor(element.innerHTML, internalOptions);
  }

  function addLineNumbersBlockFor(inputHtml, options) {
    var lines = getLines(inputHtml);

    // if last line contains only carriage return remove it
    if (lines[lines.length - 1].trim() === "") {
      lines.pop();
    }

    if (lines.length > 1 || options.singleLine) {
      var html = "";

      var digitCount = Math.trunc(Math.log10(lines.length));

      for (var i = 0, l = lines.length; i < l; i++) {
        var boringClass = "";
        if (lines[i].includes("boring")) {
          boringClass = "boring";
        }
        html += `<div class="${LINE_NAME}"
                    ><div
                        class="${NUMBER_LINE_NAME} ${boringClass}"
                        style="width: ${digitCount}em;"
                    ></div>${lines[i].length > 0 ? lines[i] : "&#13;"}</div>`;
      }

      return `<div
                class="${HLJS_LN_NAME}"
                style="counter-reset: line-number-count ${options.startFrom}"
            >${html}</div>`;
    }

    return inputHtml;
  }

  /**
   * @param {HTMLElement} element Code block.
   * @param {Object} options External API options.
   * @returns {Object} Internal API options.
   */
  function mapOptions(element, options) {
    options = options || {};
    return {
      singleLine: getSingleLineOption(options),
      startFrom: getStartFromOption(element, options),
    };
  }

  function getSingleLineOption(options) {
    var defaultValue = false;
    if (!!options.singleLine) {
      return options.singleLine;
    }
    return defaultValue;
  }

  function getStartFromOption(element, options) {
    var defaultValue = 0;
    var startFrom = defaultValue;

    if (isFinite(options.startFrom)) {
      startFrom = options.startFrom;
    }

    // can be overridden because local option is priority
    var value = getAttribute(element, "data-ln-start-from");
    if (value !== null) {
      startFrom = toNumber(value, defaultValue);
    }

    return startFrom;
  }

  function getLines(text) {
    if (text.length === 0) return [];
    return text.split(BREAK_LINE_REGEXP);
  }

  function getLinesCount(text) {
    return (text.trim().match(BREAK_LINE_REGEXP) || []).length;
  }

  ///
  /// HELPERS
  ///

  function async(func) {
    w.setTimeout(func, 0);
  }

  /**
   * @param {HTMLElement} element Code block.
   * @param {String} attrName Attribute name.
   * @returns {String} Attribute value or empty.
   */
  function getAttribute(element, attrName) {
    return element.hasAttribute(attrName)
      ? element.getAttribute(attrName)
      : null;
  }

  /**
   * @param {String} str Source string.
   * @param {Number} fallback Fallback value.
   * @returns Parsed number or fallback value.
   */
  function toNumber(str, fallback) {
    if (!str) return fallback;
    var number = Number(str);
    return isFinite(number) ? number : fallback;
  }
})(window, document);
