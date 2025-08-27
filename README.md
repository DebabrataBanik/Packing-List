# React's Re-render and its optimzation

### ✅ React re-renders component when any state in it changes

Simple. That’s the default behavior.

### ✅ If parent component re-renders, all its child components will also re-render — by default

Even if the prop you passed to child didn’t change.

### ✅ To stop child from re-rendering unnecessarily, you wrap it with:

`export default React.memo(Child)`

Now React will compare props — and only re-render if a prop changed.

### ✅ React.memo handles primitive types (string, number, boolean) just fine

Because React can compare 'hello' === 'hello' and say: “Nothing changed.”

### ❌ But React.memo fails on objects/arrays/functions

```javascript
{} !== {}
[] !== []
() => {} !== () => {}
```

**Even if they look the same, they are new references, so React thinks they changed.**

The same object/array/function - their references don't match because new references are created every re-render.

### ✅ So to help React.memo do its job, you use:

| Type of prop   | Tool in parent  |
| -------------- | --------------- |
| Object / Array | `useMemo()`     |
| Function       | `useCallback()` |

These hooks preserve the reference across re-renders.

> “React.memo handles it for primitive cases but when it comes to object/array/function React.memo on its own can't handle it. For that reason, in the parent, now I have to use hooks like useMemo and useCallback to even further optimize.”

## 🧪 Example to Burn It In

Parent:

```javascript
function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("hello");

  return (
    <>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <Child message={text} />
    </>
  );
}
```

Child:

```javascript
const Child = React.memo(({ message }) => {
  console.log("child rendered");
  return <div>{message}</div>;
});
```

- When you click +1, parent re-renders.
- But message={text} hasn’t changed ("hello" is same).
- React.memo says: “Cool, prop didn’t change, I’ll skip child re-render.”
- ✅ Child does NOT re-render.

But now say if i change this:

`<Child message={{ text }} />`

Now:

- You're passing a new object every time: { text: "hello" }
- Even though content is same → React.memo sees new reference
- ❌ Child re-renders every time

✅ Fix with:

Object/Arrays, useMemo will deal with it

```javascript
const message = useMemo(() => ({ text }), [text]);
<Child message={message} />;
```

If it was for function then `useCallback()` were to be used.

## What about the dependency array

The dependency array should include all values from the outer scope that your callback uses directly.

```javascript
const handleChange = useCallback((e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev, [name]: value
  }))
}, []);
```
- setFormData comes from useState. React guarantees it's stable within the same component instance, so you don't need to add it to dependencies.

- e is passed in → it’s local, no need in deps.

- No other variables used.

✅ So [] is correct here.
That means handleChange will never change identity, which plays nicely with your React.memo(InputField).

### Where deps matter

```javascript
const handleSubmit = useCallback((e) => {
  e.preventDefault();
  if (isValid) navigate('/profile');
}, [isValid, navigate]);
```

Here:

- isValid → comes from component state, so it changes as the form changes.

- navigate → React Router guarantees it's stable, but ESLint rules suggest including it for consistency.

So this one needs deps.

## Dependency Array Rules

✅ **Include**: Variables, functions, or objects from component scope that are used inside the callback
❌ **Don't include**: 
- Parameters passed to the callback (like `e` in event handlers)
- useState setters (they're guaranteed stable)
- useRef.current values (they're mutable references)

## More to Know

> If you don’t use `React.memo` on the _child_, then using `useMemo` and `useCallback` in the _parent_ won’t help prevent child re-renders.

### Why?

Because the child is re-rendering anyway — you're not giving React any instruction to skip it. So optimizing the props does nothing unless React.memo is there to check the props.

### 🔁 In Plain English:

- `useMemo/useCallback` only make sense if you're also using `React.memo` in the child.

- They prepare the props to stay stable, but only `React.memo` decides whether to re-render the child or not.

- Without `React.memo`, React will blindly re-render the child no matter what.

## When to Actually Use Them:

### useCallback:

- When passing functions to child components
- When functions are used in other hook dependencies

### useMemo:

- When you have expensive calculations
- When creating objects/arrays that are passed to children

Most of the time: You don't need them! 🎯

## Performance Reminder

### Don’t go overboard.

⚠️ **Important**: useCallback and useMemo have their own overhead - they store previous values and run comparisons. Only use them when the benefit outweighs this cost.

### Only use React.memo + useCallback/useMemo:

- For frequently re-rendering parents

- When child components are heavy (lots of DOM, logic)

- When props are stable most of the time

### For tiny components — don’t memoize everything, it can backfire (extra comparison cost).

# Continued Development

- Add responsiveness.
- Add categories and apply filter.
- Add a light mode.
- Work on different UI layouts.
