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



