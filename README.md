# use-prefetch

Hook and component for prefetch.

## Installation

```
npm i use-prefetch
```

## Usage

### usePrefetch

This hook returns a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs).

DOM nodes that are passed the callback ref, handle following events:

- `mouseover`, `pointerover` - Schedule that `prefetch` will be called after specified delay time.
- `mouseout`, `pointerout` - Cancel the scheduled `prefetch`.
- `mousedown`, `pointerdown`, `touchstart` - Call `prefetch` immediately.

To avoid calling `prefetch` in succession, you can specify a cooldown time.

``` typescript
import { usePrefetch } from 'use-prefetch';

function Component() {
  const callbackRef = usePrefetch(() => {
    fetchResource();
  }, {
    cooldown: 300000,
    delay: 200,
  });

  return (
    <a href='...' ref={callbackRef}>resource</a>
  );
}
```

### Prefetch

`Prefetch` is component version of `usePrefetch`.

``` typescript
import { Prefetch } from 'use-prefetch';

function Component() {
  return (
    <Prefetch
      prefetch={() => fetchResource()}
      cooldown={300000}
      delay={200}
      render={callbackRef =>
        <a href='...' ref={callbackRef}>resource</a>
      }
    />
  );
}
```

## License

MIT
