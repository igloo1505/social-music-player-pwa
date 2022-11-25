# Custom Hook Implementation

## useLocalStorage(key, value)
```jsx
const App = () => {
  // Similar to useState but first arg is key to the value in local storage.
  const [name, setName] = useLocalStorage<string>("name", "Bob");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
```

## useDarkMode()
```jsx
function App() {
    // Defaults to system settings
	const [darkMode, setDarkMode] = useDarkMode();
	return (
		<div>
			<div className="navbar">
				<Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
			</div>
			<Content />
		</div>
	);
}
```

## useMedia()
```jsx
const App = () => {
  const columnCount = useMedia<number>(
    // Media queries
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    // Column counts (relates to above media queries by array index)
    [5, 4, 3],
    // Default column count
    2
  );
  // Create array of column heights (start at 0)
  let columnHeights = new Array(columnCount).fill(0);
  // Create array of arrays that will hold each column's items
  let columns = new Array(columnCount).fill().map(() => []) as Array<
    DataProps[]
  >;
  (data as DataProps[]).forEach((item) => {
    // Get index of shortest column
    const shortColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    // Add item
    columns[shortColumnIndex].push(item);
    // Update height
    columnHeights[shortColumnIndex] += item.height;
  });
  // Render columns and items
  return (
    <div className="App">
      <div className="columns is-mobile">
        {columns.map((column) => (
          <div className="column">
            {column.map((item) => (
              <div
                className="image-container"
                style={{
                  // Size image container to aspect ratio of image
                  paddingTop: (item.height / item.width) * 100 + "%",
                }}
              >
                <img src={item.image} alt="" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## useLockBodyScroll
- Locks body scroll until component unmounts
```jsx
function Modal({ title, content, onClose } : ModalProps) {
  // Call hook to lock body scroll
  useLockBodyScroll();
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}
```