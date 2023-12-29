<script setup>
import MarkdownRenderer from '#@/components/MarkdownRenderer.vue'
import mdComponents from './md-components'
import mdOptions from './md-options'
import mdDataAttributes from './md-data-attributes'
import mdEvents from './md-events'
import mdMethods from './md-methods'
import mdLayoutVars from './md-layout-vars'
import mdThemeBaseVars from './md-theme-base-vars'
import mdThemeCollapsibleVars from './md-theme-collapsible-vars'
import mdThemeDropdownsVars from './md-theme-dropdowns-vars'

const version = __APP_VERSION__
</script>

<div class="md-doc">

# SmartMenus Documentation

## <a name="quick-start"></a>Quick start

Lauch the SmartMenus Configurator that allows configuring and testing the layout and behavior of your SmartMenus navbar(s).

<a href="https://configurator.smartmenus.org/" target="_blank" class="button">SmartMenus Configurator</a>

At any time while using the configurator, you can click the "**View code**" button which will provide you with code samples and simple install/init instructions for the script.

Once you have configured the layout and behavior of your navbar(s) using the configurator tool, you will probably need to tweak the default theme (typography, colors, etc.) so go on and take a look at the [theme](#style-theme) section in the docs for info and a list of all available variables that you could customize.

::: note
This should be enough info for a "_Quick start_" section but keep in mind that currently the configurator tool does not support some of the advanced configuration options (e.g. setting any of the available data-\* attributes, etc.) so if you need further tweaks, feel welcome to dive into the rest of the documentation.
:::

## <a name="installation-and-setup"></a>Installation and setup

### <a name="installation-and-setup-install"></a>Install

**Node**

```bash
npm install smartmenus
```

**Browser**

- Download the latest release ZIP from:

  https://github.com/vadikom/smartmenus/releases

  and copy the dist folder found in `packages/smartmenus/dist`.

- Or use a CDN - for example:

  <MarkdownRenderer :source="`https://www.unpkg.com/browse/smartmenus@${version}/dist/`" />

### <a name="installation-and-setup-basic-setup"></a>Basic setup

::: tip
The <a href="https://configurator.smartmenus.org/" target="_blank">SmartMenus Configurator</a> will automatically provide you with dynamically updated code samples and instructions based on your configuration.
:::

#### HTML

```html
<!-- Navbar 1 -->
<nav id="navbar1" class="sm-navbar">
  <h1 class="sm-brand"><a href="#">Navbar 1</a></h1>

  <span class="sm-toggler-state" id="sm-toggler-state-1"></span>
  <div class="sm-toggler">
    <a class="sm-toggler-anchor sm-toggler-anchor--show" href="#sm-toggler-state-1" role="button" aria-label="Open main menu">
      <span class="sm-toggler-icon sm-toggler-icon--show"></span>
    </a>
    <a class="sm-toggler-anchor sm-toggler-anchor--hide" href="#" role="button" aria-label="Close main menu">
      <span class="sm-toggler-icon sm-toggler-icon--hide"></span>
    </a>
  </div>

  <div class="sm-collapse">
    <ul class="sm-nav">
      <li class="sm-nav-item"><a class="sm-nav-link" href="#">Link</a></li>
      <li class="sm-nav-item"><a class="sm-nav-link" href="#">Link</a></li>
      <li class="sm-nav-item">
        <a class="sm-nav-link sm-sub-toggler" href="#">Sub</a>
        <ul class="sm-sub">
          <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
          <li class="sm-sub-item">
            <a class="sm-sub-link sm-sub-toggler" href="#">Sub</a>
            <ul class="sm-sub">
              <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
              <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
              <li class="sm-sub-item">
                <a class="sm-sub-link sm-sub-toggler" href="#">Sub</a>
                <ul class="sm-sub">
                  <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                  <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                  <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                </ul>
              </li>
              <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
            </ul>
          </li>
          <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
          <li class="sm-sub-item-separator"></li>
          <li class="sm-sub-item"><a class="sm-sub-link sm-disabled" href="#">Disabled</a></li>
        </ul>
      </li>
      <li class="sm-nav-item"><a class="sm-nav-link" href="#">Link</a></li>
      <li class="sm-nav-item"><a class="sm-nav-link" href="#">Link</a></li>
      <li class="sm-nav-item">
        <a class="sm-nav-link sm-nav-link--split" href="#">Link</a
        ><button class="sm-nav-link sm-nav-link--split sm-sub-toggler" aria-label="Toggle sub menu"></button>
        <ul class="sm-sub">
          <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
          <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
          <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
          <li class="sm-sub-item">
            <a class="sm-sub-link sm-sub-link--split" href="#">Link</a
            ><button class="sm-sub-link sm-sub-link--split sm-sub-toggler" aria-label="Toggle sub menu"></button>
            <ul class="sm-sub">
              <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
              <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
              <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
              <li class="sm-sub-item">
                <a class="sm-sub-link sm-sub-link--split" href="#">Link</a
                ><button class="sm-sub-link sm-sub-link--split sm-sub-toggler" aria-label="Toggle sub menu"></button>
                <ul class="sm-sub">
                  <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                  <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                  <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="sm-nav-item"><a class="sm-nav-link" href="#">Link</a></li>
      <li class="sm-nav-item sm-nav-item--has-mega">
        <a class="sm-nav-link sm-sub-toggler" href="#">Mega</a>
        <div class="sm-sub sm-sub--mega">
          <div style="border: 1px dashed rgba(0, 0, 0, 0.3); padding: 1rem">
            <p>Mega subs will take the full width/height of the navbar based on its orientation.</p>
            <p>You can include any HTML content in a mega sub.</p>
            <p>Please note that the <code>dropdownsKeepInViewport</code> option has no effect for mega subs.</p>
          </div>
        </div>
      </li>
      <li class="sm-nav-item-separator"></li>
      <li class="sm-nav-item"><a class="sm-nav-link sm-disabled" href="#">Disabled</a></li>
    </ul>
  </div>
</nav>
```

#### CSS

The `dist/css` folder contains a number of pre-compiled stylesheets optimized for different scenarios. The [Which stylesheet to use?](#style-stylesheets) section in the docs includes info that will help you choose the right one for your use-case.

**Node (Webpack, Vite, etc.)**

You can use either SASS or CSS.

- **SASS**

  Create you own customization file:

  ```scss
  // smartmenus-custom.scss

  // any SASS variables here...

  @import "../node_modules/smartmenus/src/css/smartmenus.scss";

  // any customization styles here...
  ```

  Import your customization file:

  ```js
  import './smartmenus-custom.scss'
  ```

- **CSS**

  Create you own customization file:

  ```css
  /* smartmenus-custom.css */

  @import url("../node_modules/smartmenus/dist/css/smartmenus.css");

  /* any customization styles here... */
  ```

  Import your customization file:

  ```js
  import './smartmenus-custom.css'
  ```

**Browser**

Create you own customization file:

```css
/* smartmenus-custom.css */

/* any customization styles here... */
```

Include the CSS files on your page:

```html
<link href="dist/css/smartmenus.min.css" rel="stylesheet" />
<link href="smartmenus-custom.css" rel="stylesheet" />
```

#### JS

**Node (ESM)**

```js
import SmartMenus from 'smartmenus'

// Navbar 1
const navbar1 = new SmartMenus(document.querySelector('#navbar1')/* , { anyScriptOption: value, ... } */)
```

**Browser**

Create you own init file:

```js
// smartmenus-init.js

// Navbar 1
const navbar1 = new SmartMenus(document.querySelector('#navbar1')/* , { anyScriptOption: value, ... } */)
```

Include the JS files on your page:

```html
<script src="dist/js/smartmenus.browser.min.js"></script>
<script src="smartmenus-init.js"></script>
```

## <a name="style"></a>Style

### <a name="style-introduction"></a>Introduction

The styles are split into two logical parts - **layout** and **theme** related. The layout styles provide support for the layout of all the components so they are practically mandatory to use. The theme styles cover only the look (typography, colors, etc.) and are basically optional and easier to replace with your own rules if for some reason you prefer not to use the default theme (e.g. you consider it too bloated for your use-case).

### <a name="style-layout"></a>Layout

#### <a name="style-layout-responsiveness"></a>Responsiveness

By default the layout styles use a single viewport breakpoint which switches the nav tree from **collapsible** mode (on small screens) to **dropdowns** mode (on large screens). The following SASS variables control the breakpoint:

```scss
// packages/smartmenus/src/css/variables/_layout.scss

$vp-large-min:      768px !default;
$vp-small-max:      $vp-large-min - 0.02 !default;
```

If you need only collapsible or only dropdown sub menus on all screen sizes for a navbar, you can override the default responsive behavior by using `.sm-navbar--collapsible-only` or `.sm-navbar--dropdowns-only`.

Use only collapsible mode on all screen sizes:

```html
<nav class="sm-navbar sm-navbar--collapsible-only">
```

Use only dropdowns mode on all screen sizes:

```html
<nav class="sm-navbar sm-navbar--dropdowns-only">
```

A similar logic depending on the same single breakpoint is used to differ between small screen view and large screen view for other layout features too. For example, the following will result in a navbar with offcanvas on small screen devices:

```html
<nav class="sm-navbar sm-navbar--offcanvas-left">
```

but if you add `.sm-navbar--offcanvas-only`, it would result in a navbar with offcanvas on all screen sizes:

```html
<nav class="sm-navbar sm-navbar--offcanvas-left sm-navbar--offcanvas-only">
```

For details, please check the individual [navbar](#style-layout-components-sm-navbar-default) variants.

#### <a name="style-layout-components"></a>Components

<MarkdownRenderer :source="mdComponents" />

#### <a name="style-layout-utility-classes"></a>Utility classes

**`.sm-hide-small`**  
Hide content on small screen.

**`.sm-hide-large`**  
Hide content on large screen.

#### <a name="style-layout-variables"></a>Layout variables

Most of the layout related variables have both a SASS and a respective CSS version. The CSS variables are scoped to `.sm-navbar` by default (the scope can be changed via the `$var-scope` SASS variable).

A notable exception are the variables that control the breakpoint `$vp-large-min`/`$vp-small-max` which, unfortunately, are still SASS-only due to no native CSS alternative being widely supported for now.

<MarkdownRenderer :source="mdLayoutVars" />

### <a name="style-theme"></a>Theme

#### <a name="style-theme-collapsible-and-dropdowns"></a>Collapsible and dropdowns

The theme styles are separated into two mosly independent stylesheets - for the **collapsible** mode and for the **dropdowns** mode in which a navbar might be. Only the base theme variables are shared between both modes while all component related variables are available separately for each mode which allows customizing the collapsible and dropdowns themes almost completely independently of each other when this is needed.

#### <a name="style-theme-variables"></a>Theme variables

All theme related variables have both a SASS and a respective CSS version. The CSS variables are scoped to `.sm-navbar` by default.

##### <a name="style-theme-variables-base"></a>Base

These are shared between both collapsible and dropdowns modes.

<MarkdownRenderer :source="mdThemeBaseVars" />

##### <a name="style-theme-variables-collapsible"></a>Collapsible

<MarkdownRenderer :source="mdThemeCollapsibleVars" />

##### <a name="style-theme-variables-dropdowns"></a>Dropdowns

<MarkdownRenderer :source="mdThemeDropdownsVars" />

### <a name="style-stylesheets"></a>Which stylesheet to use?

The `dist/css` folder contains a number of pre-compiled stylesheets optimized for different scenarios. Ideally, you should use the one that is most suitable for your use-case to avoid serving your users unneeded code.

**smartmenus**(.rtl)(.min).css  
Use if neither of your navbars is `.sm-navbar--collapsible-only` or `.sm-navbar--dropdowns-only`.

**smartmenus-only-layout-and-theme-collapsible**(.rtl)(.min).css  
Use if all of your navbars are `.sm-navbar--collapsible-only`.

**smartmenus-only-layout-and-theme-dropdowns**(.rtl)(.min).css  
Use if all of your navbars are `.sm-navbar--dropdowns-only`.

**smartmenus-max**(.rtl)(.min).css  
Use if you have more than one navbar and some of them are `.sm-navbar--collapsible-only` or `.sm-navbar--dropdowns-only` while others do not have these classes set. This is the most complete stylesheet and covers all possible scenarios but it is also the largest in size.

**smartmenus-only-layout**(.rtl)(.min).css  
Use if you only need the minimal required layout styles and do not want to use the theme styles (which include typography, colors, etc.). This is useful if you would like to style the navbar components on your own but still support all possible layout options.

::: note
On right-to-left pages (e.g. Hebrew, Arabic) just make sure you are using the ***.rtl** version of the stylesheet. The script will take care of everything automatically.
:::

::: tip
The <a href="https://configurator.smartmenus.org/" target="_blank">SmartMenus Configurator</a> will automatically suggest the most appropriate stylesheet to use based on the configured navbar(s).
:::

## <a name="options"></a>Options

<MarkdownRenderer :source="mdOptions" />

## <a name="data-attributes"></a>Data attributes

<MarkdownRenderer :source="mdDataAttributes" />

**<a name="data-attributes-data-sm-any-script-option"></a>data-sm-[any-script-option]**  
Any of the script [options](#options) can be set as a data attribute to the navbar element instead of being passed to the SmartMenus constructor in your JS code. These have highest priority and will extend and override any options passed to the SmartMenus constructor. Just make sure you are using kebab-case instead of camelCase.  
Applies to: `.sm-navbar`  
Script option:

```js
const navbar1 = new SmartMenus(document.querySelector('#navbar1'), {
  dropdownsShowTrigger: 'mouseover'
})
```

Data attribute:

```html
<nav id="navbar1" class="sm-navbar" data-sm-dropdowns-show-trigger="mouseover">
```

## <a name="api"></a>API

### <a name="api-events"></a>Events

<MarkdownRenderer :source="mdEvents" />

### <a name="api-methods"></a>Methods

#### <a name="api-methods-static"></a>Static methods

<MarkdownRenderer :source="mdMethods.static" />

#### <a name="api-methods-instance"></a>Instance methods

<MarkdownRenderer :source="mdMethods.instance" />

</div>
