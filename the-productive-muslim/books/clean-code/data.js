var BOOK_DATA = {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    subtitle: "A Handbook of Agile Software Craftsmanship",
    chapters: [
        {
            number: 1,
            title: "Meaningful Names",
            isAppendix: false,
            summary: "<p>Names are everywhere in software. We name variables, functions, arguments, classes, packages, source files, directories, and more. Because we do so much of it, we&rsquo;d better do it well. This chapter lays out simple rules for creating good names. A name should reveal intent &mdash; it should tell you <strong>why it exists</strong>, <strong>what it does</strong>, and <strong>how it is used</strong>. If a name requires a comment, then the name does not reveal its intent.</p><p>Martin argues against disinformation, meaningless distinctions, and unpronounceable names. Names like <code>a1</code>, <code>a2</code>, or <code>theList</code> provide no clue about what the variable represents. Class names should be nouns (e.g., <code>Customer</code>, <code>Account</code>), while method names should be verbs (e.g., <code>postPayment</code>, <code>deletePage</code>). Pick one word per concept and stick with it &mdash; don&rsquo;t use <code>fetch</code>, <code>retrieve</code>, and <code>get</code> interchangeably across the same codebase.</p><p>The chapter also addresses the importance of using solution-domain names (e.g., <code>AccountVisitor</code>, <code>JobQueue</code>) since the people reading your code will be programmers, and adding meaningful context through well-named classes, functions, and namespaces rather than through prefixes.</p>",
            keyPoints: [
                "Names should reveal intent — if a name requires a comment, it does not reveal its intent",
                "Avoid disinformation: do not use names that mislead or have hidden meanings",
                "Make meaningful distinctions — noise words like 'Info' and 'Data' are indistinct",
                "Use pronounceable, searchable names that make conversation about code possible",
                "Class names should be nouns, method names should be verbs"
            ],
            realLifeExamples: [
                {
                    title: "The Cryptic Variable",
                    content: "<p>A developer inherited a codebase full of variables like <code>d</code>, <code>tp</code>, and <code>flg</code>. Every bug fix required 30 minutes just to understand what variables meant. After renaming them to <code>elapsedTimeInDays</code>, <code>totalPrice</code>, and <code>isDeleted</code>, debugging time dropped by 60%. The code became self-documenting.</p>"
                },
                {
                    title: "The Inconsistent API",
                    content: "<p>A team used <code>getUser()</code> in one service, <code>fetchAccount()</code> in another, and <code>retrieveProfile()</code> in a third &mdash; all doing the same conceptual operation. New team members constantly used the wrong method. Standardising on <code>get</code> for all read operations eliminated confusion and reduced onboarding time.</p>"
                }
            ],
            quotes: [
                { text: "The name of a variable, function, or class should answer all the big questions. It should tell you why it exists, what it does, and how it is used.", source: "Robert C. Martin" }
            ],
            insights: [
                {
                    title: "Names as Documentation",
                    content: "<p>Well-chosen names eliminate the need for most comments. When you feel the urge to write a comment explaining what a variable holds or what a function does, consider renaming instead. The best code reads like well-written prose &mdash; you should be able to read a function and understand its purpose without any external documentation.</p>"
                }
            ],
            actionItems: [
                "Review your current codebase and rename any single-letter or cryptic variables",
                "Establish a naming convention document for your team and enforce it in code reviews",
                "Replace comments that explain 'what' with better names that make the comment unnecessary",
                "Use your IDE's rename refactoring tool to safely rename across the codebase"
            ],
            quiz: [
                {
                    question: "According to Clean Code, what is the primary test of a good name?",
                    options: ["It is short", "It reveals intent", "It uses camelCase", "It includes the type"],
                    correctIndex: 1,
                    explanation: "Martin emphasises that names should reveal intent — they should tell you why something exists, what it does, and how it is used."
                },
                {
                    question: "What should class names typically be?",
                    options: ["Verbs", "Adjectives", "Nouns", "Abbreviations"],
                    correctIndex: 2,
                    explanation: "Class names should be nouns or noun phrases like Customer, Account, or AddressParser — never verbs."
                },
                {
                    question: "Why does Martin advise against 'mental mapping' of variable names?",
                    options: ["It slows down the compiler", "It forces readers to translate the name into a concept they already know", "It uses too much memory", "It violates naming conventions"],
                    correctIndex: 1,
                    explanation: "Mental mapping forces readers to remember that 'r' means 'the lower-cased version of the URL with the host and scheme removed', creating unnecessary cognitive load."
                }
            ],
            mindMap: {
                central: "Meaningful Names",
                branches: [
                    { label: "Reveal Intent", children: ["Why it exists", "What it does", "How it is used"] },
                    { label: "Avoid Bad Names", children: ["Disinformation", "Noise words", "Unpronounceable"] },
                    { label: "Conventions", children: ["Nouns for classes", "Verbs for methods", "One word per concept"] },
                    { label: "Context", children: ["Solution domain names", "Problem domain names", "Meaningful prefixes"] }
                ]
            }
        },
        {
            number: 2,
            title: "Functions",
            isAppendix: false,
            summary: "<p>Functions are the first line of organisation in any program. Martin&rsquo;s first rule of functions is that they should be <strong>small</strong>. His second rule is that they should be <strong>smaller than that</strong>. Functions should hardly ever be 20 lines long. Each function should do <strong>one thing</strong>, do it well, and do it only. If a function is doing more than one thing, it should be decomposed into smaller functions.</p><p>The chapter introduces the <strong>Stepdown Rule</strong>: code should read like a top-down narrative where every function is followed by those at the next level of abstraction. Function arguments should be minimal &mdash; zero (niladic) is ideal, one (monadic) is acceptable, two (dyadic) is harder to understand, and three (triadic) should be avoided. Flag arguments (boolean parameters) are particularly ugly because they loudly proclaim the function does more than one thing.</p><p>Side effects are lies &mdash; your function promises to do one thing but also does other hidden things. Functions should either <strong>do something</strong> (command) or <strong>answer something</strong> (query), but not both. This is the Command-Query Separation principle. Error handling is one thing, so a function that handles errors should do nothing else. The <code>try/catch</code> block should be the entire body of the function.</p>",
            keyPoints: [
                "Functions should be small — ideally no more than 20 lines",
                "Each function should do one thing, do it well, and do it only",
                "Minimise function arguments: zero is best, three or more should be avoided",
                "Avoid flag (boolean) arguments — they signal a function does more than one thing",
                "Apply Command-Query Separation: a function should either do something or answer something, not both"
            ],
            realLifeExamples: [
                {
                    title: "The 500-Line Monster",
                    content: "<p>A legacy billing function spanned 500 lines: it validated input, calculated totals, applied discounts, generated invoices, sent emails, and logged activity. Bugs were rampant because changes in one section caused failures in others. Breaking it into <code>validateOrder()</code>, <code>calculateTotal()</code>, <code>applyDiscounts()</code>, <code>generateInvoice()</code>, and <code>notifyCustomer()</code> made each piece testable and the overall flow readable.</p>"
                }
            ],
            quotes: [
                { text: "Functions should do one thing. They should do it well. They should do it only.", source: "Robert C. Martin" }
            ],
            insights: [
                {
                    title: "The Newspaper Metaphor",
                    content: "<p>Think of your source file like a newspaper article. The headline (function name) tells you the gist. The first paragraph (top-level function) gives you the synopsis. As you continue reading, the details increase. Each function calls the next level of abstraction, allowing the reader to stop at any level once they have enough understanding.</p>"
                }
            ],
            actionItems: [
                "Identify functions over 20 lines in your codebase and extract smaller functions from them",
                "Eliminate boolean flag arguments by splitting into two clearly named functions",
                "Apply the Extract Method refactoring to any function doing more than one thing",
                "Separate command functions from query functions in your APIs",
                "Wrap try/catch blocks in their own functions to keep error handling separate"
            ],
            quiz: [
                {
                    question: "What is the ideal number of arguments for a function according to Clean Code?",
                    options: ["One", "Two", "Zero", "Three"],
                    correctIndex: 2,
                    explanation: "Zero arguments (niladic) is ideal. Each additional argument increases the complexity and makes testing harder."
                },
                {
                    question: "Why are boolean (flag) arguments problematic?",
                    options: ["They use too much memory", "They signal the function does more than one thing", "They are hard to type", "They cannot be tested"],
                    correctIndex: 1,
                    explanation: "A boolean argument loudly proclaims that the function does two things — one when the flag is true, and another when it is false."
                }
            ],
            mindMap: {
                central: "Functions",
                branches: [
                    { label: "Size", children: ["Small (under 20 lines)", "One level of abstraction", "Stepdown rule"] },
                    { label: "Do One Thing", children: ["Single responsibility", "Extract till you drop", "One level of abstraction"] },
                    { label: "Arguments", children: ["Niladic (0) ideal", "Monadic (1) ok", "Avoid triadic (3+)"] },
                    { label: "Side Effects", children: ["Command-Query Separation", "No hidden mutations", "Error handling is one thing"] }
                ]
            }
        },
        {
            number: 3,
            title: "Comments",
            isAppendix: false,
            summary: "<p>Martin makes a provocative claim: <strong>comments are, at best, a necessary evil</strong>. The proper use of comments is to compensate for our failure to express ourselves in code. If our programming languages were expressive enough, we would not need comments at all. Comments lie &mdash; not intentionally, but inevitably. Code changes and evolves; comments often do not follow. The older a comment is and the farther away from the code it describes, the more likely it is to be wrong.</p><p>There are a few legitimate uses for comments: legal comments (copyright headers), informative comments that explain a regex or complex algorithm, TODO comments marking future work, and Javadoc comments for public APIs. However, most comments are <strong>bad comments</strong>: redundant comments that restate the code, misleading comments that are subtly wrong, mandated comments required by policy but adding no value, and commented-out code that clutters files.</p><p>The solution is not more comments but <strong>better code</strong>. When you feel compelled to write a comment, try to refactor the code so the comment becomes unnecessary. Rename the variable, extract the function, or restructure the logic until the code itself tells the story.</p>",
            keyPoints: [
                "Comments are a necessary evil — they compensate for our failure to express intent in code",
                "Comments rot over time: code changes but comments are often not updated",
                "Good comments: legal, informative, TODO, clarification, warning of consequences",
                "Bad comments: redundant, misleading, mandated, journal comments, commented-out code",
                "When tempted to write a comment, first try to refactor the code to be self-explanatory"
            ],
            realLifeExamples: [
                {
                    title: "The Misleading Comment",
                    content: "<p>A comment read <code>// Returns true if the user is active</code> above a function that actually returned true if the user was active <em>and</em> had a valid subscription. A developer relied on the comment, skipped the subscription check in calling code, and caused a billing bug that went undetected for months.</p>"
                }
            ],
            quotes: [
                { text: "Don't comment bad code — rewrite it.", source: "Brian W. Kernighan and P.J. Plaugher, quoted by Robert C. Martin" }
            ],
            insights: [
                {
                    title: "Comments as Code Smell",
                    content: "<p>Rather than treating comments as documentation, treat them as a <strong>code smell</strong>. Each comment is a signal that the code is not yet clear enough. Use comments as a trigger for refactoring: every time you write one, ask yourself whether you could restructure the code to eliminate the need for the comment entirely.</p>"
                }
            ],
            actionItems: [
                "Audit your codebase for commented-out code and remove it (version control has the history)",
                "Replace explanatory comments with better-named functions and variables",
                "Remove redundant comments that merely restate what the code does",
                "Keep TODO comments but set up a process to review and resolve them regularly"
            ],
            quiz: [
                {
                    question: "According to Martin, what is the primary problem with comments?",
                    options: ["They slow down compilation", "They take up disk space", "They become outdated and misleading as code changes", "They are too verbose"],
                    correctIndex: 2,
                    explanation: "Comments rot — code changes and evolves, but comments frequently do not follow, becoming misleading over time."
                },
                {
                    question: "Which type of comment does Martin consider acceptable?",
                    options: ["Journal comments tracking changes", "Commented-out code for backup", "TODO comments for future work", "Redundant comments restating code"],
                    correctIndex: 2,
                    explanation: "TODO comments are acceptable because they mark recognized future work, though they should be reviewed and resolved regularly."
                }
            ],
            mindMap: {
                central: "Comments",
                branches: [
                    { label: "Good Comments", children: ["Legal/copyright", "Informative", "TODO", "Warning"] },
                    { label: "Bad Comments", children: ["Redundant", "Misleading", "Mandated", "Commented-out code"] },
                    { label: "Alternative", children: ["Better naming", "Extract functions", "Self-documenting code"] }
                ]
            }
        },
        {
            number: 4,
            title: "Formatting",
            isAppendix: false,
            summary: "<p>Code formatting is about <strong>communication</strong>, and communication is the professional developer&rsquo;s first order of business. The functionality you create today has a good chance of changing in the next release, but the readability of your code will have a profound effect on all the changes that will ever be made. Martin introduces two main dimensions of formatting: <strong>vertical</strong> and <strong>horizontal</strong>.</p><p>Vertical formatting concerns how tall your files are and how concepts are separated vertically. Files should typically be 200&ndash;500 lines. The <strong>Newspaper Metaphor</strong> applies: high-level concepts and abstractions at the top, details increasing as you move downward. Related concepts should be vertically close (vertical density), while unrelated concepts should be separated by blank lines (vertical openness). Variables should be declared as close to their usage as possible.</p><p>Horizontal formatting concerns line length and indentation. Lines should rarely exceed 120 characters. Indentation creates a visual hierarchy that shows the scope structure of the code. The key message is that a team should agree on a set of formatting rules and then consistently apply them. Individual style preferences become irrelevant once a team standard is established.</p>",
            keyPoints: [
                "Code formatting is about communication, not aesthetics",
                "Files should typically be 200-500 lines; smaller files are easier to understand",
                "Apply the Newspaper Metaphor: high-level summary at top, details increasing downward",
                "Related concepts should appear vertically close to each other",
                "Teams should agree on formatting rules and apply them consistently"
            ],
            realLifeExamples: [
                {
                    title: "The Formatting War",
                    content: "<p>A team spent hours in code reviews debating tabs vs. spaces and brace placement. They adopted Prettier with a shared configuration file, eliminating all formatting discussions. Code reviews now focused on logic and design instead of style, improving both velocity and morale.</p>"
                }
            ],
            quotes: [
                { text: "Code formatting is about communication, and communication is the professional developer's first order of business.", source: "Robert C. Martin" }
            ],
            insights: [
                {
                    title: "Formatting as Team Agreement",
                    content: "<p>The most important formatting rule is the one your team agrees upon. It matters less whether you use 2-space or 4-space indentation than whether everyone uses the <em>same</em> indentation. Use automated formatters (like Prettier, Black, or gofmt) to enforce consistency without human effort or debate.</p>"
                }
            ],
            actionItems: [
                "Set up an automated code formatter (Prettier, Black, gofmt) with a shared config in your project",
                "Establish a maximum file length guideline (e.g., 500 lines) and refactor files that exceed it",
                "Order functions so that callers appear above callees (Stepdown Rule)",
                "Keep related code vertically close — do not scatter related functions across a file"
            ],
            quiz: [
                {
                    question: "What does the Newspaper Metaphor suggest about code organisation?",
                    options: ["Code should be written in columns", "High-level concepts at top, details increasing downward", "Each file should have a headline comment", "Code should be broken into sections with headers"],
                    correctIndex: 1,
                    explanation: "Like a newspaper article, code should present a high-level summary at the top with increasing detail as you read downward."
                },
                {
                    question: "What is most important about formatting according to Martin?",
                    options: ["Using the latest formatting trends", "Individual developer preference", "Team-wide consistency", "Minimal whitespace"],
                    correctIndex: 2,
                    explanation: "The team should agree on a set of formatting rules and apply them consistently — individual preference is secondary."
                }
            ],
            mindMap: {
                central: "Formatting",
                branches: [
                    { label: "Vertical", children: ["File size 200-500 lines", "Newspaper metaphor", "Vertical density/openness"] },
                    { label: "Horizontal", children: ["Line length < 120", "Indentation", "Alignment"] },
                    { label: "Team Rules", children: ["Agreed standard", "Automated formatters", "Consistency over preference"] }
                ]
            }
        },
        {
            number: 5,
            title: "Objects and Data Structures",
            isAppendix: false,
            summary: "<p>There is a fundamental tension between objects and data structures. <strong>Objects</strong> hide their data behind abstractions and expose functions that operate on that data. <strong>Data structures</strong> expose their data and have no meaningful functions. This distinction has profound implications for system design, captured in what Martin calls the fundamental dichotomy.</p><p>Procedural code (using data structures) makes it easy to add new functions without changing existing data structures, but hard to add new data structures because every function must change. Object-oriented code makes it easy to add new classes without changing existing functions, but hard to add new functions because every class must change. Neither approach is universally better &mdash; the right choice depends on whether you expect to add new data types or new operations more frequently.</p><p>The chapter warns against hybrids &mdash; classes that are half object and half data structure. It introduces the <strong>Law of Demeter</strong>: a method should only call methods on its immediate collaborators, not on objects returned by those collaborators (avoiding &ldquo;train wrecks&rdquo; like <code>a.getB().getC().doSomething()</code>). Data Transfer Objects (DTOs) are pure data structures useful for communication between layers.</p>",
            keyPoints: [
                "Objects hide data behind abstractions and expose behaviour; data structures expose data with no behaviour",
                "Procedural code makes adding functions easy; OO code makes adding types easy",
                "Avoid hybrids that are half object and half data structure",
                "The Law of Demeter: a method should only talk to its immediate friends",
                "DTOs (Data Transfer Objects) are legitimate pure data structures for inter-layer communication"
            ],
            realLifeExamples: [
                {
                    title: "The Train Wreck",
                    content: "<p>A developer wrote <code>user.getAddress().getCity().getZipCode().format()</code>. When the Address class changed its internal representation, this chain broke in dozens of places. Applying the Law of Demeter by adding <code>user.getFormattedZipCode()</code> encapsulated the traversal and limited the blast radius of future changes.</p>"
                }
            ],
            quotes: [
                { text: "Objects hide their data behind abstractions and expose functions that operate on that data. Data structures expose their data and have no meaningful functions.", source: "Robert C. Martin" }
            ],
            insights: [
                {
                    title: "Choosing Between Objects and Data Structures",
                    content: "<p>The choice between objects and data structures is not about one being better than the other. It is a strategic decision. If you anticipate adding new types frequently (e.g., new shapes in a graphics system), use objects. If you anticipate adding new operations frequently (e.g., new calculations over existing data), use data structures with procedural code. The worst choice is a hybrid that gives you the disadvantages of both.</p>"
                }
            ],
            actionItems: [
                "Identify train-wreck method chains in your code and refactor them to respect the Law of Demeter",
                "Evaluate whether your domain is better served by objects or data structures",
                "Eliminate hybrid classes that expose both data and behaviour inconsistently",
                "Use DTOs explicitly at system boundaries (API responses, database results)"
            ],
            quiz: [
                {
                    question: "What does the Law of Demeter state?",
                    options: ["All classes should have fewer than 5 methods", "A method should only call methods on its immediate collaborators", "Data should always be private", "Every class needs an interface"],
                    correctIndex: 1,
                    explanation: "The Law of Demeter says a method should only call methods on objects it directly knows about — not on objects returned by those objects."
                },
                {
                    question: "What is the key advantage of procedural code with data structures?",
                    options: ["Easier to add new data types", "Easier to add new functions without changing data structures", "Better performance", "More readable"],
                    correctIndex: 1,
                    explanation: "Procedural code makes it easy to add new functions without modifying existing data structures, while OO code makes it easy to add new types."
                }
            ],
            mindMap: {
                central: "Objects vs Data Structures",
                branches: [
                    { label: "Objects", children: ["Hide data", "Expose behaviour", "Easy to add types"] },
                    { label: "Data Structures", children: ["Expose data", "No behaviour", "Easy to add functions"] },
                    { label: "Law of Demeter", children: ["Talk to friends only", "No train wrecks", "Encapsulate traversal"] },
                    { label: "Patterns", children: ["DTOs", "Active Records", "Avoid hybrids"] }
                ]
            }
        },
        {
            number: 6,
            title: "Error Handling",
            isAppendix: false,
            summary: "<p>Error handling is important, but if it obscures logic, it is wrong. Many codebases are dominated by error handling to the point where it is nearly impossible to see what the code actually does. Martin argues that clean error handling is an essential part of clean code, not an afterthought bolted on.</p><p>The chapter advocates using <strong>exceptions rather than return codes</strong>. Return codes force the caller to check for errors immediately, cluttering the happy path. Exceptions allow the main logic to remain clean while error handling is separated. Write your <code>try-catch-finally</code> statements first &mdash; they define a scope, like transactions. The caller should not have to deal with special cases; instead, use the <strong>Special Case Pattern</strong> (or Null Object Pattern) to encapsulate exceptional behaviour in objects.</p><p>Martin is emphatic about not returning <code>null</code>. Returning null leads to <code>NullPointerException</code>s scattered throughout the codebase and forces every caller to add null checks. Instead, throw an exception or return a Special Case object. Similarly, do not pass <code>null</code> as a function argument &mdash; there is almost no way to deal with it cleanly.</p>",
            keyPoints: [
                "Use exceptions rather than error return codes to keep the happy path clean",
                "Write try-catch-finally statements first — they define a transactional scope",
                "Do not return null — use Special Case Pattern or throw exceptions instead",
                "Do not pass null as a function argument",
                "Error handling is one thing — functions that handle errors should do nothing else"
            ],
            realLifeExamples: [
                {
                    title: "The Null Plague",
                    content: "<p>A Java service had over 200 <code>if (result != null)</code> checks scattered across 40 classes. One missed check caused a <code>NullPointerException</code> in production that brought down the payment processing pipeline. Introducing <code>Optional</code> and the Special Case Pattern eliminated all null checks and made the code both safer and more readable.</p>"
                }
            ],
            quotes: [
                { text: "If error handling obscures logic, it's wrong.", source: "Robert C. Martin" }
            ],
            insights: [
                {
                    title: "Exceptions as Transactions",
                    content: "<p>Think of <code>try-catch-finally</code> blocks as defining a transaction. The <code>try</code> block is the happy path, the <code>catch</code> block handles the rollback or recovery, and the <code>finally</code> block ensures cleanup. Writing them first forces you to think about what can go wrong before you write the main logic, leading to more robust code.</p>"
                }
            ],
            actionItems: [
                "Replace error return codes with exceptions in your codebase",
                "Audit for null returns and replace them with Optional, Special Case objects, or exceptions",
                "Ensure try-catch blocks are in their own functions, not mixed with business logic",
                "Create specific exception classes for your domain rather than using generic Exception"
            ],
            quiz: [
                {
                    question: "Why does Martin recommend against returning null?",
                    options: ["It wastes memory", "It forces callers to add null checks everywhere, leading to NullPointerExceptions when missed", "It is slow", "It is not supported in all languages"],
                    correctIndex: 1,
                    explanation: "Returning null forces every caller to check for null, and any missed check becomes a NullPointerException — a maintenance nightmare."
                },
                {
                    question: "What is the Special Case Pattern?",
                    options: ["A design pattern for handling switch statements", "An object that encapsulates exceptional behaviour, eliminating null checks", "A way to throw custom exceptions", "A debugging technique"],
                    correctIndex: 1,
                    explanation: "The Special Case Pattern creates an object that handles the exceptional case, so calling code does not need to check for null or special conditions."
                }
            ],
            mindMap: {
                central: "Error Handling",
                branches: [
                    { label: "Use Exceptions", children: ["Not return codes", "Keep happy path clean", "Define scope with try-catch"] },
                    { label: "Avoid Null", children: ["Don't return null", "Don't pass null", "Use Special Case Pattern"] },
                    { label: "Clean Structure", children: ["Error handling is one thing", "Separate error functions", "Domain-specific exceptions"] }
                ]
            }
        },
        {
            number: 7,
            title: "Boundaries",
            isAppendix: false,
            summary: "<p>We seldom control all the software in our systems. We use third-party packages, open-source libraries, and components from other teams. Managing the <strong>boundaries</strong> between our code and foreign code is a key skill. Third-party interfaces are designed to be broadly useful, while our code needs specific functionality. This tension at the boundary can cause problems.</p><p>Martin recommends <strong>wrapping third-party APIs</strong> in your own classes. When you wrap a third-party API like <code>Map</code>, you are not necessarily wrapping every method &mdash; you are constraining the interface to what your application needs and translating it into your domain language. This limits the blast radius when the third-party API changes and makes your code easier to test by allowing you to mock the wrapper.</p><p>The chapter introduces <strong>Learning Tests</strong>: instead of experimenting with a third-party library in production code, write tests that explore and verify the behaviour of the library. These tests serve dual purposes &mdash; they help you learn the API and they alert you when a new version of the library changes behaviour. Boundaries that don&rsquo;t yet exist (e.g., a subsystem not yet developed) can be handled with the <strong>Adapter Pattern</strong>, defining the interface you wish you had.</p>",
            keyPoints: [
                "Wrap third-party APIs to isolate your code from external changes",
                "Use Learning Tests to explore and verify third-party library behaviour",
                "Apply the Adapter Pattern for boundaries that do not yet exist",
                "Limit the surface area of third-party code visible to your system",
                "Clean boundaries make systems easier to test and maintain"
            ],
            realLifeExamples: [
                {
                    title: "The Library Upgrade Disaster",
                    content: "<p>A team used a logging library directly in 150 files. When they needed to switch from Log4j to SLF4J, every file had to change. Another team had wrapped their logger in a <code>Logger</code> interface with a single implementation. Their migration required changing only one class.</p>"
                }
            ],
            quotes: [
                { text: "Code at the boundaries needs clear separation and tests that define expectations.", source: "Robert C. Martin" }
            ],
            insights: [
                {
                    title: "The Power of Learning Tests",
                    content: "<p>Learning tests are free &mdash; you had to learn the API anyway, and writing tests captures that knowledge in an executable form. When the library releases a new version, running your learning tests immediately reveals any breaking changes, giving you an early warning system for dependency upgrades.</p>"
                }
            ],
            actionItems: [
                "Identify third-party libraries used directly throughout your codebase and wrap them behind your own interfaces",
                "Write learning tests for key third-party libraries before using them in production code",
                "Use the Adapter Pattern to define interfaces for subsystems that are not yet built",
                "Review your dependency list and minimise the surface area of each dependency"
            ],
            quiz: [
                {
                    question: "What is the primary benefit of wrapping third-party APIs?",
                    options: ["Better performance", "Isolating your code from changes in the third-party API", "Reducing file count", "Enabling dark mode"],
                    correctIndex: 1,
                    explanation: "Wrapping isolates your codebase from third-party changes — when the library changes, only the wrapper needs updating."
                },
                {
                    question: "What are Learning Tests?",
                    options: ["Tests for student code", "Tests that explore and verify third-party library behaviour", "Tests written by QA teams", "Tests that run during CI/CD"],
                    correctIndex: 1,
                    explanation: "Learning tests are tests you write to understand a third-party API — they also serve as a safety net for library upgrades."
                }
            ],
            mindMap: {
                central: "Boundaries",
                branches: [
                    { label: "Wrapping", children: ["Isolate third-party code", "Translate to domain language", "Limit blast radius"] },
                    { label: "Learning Tests", children: ["Explore API behaviour", "Executable documentation", "Upgrade safety net"] },
                    { label: "Adapter Pattern", children: ["Define wished-for interface", "Handle missing subsystems", "Decouple from implementation"] }
                ]
            }
        },
        {
            number: 8,
            title: "Unit Tests",
            isAppendix: false,
            summary: "<p>The Agile and TDD movements have encouraged many programmers to write automated unit tests, but many of those tests are poorly written. Having dirty tests is equivalent to, if not worse than, having no tests. Test code is just as important as production code &mdash; it requires thought, design, and care. The key quality of tests is <strong>readability</strong>.</p><p>Martin presents the <strong>Three Laws of TDD</strong>: (1) You may not write production code until you have written a failing unit test. (2) You may not write more of a unit test than is sufficient to fail. (3) You may not write more production code than is sufficient to pass the currently failing test. This tight cycle keeps tests and code in lockstep.</p><p>Tests should follow the <strong>F.I.R.S.T.</strong> principles: <strong>Fast</strong> (tests should run quickly), <strong>Independent</strong> (tests should not depend on each other), <strong>Repeatable</strong> (tests should work in any environment), <strong>Self-Validating</strong> (tests should have a boolean output &mdash; pass or fail), and <strong>Timely</strong> (tests should be written just before the production code). Clean tests use a Build-Operate-Check pattern and test a single concept per test function.</p>",
            keyPoints: [
                "Test code is as important as production code — it must be clean and maintainable",
                "The Three Laws of TDD create a tight feedback loop between tests and production code",
                "Tests should follow F.I.R.S.T. principles: Fast, Independent, Repeatable, Self-Validating, Timely",
                "Each test should test a single concept, not multiple things",
                "Dirty tests are worse than no tests — they become a liability as the codebase evolves"
            ],
            realLifeExamples: [
                {
                    title: "The Fragile Test Suite",
                    content: "<p>A team had 2,000 tests that took 45 minutes to run and frequently failed due to inter-test dependencies and shared mutable state. Developers stopped running tests locally and only discovered failures in CI, hours after committing. Refactoring the tests to be independent and fast (under 3 minutes total) restored the team&rsquo;s trust in the test suite and their willingness to run tests frequently.</p>"
                }
            ],
            quotes: [
                { text: "Test code is just as important as production code. It is not a second-class citizen.", source: "Robert C. Martin" }
            ],
            insights: [
                {
                    title: "Tests Enable Change",
                    content: "<p>Without tests, every change is a possible bug. With a comprehensive, fast, reliable test suite, you can refactor with confidence. Tests are what make your code <strong>flexible, maintainable, and reusable</strong>. If you let the tests rot, your production code rots too, because you become afraid to change it.</p>"
                }
            ],
            actionItems: [
                "Apply the F.I.R.S.T. principles to evaluate and improve your existing test suite",
                "Refactor test code with the same rigour you apply to production code",
                "Ensure each test function tests only one concept — split tests that verify multiple things",
                "Eliminate inter-test dependencies so tests can run in any order",
                "Practice the Three Laws of TDD on your next feature"
            ],
            quiz: [
                {
                    question: "What does the 'I' in F.I.R.S.T. stand for?",
                    options: ["Immediate", "Independent", "Integrated", "Intelligent"],
                    correctIndex: 1,
                    explanation: "Independent — tests should not depend on each other. One test should not set up conditions for the next test."
                },
                {
                    question: "Why are dirty tests worse than no tests?",
                    options: ["They use more memory", "They become a maintenance burden that slows down development and erodes trust", "They are harder to delete", "They cause compilation errors"],
                    correctIndex: 1,
                    explanation: "Dirty tests become so difficult to maintain that developers stop updating them, leading to a test suite that is unreliable and a drag on productivity."
                }
            ],
            mindMap: {
                central: "Unit Tests",
                branches: [
                    { label: "Three Laws of TDD", children: ["Failing test first", "Minimal test to fail", "Minimal code to pass"] },
                    { label: "F.I.R.S.T.", children: ["Fast", "Independent", "Repeatable", "Self-Validating", "Timely"] },
                    { label: "Clean Tests", children: ["Readability first", "One concept per test", "Build-Operate-Check pattern"] },
                    { label: "Value", children: ["Enable refactoring", "Documentation", "Confidence to change"] }
                ]
            }
        },
        {
            number: 9,
            title: "Classes",
            isAppendix: false,
            summary: "<p>Just as functions should be small, so should classes. But for classes, we measure size by <strong>responsibilities</strong>, not lines. The <strong>Single Responsibility Principle (SRP)</strong> states that a class should have one, and only one, reason to change. A class with too many responsibilities is difficult to understand, test, and maintain. The name of a class should describe what responsibilities it fulfils &mdash; if the name is ambiguous or includes words like &ldquo;Manager&rdquo; or &ldquo;Processor,&rdquo; the class likely does too much.</p><p>Martin emphasises that we want systems composed of many small classes, not a few large ones. Each small class encapsulates a single responsibility, has a small number of instance variables, and collaborates with other small classes to achieve complex behaviour. <strong>Cohesion</strong> is the measure of how closely related the methods and variables of a class are. High cohesion means every method uses every variable; when cohesion is low, consider splitting the class.</p><p>Classes should also be organised for change. The <strong>Open-Closed Principle (OCP)</strong> states that classes should be open for extension but closed for modification. Using abstractions and polymorphism, you can add new behaviour without changing existing, tested code. The <strong>Dependency Inversion Principle (DIP)</strong> further guides design: depend on abstractions, not concretions.</p>",
            keyPoints: [
                "Classes should be small — measured by responsibilities, not lines of code",
                "Single Responsibility Principle: a class should have one and only one reason to change",
                "High cohesion means methods and variables in a class are closely related",
                "Open-Closed Principle: open for extension, closed for modification",
                "Dependency Inversion Principle: depend on abstractions, not concrete implementations"
            ],
            realLifeExamples: [
                {
                    title: "The God Class",
                    content: "<p>A <code>UserService</code> class had 3,000 lines handling authentication, profile management, email notifications, audit logging, and payment processing. Every developer on the team had merge conflicts when touching this file. Splitting it into <code>AuthService</code>, <code>ProfileService</code>, <code>NotificationService</code>, <code>AuditService</code>, and <code>PaymentService</code> eliminated conflicts and made each piece independently testable.</p>"
                }
            ],
            quotes: [
                { text: "The Single Responsibility Principle states that a class or module should have one, and only one, reason to change.", source: "Robert C. Martin" }
            ],
            insights: [
                {
                    title: "Many Small Classes vs. Few Large Ones",
                    content: "<p>Developers often resist breaking code into many small classes, arguing it forces readers to navigate between files. But a system with many small, well-named classes is actually <em>easier</em> to navigate than one with a few God classes. You only need to understand the small subset of classes relevant to your current task, whereas a God class forces you to wade through thousands of irrelevant lines.</p>"
                }
            ],
            actionItems: [
                "Identify classes with more than one reason to change and split them along responsibility boundaries",
                "Check class cohesion: if a method does not use most instance variables, it may belong elsewhere",
                "Apply the Open-Closed Principle by using interfaces and polymorphism for extension points",
                "Refactor God classes into collaborative small classes with clear responsibilities"
            ],
            quiz: [
                {
                    question: "How should class size be measured according to Clean Code?",
                    options: ["Lines of code", "Number of methods", "Number of responsibilities", "Number of instance variables"],
                    correctIndex: 2,
                    explanation: "Class size is measured by responsibilities — a class should have one and only one reason to change (Single Responsibility Principle)."
                },
                {
                    question: "What does high cohesion in a class indicate?",
                    options: ["The class has many dependencies", "The methods and variables are closely related and work together", "The class inherits from many parents", "The class has excellent documentation"],
                    correctIndex: 1,
                    explanation: "High cohesion means the methods and instance variables of a class are closely related — every method uses most of the variables."
                }
            ],
            mindMap: {
                central: "Classes",
                branches: [
                    { label: "SRP", children: ["One reason to change", "Clear naming", "Small responsibilities"] },
                    { label: "Cohesion", children: ["Methods use instance variables", "Split when low", "Related functionality together"] },
                    { label: "OCP & DIP", children: ["Open for extension", "Closed for modification", "Depend on abstractions"] },
                    { label: "Organisation", children: ["Many small classes", "Collaborative design", "Independent testability"] }
                ]
            }
        },
        {
            number: 10,
            title: "Systems",
            isAppendix: false,
            summary: "<p>Software systems should separate the <strong>startup process</strong> (construction) from the <strong>runtime logic</strong> (use). Construction is a very different concern from use, yet most applications mix these two concerns. Martin advocates for separating construction from use through patterns like <strong>Factories</strong>, <strong>Dependency Injection</strong>, and frameworks like Spring. This separation allows you to test business logic independently of how objects are created.</p><p>Martin draws an analogy between software systems and cities. Cities grow and change, yet they work because they have appropriate levels of abstraction and modularity &mdash; water systems, electrical systems, traffic systems, all managed separately. Software systems should similarly be composed of independent modules that can evolve independently. <strong>Aspect-Oriented Programming (AOP)</strong> and cross-cutting concerns (logging, security, transactions) should be handled declaratively, not scattered throughout business logic.</p><p>The chapter argues for <strong>iterative and incremental growth</strong> of system architecture. You do not need Big Design Up Front (BDUF). Instead, implement today&rsquo;s requirements with clean, well-separated concerns, and trust that the architecture can evolve. The key is maintaining <strong>separation of concerns</strong> so that each aspect of the system can be changed independently.</p>",
            keyPoints: [
                "Separate construction (startup) from use (runtime) in your systems",
                "Use Dependency Injection to decouple object creation from business logic",
                "Cross-cutting concerns (logging, security) should be handled via aspects, not scattered code",
                "Systems should grow incrementally — avoid Big Design Up Front",
                "Maintain separation of concerns so each aspect can evolve independently"
            ],
            realLifeExamples: [
                {
                    title: "The Tightly Coupled Monolith",
                    content: "<p>A startup built a monolith where database connections, caching, and business logic were all intertwined. Adding a caching layer required modifying 80 files. After introducing dependency injection and separating infrastructure concerns, adding Redis caching required changes to only 3 files &mdash; the cache implementation and two configuration classes.</p>"
                }
            ],
            quotes: [
                { text: "An optimal system architecture consists of modularised domains of concern, each of which is implemented with Plain Old Java Objects.", source: "Robert C. Martin" }
            ],
            insights: [
                {
                    title: "Architecture Is Not BDUF",
                    content: "<p>Clean architecture does not mean designing everything up front. It means keeping your code so clean and well-separated that the architecture can emerge and evolve as requirements become clearer. The key enabler is decoupling &mdash; when concerns are properly separated, you can refactor the architecture without rewriting the entire system.</p>"
                }
            ],
            actionItems: [
                "Separate object construction from business logic using Dependency Injection",
                "Identify cross-cutting concerns in your system and consolidate them using aspects or middleware",
                "Avoid Big Design Up Front — implement today's needs cleanly and evolve the architecture",
                "Audit your main() or startup code to ensure it is the only place where objects are constructed"
            ],
            quiz: [
                {
                    question: "What is the main benefit of separating construction from use in software systems?",
                    options: ["Faster compilation", "Business logic can be tested independently of object creation", "Less code overall", "Simpler deployment"],
                    correctIndex: 1,
                    explanation: "Separating construction from use allows you to test business logic in isolation, without needing the full system wiring."
                },
                {
                    question: "What approach does Martin recommend instead of Big Design Up Front?",
                    options: ["No design at all", "Iterative and incremental growth with clean separation of concerns", "Designing only the database first", "Using a single God class"],
                    correctIndex: 1,
                    explanation: "Martin advocates for iterative growth — implement today's requirements cleanly, maintain separation of concerns, and let the architecture evolve."
                }
            ],
            mindMap: {
                central: "Systems",
                branches: [
                    { label: "Separation", children: ["Construction vs use", "Dependency Injection", "Factories"] },
                    { label: "Cross-Cutting Concerns", children: ["Logging", "Security", "Transactions", "AOP"] },
                    { label: "Growth", children: ["Incremental architecture", "No BDUF", "Evolve with requirements"] },
                    { label: "Modularity", children: ["Independent modules", "City analogy", "Domain-driven design"] }
                ]
            }
        }
    ]
};
