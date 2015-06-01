$(function() {

	var $menu = $('#main-menu');

	// add the HTML structure
	$('div.right-column').prepend('\
  <div id="themes">\
   <h2>Switch theme (class)</h2>\
   <p>\
    <select id="themes-classes">\
\
\
	<!-- include new themes by adding a new option below -->\
\
\
     <option value="sm-blue" data-page-bg="#fbf3e8" data-desktop-bp="768px" data-codepen-url="http://codepen.io/vadikom/pen/rVMmMm?editors=010" data-init-options="{\n\
			subMenusSubOffsetX: 1,\n\
			subMenusSubOffsetY: -8\n\
		}" data-init-options-vertical="{\n\
			mainMenuSubOffsetX: 1,\n\
			mainMenuSubOffsetY: -8,\n\
			subMenusSubOffsetX: 1,\n\
			subMenusSubOffsetY: -8\n\
		}">sm-blue</option>\
     <option value="sm-clean" data-page-bg="#fcfcfc" data-desktop-bp="768px" data-codepen-url="http://codepen.io/vadikom/pen/Mwjmbb?editors=010" data-init-options="{\n\
			mainMenuSubOffsetX: -1,\n\
			mainMenuSubOffsetY: 4,\n\
			subMenusSubOffsetX: 6,\n\
			subMenusSubOffsetY: -6\n\
		}" data-init-options-vertical="{\n\
			mainMenuSubOffsetX: 6,\n\
			mainMenuSubOffsetY: -6,\n\
			subMenusSubOffsetX: 6,\n\
			subMenusSubOffsetY: -6\n\
		}">sm-clean</option>\
     <option value="sm-mint" data-page-bg="#fff" data-desktop-bp="768px" data-codepen-url="http://codepen.io/vadikom/pen/LVRybm?editors=010" data-init-options="{\n\
			subMenusSubOffsetX: 6,\n\
			subMenusSubOffsetY: -8\n\
		}" data-init-options-vertical="{\n\
			mainMenuSubOffsetX: 6,\n\
			mainMenuSubOffsetY: -8,\n\
			subMenusSubOffsetX: 6,\n\
			subMenusSubOffsetY: -8\n\
		}">sm-mint</option>\
     <option value="sm-simple" data-page-bg="#f6f6f6" data-desktop-bp="768px" data-codepen-url="http://codepen.io/vadikom/pen/OVRmbe?editors=010" data-init-options="{\n\
			mainMenuSubOffsetX: -1,\n\
			subMenusSubOffsetX: 10,\n\
			subMenusSubOffsetY: 0\n\
		}" data-init-options-vertical="{\n\
			mainMenuSubOffsetX: 10,\n\
			mainMenuSubOffsetY: 0,\n\
			subMenusSubOffsetX: 10,\n\
			subMenusSubOffsetY: 0\n\
		}">sm-simple</option>\
    </select>\
    <span style="float:right;"><a id="themes-codepen-url" href="http://codepen.io/vadikom/pen/rVMmMm?editors=010">Customize "<span id="themes-codepen-theme-name">sm-blue</span>" on Codepen</a></span><br />\
    <input id="themes-horizontal" name="themes-orientation" value="horizontal" type="radio" checked="checked" /><label for="themes-horizontal">Horizontal main menu</label><br />\
    <input id="themes-vertical" name="themes-orientation" value="vertical" type="radio" /><label for="themes-vertical">Vertical main menu</label><br />\
    <input id="themes-rtl" type="checkbox" /><label for="themes-rtl" title="Won\'t use real RTL text, just preview the theme">Right-to-left</label><br />\
   </p>\
   <h3>Source code</h3>\
   <h4>CSS:</h4>\
   <pre class="sh_html sh_sourceCode">&lt;!-- SmartMenus core CSS (required) --&gt;\n\
&lt;link href="../css/sm-core-css.css" rel="stylesheet" type="text/css" /&gt;\n\
\n\
&lt;!-- "<span class="themes-code-class">sm-blue</span>" menu theme (optional, you can use your own CSS, too) --&gt;\n\
&lt;link href="../css/<span class="themes-code-class">sm-blue</span>/<span class="themes-code-class">sm-blue</span>.css" rel="stylesheet" type="text/css" /&gt;\n' + (window.addonCSS ? window.addonCSS : '') + '\
\n\
&lt;!-- #main-menu config - instance specific stuff not covered in the theme --&gt;\n\
&lt;!-- Put this in an external stylesheet if you want the media query to work in IE8 (e.g. where the rest of your page styles are) --&gt;\n\
&lt;style type="text/css"&gt;\n' + (window.addonCSSBefore ? window.addonCSSBefore : '') + '\
	@media (min-width: <span class="themes-code-desktop-bp">768px</span>) {\n\
		#main-menu {\n\
<span class="themes-code-main-float"></span>\
			position: relative;\n\
			z-index: 9999;\n\
<span class="themes-code-main-width"></span>\
		}\n\
		#main-menu ul {\n\
			width: 12em; /* fixed width only please - you can use the "subMenusMinWidth"/"subMenusMaxWidth" script options to override this if you like */\n\
		}\n\
	}\n\
' + (window.addonCSSAfter ? window.addonCSSAfter : '') + '&lt;/style&gt;\n\
\n\
&lt;!-- Respond.js for IE8 support of media queries --&gt;\n\
&lt;!--[if lt IE 9]&gt;\n\
  &lt;script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"&gt;&lt;/script&gt;\n\
&lt;![endif]--&gt;</pre>\
   <h4>JavaScript:</h4>\
   <pre class="sh_html sh_sourceCode">&lt;!-- jQuery --&gt;\n\
&lt;script type="text/javascript" src="../libs/jquery/jquery.js"&gt;&lt;/script&gt;\n\
\n\
&lt;!-- SmartMenus jQuery plugin --&gt;\n\
&lt;script type="text/javascript" src="../jquery.smartmenus.js"&gt;&lt;/script&gt;\n' + (window.addonScriptSrc ? $.map(window.addonScriptSrc, function(arr) {
	return '\n&lt;!-- ' + arr[0] + ' --&gt;\n&lt;script type="text/javascript" src="' + arr[1] + '"&gt;&lt;/script&gt;\n';
}).join('') : '') + '\
\n\
&lt;!-- SmartMenus jQuery init --&gt;\n\
&lt;script type="text/javascript"&gt;\n\
	$(function() {\n\
		$(\'#main-menu\').smartmenus(<span class="themes-code-init-options">{\n\
			subMenusSubOffsetX: 1,\n\
			subMenusSubOffsetY: -8\n\
		}</span>);\n' + (window.addonScriptInit ? window.addonScriptInit : '') + '\
	});\n\
&lt;/script&gt;</pre>\
   <h4>HTML:</h4>\
   <pre class="sh_html sh_sourceCode">' + (window.addonHTMLBefore ? window.addonHTMLBefore : '') + '&lt;ul id="main-menu" class="<span class="themes-code-main-class">' + $menu[0].className + '</span>"&gt; ...' + (window.addonHTMLAfter ? window.addonHTMLAfter : '') + '</pre>\
  </div>\
');

	// load additional themes
	$('#themes-classes option').not(':first').each(function() {
		var className = $(this).attr('value');
		$('<link href="../css/' + className + '/' + className + '.css" rel="stylesheet" type="text/css" />').appendTo('head');
	});
	// update Respond.js to parse all themes loaded dynamically
	if (window.respond) {
		respond.update();
	}

	// hook theme switcher
	$('#themes-classes, #themes-horizontal, #themes-vertical, #themes-rtl').change(function() {
		var $select = $('#themes-classes'),
			$mainMenuDesktopWidthCSS = $('#main-menu-desktop-width-css'),
			className = $select.val(),
			vertical = $('#themes-vertical')[0].checked,
			rtl = $('#themes-rtl')[0].checked,
			$optionElm = $select.children().eq($select[0].selectedIndex),
			initOptions = $optionElm.data('init-options' + (vertical ? '-vertical' : '')),
			mainMenuClass = 'sm ' + (rtl ? 'sm-rtl ' : '') + (vertical ? 'sm-vertical ' : '') + className,
			mainMenuWidth = vertical ? '12em' : '';

		if ($mainMenuDesktopWidthCSS.length) {
			$mainMenuDesktopWidthCSS.remove();
			$mainMenuDesktopWidthCSS = null;
		}
		$('<style id="main-menu-desktop-width-css">@media (min-width: ' + $optionElm.data('desktop-bp') + ') { #main-menu { ' + (vertical ? 'float:' + (rtl ? 'right' : 'left') + ';' : '') + ' width:' + mainMenuWidth + '; } }</style>').appendTo('head');

		// switch #main-menu theme
		$menu.smartmenus('destroy')[0].className = mainMenuClass;
		$menu.smartmenus(eval('(' + initOptions + ')'));
		$('html,body').css('background', $optionElm.data('page-bg'));

		// update code samples
		$('span.themes-code-desktop-bp').text($optionElm.data('desktop-bp'));
		$('span.themes-code-main-width').text(mainMenuWidth ? '			width: ' + mainMenuWidth + ';\n' : '');
		$('span.themes-code-main-float').text(vertical ? '			float: ' + (rtl ? 'right' : 'left') + ';\n' : '');
		$('span.themes-code-class span, #themes-codepen-theme-name').text(className);
		$('#themes-codepen-url').attr('href', $optionElm.data('codepen-url'));
		$('span.themes-code-main-class span').text(mainMenuClass);
		$('span.themes-code-init-options').text(initOptions);

		// call any addon init code
		if (window.addonScriptInit) {
			try { eval(window.addonScriptInit); } catch(e) {};
		}
	});

	// init SHJS syntax highlighter
	$('<link href="../libs/demo-assets/shjs/shjs.css" rel="stylesheet" type="text/css" />').appendTo('head');
	sh_highlightDocument();

});

// load SHJS syntax highlighter synchronously
document.write('<scr' + 'ipt type="text/javascript" src="../libs/demo-assets/shjs/shjs.js"></scr' + 'ipt>');