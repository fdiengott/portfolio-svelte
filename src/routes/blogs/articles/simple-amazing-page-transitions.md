# Simple, Amazing Page Transitions

[This website](https://hyperblam.how) has one of the coolest page transitions I've ever seen. So obviously upon looking into it, I needed to do a quick write-up on how to do it so I can reproduce in the future.

It's very simple in a way that is impressive.

Firstly, just add:

```
@view-transition {
  navigation: auto;
}
```

This will set up view transitions between pages. I believe if nothing is specified, the default will be a cute little cross-fade.

Next, to customize how the transition happens you need to start with the following:

```
:root {
	view-transition-name: root;
}
```

This gives a name to whatever you are transitioning (in this case, `root`) and says what element to transition (which here is `:root` or everything). You can make the `view-transition-name` anything you want.

Then you specify how it'll change with the `::view-transition-old(root) {...}` and `::view-transition-new(root) {...}` properties.

From here we can specify something like:

```
::view-transition-old(root) {
  animation: 0.25s ease-in both distort-in;
}

::view-transition-new(root) {
  animation: 0.25s ease-in both distort-out;
}

```

This is how Heydon Pickering does it in their website and it makes this distortion effect that was so cool it stopped me in my tracks and caused me to rabbit hole away my vacation morning to look into how they did it.

Here's what the distort-in animation looks like:

```
@keyframes distort-in {
  0% {
    filter: url(#distort-3);
    opacity: 1;
  }
  33% {
    filter: url(#distort-1);
  }
  66% {
    filter: url(#distort-2);
  }
  100% {
    opacity: 0.5;
  }
}
```

`distort-out` looks about the same.

These filters are deceptively simple. It applies opacity and some filtering. But what is the `url(...)` bit refer to? Just a little svg magic!

```
  <svg style="block-size: 0" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="distort-1">
          <feTurbulence baseFrequency="0.001 0.1" numOctaves="4"></feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="90"></feDisplacementMap>
        </filter>
      </defs>
    </svg>
```

Throw that somewhere in your html markup and define each `filter` in the `defs` (short for definition) section. The `id` is what will connect to the `url(#id)` in the keyframes. There are lots of [filter primitives](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element#filter_primitive_elements) which you can mix and match to create incredible effects. In the above example, Heydon is using `feTurbulence` to create Perlin noise and connecting it to the page with the `feDisplacementMap`.

To fill out the above example, you'll just make a couple more distort `filter`s, varying the `baseFrequency` and you have yourself a most amazing (and pretty punk) page transition.
