var BOOK_DATA = {
    id: "system-design-interview",
    title: "System Design Interview",
    author: "Alex Xu",
    subtitle: "An Insider's Guide",
    chapters: [
        {
            number: 1,
            title: "A Framework for System Design Interviews",
            isAppendix: false,
            summary: "<p>System design interviews test a candidate&rsquo;s ability to collaborate, work under pressure, and solve ambiguous problems constructively. This chapter provides a <strong>4-step framework</strong>: (1) Understand the problem and establish design scope, (2) Propose high-level design and get buy-in, (3) Design deep dive, and (4) Wrap up. Each step has a recommended time allocation in a 45-minute interview: ~5 minutes for step 1, ~20 minutes for step 2, ~15 minutes for step 3, and ~5 minutes for step 4.</p><p>The first step is crucial: <strong>ask clarifying questions</strong> before jumping into design. What features to build? How many users? What is the expected scale? Read-heavy or write-heavy? What are the non-functional requirements (latency, availability, consistency)? Rushing to design without understanding the problem is the most common mistake.</p><p>Xu emphasises that there is <strong>no single correct answer</strong>. The interviewer evaluates your thought process, ability to make trade-offs, how you handle ambiguity, and how you communicate. Red flags include over-engineering, narrow-mindedness (insisting on one approach), and stubbornness (refusing to consider interviewer hints). The process matters more than the final design.</p>",
            keyPoints: [
                "Use the 4-step framework: scope, high-level design, deep dive, wrap-up",
                "Always ask clarifying questions before designing — understand requirements first",
                "There is no single correct answer — the process and trade-off analysis matter most",
                "Back-of-the-envelope estimations help establish scale constraints",
                "Avoid red flags: over-engineering, narrow-mindedness, jumping into details too early"
            ],
            realLifeExamples: [
                {
                    title: "The Clarifying Question That Changed Everything",
                    content: "<p>A candidate was asked to design a chat system. Instead of diving in, they asked: &lsquo;Is this for 1-on-1 chat or group chat? What about message persistence?&rsquo; The interviewer said group chat with no persistence. This completely changed the design from a database-backed system to a simpler pub-sub architecture, impressing the interviewer with the candidate&rsquo;s ability to narrow scope.</p>"
                }
            ],
            quotes: [
                { text: "An interview is not a test; it is a collaborative activity. The best candidates lead the discussion, ask questions, and communicate clearly.", source: "Alex Xu" }
            ],
            insights: [
                {
                    title: "Process Over Product",
                    content: "<p>Interviewers care more about <em>how</em> you arrive at a design than the design itself. Demonstrating structured thinking, identifying trade-offs, explaining why you chose one approach over another, and responding well to feedback are more valuable than producing a &lsquo;perfect&rsquo; architecture. The interview is a simulation of how you would work on a real team.</p>"
                }
            ],
            actionItems: [
                "Practice the 4-step framework with timed mock interviews",
                "Build a checklist of clarifying questions (users, scale, features, non-functional requirements)",
                "Learn back-of-the-envelope estimation: powers of 2, latency numbers, QPS calculations",
                "Practice explaining trade-offs clearly — there are always pros and cons"
            ],
            quiz: [
                {
                    question: "What is the most common mistake in system design interviews?",
                    options: ["Using the wrong technology", "Jumping into design without understanding the problem and requirements", "Drawing too many diagrams", "Talking too slowly"],
                    correctIndex: 1,
                    explanation: "The most common mistake is jumping into design without asking clarifying questions first — this leads to solving the wrong problem or designing at the wrong scale."
                },
                {
                    question: "What does the interviewer primarily evaluate in a system design interview?",
                    options: ["Memorisation of architectures", "Thought process, trade-off analysis, and communication skills", "Coding speed", "Knowledge of specific databases"],
                    correctIndex: 1,
                    explanation: "The interviewer evaluates your thought process, ability to make and justify trade-offs, how you handle ambiguity, and how clearly you communicate your design."
                }
            ],
            mindMap: {
                central: "System Design Framework",
                branches: [
                    { label: "Step 1: Scope", children: ["Clarifying questions", "Functional requirements", "Non-functional requirements"] },
                    { label: "Step 2: High-Level", children: ["API design", "Data model", "Architecture diagram"] },
                    { label: "Step 3: Deep Dive", children: ["Bottlenecks", "Scaling", "Trade-offs"] },
                    { label: "Step 4: Wrap-Up", children: ["Error handling", "Monitoring", "Future improvements"] }
                ]
            }
        },
        {
            number: 2,
            title: "Design a Rate Limiter",
            isAppendix: false,
            summary: "<p>A rate limiter controls the rate of traffic sent by a client or service. It is essential for preventing abuse, reducing costs, and protecting services from being overwhelmed. Rate limiting can be implemented on the <strong>client side</strong>, <strong>server side</strong>, or in a <strong>middleware/API gateway</strong>. Server-side or middleware is preferred because client-side rate limiting can be bypassed.</p><p>The chapter covers several rate limiting algorithms: <strong>Token Bucket</strong> (tokens are added at a fixed rate; each request consumes a token — simple and widely used), <strong>Leaking Bucket</strong> (requests are processed at a fixed rate from a queue — smooth output), <strong>Fixed Window Counter</strong> (counts requests in fixed time windows — simple but has boundary burst issues), <strong>Sliding Window Log</strong> (tracks each request timestamp — accurate but memory-intensive), and <strong>Sliding Window Counter</strong> (hybrid of fixed window and sliding log — good balance of accuracy and efficiency).</p><p>In a distributed environment, rate limiting faces two challenges: <strong>race conditions</strong> (multiple servers checking and updating the counter simultaneously) and <strong>synchronisation</strong> (keeping counts consistent across servers). Solutions include using <strong>Redis</strong> with atomic operations (INCR with TTL), Lua scripts for atomic read-and-increment, and centralised rate limiting in the API gateway. The response should include appropriate HTTP headers (<code>X-RateLimit-Remaining</code>, <code>X-RateLimit-Limit</code>, <code>Retry-After</code>) and return <strong>HTTP 429</strong> when limits are exceeded.</p>",
            keyPoints: [
                "Rate limiting prevents abuse, reduces cost, and protects services from overload",
                "Key algorithms: Token Bucket, Leaking Bucket, Fixed Window, Sliding Window Log/Counter",
                "Token Bucket is the most widely used — simple and memory efficient",
                "Distributed rate limiting needs atomic operations (Redis INCR) to avoid race conditions",
                "Return HTTP 429 with appropriate rate limit headers when limits are exceeded"
            ],
            realLifeExamples: [
                {
                    title: "GitHub API Rate Limiting",
                    content: "<p>GitHub&rsquo;s API rate limits authenticated users to 5,000 requests per hour. They use response headers (<code>X-RateLimit-Limit</code>, <code>X-RateLimit-Remaining</code>, <code>X-RateLimit-Reset</code>) to communicate limits. This prevents any single integration from overwhelming their servers and ensures fair access for all API consumers.</p>"
                }
            ],
            quotes: [
                { text: "A rate limiter is used to control the rate of traffic sent by a client or a service. If the API request count exceeds the threshold, all excess calls are dropped.", source: "Alex Xu" }
            ],
            insights: [
                {
                    title: "Choosing the Right Algorithm",
                    content: "<p>Token Bucket is the go-to choice for most use cases because it handles burst traffic naturally (accumulated tokens allow short bursts) while maintaining a steady average rate. Use Leaking Bucket when you need a perfectly smooth output rate (e.g., processing payments). Sliding Window Counter offers the best accuracy-to-memory trade-off for precise rate limiting.</p>"
                }
            ],
            actionItems: [
                "Implement rate limiting in your API gateway before individual services",
                "Use Redis with atomic INCR operations for distributed rate limiting",
                "Include rate limit headers in all API responses for client transparency",
                "Monitor rate limit hit rates to tune thresholds and identify abuse patterns"
            ],
            quiz: [
                {
                    question: "Which rate limiting algorithm handles burst traffic most naturally?",
                    options: ["Fixed Window Counter", "Leaking Bucket", "Token Bucket", "Sliding Window Log"],
                    correctIndex: 2,
                    explanation: "Token Bucket allows burst traffic by accumulating tokens during quiet periods — if a bucket is full, a burst of requests can be served immediately up to the bucket capacity."
                },
                {
                    question: "What HTTP status code should be returned when a rate limit is exceeded?",
                    options: ["403 Forbidden", "500 Internal Server Error", "429 Too Many Requests", "503 Service Unavailable"],
                    correctIndex: 2,
                    explanation: "HTTP 429 Too Many Requests is the standard status code indicating that the user has sent too many requests in a given amount of time."
                }
            ],
            mindMap: {
                central: "Rate Limiter",
                branches: [
                    { label: "Algorithms", children: ["Token Bucket", "Leaking Bucket", "Fixed Window", "Sliding Window"] },
                    { label: "Placement", children: ["Client-side", "Server-side", "API Gateway/Middleware"] },
                    { label: "Distributed", children: ["Redis atomic ops", "Race conditions", "Synchronisation"] },
                    { label: "Response", children: ["HTTP 429", "Rate limit headers", "Retry-After"] }
                ]
            }
        },
        {
            number: 3,
            title: "Design Consistent Hashing",
            isAppendix: false,
            summary: "<p>Consistent hashing solves the problem of distributing data across servers when servers are added or removed. Traditional hashing (key % N) requires <strong>rehashing all keys</strong> when the number of servers changes, which is catastrophic for caches. Consistent hashing ensures that when a server is added or removed, only <strong>K/N keys</strong> need to be remapped (K = total keys, N = total servers).</p><p>The algorithm maps both servers and keys onto a <strong>hash ring</strong>. Each key is assigned to the first server encountered moving clockwise around the ring. When a server is added, only the keys between the new server and the next server counter-clockwise need to move. When a server is removed, its keys move to the next server clockwise.</p><p>A naive implementation can lead to uneven distribution. <strong>Virtual nodes</strong> solve this: each physical server is represented by multiple points on the ring. With enough virtual nodes (100-200 per server), the distribution becomes very even. The trade-off is memory &mdash; more virtual nodes mean more memory for the ring lookup table. Consistent hashing is used by Amazon DynamoDB, Apache Cassandra, Discord, and Akamai CDN.</p>",
            keyPoints: [
                "Traditional hashing (key % N) requires rehashing all keys when servers change",
                "Consistent hashing maps servers and keys onto a ring — only K/N keys are remapped",
                "Keys are assigned to the first server encountered clockwise on the ring",
                "Virtual nodes solve uneven distribution — each server gets multiple points on the ring",
                "Used by DynamoDB, Cassandra, Discord, and Akamai CDN"
            ],
            realLifeExamples: [
                {
                    title: "Discord's Message Distribution",
                    content: "<p>Discord uses consistent hashing to distribute chat messages across storage nodes. When a new node is added to handle growth, only a fraction of messages need to be rebalanced. Without consistent hashing, adding a node would invalidate their entire cache and require rehashing billions of messages.</p>"
                }
            ],
            quotes: [
                { text: "Consistent hashing is a special kind of hashing such that when a hash table is resized, only K/N keys need to be remapped on average.", source: "Alex Xu" }
            ],
            insights: [
                {
                    title: "Virtual Nodes: The Key to Even Distribution",
                    content: "<p>Without virtual nodes, servers on the ring can have vastly different numbers of keys. By mapping each physical server to 100-200 virtual nodes spread around the ring, the statistical distribution approaches uniformity. As a bonus, servers with more capacity can have more virtual nodes, naturally handling heterogeneous hardware.</p>"
                }
            ],
            actionItems: [
                "Use consistent hashing whenever you need to distribute data across a variable number of servers",
                "Implement virtual nodes to ensure even key distribution",
                "Test your consistent hashing implementation with server additions and removals",
                "Benchmark the number of virtual nodes to find the right balance between uniformity and memory"
            ],
            quiz: [
                {
                    question: "What problem does consistent hashing solve?",
                    options: ["Encryption", "Minimising key remapping when the number of servers changes", "Sorting data", "Compressing files"],
                    correctIndex: 1,
                    explanation: "Consistent hashing minimises key remapping when servers are added or removed — only K/N keys need to move, compared to rehashing all keys with traditional hashing."
                },
                {
                    question: "What is the purpose of virtual nodes?",
                    options: ["To improve security", "To achieve more even distribution of keys across physical servers", "To reduce network latency", "To enable encryption"],
                    correctIndex: 1,
                    explanation: "Virtual nodes map each physical server to multiple points on the hash ring, resulting in a more even distribution of keys across servers."
                }
            ],
            mindMap: {
                central: "Consistent Hashing",
                branches: [
                    { label: "Problem", children: ["Rehashing on resize", "Key redistribution", "Cache invalidation"] },
                    { label: "Hash Ring", children: ["Map servers to ring", "Clockwise assignment", "K/N remapping"] },
                    { label: "Virtual Nodes", children: ["Multiple points per server", "Even distribution", "Memory trade-off"] },
                    { label: "Use Cases", children: ["DynamoDB", "Cassandra", "CDNs", "Load balancing"] }
                ]
            }
        },
        {
            number: 4,
            title: "Design a Key-Value Store",
            isAppendix: false,
            summary: "<p>A key-value store is a non-relational database where each unique key is associated with a value. This chapter designs a distributed key-value store that supports <code>put(key, value)</code> and <code>get(key)</code> operations. The design must balance the <strong>CAP theorem</strong> trade-offs: Consistency, Availability, and Partition tolerance &mdash; you can only guarantee two of the three during a network partition.</p><p>The system uses <strong>consistent hashing</strong> for data partitioning, <strong>replication</strong> to N nodes for durability, and <strong>quorum consensus</strong> (W writes + R reads, where W + R > N) for consistency. The chapter covers <strong>conflict resolution</strong> using vector clocks (each node maintains a version counter, detecting concurrent writes) and <strong>gossip protocol</strong> for failure detection (nodes periodically exchange heartbeat information to detect failures without a central coordinator).</p><p>Write path: a write request is forwarded to the coordinator node, which replicates to N nodes. The coordinator responds after receiving W acknowledgments. Read path: the coordinator queries N replicas, waits for R responses, and resolves conflicts using vector clocks. The chapter details the <strong>LSM-Tree storage engine</strong> (memtable &rarr; SSTable flush &rarr; compaction) and <strong>Merkle trees</strong> for anti-entropy (detecting data inconsistencies between replicas efficiently).</p>",
            keyPoints: [
                "CAP theorem: during a partition, choose either consistency (CP) or availability (AP)",
                "Consistent hashing for partitioning, replication for durability, quorum for consistency",
                "Vector clocks detect concurrent writes for conflict resolution",
                "Gossip protocol enables decentralised failure detection",
                "Merkle trees efficiently detect data inconsistencies between replicas"
            ],
            realLifeExamples: [
                {
                    title: "Amazon DynamoDB's Design",
                    content: "<p>DynamoDB, born from Amazon&rsquo;s Dynamo paper, uses exactly the techniques in this chapter: consistent hashing with virtual nodes, quorum reads/writes, vector clocks for conflict resolution, gossip protocol for membership, and Merkle trees for anti-entropy. It prioritises availability (AP system) because Amazon found that even brief unavailability had significant revenue impact.</p>"
                }
            ],
            quotes: [
                { text: "According to the CAP theorem, it is impossible for a distributed system to simultaneously provide more than two of these three guarantees: Consistency, Availability, and Partition tolerance.", source: "Alex Xu" }
            ],
            insights: [
                {
                    title: "Tunable Consistency",
                    content: "<p>By adjusting W and R values in a quorum system, you can tune consistency vs availability. W=1, R=N gives fast writes but slow, strongly consistent reads. W=N, R=1 gives slow writes but fast reads. W=1, R=1 gives maximum speed but no consistency guarantee. This tunability lets you optimise for different use cases within the same system.</p>"
                }
            ],
            actionItems: [
                "Understand the CAP theorem trade-offs for your distributed systems",
                "Use consistent hashing for data partitioning in distributed storage",
                "Implement health checking using gossip protocol for decentralised failure detection",
                "Study vector clocks to understand how distributed systems track causality"
            ],
            quiz: [
                {
                    question: "What do vector clocks track in a distributed key-value store?",
                    options: ["Real-world time", "The causal relationship between versions, detecting concurrent writes", "Server CPU utilisation", "Network bandwidth"],
                    correctIndex: 1,
                    explanation: "Vector clocks track the causal relationship between different versions of a value. They detect when writes are concurrent (neither happened before the other), enabling conflict resolution."
                },
                {
                    question: "What is the purpose of the gossip protocol?",
                    options: ["Encrypting messages", "Decentralised failure detection through periodic heartbeat exchange", "Compressing data", "Sorting keys"],
                    correctIndex: 1,
                    explanation: "The gossip protocol allows nodes to detect failures without a central coordinator by periodically exchanging heartbeat information with random peers."
                }
            ],
            mindMap: {
                central: "Key-Value Store",
                branches: [
                    { label: "Partitioning", children: ["Consistent hashing", "Virtual nodes", "Even distribution"] },
                    { label: "Replication", children: ["N replicas", "Quorum W+R>N", "Tunable consistency"] },
                    { label: "Conflict", children: ["Vector clocks", "Last-write-wins", "Sibling resolution"] },
                    { label: "Infrastructure", children: ["Gossip protocol", "Merkle trees", "LSM-Tree storage"] }
                ]
            }
        },
        {
            number: 5,
            title: "Design a URL Shortener",
            isAppendix: false,
            summary: "<p>A URL shortener (like bit.ly or tinyurl.com) maps long URLs to short aliases. The core operations are: <strong>shortening</strong> (given a long URL, generate a unique short URL) and <strong>redirection</strong> (given a short URL, redirect to the original long URL). The API is simple: <code>POST /api/shorten {longUrl}</code> returns a short URL, and <code>GET /{shortUrl}</code> returns a 301/302 redirect.</p><p>The key design decision is how to generate unique short URLs. The chapter explores <strong>hash-based approaches</strong> (hash the long URL, take the first N characters &mdash; handle collisions) and <strong>base-62 encoding</strong> (convert a unique integer ID to a short alphanumeric string using characters a-z, A-Z, 0-9). With 7 characters of base-62, you can represent 62^7 = ~3.5 trillion unique URLs. A unique ID generator (auto-increment, distributed ID like Snowflake) provides the integer for base-62 encoding.</p><p>For the redirect, the choice between <strong>301 (Permanent)</strong> and <strong>302 (Temporary)</strong> redirect affects analytics: 301 redirects are cached by browsers, reducing server load but making it impossible to track click counts. 302 redirects always hit the server, enabling analytics. The system uses a <strong>cache</strong> (like Redis) in front of the database for fast lookups, as the read-to-write ratio is heavily skewed toward reads.</p>",
            keyPoints: [
                "Two core operations: URL shortening (write) and redirection (read-heavy)",
                "Base-62 encoding converts a unique integer ID to a short alphanumeric string",
                "7 characters of base-62 supports ~3.5 trillion unique URLs",
                "301 (permanent) vs 302 (temporary) redirect: trade-off between caching and analytics",
                "Cache (Redis) in front of the database handles the read-heavy workload"
            ],
            realLifeExamples: [
                {
                    title: "Twitter's t.co Service",
                    content: "<p>Twitter wraps all links in tweets with t.co short URLs. This serves multiple purposes: it saves character count, enables click tracking for analytics, and allows Twitter to check links against malware databases before redirecting. Twitter processes billions of redirects daily, requiring a highly optimised caching layer.</p>"
                }
            ],
            quotes: [
                { text: "If we use base 62, we get 62^7 = approximately 3.5 trillion possible combinations — more than enough for most use cases.", source: "Alex Xu" }
            ],
            insights: [
                {
                    title: "Read-Heavy Systems Need Caching",
                    content: "<p>URL shorteners are dramatically read-heavy (100:1 or higher read-to-write ratio). The database is mostly needed for writes; reads should be served from cache. A simple Redis cache with the mapping short_url &rarr; long_url handles the majority of traffic. With proper TTL management, cache hit rates above 90% are typical.</p>"
                }
            ],
            actionItems: [
                "Use base-62 encoding with a distributed ID generator for URL shortening",
                "Choose 302 redirects if you need click analytics, 301 if you want to reduce server load",
                "Implement a caching layer (Redis) for redirect lookups — reads dominate the workload",
                "Plan for key collision handling if using hash-based shortening"
            ],
            quiz: [
                {
                    question: "Why does a URL shortener typically use 302 redirects instead of 301?",
                    options: ["302 is faster", "302 allows the server to track click analytics since browsers don't cache the redirect", "301 is deprecated", "302 uses less bandwidth"],
                    correctIndex: 1,
                    explanation: "302 (temporary) redirects ensure every click hits the server, enabling click tracking and analytics. 301 (permanent) redirects are cached by browsers, making analytics impossible."
                },
                {
                    question: "How does base-62 encoding work in a URL shortener?",
                    options: ["It compresses the long URL", "It converts a unique integer ID to a short string using characters a-z, A-Z, 0-9", "It encrypts the URL", "It hashes the URL to a fixed length"],
                    correctIndex: 1,
                    explanation: "Base-62 encoding converts a unique integer ID to a short alphanumeric string using 62 characters (a-z, A-Z, 0-9), producing compact, URL-safe identifiers."
                }
            ],
            mindMap: {
                central: "URL Shortener",
                branches: [
                    { label: "Generation", children: ["Base-62 encoding", "Hash + collision handling", "Distributed ID generator"] },
                    { label: "Redirection", children: ["301 permanent", "302 temporary", "Analytics tracking"] },
                    { label: "Storage", children: ["Database (writes)", "Redis cache (reads)", "Read-heavy optimisation"] },
                    { label: "Scale", children: ["3.5 trillion combinations", "Caching layer", "Database sharding"] }
                ]
            }
        },
        {
            number: 6,
            title: "Design a Web Crawler",
            isAppendix: false,
            summary: "<p>A web crawler (or spider) systematically browses the web to download pages for indexing, archiving, or data mining. The basic algorithm is simple: start with seed URLs, download each page, extract URLs from the page, and add new URLs to the frontier. The challenge is doing this at <strong>web scale</strong> &mdash; billions of pages, politeness constraints, and content deduplication.</p><p>The crawler must be <strong>polite</strong>: respect <code>robots.txt</code>, limit the rate of requests to any single domain, and use appropriate delays between requests. A <strong>URL frontier</strong> manages the queue of URLs to crawl, incorporating both politeness (per-host queues with rate limiting) and prioritisation (important pages crawled first, based on PageRank, update frequency, etc.).</p><p>Key challenges include <strong>content deduplication</strong> (many pages have identical or near-identical content &mdash; use content hashing or SimHash), <strong>URL deduplication</strong> (avoid crawling the same page twice &mdash; use a Bloom filter for memory-efficient set membership), <strong>spider traps</strong> (infinitely deep URL structures designed to trap crawlers), and <strong>handling dynamic content</strong> (JavaScript-rendered pages require headless browser rendering). The system must be robust, distributed, and handle billions of URLs.</p>",
            keyPoints: [
                "Basic loop: fetch page, extract URLs, add to frontier, repeat at scale",
                "Politeness: respect robots.txt, rate-limit per domain, use delays",
                "URL frontier manages prioritisation and per-host rate limiting",
                "Content deduplication using hashing; URL deduplication using Bloom filters",
                "Handle spider traps, dynamic content, and URL canonicalisation"
            ],
            realLifeExamples: [
                {
                    title: "Googlebot's Scale",
                    content: "<p>Googlebot crawls trillions of pages across billions of websites. It must balance freshness (re-crawling important sites frequently) with discovery (finding new sites). Google uses a priority-based frontier that re-crawls news sites every few minutes but may only re-crawl static personal blogs monthly, optimising crawl budget for maximum freshness impact.</p>"
                }
            ],
            quotes: [
                { text: "A good web crawler must handle the scale of the web while being polite to web servers and avoiding duplicate content.", source: "Alex Xu" }
            ],
            insights: [
                {
                    title: "Bloom Filters for URL Deduplication",
                    content: "<p>With billions of URLs, storing every seen URL in a hash set would require enormous memory. Bloom filters provide a memory-efficient solution: they can tell you with certainty that a URL has <em>not</em> been seen, or with high probability that it <em>has</em>. A small false positive rate (re-crawling a page occasionally) is acceptable to save orders of magnitude in memory.</p>"
                }
            ],
            actionItems: [
                "Always check and respect robots.txt before crawling any website",
                "Implement per-domain rate limiting in your crawler to avoid overloading servers",
                "Use Bloom filters for URL deduplication when crawling at scale",
                "Set a maximum crawl depth to avoid spider traps"
            ],
            quiz: [
                {
                    question: "What is a Bloom filter used for in a web crawler?",
                    options: ["Filtering spam content", "Memory-efficient URL deduplication — checking if a URL has already been crawled", "Rendering JavaScript pages", "Compressing downloaded pages"],
                    correctIndex: 1,
                    explanation: "Bloom filters provide memory-efficient set membership testing, allowing the crawler to check if a URL has likely been seen before without storing every URL in memory."
                },
                {
                    question: "Why does a web crawler need to be 'polite'?",
                    options: ["Legal requirements only", "To avoid overloading web servers with too many requests, which could be seen as a denial-of-service attack", "To improve ranking", "To reduce bandwidth costs"],
                    correctIndex: 1,
                    explanation: "Politeness prevents the crawler from overwhelming individual servers with requests, which could degrade their performance or be interpreted as a denial-of-service attack."
                }
            ],
            mindMap: {
                central: "Web Crawler",
                branches: [
                    { label: "Crawl Loop", children: ["Fetch", "Parse", "Extract URLs", "Add to frontier"] },
                    { label: "Politeness", children: ["robots.txt", "Rate limiting", "Per-host queues"] },
                    { label: "Deduplication", children: ["Content hashing", "Bloom filters", "URL canonicalisation"] },
                    { label: "Challenges", children: ["Spider traps", "Dynamic content", "Scale to billions"] }
                ]
            }
        },
        {
            number: 7,
            title: "Design a Notification System",
            isAppendix: false,
            summary: "<p>A notification system sends alerts to users via multiple channels: <strong>push notifications</strong> (iOS APNs, Android FCM), <strong>SMS</strong> (via Twilio or similar), and <strong>email</strong> (via SendGrid, SES, etc.). The system must handle millions of notifications daily with low latency and high reliability while respecting user preferences and avoiding spam.</p><p>The high-level architecture separates concerns into: <strong>notification providers</strong> (the services that trigger notifications), a <strong>notification service</strong> (validates, rate-limits, and routes), <strong>message queues</strong> (one per channel for decoupling and buffering), and <strong>channel-specific workers</strong> (consume from queues and deliver via third-party services). This decoupled design ensures that a slowdown in email delivery does not affect push notification delivery.</p><p>Critical features include: <strong>user preferences</strong> (opt-in/opt-out per channel), <strong>rate limiting</strong> (prevent notification fatigue), <strong>retry with exponential backoff</strong> (handle transient third-party failures), <strong>template system</strong> (reusable notification templates), and <strong>analytics</strong> (delivery rate, open rate, click rate). The system should be <strong>idempotent</strong> &mdash; sending the same notification twice should not result in duplicate delivery, achieved through deduplication using notification IDs.</p>",
            keyPoints: [
                "Support multiple channels: push (APNs/FCM), SMS, email — each with its own queue",
                "Decouple notification creation from delivery using message queues",
                "Respect user preferences: opt-in/opt-out per notification type and channel",
                "Implement rate limiting to prevent notification fatigue",
                "Ensure idempotency to prevent duplicate notifications"
            ],
            realLifeExamples: [
                {
                    title: "Netflix's Notification Strategy",
                    content: "<p>Netflix sends millions of notifications daily but is careful about fatigue. They track user engagement with notifications and automatically reduce frequency for users who do not interact. Their system uses separate queues per channel, allowing them to independently scale email infrastructure during promotional campaigns without affecting real-time push notifications.</p>"
                }
            ],
            quotes: [
                { text: "A notification system is more than just sending messages — it's about sending the right message to the right person at the right time through the right channel.", source: "Alex Xu" }
            ],
            insights: [
                {
                    title: "Queues Per Channel",
                    content: "<p>Using separate message queues per notification channel (push, SMS, email) is critical for isolation. If the email provider is slow or down, the email queue backs up without affecting push or SMS delivery. Each channel can also be scaled independently &mdash; email workers can be scaled up during promotional campaigns without allocating resources to push notification workers.</p>"
                }
            ],
            actionItems: [
                "Design your notification system with separate queues per channel for isolation",
                "Implement user preference management for notification opt-in/opt-out",
                "Add deduplication using notification IDs to prevent duplicate delivery",
                "Track delivery, open, and click rates to measure notification effectiveness"
            ],
            quiz: [
                {
                    question: "Why use separate message queues per notification channel?",
                    options: ["To reduce costs", "To isolate channels so a slowdown in one does not affect others", "To encrypt messages", "To sort notifications"],
                    correctIndex: 1,
                    explanation: "Separate queues per channel provide isolation — if email delivery is slow, it does not affect push notification or SMS delivery, and each channel can be scaled independently."
                },
                {
                    question: "How do you prevent duplicate notifications?",
                    options: ["Sending notifications only once", "Using unique notification IDs for deduplication (idempotency)", "Limiting to one channel", "Caching all notifications"],
                    correctIndex: 1,
                    explanation: "Idempotency through deduplication ensures that even if the system retries a notification (due to transient failure), the user receives it only once."
                }
            ],
            mindMap: {
                central: "Notification System",
                branches: [
                    { label: "Channels", children: ["Push (APNs/FCM)", "SMS (Twilio)", "Email (SES/SendGrid)"] },
                    { label: "Architecture", children: ["Notification service", "Message queues", "Channel workers"] },
                    { label: "Reliability", children: ["Retry with backoff", "Idempotency", "Dead letter queue"] },
                    { label: "User Experience", children: ["Preferences", "Rate limiting", "Templates", "Analytics"] }
                ]
            }
        },
        {
            number: 8,
            title: "Design a News Feed System",
            isAppendix: false,
            summary: "<p>A news feed (like Facebook&rsquo;s or Twitter&rsquo;s timeline) displays a personalised, reverse-chronological stream of posts from friends and followed accounts. The two core operations are <strong>feed publishing</strong> (a user creates a post) and <strong>feed retrieval</strong> (a user views their personalised feed). The key design challenge is the <strong>fan-out</strong> strategy.</p><p><strong>Fan-out on write</strong> (push model): when a user publishes a post, immediately push it to all followers&rsquo; feed caches. This makes feed retrieval fast (pre-computed) but publishing slow for users with many followers (celebrity problem). <strong>Fan-out on read</strong> (pull model): when a user requests their feed, fetch and merge posts from all followed users on the fly. This makes publishing fast but retrieval slow. Most systems use a <strong>hybrid approach</strong>: fan-out on write for regular users, fan-out on read for celebrities.</p><p>The feed is typically stored in a <strong>cache</strong> (Redis sorted set with post IDs, sorted by timestamp). The feed retrieval service fetches post IDs from the cache, then hydrates them with full post data, user data, and media URLs. A <strong>ranking service</strong> can reorder the feed based on engagement predictions, relevance, and content type. The system requires robust <strong>caching</strong> at every layer for performance at scale.</p>",
            keyPoints: [
                "Two operations: feed publishing (write) and feed retrieval (read)",
                "Fan-out on write: pre-compute feeds (fast reads, slow writes for celebrities)",
                "Fan-out on read: compute feeds on-the-fly (fast writes, slow reads)",
                "Hybrid approach: push for regular users, pull for celebrities",
                "Feed stored in Redis sorted sets, hydrated with post and user data on retrieval"
            ],
            realLifeExamples: [
                {
                    title: "Twitter's Hybrid Timeline",
                    content: "<p>Twitter initially used fan-out on write for all users. When Lady Gaga (30M+ followers) tweeted, 30 million cache entries were updated. This was too expensive. They switched to a hybrid: tweets from regular users are fanned out on write, but tweets from high-follower accounts are merged on read. This balanced the load while keeping the timeline fast for most cases.</p>"
                }
            ],
            quotes: [
                { text: "For most social media companies, the right approach is a hybrid model: fan-out on write for normal users and fan-out on read for celebrities.", source: "Alex Xu" }
            ],
            insights: [
                {
                    title: "The Celebrity Problem",
                    content: "<p>The celebrity problem is a perfect example of why one-size-fits-all solutions fail at scale. A user with 30 million followers generates a fan-out of 30 million writes per post. This overwhelms the write path and is wasteful because most followers may never see the post. The hybrid approach elegantly handles this asymmetry by treating high-follower accounts differently.</p>"
                }
            ],
            actionItems: [
                "Identify whether your feed system is read-heavy or write-heavy to choose the right fan-out strategy",
                "Use Redis sorted sets for efficient feed storage and retrieval",
                "Implement a hybrid fan-out approach for users with varying follower counts",
                "Add a ranking/relevance layer on top of chronological ordering"
            ],
            quiz: [
                {
                    question: "What is the 'celebrity problem' in news feed design?",
                    options: ["Celebrities posting too much", "Fan-out on write is prohibitively expensive for users with millions of followers", "Celebrities using too many features", "Celebrity content is too large"],
                    correctIndex: 1,
                    explanation: "The celebrity problem occurs when fan-out on write must push a single post to millions of followers' feeds, creating an enormous and wasteful write amplification."
                },
                {
                    question: "What does 'hydration' mean in news feed retrieval?",
                    options: ["Adding water to the server", "Enriching post IDs from the feed cache with full post content, user profiles, and media data", "Compressing the feed", "Deleting old posts"],
                    correctIndex: 1,
                    explanation: "Hydration takes the lightweight post IDs stored in the feed cache and enriches them with full data (post content, author info, media URLs) for display."
                }
            ],
            mindMap: {
                central: "News Feed",
                branches: [
                    { label: "Fan-Out", children: ["On write (push)", "On read (pull)", "Hybrid approach"] },
                    { label: "Publishing", children: ["Validation", "Fan-out service", "Cache update"] },
                    { label: "Retrieval", children: ["Feed cache (Redis)", "Hydration", "Ranking/relevance"] },
                    { label: "Scale", children: ["Celebrity problem", "Cache layers", "Sharding by user ID"] }
                ]
            }
        },
        {
            number: 9,
            title: "Design a Chat System",
            isAppendix: false,
            summary: "<p>A chat system like WhatsApp, Facebook Messenger, or Slack supports real-time 1-on-1 and group messaging. The fundamental challenge is maintaining <strong>persistent connections</strong> for real-time delivery. HTTP is request/response and not suited for server-initiated messages. <strong>WebSocket</strong> provides full-duplex communication over a persistent connection, making it ideal for chat.</p><p>The architecture separates <strong>stateless services</strong> (authentication, user profiles, group management — behind a load balancer) from <strong>stateful services</strong> (chat servers maintaining WebSocket connections). When User A sends a message to User B, the message goes through A&rsquo;s chat server, is stored in the message database, and if User B is online, is forwarded to B&rsquo;s chat server via the message queue. If B is offline, the message is stored and a push notification is sent.</p><p>Message storage is a key decision. For 1-on-1 chat, a <strong>key-value store</strong> like HBase or Cassandra is preferred over a relational database because of the sequential write pattern and the need for fast retrieval by (user_id, timestamp). Group chat adds complexity: messages need a <code>channel_id</code>, and fan-out (delivering to all group members) is handled differently than 1-on-1. <strong>Online presence</strong> is tracked via heartbeats &mdash; the client sends periodic heartbeats, and if the server does not receive one within a timeout, the user is marked offline.</p>",
            keyPoints: [
                "WebSocket provides full-duplex communication for real-time messaging",
                "Separate stateless services (auth, profiles) from stateful services (chat servers)",
                "Use a key-value store (HBase, Cassandra) for message storage — optimised for sequential writes",
                "Handle online/offline status via client heartbeats with server-side timeout",
                "Message queues decouple chat servers for reliable delivery"
            ],
            realLifeExamples: [
                {
                    title: "WhatsApp's Efficiency",
                    content: "<p>WhatsApp achieved 2 billion users with a remarkably small engineering team by using Erlang (optimised for concurrent connections) and a lean architecture. Each server handles millions of concurrent WebSocket connections. Messages are stored only until delivered and then deleted, keeping storage costs low and focusing on real-time delivery.</p>"
                }
            ],
            quotes: [
                { text: "WebSocket is the most common solution for sending asynchronous updates from server to client. It provides a persistent connection between client and server.", source: "Alex Xu" }
            ],
            insights: [
                {
                    title: "Stateful vs Stateless Services",
                    content: "<p>Chat systems require careful separation of stateful and stateless components. Chat servers are inherently stateful (they maintain WebSocket connections), which makes scaling and failover harder. By keeping everything else stateless (behind load balancers), you isolate the complexity. When a chat server fails, clients reconnect to another server and resume from the last message ID.</p>"
                }
            ],
            actionItems: [
                "Use WebSocket for real-time bidirectional communication instead of HTTP polling",
                "Design chat servers as stateful services with reconnection and message replay support",
                "Choose a key-value store optimised for sequential writes for message persistence",
                "Implement heartbeat-based presence detection with appropriate timeout values"
            ],
            quiz: [
                {
                    question: "Why are WebSockets preferred over HTTP for chat systems?",
                    options: ["They are more secure", "They provide full-duplex, persistent connections enabling server-initiated messages", "They use less bandwidth for all scenarios", "They are newer"],
                    correctIndex: 1,
                    explanation: "WebSockets provide full-duplex communication over a persistent connection, allowing the server to push messages to the client without the client having to poll."
                },
                {
                    question: "How is user online status typically tracked?",
                    options: ["Checking database records", "Client heartbeats — if the server doesn't receive one within a timeout, the user is marked offline", "GPS tracking", "Browser cookies"],
                    correctIndex: 1,
                    explanation: "The client sends periodic heartbeat signals to the server. If the server does not receive a heartbeat within a defined timeout period, the user is marked as offline."
                }
            ],
            mindMap: {
                central: "Chat System",
                branches: [
                    { label: "Transport", children: ["WebSocket", "Full-duplex", "Persistent connection"] },
                    { label: "Architecture", children: ["Stateless services", "Stateful chat servers", "Message queues"] },
                    { label: "Storage", children: ["Key-value store", "Sequential writes", "Message by (user, time)"] },
                    { label: "Features", children: ["1-on-1 chat", "Group chat", "Online presence", "Push notifications"] }
                ]
            }
        },
        {
            number: 10,
            title: "Design a Search Autocomplete System",
            isAppendix: false,
            summary: "<p>Search autocomplete (typeahead) suggests query completions as the user types. When a user types &lsquo;din&rsquo;, the system suggests &lsquo;dinner recipes&rsquo;, &lsquo;dinosaur&rsquo;, &lsquo;dining near me&rsquo;. The requirements are <strong>extremely low latency</strong> (suggestions must appear within 100ms), <strong>relevance</strong> (most popular/relevant completions first), and <strong>scale</strong> (billions of queries daily).</p><p>The core data structure is a <strong>Trie</strong> (prefix tree). Each node represents a character, and paths from root to nodes represent prefixes. To quickly return the top-k suggestions for a prefix, the trie stores the top queries and their frequencies at each node. Searching is O(p) where p is the prefix length, and retrieving top-k is O(1) since they are pre-computed and cached at each node.</p><p>The trie is too large for a single server and must be <strong>sharded</strong>. Sharding by the first character is simple but uneven (more queries start with &lsquo;s&rsquo; than &lsquo;x&rsquo;). A smarter approach analyses the query distribution and shards by prefix ranges to balance load. The trie is updated periodically (not in real-time) using <strong>analytics logs</strong>: a data pipeline aggregates query frequencies weekly, rebuilds the trie, and replaces the old version. A <strong>filter layer</strong> removes hateful, dangerous, or inappropriate suggestions.</p>",
            keyPoints: [
                "Trie (prefix tree) is the core data structure for efficient prefix matching",
                "Pre-compute and cache top-k suggestions at each trie node for O(1) retrieval",
                "Latency requirement under 100ms — extensive caching is essential",
                "Trie is updated periodically from analytics logs, not in real-time",
                "Shard tries by prefix ranges based on query distribution for even load"
            ],
            realLifeExamples: [
                {
                    title: "Google Search Autocomplete",
                    content: "<p>Google&rsquo;s autocomplete processes billions of queries daily, suggesting completions in under 100ms globally. They use distributed tries with pre-computed top suggestions, edge caching (CDN), and a sophisticated ranking model that considers query frequency, recency, personalisation, and trending topics. Offensive or harmful suggestions are filtered through multiple safety layers.</p>"
                }
            ],
            quotes: [
                { text: "The most important requirement for a search autocomplete system is speed. Suggestions must appear within 100 milliseconds, or users will notice the delay.", source: "Alex Xu" }
            ],
            insights: [
                {
                    title: "Offline Updates, Online Serving",
                    content: "<p>A common pattern in search systems is separating the <strong>offline pipeline</strong> (data collection, aggregation, model building) from the <strong>online serving</strong> (handling user queries with pre-built data structures). The trie does not need to be updated in real-time because search trends change gradually. Weekly or daily rebuilds are sufficient, greatly simplifying the system.</p>"
                }
            ],
            actionItems: [
                "Use a trie data structure for prefix-based autocomplete features",
                "Pre-compute and cache top-k suggestions at each node to meet latency requirements",
                "Build an offline pipeline to aggregate query data and rebuild the trie periodically",
                "Implement a content safety filter to remove inappropriate suggestions"
            ],
            quiz: [
                {
                    question: "Why is a Trie the ideal data structure for autocomplete?",
                    options: ["It sorts data alphabetically", "It enables efficient prefix matching — all completions for a prefix share the same path from root", "It compresses data well", "It is the simplest data structure"],
                    correctIndex: 1,
                    explanation: "A Trie organises data by shared prefixes — all completions starting with 'din' share the same path from root through 'd', 'i', 'n', enabling efficient prefix-based lookup."
                },
                {
                    question: "Why is the autocomplete trie updated offline rather than in real-time?",
                    options: ["Real-time is too expensive and unnecessary — search trends change gradually enough for periodic updates", "Real-time updates are impossible", "Offline is more accurate", "Users prefer stale data"],
                    correctIndex: 0,
                    explanation: "Search trends change gradually, so weekly or daily trie rebuilds from aggregated analytics data are sufficient. Real-time updates would add enormous complexity for minimal benefit."
                }
            ],
            mindMap: {
                central: "Search Autocomplete",
                branches: [
                    { label: "Trie", children: ["Prefix tree", "Pre-computed top-k", "O(1) retrieval"] },
                    { label: "Data Pipeline", children: ["Analytics logs", "Weekly aggregation", "Trie rebuild"] },
                    { label: "Scale", children: ["Sharding by prefix range", "CDN/edge caching", "Multiple replicas"] },
                    { label: "Safety", children: ["Content filtering", "Offensive removal", "Trending validation"] }
                ]
            }
        }
    ]
};
