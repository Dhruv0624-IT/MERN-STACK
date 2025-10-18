const learningData = [
  {
    id: 1,
    title: "Learn HTML5",
    slug: "html5",
    para: "HTML5 is the standard markup language for creating web pages with modern features.",
    details: "HTML stands for HyperText Markup Language and is the standard language for creating web pages. It defines the structure and content of web pages by using tags to mark up text, images, links, and multimedia, instructing web browsers on how to display them. HTML serves as the fundamental building block of the web, providing the core structure that is then enhanced for appearance and interactivity by CSS and JavaScript respectively.  ",
  },
  {
    id: 2,
    title: "Learn CSS3",
    slug: "css3",
    para: "CSS3 adds styling power with animations, flexbox, and grid layout.",
    details: "CCascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.",
  },
  {
    id: 3,
    title: "Learn JavaScript",
    slug: "javascript",
    para: "JavaScript brings interactivity to the web with dynamic programming features.",
    details: "JavaScript is a high-level, interpreted programming language primarily used to create interactive and dynamic content on websites. It is one of the three core technologies of the World Wide Web, working alongside HTML (which defines the structure of web content) and CSS (which styles the appearance of web content).",
  },
  {
    id: 4,
    title: "Learn Bootstrap",
    slug: "bootstrap",
    para: "Bootstrap is a CSS framework for responsive web design.",
    details: "Bootstrap is a free, open-source, and popular front-end framework for building responsive, mobile-first websites and web applications using HTML, CSS, and JavaScript. It provides pre-built CSS components, templates, and JavaScript plugins that allow developers to quickly create visually appealing and consistent user interfaces. Key features include a responsive grid system, pre-designed UI components like buttons and navigation bars, and utility classes for styling and layout. ",
  },
  {
    id: 6,
    title: "Learn Node.js",
    slug: "nodejs",
    para: "Node.js enables server-side programming using JavaScript.",
    details: "Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code outside of a web browser. Built on Chrome's V8 JavaScript engine, it enables server-side development with JavaScript, unifying front-end and back-end development under a single language.",
  },
  {
    id: 7,
    title: "Learn Express.js",
    slug: "expressjs",
    para: "Express.js is a lightweight Node.js framework for web apps.",
    details: "Express.js, often referred to simply as Express, is a minimal and flexible Node.js web application framework designed for building web applications and APIs. It is considered the de facto standard server framework for Node.js. Express provides a robust set of features for web and mobile applications, including routing, middleware support, template engines, and more. It simplifies the process of handling HTTP requests and responses, making it easier to build scalable and maintainable server-side applications.",
  },
  {
    id: 8,
    title: "Learn React.js",
    slug: "reactjs",
    para: "React is a library for building reusable UI components.",
    details: "Developed by Facebook: React was developed by Facebook engineers and released to the public in 2013. The name reflects its foundational concept of building UIs that can react to data changes efficiently, aligning with the needs of large-scale, dynamic applications like those managed by Facebook. Component-Based Architecture: React's core philosophy revolves around breaking down the user interface into reusable components. Each component encapsulates its own structure, style, and behavior, promoting modularity and maintainability in code. This approach allows developers to build complex UIs by composing smaller, manageable pieces.",
  },
  {
    id: 9,
    title: "Learn Redux",
    slug: "redux",
    para: "Redux manages state in complex JavaScript applications.",
    details: "Redux is a JavaScript library for predictable and manageable global state management in applications, especially with large and complex codebases. It centralizes all application data into a single \"store,\" which makes the state behavior consistent and the application easier to test and debug using tools like a time-travel debugger. While it can add some complexity to smaller apps, Redux is ideal for handling complex state in larger applications by providing a clear structure of actions, reducers, and the store.  ",
  },
  {
    id: 10,
    title: "Learn Firebase",
    slug: "firebase",
    para: "Firebase offers backend services for authentication and storage.",
    details: "Firebase is a Google-owned platform that provides tools and services to help developers build, run, and scale modern web and mobile applications. It offers a backend-as-a-service (BaaS), meaning developers don't need to build and manage their own servers for tasks like databases, hosting, and authentication. Key features include real-time databases, cloud hosting, authentication, cloud messaging, and AI-powered tools to optimize app quality and user experience.  ",
  },
  {
    id: 13,
    title: "Learn REST API",
    slug: "rest-api",
    para: "REST APIs connect frontend and backend using HTTP methods.",
    details: "A REST API, or RESTful API, is an application programming interface that adheres to the architectural style of Representational State Transfer (REST). This style, defined by Roy Fielding, is widely used for designing networked applications, particularly web services.REST uses GET, POST, PUT, and DELETE methods. It provides stateless communication between client and server, making it the most widely used API architecture for web applications.",
  },
  {
    id: 15,
    title: "Learn Git & GitHub",
    slug: "git-github",
    para: "Git is for version control, GitHub is for collaboration.",
    details: "Git and GitHub are fundamental tools in modern software development, but they serve distinct purposes. Git is a distributed version control system (DVCS). It is a free and open-source software that developers install locally on their computers. Git's primary function is to track changes in source code and other files during software development. Key aspects of Git include",
  },
  {
    id: 16,
    title: "Learn Postman",
    slug: "postman",
    para: "Postman is a tool for testing and automating APIs.",
    details: "Postman is an all-in-one API platform for developers to design, build, test, and manage APIs. It acts as an API client for sending HTTP requests (like REST, SOAP, and GraphQL) to test web services and analyze the server responses. Beyond testing, Postman offers collaboration features, automated workflow creation, API documentation generation, and workspace management to streamline the entire API lifecycle",
  },
  {
    id: 17,
    title: "Learn Data Structures",
    slug: "data-structures",
    para: "Data structures organize and manage data efficiently.",
    details: "What Is Data Structure? Definition, Types & Applications ...A data structure is a specialized format for organizing, storing, and accessing data in a computer system to enable efficient processing, retrieval, and manipulation. By defining relationships between data elements, data structures optimize performance, reduce memory usage, and make data easier to manage for both programmers and machines.",
  },
  {
    id: 18,
    title: "Learn Algorithms",
    slug: "algorithms",
    para: "Algorithms solve problems step by step efficiently.",
    details: "An algorithm is a finite set of clear, step-by-step instructions designed to solve a specific problem or complete a task. It's like a recipe, taking an input, processing it through a series of logical steps, and producing a desired output. Algorithms are the fundamental building blocks of computer programs, powering everything from simple calculations to complex artificial intelligence, and can be executed by both machines and humans. ",
  },
  {
    id: 19,
    title: "Learn OOP in JavaScript",
    slug: "oop-javascript",
    para: "OOP organizes code into reusable objects and classes.",
    details: "OOP, or Object-Oriented Programming, in JavaScript is a programming paradigm that structures code around objects rather than functions and logic. It emphasizes the concept of \"objects\" that contain both data (properties) and behavior (methods).",
  }
];

const aboutData = [
  {
    id: 1,
    title: "Our Mission",
    para: "We aim to make learning modern web development simple, structured, and accessible for everyone."
  },
  {
    id: 2,
    title: "Our Vision",
    para: "To empower students and developers by providing high-quality resources on programming, frameworks, and system design."
  },
  {
    id: 3,
    title: "Why Choose Us?",
    para: "We focus on practical, project-based learning that helps you understand concepts by actually building real-world applications."
  },
  {
    id: 4,
    title: "What You’ll Learn",
    para: "From HTML, CSS, JavaScript, and frameworks like React, Node, Express, Firebase, to advanced topics like System Design and Algorithms."
  },
  {
    id: 5,
    title: "Community Support",
    para: "We believe in learning together. Our platform encourages collaboration, discussions, and peer-to-peer guidance."
  },
  {
    id: 6,
    title: "Our Values",
    para: "We believe in simplicity, consistency, and hands-on learning. Every resource is designed to be clear, practical, and beginner-friendly."
  }
];



const faqData = [
  {
    id: 1,
    question: "What is this website about?",
    answer: "This website helps you learn web development topics like HTML, CSS, JavaScript, React, Node.js, and more through structured content."
  },
  {
    id: 2,
    question: "Do I need prior coding experience?",
    answer: "Not at all! Our content is beginner-friendly and starts with the basics, while also covering advanced topics for experienced learners."
  },
  {
    id: 3,
    question: "Is it free to use?",
    answer: "Yes All resources provided here are completely free to use for learning purposes."
  },
  {
    id: 4,
    question: "Can I contribute content?",
    answer: "Yes! We welcome contributions. You can suggest topics, improvements, or fixes by contacting us or contributing on GitHub."
  },
  {
    id: 5,
    question: "How do I start learning?",
    answer: "Simply head over to the homepage, pick a topic, and click 'Read More' to explore detailed explanations with examples."
  },
  {
    id: 6,
    question: "Do you provide projects?",
    answer: "Yes  Our platform includes project-based learning, so you can apply concepts to real-world applications while learning."
  },
  {
    id: 7,
    question: "What technologies are covered?",
    answer: "We cover everything from HTML, CSS, and JavaScript to frameworks like React, Node.js, Express.js, Firebase, and advanced concepts like System Design and Algorithms."
  },
  {
    id: 8,
    question: "Can I use this content for teaching others?",
    answer: "Yes, you are free to use our resources for personal learning or teaching, as long as proper credit is given."
  },
  {
    id: 9,
    question: "Will you add more topics in the future?",
    answer: "Absolutely  We keep updating and adding new topics regularly to cover the latest technologies."
  },
  {
    id: 10,
    question: "Do you provide certificates?",
    answer: "Currently, we don’t provide certificates. The main goal is learning and practicing real-world skills."
  },
  {
    id: 11,
    question: "Can I request a new feature or topic?",
    answer: "Yes, you can! Use the contact page to suggest new features or topics, and we’ll try to include them."
  },
  {
    id: 12,
    question: "Is there a way to connect with other learners?",
    answer: "We are working on building a community space  where learners can discuss, share projects, and help each other."
  }
];



module.exports = { learningData, aboutData, faqData };

