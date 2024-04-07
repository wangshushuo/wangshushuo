---
title: IOS的固定列头滚动效果
date: 2022-07-09T15:31:23+08:00
---
用jQuery实现一个类似于ios的滚动列表效果，列表头会固定。

https://codepen.io/seansean11/pen/MYbMpw

```html
<head>
    <title>iOSList | iPhone-Style Alphabetical Contact List with HTML, CSS and JavaScript (jQuery) by Brian Hadaway</title>
</head>
<body>
    <div id="list1">
        <div class="ioslist-group-container">
            <div class="ioslist-group-header">A</div>
            <ul>
                <li>Afghanistan</li>
                <li>Akrotiri</li>
                <li>Albania</li>
                <li>Algeria</li>
                <li>American Samoa</li>
            </ul>
        </div>
        <div class="ioslist-group-container">
            <div class="ioslist-group-header">B</div>
            <ul>
                <li>Bahamas, The</li>
                <li>Bahrain</li>
                <li>Bangladesh</li>
                <li>Barbados</li>
                <li>Bassas da India</li>
            </ul>
        </div>
        <div class="ioslist-group-container">
            <div class="ioslist-group-header">C</div>
            <ul>
                <li>Cambodia</li>
                <li>Cameroon</li>
                <li>Canada</li>
                <li>Cape Verde</li>
                <li>Cayman Islands</li>
            </ul>
        </div>
        <div class="ioslist-group-container">
            <div class="ioslist-group-header">D</div>
            <ul>
                <li>Denmark</li>
                <li>Dhekelia</li>
                <li>Djibouti</li>
                <li>Dominica</li>
                <li>Dominican Republic</li>
            </ul>
        </div>
        <div class="ioslist-group-container">
            <div class="ioslist-group-header">E</div>
            <ul>
                <li>Ecuador</li>
                <li>Egypt</li>
                <li>El Salvador</li>
                <li>Equatorial Guinea</li>
                <li>Eritrea</li>
            </ul>
        </div>
        <div class="ioslist-group-container">
            <div class="ioslist-group-header">F</div>
            <ul>
                <li>Falkland Islands (Islas Malvinas)</li>
                <li>Faroe Islands</li>
                <li>Fiji</li>
                <li>Finland</li>
                <li>France</li>
            </ul>
        </div>
        <div class="ioslist-group-container">
            <div class="ioslist-group-header">G</div>
            <ul>
                <li>Gabon</li>
                <li>Gambia, The</li>
                <li>Gaza Strip</li>
                <li>Georgia</li>
                <li>Germany</li>
            </ul>
        </div>
        <div class="ioslist-group-container">
            <div class="ioslist-group-header">H</div>
            <ul>
                <li>Haiti</li>
                <li>Heard Island and McDonald Islands</li>
                <li>Holy See (Vatican City)</li>
                <li>Honduras</li>
                <li>Hong Kong</li>
            </ul>
        </div>
        <div class="ioslist-group-container">
            <div class="ioslist-group-header">I</div>
            <ul>
                <li>Iceland</li>
                <li>India</li>
                <li>Indonesia</li>
                <li>Iran</li>
                <li>Iraq</li>
            </ul>
        </div>
        <div class="ioslist-group-container">
            <div class="ioslist-group-header">J</div>
            <ul>
                <li>Jamaica</li>
                <li>Jan Mayen</li>
                <li>Japan</li>
                <li>Jersey</li>
                <li>Jordan</li>
            </ul>
        </div>
    </div>
</body>
```

```css
.ioslist-wrapper{
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	position: absolute;
	width: 100%;
  -webkit-overflow-scrolling: touch;
}


.ioslist-group-container {
	margin: 0;
	min-height: 1px;
	overflow: hidden;
	padding: 24px 0 0 0;
	position: relative;
}
.ioslist-group-header, .ioslist-fake-header {
	background: #B8C1C8;
	border-bottom: 1px solid #989EA4;
	border-top: 1px solid #717D85;
	color: #FFF;
	font: normal 18px/21px Helvetica, Arial, sans-serif;
	margin: 0;
	padding: 2px 0 0 12px;
	position: absolute;
	text-shadow: 0 1px #646A6E;
	-moz-text-shadow: 0 1px #646A6E;
	-webkit-text-shadow: 0 1px #646A6E;
}
.ioslist-group-header {
	bottom: auto;
	min-height: 1px;
	top: 0;
	width: 273px;
}
.ioslist-fake-header {
	width: 273px;
	z-index: 1000;
}

.ioslist-fake-header.ioslist-hidden {
	visibility: hidden;
}
.ioslist-group-container.ioslist-animated .ioslist-group-header {
	bottom: 0;
	top: auto;
}

/* Demo Styling */
body {
	font: normal 20px Helvetica, Arial, sans-serif;
	margin: 0;
}

#list1 {
	height: 300px;
	margin: 100px;
	overflow: visible;
	position: relative;
	width: 300px;
	zoom: 1;
}

.ioslist ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.ioslist li {
	font: normal 20px/45px Helvetica, Arial, sans-serif;
	margin: 0;
	padding: 0 0 0 12px;
	white-space: nowrap;
}

.ioslist li + li {
	border-top: 1px solid #CCC;
}

[data-ios="true"] .ioslist-group-header,
[data-ios="true"] .ioslist-fake-header {
	width: 288px; /*scrollbars aren't visible in iOS devices, so make the headers wider */
}
```

```js
/*! iOSList - v2.0.0 -  * https://brianhadaway.github.io/iOSList
 * Copyright (c)  2014  Brian Hadaway; Licensed MIT */
(function($, window, document, undefined) {
    var IosList = function(elem, options) {
        this.$elem = $(elem);
        this.$elem.data('instance', this);
        this.init(options);
    };

    IosList.prototype = {
        defaults: {
            classes: {
                animated: 'ioslist-animated',
                container: 'ioslist-wrapper',
                hidden: 'ioslist-hidden',
                stationaryHeader: 'ioslist-fake-header'
            },
            selectors: {
                groupContainer: '.ioslist-group-container',
                groupHeader: '.ioslist-group-header',
                stationaryHeader: 'h2'
            }
        },

        init: function(options) {
            var scope = this,
                isIOS = navigator.userAgent.match(/ipad|iphone|ipod/gi) ? true : false;

            //set defaults
            this.options = $.extend(true, {}, this.defaults, (options || {}));
            this.elems = [];
            //indicate that this is an ioslist
            this.$elem.addClass('ioslist');
            //wrap all the children
            this.$elem.children().wrapAll(["<div class='", this.options.classes.container, "' data-ios='", isIOS, "'></div>"].join(''));
            this.$elem.prepend(['<', this.options.selectors.stationaryHeader, '/>'].join(''));
            this.$listWrapper = this.$elem.find('.' + this.options.classes.container);
            this.$fakeHeader = this.$elem.find(this.options.selectors.stationaryHeader).eq(0);
            this.$fakeHeader.addClass(this.options.classes.stationaryHeader);

            this.$elem.find(this.options.selectors.groupContainer).each(function(index, elem) {
                var $tmp_list = scope.$elem.find(scope.options.selectors.groupContainer).eq(index),
                    $tmp_header = $tmp_list.find(scope.options.selectors.groupHeader).eq(0),
                    $tmp_listHeight = $tmp_list.height(),
                    $tmp_listOffset = $tmp_list.position().top;
                scope.elems.push({
                    'list': $tmp_list,
                    'header': $tmp_header,
                    'listHeight': $tmp_listHeight,
                    'headerText': $tmp_header.text(),
                    'headerHeight': $tmp_header.outerHeight(),
                    'listOffset': $tmp_listOffset,
                    'listBottom': $tmp_listHeight + $tmp_listOffset
                });
            });

            this.$fakeHeader.text(this.elems[0].headerText);

            var iScrollPos = 0;

            this.$listWrapper.scroll(function() {
                scope.testPosition();
            });

        },

        testPosition: function() {
            var currentTop = this.$listWrapper.scrollTop(),
                topElement, offscreenElement, topElementBottom, i = 0;

            while ((this.elems[i].listOffset - currentTop) <= 0) {
                topElement = this.elems[i];
                topElementBottom = topElement.listBottom - currentTop;
                if (topElementBottom < -topElement.headerHeight) {
                    offscreenElement = topElement;
                }
                i++;
                if (i >= this.elems.length) {
                    break;
                }
            }

            if (topElementBottom < 0 && topElementBottom > -topElement.headerHeight) {
                this.$fakeHeader.addClass(this.options.classes.hidden);
                $(topElement.list).addClass(this.options.classes.animated);
            } else {
                this.$fakeHeader.removeClass(this.options.classes.hidden);
                if (topElement) {
                    $(topElement.list).removeClass(this.options.classes.animated);
                }
            }

            if (topElement) {
                this.$fakeHeader.text(topElement.headerText);
            }
        }
    };

    $.fn.ioslist = function(options, args) {
        if (typeof options === 'string') {
            return this.each(function() {
                $(this).data('instance')[options](args);
            });
        } else {
            return this.each(function() {
                new IosList(this, options);
            });
        }
    };

})(jQuery, window, document);

$(function(){
    $("#list1").ioslist();
});


```