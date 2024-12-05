# `useSearchParams` in React Router

The `useSearchParams` hook is a part of `react-router-dom` (version 6 and above) that allows you to work with the query string in the URL.

---

## Overview
- A React Router hook used to **read** and **manipulate** query parameters in the URL.
- Works with the `URLSearchParams` API for convenient handling of query strings.
- Useful for filtering, sorting, and other operations involving query strings.

---

## Returns
1. **`searchParams`**:
   - An instance of `URLSearchParams`.
   - Allows retrieving query parameters using `.get(key)` or `.getAll(key)`.

2. **`setSearchParams`**:
   - A function to update the query string.
   - Takes an object or `URLSearchParams` as input.

---

## Importing `useSearchParams`
```javascript
import { useSearchParams } from 'react-router-dom';

const [searchParams, setSearchParams] = useSearchParams(); 
```


## Reading Query Parameters
```javascript
const [searchParams] = useSearchParams();

const name = searchParams.get('name'); // Retrieve 'name' query param
const ids = searchParams.getAll('id'); // Retrieve all 'id' query params

console.log(name); // Output: Value of 'name'
console.log(ids); // Output: Array of 'id' values


URL: https://example.com?discount=all
searchParams.get('discount'); // Output: 'all'
```


## Setting Query Parameters
```javascript
const [searchParams, setSearchParams] = useSearchParams();

const updateQuery = () => {
  setSearchParams({ name: 'Charu', id: 123 }); // Updates query string to '?name=Charu&id=123'
};

const [searchParams, setSearchParams] = useSearchParams();
setSearchParams({ discount: 'all' });
Result
URL: https://example.com?discount=all

```

## Handling Multiple Parameters
**Pass an object with multiple keys to setSearchParams():**

```javascript
setSearchParams({ discount: 'all', sort: 'price' });
Result
URL: https://example.com?discount=all&sort=price
```

## Removing Query Parameters
To remove a parameter:
```javascript
setSearchParams({ discount: '' });
```

## Or use delete on the URLSearchParams instance:

```javascript
const params = new URLSearchParams(searchParams);
params.delete('discount');
setSearchParams(params);
```

## Appending to Query Parameters
```javascript

const [searchParams, setSearchParams] = useSearchParams();

const addToQuery = () => {
  const newParams = new URLSearchParams(searchParams);
  newParams.append('newKey', 'newValue');
  setSearchParams(newParams); // Updates query string to include 'newKey=newValue'
};
```

## Using Search Params in Navigation
Update query parameters when navigating to a new route:
```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const goToPage = () => {
  navigate('/page?name=Charu&id=123');
};
```

## Notes
* Updating query parameters with setSearchParams causes the page to re-render.Changes made with setSearchParams automatically update the URL and re-render the component.
* searchParams behaves like a plain object, but it's an instance of URLSearchParams.



## useRef

useRef?
A way to "save" something in your component that won’t change when the component updates.

Often used to work with HTML elements (like buttons, inputs) or to store values that don’t need to cause the page to update when they change.


### How to Use useRef
1) To Work with a DOM Element (Like a Button or Input):

```javascript
import { useRef, useEffect } from 'react';

function Example() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input when the page loads
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

- What happens here:
- useRef gives you a way to grab the input box (inputRef.current).
- You can then do something with it, like focusing it.


2) To Store a Value (Like a Counter):

``` javascript
import { useRef } from 'react';

function Counter() {
  const counterRef = useRef(0);

  function increment() {
    counterRef.current += 1;
    console.log(counterRef.current); // This updates, but the page doesn’t re-render
  }

  return <button onClick={increment}>Increment</button>;
}
```

- What happens here:
- counterRef starts at 0.
- Each time you click the button, the number updates, but the page doesn’t reload.



## Key Things to Remember
- useRef is like a sticky note in your component—it keeps its value even if the component reloads.
- It doesn’t make the page update when the value changes.
- It’s perfect for working with HTML elements or saving things like timers or counters.

Does Not Trigger Re-Renders:

Updating ref.current does not cause the component to re-render.
For re-rendering, use useState instead.
Value Persists Across Renders:

useRef retains its value even after a re-render.
Can Be null Initially:

When used with DOM elements, ref.current is null until the element is rendered.
Used in Conjunction with JSX:

Attach the ref to a DOM element using the ref attribute.
useRef vs. createRef:

useRef is persistent across renders.
createRef resets the reference on every render, typically used in class components.


useRef is a React hook that creates a mutable reference object that persists across renders.
It is often used to:
Access and manipulate DOM elements.
Store mutable values that do not trigger re-renders when updated.
Maintain references to variables without causing a component to re-render.


Using useRef to Handle Menu Interactions
Closing a Menu When You Click Outside
We want to track when a user clicks outside of a menu and close the menu if that happens. 


### Steps to Implement:
1) Create the Reference with useRef:

- useRef helps you keep track of the DOM element (the menu) so you can refer to it later.
- We use menuRef to point to the menu element.
```javascript
const menuRef = useRef();

```

2) Attach the Ref to the Menu Element:
- Attach menuRef to the menu element (e.g., a <ul> or <div>).
- This allows us to directly interact with the menu.

``` javascript
<ul ref={menuRef}>...</ul>
```

3) Use useEffect to Listen for Click Events:

- We use useEffect to set up an event listener that listens for click events on the document (the whole page).
- When a click happens, we check if the click was inside or outside the menu.

```javascript
useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      // Close the menu if click is outside
      closeMenu();
    }
  };

  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);
```

4) Check for Clicks Outside the Menu:
- Inside the event listener (handleClickOutside), we use menuRef.current.contains(e.target) to check if the click was inside the menu.
- If the click was outside, we trigger the logic to close the menu.
- e.target is the element that was clicked.
- menuRef.current.contains(e.target) checks if the clicked element is inside the menu. If it’s not, the menu is closed.

5) Close the Menu:
- This part depends on how you're managing the menu's state. If you’re using a state variable (e.g., open), set it to false to close the menu.

```javascript
import { useRef, useEffect, useState } from 'react';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button onClick={openMenu}>Open Menu</button>
      {isOpen && (
        <ul ref={menuRef}>
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
        </ul>
      )}
    </div>
  );
}
```

### Summary of Key Points:
- useRef: Tracks the DOM element (the menu) for later use.
- useEffect: Sets up a listener for clicks anywhere on the page.
- menuRef.current.contains(e.target): Checks if the clicked element is inside the menu.
- Close the Menu: If the click is outside, close the menu.
- menuRef.current can be null in certain scenarios, and this is due to how useRef and React handle refs in a component lifecycle. Here are the common reasons why menuRef.current might be null
1. Initial Render
During the first render, React sets the current property of the ref to null because the DOM elements haven't been created yet.
The menuRef.current is only updated with the actual DOM node after the element it is attached to is rendered.
2. Conditional Rendering
If the menu is not rendered (openId !== id), the ref is not attached to any DOM element.
Example in your code:
javascript
Copy code
if (openId !== id) return null;
When openId !== id, the menu isn’t rendered, so menuRef.current remains null.
3. Component Unmount
When the menu component unmounts, React automatically clears the menuRef.current to null because the DOM element it pointed to no longer exists.
4. Dynamic Updates
If a parent component re-renders and decides to remove the menu component based on updated props or state, the menuRef.current will become null because the menu is no longer in the DOM.
