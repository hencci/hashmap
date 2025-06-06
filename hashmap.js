class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    // Hash function with mod on each step to avoid integer overflow
    hash(key) {
        let hashCode = 0;
        const prime = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    // Internal helper to resize the buckets array when load exceeds factor
    resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;

        for (const bucket of oldBuckets) {
            for (const [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }

    // Insert or update a key-value pair
    set(key, value) {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];
        const existing = bucket.find(entry => entry[0] === key);

        if (existing) {
            existing[1] = value; // Update
        }
        else {
            bucket.push([key, value]); // Insert
            this.size++;
            if (this.size / this.capacity > this.loadFactor) {
                this.resize();
            }
        }
    }

    // Retrieve value by key
    get(key) {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];
        const entry = bucket.find(entry => entry[0] === key);
        return entry ? entry[1] : null;
    }

    // Check if key exists
    has(key) {
        return this.get(key) !== null;
    }

    // Remove entry by key
    remove(key) {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];
        const entryIndex = bucket.findIndex(entry => entry[0] === key);

        if (entryIndex !== -1) {
            bucket.splice(entryIndex, 1);
            this.size--;
            return true;
        }

        return false;
    }

    // Return number of stored keys
    length() {
        return this.size;
    }

    // Clear all entries
    clear() {
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    // Get all keys
    keys() {
    const allKeys = [];
    for (const bucket of this.buckets) {
        for (const [key] of bucket) {
        allKeys.push(key);
        }
    }
    return allKeys;
    }

    // Get all values
    values() {
        const allValues = [];
        for (const bucket of this.buckets) {
            for (const [, value] of bucket) {
                allValues.push(value);
            }
        }
        return allValues;
    }

    // Get all entries as [key, value] pairs
    entries() {
        const allEntries = [];
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                allEntries.push([...entry]);
            }
        }
        return allEntries;
    }
}

// Example usage & testing
const test = new HashMap();

// Initial inserts
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// Overwrite some keys
test.set('apple', 'dark red');
test.set('banana', 'bright yellow');

// Trigger resize
test.set('moon', 'silver');

// Check values
console.log('Get apple:', test.get('apple')); // "dark red"
console.log('Has grape:', test.has('grape')); // true
console.log('Remove dog:', test.remove('dog')); // true
console.log('Length:', test.length()); // Should reflect one less
console.log('Keys:', test.keys());
console.log('Values:', test.values());
console.log('Entries:', test.entries());

// Clear
test.clear();
console.log('Length after clear:', test.length()); // 0  