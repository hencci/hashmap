# HashMap

This project contains a custom implementation of a `HashMap` data structure in JavaScript. It mimics core functionality found in native hash maps, including key-value storage, collision handling, dynamic resizing, and standard operations such as insertion, deletion, lookup, and enumeration.

---

## 📦 Features

- Custom `HashMap` class built from scratch
- String key support with value storage
- Efficient hashing with collision resolution via chaining
- Dynamic resizing when load factor is exceeded
- Bounds checking to prevent invalid access
- Includes utility methods: `set`, `get`, `has`, `remove`, `clear`, `length`, `keys`, `values`, `entries`
- Bonus `HashSet` class using `HashMap` internally (keys only, no values)

---

## 🧠 How It Works

### Hash Function

A string key is hashed using a prime-multiplier technique:

```js
let hashCode = 0;
const prime = 31;
for (let i = 0; i < key.length; i++) {
  hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
}
```
This method avoids integer overflow by applying modulo on each step, ensuring results stay within bounds.

### Collision Handling

Collisions are handled using chaining — each bucket holds an array of key-value pairs.

### Resizing

When the load factor threshold is reached (default: 0.75), the hash map automatically doubles its capacity and rehashes all existing keys.

---

## 🚀 Usage

```js
const map = new HashMap();

// Add entries
map.set('apple', 'red');
map.set('banana', 'yellow');

// Overwrite
map.set('apple', 'green');

// Retrieve
console.log(map.get('apple')); // "green"

// Check key existence
console.log(map.has('banana')); // true

// Remove a key
map.remove('apple');

// Get metadata
console.log(map.length()); // Number of keys
console.log(map.keys());   // All keys
console.log(map.values()); // All values
console.log(map.entries()); // [ [key, value], ... ]

// Clear all data
map.clear();
```

---

## 🧪 Testing

A pre-written script populates and validates the hash map with the following operations:

- Initial 12 inserts
- Value overwrites
- Triggering resize with a 13th insert
- Validations for get, has, remove, keys, values, entries, and clear
You can run it in any modern JavaScript environment (browser console or Node.js).

---

## 💡 Contributions

Feel free to fork this repository and improve the project! 🚀
PRs are welcome! 😊

---

## 📄 License
This project is open-source and free to use under the MIT License.

---

## Contact

Created by [Henry Moses](https://github.com/hencci)
Feel free to reach out if you have any questions