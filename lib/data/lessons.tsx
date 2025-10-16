export interface Lesson {
  id: string
  language: string
  topic: string
  title: string
  difficulty: "beginner" | "intermediate" | "advanced"
  code: string
  description: string
}

export const lessons: Lesson[] = [
  // JavaScript Lessons
  {
    id: "js-variables",
    language: "js",
    topic: "variables",
    title: "Declaring Variables",
    difficulty: "beginner",
    description: "Learn how to declare variables using const, let, and var",
    code: `// Lesson: Variables in JavaScript
// Topic: const, let, var

const name = "John";
let age = 25;
var city = "New York";

const PI = 3.14159;
let counter = 0;
counter++;

const isActive = true;
let score = 100;`,
  },
  {
    id: "js-loops",
    language: "js",
    topic: "loops",
    title: "Loop Structures",
    difficulty: "beginner",
    description: "Practice for, while, and for...of loops",
    code: `// Lesson: Loops in JavaScript
// Topic: for, while, for...of

for (let i = 0; i < 5; i++) {
  console.log(i);
}

let count = 0;
while (count < 3) {
  count++;
}

const arr = [1, 2, 3];
for (const num of arr) {
  console.log(num);
}`,
  },
  {
    id: "js-functions",
    language: "js",
    topic: "functions",
    title: "Function Declarations",
    difficulty: "beginner",
    description: "Master function syntax and arrow functions",
    code: `// Lesson: Functions in JavaScript
// Topic: function declarations and expressions

function greet(name) {
  return "Hello, " + name;
}

const add = (a, b) => {
  return a + b;
};

const multiply = (x, y) => x * y;

function calculate(a, b, operation) {
  return operation(a, b);
}`,
  },
  {
    id: "js-arrays",
    language: "js",
    topic: "arrays",
    title: "Array Operations",
    difficulty: "intermediate",
    description: "Work with array methods and operations",
    code: `// Lesson: Arrays in JavaScript
// Topic: array methods

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);

const fruits = ["apple", "banana"];
fruits.push("orange");
fruits.pop();

const sum = numbers.reduce((acc, n) => acc + n, 0);`,
  },
  {
    id: "js-objects",
    language: "js",
    topic: "objects",
    title: "Object Basics",
    difficulty: "beginner",
    description: "Learn object creation and property access",
    code: `// Lesson: Objects in JavaScript
// Topic: object literals and properties

const person = {
  name: "Alice",
  age: 30,
  city: "Boston"
};

const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2022,
  start: function() {
    console.log("Engine started");
  }
};`,
  },
  {
    id: "js-conditionals",
    language: "js",
    topic: "conditionals",
    title: "Conditional Statements",
    difficulty: "beginner",
    description: "Practice if, else if, and else statements",
    code: `// Lesson: Conditional Statements
// Topic: if, else if, else

const temperature = 30;
if (temperature > 25) {
  console.log("It's hot outside");
} else if (temperature > 15) {
  console.log("It's pleasant");
} else {
  console.log("It's cold");
}`,
  },
  {
    id: "js-promises",
    language: "js",
    topic: "promises",
    title: "Async Programming",
    difficulty: "advanced",
    description: "Work with Promises and async/await",
    code: `// Lesson: Promises in JavaScript
// Topic: async/await

async function fetchData() {
  const response = await fetch("/api/data");
  const data = await response.json();
  return data;
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done"), 1000);
});`,
  },
  {
    id: "js-classes",
    language: "js",
    topic: "classes",
    title: "ES6 Classes",
    difficulty: "intermediate",
    description: "Learn class syntax and inheritance",
    code: `// Lesson: Classes in JavaScript
// Topic: class syntax

class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + " makes a sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + " barks");
  }
}`,
  },

  // Python Lessons
  {
    id: "py-variables",
    language: "py",
    topic: "variables",
    title: "Python Variables",
    difficulty: "beginner",
    description: "Learn Python variable declaration and types",
    code: `# Lesson: Variables in Python
# Topic: variable assignment

name = "Alice"
age = 25
height = 5.6
is_student = True

PI = 3.14159
counter = 0
counter += 1

message = "Hello, World!"
number = 42`,
  },
  {
    id: "py-lists",
    language: "py",
    topic: "lists",
    title: "Python Lists",
    difficulty: "beginner",
    description: "Work with Python lists and list operations",
    code: `# Lesson: Lists in Python
# Topic: list operations

numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "orange"]

numbers.append(6)
fruits.pop()

first = numbers[0]
last = numbers[-1]

doubled = [n * 2 for n in numbers]`,
  },
  {
    id: "py-loops",
    language: "py",
    topic: "loops",
    title: "Python Loops",
    difficulty: "beginner",
    description: "Practice for and while loops in Python",
    code: `# Lesson: Loops in Python
# Topic: for and while loops

for i in range(5):
    print(i)

count = 0
while count < 3:
    count += 1

fruits = ["apple", "banana"]
for fruit in fruits:
    print(fruit)`,
  },
  {
    id: "py-functions",
    language: "py",
    topic: "functions",
    title: "Python Functions",
    difficulty: "beginner",
    description: "Define and use functions in Python",
    code: `# Lesson: Functions in Python
# Topic: function definitions

def greet(name):
    return f"Hello, {name}"

def add(a, b):
    return a + b

def calculate(x, y, operation):
    return operation(x, y)

result = greet("Alice")
sum_val = add(5, 3)`,
  },
  {
    id: "py-dictionaries",
    language: "py",
    topic: "dictionaries",
    title: "Python Dictionaries",
    difficulty: "intermediate",
    description: "Work with Python dictionaries",
    code: `# Lesson: Dictionaries in Python
# Topic: dict operations

person = {
    "name": "Bob",
    "age": 30,
    "city": "Boston"
}

car = {
    "brand": "Toyota",
    "model": "Camry",
    "year": 2022
}

name = person["name"]
person["age"] = 31`,
  },
  {
    id: "py-conditionals",
    language: "py",
    topic: "conditionals",
    title: "Python Conditionals",
    difficulty: "beginner",
    description: "Use if, elif, and else statements",
    code: `# Lesson: Conditionals in Python
# Topic: if, elif, else

temperature = 30
if temperature > 25:
    print("It's hot")
elif temperature > 15:
    print("It's pleasant")
else:
    print("It's cold")

age = 18
is_adult = age >= 18`,
  },
  {
    id: "py-classes",
    language: "py",
    topic: "classes",
    title: "Python Classes",
    difficulty: "intermediate",
    description: "Learn Python class syntax",
    code: `# Lesson: Classes in Python
# Topic: class definitions

class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        print(f"{self.name} makes a sound")

class Dog(Animal):
    def speak(self):
        print(f"{self.name} barks")`,
  },
  {
    id: "py-modules",
    language: "py",
    topic: "modules",
    title: "Python Modules",
    difficulty: "intermediate",
    description: "Import and use Python modules",
    code: `# Lesson: Modules in Python
# Topic: import statements

import math
from datetime import datetime

result = math.sqrt(16)
pi = math.pi

now = datetime.now()
formatted = now.strftime("%Y-%m-%d")`,
  },

  // C++ Lessons
  {
    id: "cpp-variables",
    language: "cpp",
    topic: "variables",
    title: "C++ Variables",
    difficulty: "beginner",
    description: "Learn C++ variable types and declarations",
    code: `// Lesson: Variables in C++
// Topic: data types

#include <iostream>
using namespace std;

int main() {
    int age = 25;
    double height = 5.9;
    char grade = 'A';
    bool isActive = true;
    
    string name = "John";
    const double PI = 3.14159;
    
    return 0;
}`,
  },
  {
    id: "cpp-loops",
    language: "cpp",
    topic: "loops",
    title: "C++ Loops",
    difficulty: "beginner",
    description: "Practice C++ loop structures",
    code: `// Lesson: Loops in C++
// Topic: for, while, do-while

#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5; i++) {
        cout << i << endl;
    }
    
    int count = 0;
    while (count < 3) {
        count++;
    }
    
    return 0;
}`,
  },
  {
    id: "cpp-functions",
    language: "cpp",
    topic: "functions",
    title: "C++ Functions",
    difficulty: "beginner",
    description: "Define and use C++ functions",
    code: `// Lesson: Functions in C++
// Topic: function declarations

#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

double multiply(double x, double y) {
    return x * y;
}

void greet(string name) {
    cout << "Hello, " << name << endl;
}`,
  },
  {
    id: "cpp-arrays",
    language: "cpp",
    topic: "arrays",
    title: "C++ Arrays",
    difficulty: "beginner",
    description: "Work with C++ arrays",
    code: `// Lesson: Arrays in C++
// Topic: array declarations

#include <iostream>
using namespace std;

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};
    double scores[3] = {95.5, 87.3, 92.1};
    
    int first = numbers[0];
    numbers[2] = 10;
    
    return 0;
}`,
  },
  {
    id: "cpp-pointers",
    language: "cpp",
    topic: "pointers",
    title: "C++ Pointers",
    difficulty: "intermediate",
    description: "Learn pointer basics in C++",
    code: `// Lesson: Pointers in C++
// Topic: pointer syntax

#include <iostream>
using namespace std;

int main() {
    int num = 42;
    int* ptr = &num;
    
    cout << *ptr << endl;
    *ptr = 100;
    
    int arr[3] = {1, 2, 3};
    int* arrPtr = arr;
    
    return 0;
}`,
  },
  {
    id: "cpp-classes",
    language: "cpp",
    topic: "classes",
    title: "C++ Classes",
    difficulty: "intermediate",
    description: "Learn C++ class syntax",
    code: `// Lesson: Classes in C++
// Topic: class definitions

#include <iostream>
using namespace std;

class Rectangle {
private:
    int width, height;
public:
    Rectangle(int w, int h) {
        width = w;
        height = h;
    }
    
    int area() {
        return width * height;
    }
};`,
  },
  {
    id: "cpp-stl",
    language: "cpp",
    topic: "stl",
    title: "C++ STL",
    difficulty: "advanced",
    description: "Work with Standard Template Library",
    code: `// Lesson: STL in C++
// Topic: vector, map

#include <iostream>
#include <vector>
#include <map>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3};
    nums.push_back(4);
    
    map<string, int> ages;
    ages["Alice"] = 25;
    
    return 0;
}`,
  },
  {
    id: "cpp-templates",
    language: "cpp",
    topic: "templates",
    title: "C++ Templates",
    difficulty: "advanced",
    description: "Learn template programming",
    code: `// Lesson: Templates in C++
// Topic: function templates

#include <iostream>
using namespace std;

template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    int maxInt = maximum(5, 10);
    double maxDouble = maximum(3.5, 2.1);
    
    return 0;
}`,
  },

  // HTML Lessons
  {
    id: "html-tags",
    language: "html",
    topic: "tags",
    title: "HTML Tags",
    difficulty: "beginner",
    description: "Learn basic HTML tag structure",
    code: ` Lesson: HTML Tags 
 Topic: basic structure 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is a paragraph.</p>
</body>
</html>`,
  },
  {
    id: "html-attributes",
    language: "html",
    topic: "attributes",
    title: "HTML Attributes",
    difficulty: "beginner",
    description: "Work with HTML attributes",
    code: ` Lesson: HTML Attributes 
 Topic: element attributes 

<div id="container" class="wrapper">
    <a href="https://example.com" target="_blank">Link</a>
    <img src="image.jpg" alt="Description">
    <input type="text" placeholder="Enter name">
</div>`,
  },
  {
    id: "html-forms",
    language: "html",
    topic: "forms",
    title: "HTML Forms",
    difficulty: "intermediate",
    description: "Create HTML forms",
    code: ` Lesson: HTML Forms 
 Topic: form elements 

<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    
    <button type="submit">Submit</button>
</form>`,
  },
  {
    id: "html-tables",
    language: "html",
    topic: "tables",
    title: "HTML Tables",
    difficulty: "beginner",
    description: "Build HTML tables",
    code: ` Lesson: HTML Tables 
 Topic: table structure 

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Alice</td>
            <td>25</td>
        </tr>
    </tbody>
</table>`,
  },
  {
    id: "html-semantic",
    language: "html",
    topic: "semantic",
    title: "Semantic HTML",
    difficulty: "intermediate",
    description: "Use semantic HTML elements",
    code: ` Lesson: Semantic HTML 
 Topic: semantic tags 

<header>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h2>Article Title</h2>
        <p>Content here.</p>
    </article>
</main>

<footer>
    <p>&copy; 2025</p>
</footer>`,
  },
  {
    id: "html-media",
    language: "html",
    topic: "media",
    title: "HTML Media",
    difficulty: "beginner",
    description: "Embed media in HTML",
    code: ` Lesson: HTML Media 
 Topic: audio and video 

<img src="photo.jpg" alt="Photo" width="300">

<video controls width="400">
    <source src="video.mp4" type="video/mp4">
</video>

<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
</audio>`,
  },
  {
    id: "html-links",
    language: "html",
    topic: "links",
    title: "HTML Links",
    difficulty: "beginner",
    description: "Create hyperlinks",
    code: ` Lesson: HTML Links 
 Topic: anchor tags 

<a href="https://example.com">External Link</a>
<a href="/about">Internal Link</a>
<a href="#section">Jump to Section</a>
<a href="mailto:email@example.com">Email Link</a>
<a href="tel:+1234567890">Phone Link</a>`,
  },
  {
    id: "html-lists",
    language: "html",
    topic: "lists",
    title: "HTML Lists",
    difficulty: "beginner",
    description: "Create ordered and unordered lists",
    code: ` Lesson: HTML Lists 
 Topic: ul, ol, li 

<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>

<ol>
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
</ol>`,
  },

  // CSS Lessons
  {
    id: "css-selectors",
    language: "css",
    topic: "selectors",
    title: "CSS Selectors",
    difficulty: "beginner",
    description: "Learn CSS selector syntax",
    code: `/* Lesson: CSS Selectors */
/* Topic: element, class, id */

body {
    font-family: Arial, sans-serif;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

#header {
    background-color: #333;
    color: white;
}`,
  },
  {
    id: "css-box-model",
    language: "css",
    topic: "box model",
    title: "CSS Box Model",
    difficulty: "beginner",
    description: "Understand the CSS box model",
    code: `/* Lesson: CSS Box Model */
/* Topic: margin, padding, border */

.box {
    width: 300px;
    height: 200px;
    padding: 20px;
    margin: 10px;
    border: 2px solid #333;
    box-sizing: border-box;
}`,
  },
  {
    id: "css-flexbox",
    language: "css",
    topic: "flexbox",
    title: "CSS Flexbox",
    difficulty: "intermediate",
    description: "Master flexbox layout",
    code: `/* Lesson: CSS Flexbox */
/* Topic: flex container */

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.item {
    flex: 1;
    min-width: 200px;
}`,
  },
  {
    id: "css-grid",
    language: "css",
    topic: "grid",
    title: "CSS Grid",
    difficulty: "intermediate",
    description: "Learn CSS Grid layout",
    code: `/* Lesson: CSS Grid */
/* Topic: grid layout */

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.grid-item {
    padding: 20px;
    background: #f0f0f0;
}`,
  },
  {
    id: "css-animations",
    language: "css",
    topic: "animations",
    title: "CSS Animations",
    difficulty: "advanced",
    description: "Create CSS animations",
    code: `/* Lesson: CSS Animations */
/* Topic: keyframes */

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.fade {
    animation: fadeIn 1s ease-in;
}`,
  },
  {
    id: "css-responsive",
    language: "css",
    topic: "responsive",
    title: "Responsive CSS",
    difficulty: "intermediate",
    description: "Build responsive layouts",
    code: `/* Lesson: Responsive CSS */
/* Topic: media queries */

.container {
    width: 100%;
    padding: 20px;
}

@media (min-width: 768px) {
    .container {
        max-width: 720px;
        margin: 0 auto;
    }
}`,
  },
  {
    id: "css-colors",
    language: "css",
    topic: "colors",
    title: "CSS Colors",
    difficulty: "beginner",
    description: "Work with CSS colors",
    code: `/* Lesson: CSS Colors */
/* Topic: color values */

.primary {
    color: #3498db;
    background-color: rgb(52, 152, 219);
}

.secondary {
    color: rgba(231, 76, 60, 0.8);
    background: hsl(348, 80%, 57%);
}`,
  },
  {
    id: "css-typography",
    language: "css",
    topic: "typography",
    title: "CSS Typography",
    difficulty: "beginner",
    description: "Style text with CSS",
    code: `/* Lesson: CSS Typography */
/* Topic: font properties */

body {
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    line-height: 1.6;
}

h1 {
    font-size: 2.5rem;
    font-weight: bold;
    letter-spacing: -0.5px;
}`,
  },
]

export function getLessonsByLanguage(language: string): Lesson[] {
  return lessons.filter((lesson) => lesson.language === language)
}

export function getLessonByTopic(language: string, topic: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.language === language && lesson.topic === topic)
}

export function getAllLanguages(): string[] {
  return Array.from(new Set(lessons.map((lesson) => lesson.language)))
}
