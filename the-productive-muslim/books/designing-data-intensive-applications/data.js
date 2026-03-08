var BOOK_DATA = {
    id: "designing-data-intensive-applications",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    subtitle: "The Big Ideas Behind Reliable, Scalable, and Maintainable Systems",
    chapters: [
        {
            number: 1,
            title: "Reliability, Scalability, and Maintainability",
            isAppendix: false,
            summary: "<p>Many applications today are <strong>data-intensive</strong> rather than compute-intensive. Their bottleneck is the amount, complexity, and speed of change of data rather than raw CPU power. Kleppmann introduces three fundamental concerns for data systems: <strong>reliability</strong> (the system continues to work correctly even when things go wrong), <strong>scalability</strong> (the system can handle growth in data volume, traffic, or complexity), and <strong>maintainability</strong> (different people can work on the system productively over time).</p><p>Reliability involves tolerating hardware faults (disk failures, network outages), software faults (systematic errors, cascading failures), and human errors (the leading cause of outages). Modern systems use redundancy and software fault-tolerance rather than relying on individual hardware reliability. Scalability is not a binary property &mdash; a system that handles 10,000 requests per second may not handle 100,000. You must describe load with <strong>load parameters</strong> (requests/second, read/write ratio, cache hit rate) and measure performance with <strong>percentiles</strong> (p50, p95, p99) rather than averages.</p><p>Maintainability is achieved through three design principles: <strong>operability</strong> (making it easy for operations teams to keep the system running), <strong>simplicity</strong> (managing complexity through good abstractions), and <strong>evolvability</strong> (making it easy to adapt the system to new requirements). Most of the cost of software is in ongoing maintenance, not initial development.</p>",
            keyPoints: [
                "Data-intensive applications are limited by data complexity, not CPU speed",
                "Reliability: the system works correctly even when faults occur (hardware, software, human)",
                "Scalability: describe load with parameters and measure performance with percentiles, not averages",
                "Maintainability: operability, simplicity, and evolvability reduce long-term cost",
                "Human errors are the leading cause of outages — design systems that minimise their impact"
            ],
            realLifeExamples: [
                {
                    title: "Twitter's Fan-Out Problem",
                    content: "<p>Kleppmann uses Twitter&rsquo;s home timeline as a scalability case study. With 300K reads/second vs 4.6K tweets/second, Twitter switched from a pull model (query on read) to a push model (fan-out on write). But for users with millions of followers, fan-out was too expensive, so they use a hybrid: fan-out for most users, pull for celebrities. This shows how load parameters drive architectural decisions.</p>"
                }
            ],
            quotes: [
                { text: "It is unwise to use averages to characterize performance. Percentiles are better.", source: "Martin Kleppmann" }
            ],
            insights: [
                {
                    title: "Percentiles Over Averages",
                    content: "<p>Averages hide the worst-case experiences. If your average response time is 200ms but p99 is 10 seconds, one in a hundred users has a terrible experience &mdash; and those are often your most valuable users (they have the most data). Amazon found that a 100ms increase in response time reduced sales by 1%. Tracking p95 and p99 latencies reveals the real user experience.</p>"
                }
            ],
            actionItems: [
                "Define load parameters for your system (requests/sec, data volume, read/write ratio)",
                "Switch from average-based monitoring to percentile-based (p50, p95, p99)",
                "Audit your system for single points of failure and add redundancy",
                "Document operational runbooks to improve operability"
            ],
            quiz: [
                {
                    question: "According to Kleppmann, what is the leading cause of system outages?",
                    options: ["Hardware failures", "Network partitions", "Human errors", "Software bugs"],
                    correctIndex: 2,
                    explanation: "Human errors are the leading cause of outages. Well-designed systems minimise opportunities for human error through good abstractions, sandboxing, and testing."
                },
                {
                    question: "Why are percentiles preferred over averages for measuring performance?",
                    options: ["They are easier to calculate", "They reveal the distribution of response times, especially worst-case experiences", "They use less memory", "They are more accurate"],
                    correctIndex: 1,
                    explanation: "Averages hide outliers. Percentiles (p50, p95, p99) reveal the full distribution of response times, including the worst-case experiences that affect real users."
                }
            ],
            mindMap: {
                central: "Foundations",
                branches: [
                    { label: "Reliability", children: ["Hardware faults", "Software faults", "Human errors"] },
                    { label: "Scalability", children: ["Load parameters", "Percentiles", "Vertical vs horizontal"] },
                    { label: "Maintainability", children: ["Operability", "Simplicity", "Evolvability"] }
                ]
            }
        },
        {
            number: 2,
            title: "Data Models and Query Languages",
            isAppendix: false,
            summary: "<p>Data models are the most important part of developing software because they affect how we <strong>think about the problem</strong>. This chapter compares the dominant data models: <strong>relational</strong> (SQL tables with rows and columns), <strong>document</strong> (JSON/XML-like nested structures), and <strong>graph</strong> (vertices and edges for highly interconnected data). Each model makes certain operations easy and others awkward.</p><p>The <strong>relational model</strong> excels at joins and many-to-many relationships but forces data into flat tables, sometimes creating impedance mismatch with application objects. The <strong>document model</strong> provides schema flexibility and locality (all data for an entity in one document), but struggles with many-to-many relationships and deeply nested joins. The <strong>graph model</strong> is ideal when anything can be related to anything else, as in social networks, recommendation engines, or knowledge graphs.</p><p>Query languages are either <strong>declarative</strong> (SQL, Cypher &mdash; you describe what you want, the system figures out how) or <strong>imperative</strong> (you describe the steps to get the result). Declarative languages are generally preferred because they allow the query optimiser to choose the best execution plan, and they parallelise more easily. The chapter also covers MapReduce as a programming model that sits between declarative and imperative.</p>",
            keyPoints: [
                "Data models shape how we think about problems — choosing the right one is critical",
                "Relational model: strong joins and many-to-many, but impedance mismatch with objects",
                "Document model: schema flexibility and data locality, but weak at joins",
                "Graph model: ideal for highly interconnected data (social networks, knowledge graphs)",
                "Declarative query languages allow optimisers to choose the best execution plan"
            ],
            realLifeExamples: [
                {
                    title: "LinkedIn's Graph Database",
                    content: "<p>LinkedIn&rsquo;s core value proposition &mdash; &lsquo;people you may know&rsquo; and connection paths &mdash; is fundamentally a graph problem. Representing professional relationships as edges between person vertices makes queries like &lsquo;shortest path between two people&rsquo; or &lsquo;mutual connections&rsquo; natural and efficient, which would be extremely awkward with JOINs across relational tables.</p>"
                }
            ],
            quotes: [
                { text: "The limits of my language mean the limits of my world.", source: "Ludwig Wittgenstein, quoted by Martin Kleppmann" }
            ],
            insights: [
                {
                    title: "Polyglot Persistence",
                    content: "<p>Modern systems increasingly use multiple data models together &mdash; a relational database for transactional data, a document store for content, a graph database for recommendations, and a full-text search engine for search. This <strong>polyglot persistence</strong> approach uses each data model for what it does best, though it adds operational complexity.</p>"
                }
            ],
            actionItems: [
                "Evaluate whether your data model matches your access patterns — are you fighting the model?",
                "Consider document databases for data with natural hierarchical structure and few joins",
                "Explore graph databases if your domain has complex many-to-many relationships",
                "Prefer declarative queries over imperative data manipulation for flexibility"
            ],
            quiz: [
                {
                    question: "When is a graph data model most appropriate?",
                    options: ["When data is mostly hierarchical", "When anything can potentially be related to anything else", "When there are no relationships between entities", "When data is strictly tabular"],
                    correctIndex: 1,
                    explanation: "Graph models excel when data is highly interconnected and anything can be related to anything else — like social networks, knowledge graphs, or recommendation engines."
                },
                {
                    question: "What is the main advantage of declarative query languages?",
                    options: ["They run faster", "They allow the optimiser to choose the best execution plan", "They are easier to type", "They work offline"],
                    correctIndex: 1,
                    explanation: "Declarative languages describe what you want, not how to get it, allowing the query engine's optimiser to choose the most efficient execution plan."
                }
            ],
            mindMap: {
                central: "Data Models",
                branches: [
                    { label: "Relational", children: ["SQL", "Strong joins", "Impedance mismatch"] },
                    { label: "Document", children: ["JSON/BSON", "Schema flexibility", "Data locality"] },
                    { label: "Graph", children: ["Vertices & edges", "Many-to-many", "Cypher/SPARQL"] },
                    { label: "Query Languages", children: ["Declarative vs imperative", "MapReduce", "Optimiser freedom"] }
                ]
            }
        },
        {
            number: 3,
            title: "Storage and Retrieval",
            isAppendix: false,
            summary: "<p>This chapter dives into how databases internally store and retrieve data. Understanding storage engines helps you choose the right database and tune its performance. The two main families are <strong>log-structured</strong> storage engines (like LSM-Trees used in LevelDB, RocksDB, Cassandra) and <strong>page-oriented</strong> storage engines (like B-Trees used in most relational databases).</p><p><strong>Log-structured engines</strong> write data sequentially to append-only logs, then periodically compact and merge these segments. <strong>SSTables</strong> (Sorted String Tables) keep entries sorted by key, enabling efficient merging and range queries. An in-memory <strong>memtable</strong> buffers writes before flushing to disk. LSM-Trees generally offer higher write throughput because sequential writes are faster than random writes on disk.</p><p><strong>B-Trees</strong> break the database into fixed-size pages (typically 4KB) and organise them in a balanced tree structure. Updates happen in place, modifying the page on disk. B-Trees are the most widely used indexing structure and offer consistent read performance. The chapter also covers secondary indexes, covering indexes, multi-column indexes, full-text search indexes, and the distinction between <strong>OLTP</strong> (Online Transaction Processing) and <strong>OLAP</strong> (Online Analytical Processing) workloads, which have fundamentally different access patterns and storage requirements.</p>",
            keyPoints: [
                "Log-structured engines (LSM-Trees) offer high write throughput via sequential writes",
                "B-Trees offer consistent read performance with in-place updates on fixed-size pages",
                "SSTables keep data sorted, enabling efficient range queries and merging",
                "OLTP (transactional) and OLAP (analytical) workloads need different storage strategies",
                "Column-oriented storage dramatically improves analytical query performance"
            ],
            realLifeExamples: [
                {
                    title: "Cassandra's Write Performance",
                    content: "<p>Cassandra uses an LSM-Tree based storage engine, which is why it excels at write-heavy workloads like IoT sensor data or event logging. A team ingesting 500,000 events/second chose Cassandra over PostgreSQL because sequential append writes were 10x faster than B-Tree in-place updates for their workload pattern.</p>"
                }
            ],
            quotes: [
                { text: "On a high level, storage engines fall into two broad categories: log-structured storage engines, and page-oriented storage engines.", source: "Martin Kleppmann" }
            ],
            insights: [
                {
                    title: "OLTP vs OLAP: Different Worlds",
                    content: "<p>OLTP and OLAP have fundamentally different needs. OLTP queries touch a small number of records by key with low latency. OLAP queries scan millions of records, aggregating columns. This is why data warehouses use column-oriented storage &mdash; reading only the columns needed for a query is far more efficient than reading entire rows when you have hundreds of columns but only need three.</p>"
                }
            ],
            actionItems: [
                "Determine if your workload is write-heavy (consider LSM-Tree) or read-heavy (consider B-Tree)",
                "Separate OLTP and OLAP workloads — do not run analytics on your production database",
                "Evaluate column-oriented storage (e.g., ClickHouse, BigQuery) for analytical queries",
                "Monitor disk I/O patterns to understand whether your storage engine matches your workload"
            ],
            quiz: [
                {
                    question: "Why do LSM-Trees generally have higher write throughput than B-Trees?",
                    options: ["They use more memory", "They write data sequentially rather than performing random in-place updates", "They compress data better", "They use newer hardware"],
                    correctIndex: 1,
                    explanation: "LSM-Trees append data sequentially to logs and merge periodically. Sequential writes are much faster than the random in-place page updates that B-Trees require."
                },
                {
                    question: "Why is column-oriented storage better for analytical queries?",
                    options: ["It uses less disk space", "It reads only the columns needed for a query rather than entire rows", "It is newer technology", "It supports more data types"],
                    correctIndex: 1,
                    explanation: "Analytical queries typically only need a few columns from tables with many columns. Column-oriented storage reads only those columns, avoiding the waste of reading entire rows."
                }
            ],
            mindMap: {
                central: "Storage & Retrieval",
                branches: [
                    { label: "LSM-Trees", children: ["Sequential writes", "SSTables", "Memtable", "Compaction"] },
                    { label: "B-Trees", children: ["Fixed-size pages", "In-place updates", "Balanced tree", "WAL"] },
                    { label: "Indexes", children: ["Primary", "Secondary", "Covering", "Multi-column"] },
                    { label: "OLTP vs OLAP", children: ["Row-oriented", "Column-oriented", "Data warehouses", "Star schema"] }
                ]
            }
        },
        {
            number: 4,
            title: "Encoding and Evolution",
            isAppendix: false,
            summary: "<p>Applications inevitably change over time, and data encoding must handle <strong>schema evolution</strong> gracefully. This chapter examines how data is encoded for storage and network transmission. Language-specific serialisation (Java&rsquo;s Serializable, Python&rsquo;s pickle) is problematic: it ties you to one language, has security issues, and poor forward/backward compatibility. JSON and XML are human-readable but verbose and have type ambiguities.</p><p><strong>Binary encoding</strong> formats like Protocol Buffers (Protobuf), Apache Thrift, and Apache Avro offer compact representation and schema-based encoding. Protobuf and Thrift use field tags (numbers) instead of field names, making field renaming trivial but requiring careful tag management. Avro takes a different approach: the writer&rsquo;s schema and reader&rsquo;s schema do not need to be identical, just compatible, enabling more flexible evolution.</p><p>The key concepts are <strong>backward compatibility</strong> (new code can read old data) and <strong>forward compatibility</strong> (old code can read new data). Both are essential for rolling deployments where old and new versions coexist. The chapter also covers how encoding affects <strong>dataflow</strong>: through databases, service calls (REST/RPC), and message passing (message brokers). Each dataflow pattern has different compatibility requirements.</p>",
            keyPoints: [
                "Avoid language-specific serialisation — it locks you in and has security issues",
                "Binary formats (Protobuf, Thrift, Avro) are more compact and schema-aware than JSON/XML",
                "Backward compatibility: new code reads old data; forward compatibility: old code reads new data",
                "Both are essential for rolling deployments where old and new versions coexist",
                "Dataflow patterns (databases, services, messages) have different compatibility requirements"
            ],
            realLifeExamples: [
                {
                    title: "The Rolling Deployment Dilemma",
                    content: "<p>During a rolling deployment, a team added a new required field to their JSON API without backward compatibility. The old instances could not parse the new messages, causing cascading failures across the cluster. Switching to Protobuf with optional fields and numbered tags allowed them to evolve the schema safely with zero-downtime deployments.</p>"
                }
            ],
            quotes: [
                { text: "Schema evolution allows the entire database to appear as if it was encoded with a single schema, even though the underlying storage may contain records encoded with various historical versions of the schema.", source: "Martin Kleppmann" }
            ],
            insights: [
                {
                    title: "Schema as a Living Contract",
                    content: "<p>Think of your data schema not as a fixed contract but as a living, evolving agreement. The key is to evolve it in ways that maintain both backward and forward compatibility. Add new optional fields (never required), never delete a field that old code depends on, and never reuse a field tag/number. This discipline enables continuous deployment without downtime.</p>"
                }
            ],
            actionItems: [
                "Evaluate your data encoding format — consider migrating from JSON to Protobuf or Avro for internal communication",
                "Ensure all schema changes maintain backward and forward compatibility",
                "Never reuse field numbers/tags in Protobuf or Thrift schemas",
                "Test compatibility by running old code against new data and vice versa"
            ],
            quiz: [
                {
                    question: "What is backward compatibility?",
                    options: ["Old code can read new data", "New code can read old data", "Data can be read in reverse", "Old systems can run new software"],
                    correctIndex: 1,
                    explanation: "Backward compatibility means new code can read data written by old code — essential because you update code before old data is migrated."
                },
                {
                    question: "Why does Kleppmann advise against language-specific serialisation?",
                    options: ["It is too fast", "It locks you into one language, has security issues, and poor compatibility", "It uses too little disk space", "It is not supported on Linux"],
                    correctIndex: 1,
                    explanation: "Language-specific serialisation (Java Serializable, Python pickle) ties you to one language, introduces security vulnerabilities, and typically handles schema evolution poorly."
                }
            ],
            mindMap: {
                central: "Encoding & Evolution",
                branches: [
                    { label: "Formats", children: ["JSON/XML", "Protobuf/Thrift", "Avro", "Language-specific"] },
                    { label: "Compatibility", children: ["Backward", "Forward", "Schema evolution", "Field tags"] },
                    { label: "Dataflow", children: ["Through databases", "Service calls (REST/RPC)", "Message passing"] }
                ]
            }
        },
        {
            number: 5,
            title: "Replication",
            isAppendix: false,
            summary: "<p>Replication means keeping a copy of the same data on multiple machines. The three main reasons are: <strong>high availability</strong> (system keeps working if some machines fail), <strong>reduced latency</strong> (users connect to geographically closer replicas), and <strong>increased read throughput</strong> (spread read queries across replicas). The fundamental challenge is handling <strong>changes to replicated data</strong>.</p><p>The three main approaches are <strong>single-leader</strong> (one node accepts writes, replicates to followers), <strong>multi-leader</strong> (multiple nodes accept writes, suitable for multi-datacenter), and <strong>leaderless</strong> (any node accepts writes, using quorum reads/writes for consistency). Single-leader is simplest but creates a single point of failure for writes. Multi-leader introduces write conflicts that must be resolved. Leaderless systems (like Dynamo-style databases) use quorum conditions: if you write to w nodes and read from r nodes, and w + r > n, you are guaranteed to read the latest write.</p><p>Replication can be <strong>synchronous</strong> (leader waits for follower acknowledgment) or <strong>asynchronous</strong> (leader does not wait). Synchronous ensures consistency but reduces availability; asynchronous is faster but can lose data if the leader crashes. The chapter details replication lag problems: <strong>read-after-write consistency</strong>, <strong>monotonic reads</strong>, and <strong>consistent prefix reads</strong> &mdash; each addressing a different user-visible anomaly.</p>",
            keyPoints: [
                "Replication provides high availability, reduced latency, and increased read throughput",
                "Single-leader: simplest, one node accepts writes; multi-leader: multi-datacenter; leaderless: quorum-based",
                "Synchronous replication ensures consistency but reduces availability",
                "Asynchronous replication is faster but risks data loss if the leader fails",
                "Replication lag causes anomalies: stale reads, non-monotonic reads, causal violations"
            ],
            realLifeExamples: [
                {
                    title: "The Social Media Refresh Problem",
                    content: "<p>A user posts a comment, then refreshes the page and does not see their own comment. This is the classic <strong>read-after-write consistency</strong> problem: the write went to the leader, but the read hit a follower that hasn&rsquo;t received the replication yet. The fix is to route reads of user&rsquo;s own data to the leader for a short window after writes.</p>"
                }
            ],
            quotes: [
                { text: "If the application can tolerate eventual consistency, asynchronous replication can provide better performance and availability.", source: "Martin Kleppmann" }
            ],
            insights: [
                {
                    title: "CAP Theorem in Practice",
                    content: "<p>The CAP theorem is often oversimplified. In practice, network partitions are inevitable, so the real choice is between consistency and availability <em>during</em> a partition. But most of the time there is no partition, and the real trade-off is between consistency and <em>latency</em>. Understanding this nuance helps you make better architectural decisions for your specific requirements.</p>"
                }
            ],
            actionItems: [
                "Determine your application's consistency requirements — can it tolerate eventual consistency?",
                "Implement read-after-write consistency for user-facing operations",
                "Monitor replication lag and set up alerts when it exceeds acceptable thresholds",
                "Plan for leader failover scenarios — test them regularly"
            ],
            quiz: [
                {
                    question: "What is the quorum condition for a Dynamo-style leaderless system?",
                    options: ["w + r > n (write nodes + read nodes > total nodes)", "All nodes must acknowledge", "Only the leader must acknowledge", "Majority of nodes must be online"],
                    correctIndex: 0,
                    explanation: "In a Dynamo-style system, if you write to w nodes and read from r nodes, and w + r > n, you are guaranteed that at least one read node has the latest write."
                },
                {
                    question: "What causes read-after-write consistency violations?",
                    options: ["Slow network", "A user's write goes to the leader but their subsequent read hits a follower that hasn't replicated yet", "Database corruption", "Client-side caching"],
                    correctIndex: 1,
                    explanation: "Read-after-write violations occur when a write reaches the leader but the subsequent read is served by a follower that hasn't yet received the replication."
                }
            ],
            mindMap: {
                central: "Replication",
                branches: [
                    { label: "Approaches", children: ["Single-leader", "Multi-leader", "Leaderless"] },
                    { label: "Sync vs Async", children: ["Synchronous: consistent", "Asynchronous: fast", "Semi-synchronous"] },
                    { label: "Consistency Issues", children: ["Read-after-write", "Monotonic reads", "Consistent prefix reads"] },
                    { label: "Conflict Resolution", children: ["Last write wins", "Custom merge", "CRDTs"] }
                ]
            }
        },
        {
            number: 6,
            title: "Partitioning",
            isAppendix: false,
            summary: "<p>When a dataset is too large for a single machine, it must be <strong>partitioned</strong> (or sharded) across multiple nodes. The goal is to spread data and query load evenly. If partitioning is uneven, some nodes become <strong>hot spots</strong> that limit scalability. The two main partitioning strategies are <strong>key-range partitioning</strong> (like volumes of an encyclopedia) and <strong>hash partitioning</strong> (distribute keys by hash to spread load evenly).</p><p>Key-range partitioning keeps keys sorted within each partition, enabling efficient range queries, but risks hot spots if access patterns are skewed (e.g., partitioning by date means today&rsquo;s partition gets all the writes). Hash partitioning distributes data more evenly but loses the ability to do efficient range queries &mdash; you must query all partitions.</p><p>Secondary indexes complicate partitioning. A <strong>local index</strong> (document-partitioned) keeps the index on the same partition as the data, making writes efficient but requiring <strong>scatter/gather</strong> for queries. A <strong>global index</strong> (term-partitioned) is partitioned separately from the data, making reads efficient but requiring updates across partitions on writes. The chapter also covers rebalancing strategies and how systems route requests to the correct partition using coordination services like ZooKeeper.</p>",
            keyPoints: [
                "Partitioning spreads data across nodes to handle datasets too large for one machine",
                "Key-range partitioning enables range queries but risks hot spots",
                "Hash partitioning distributes load evenly but loses range query efficiency",
                "Secondary indexes can be document-partitioned (local) or term-partitioned (global)",
                "Rebalancing must move data without interrupting reads/writes"
            ],
            realLifeExamples: [
                {
                    title: "The Celebrity Hot Spot",
                    content: "<p>A social media platform partitioned by user ID hash, which distributed data evenly &mdash; until a celebrity&rsquo;s post went viral. All reads for that single key overwhelmed one partition. The team added a two-tier key scheme: appending a random suffix to hot keys to spread them across partitions, then aggregating reads from all suffix partitions on the client side.</p>"
                }
            ],
            quotes: [
                { text: "The goal of partitioning is to spread the data and the query load evenly across nodes, avoiding hot spots.", source: "Martin Kleppmann" }
            ],
            insights: [
                {
                    title: "Partitioning Is About Trade-offs",
                    content: "<p>No partitioning strategy is perfect. Key-range gives you sorted data but risks hot spots. Hash gives you even distribution but loses ordering. The best approach depends on your access patterns. Some systems (like Cassandra) offer compound partition keys that hash the first part and range-sort the second, giving you the best of both worlds for specific query patterns.</p>"
                }
            ],
            actionItems: [
                "Analyse your access patterns to choose between key-range and hash partitioning",
                "Monitor partition sizes and query distribution to detect hot spots early",
                "Choose secondary index strategy based on read vs write ratio",
                "Plan a rebalancing strategy that minimises disruption to running queries"
            ],
            quiz: [
                {
                    question: "What is the main risk of key-range partitioning?",
                    options: ["Data loss", "Hot spots from skewed access patterns", "Inability to store large values", "Network congestion"],
                    correctIndex: 1,
                    explanation: "Key-range partitioning risks hot spots when access patterns are skewed — e.g., partitioning by date means today's partition receives all current writes."
                },
                {
                    question: "What is 'scatter/gather' in the context of partitioned indexes?",
                    options: ["A data compression technique", "Querying all partitions for a secondary index lookup and merging results", "Distributing writes across nodes", "A garbage collection strategy"],
                    correctIndex: 1,
                    explanation: "With document-partitioned (local) secondary indexes, a query must be sent to all partitions (scatter) and results merged (gather), which can be expensive."
                }
            ],
            mindMap: {
                central: "Partitioning",
                branches: [
                    { label: "Strategies", children: ["Key-range", "Hash", "Compound keys"] },
                    { label: "Hot Spots", children: ["Skewed access", "Celebrity problem", "Random suffixes"] },
                    { label: "Secondary Indexes", children: ["Document-partitioned (local)", "Term-partitioned (global)", "Scatter/gather"] },
                    { label: "Rebalancing", children: ["Fixed partitions", "Dynamic splitting", "ZooKeeper routing"] }
                ]
            }
        },
        {
            number: 7,
            title: "Transactions",
            isAppendix: false,
            summary: "<p>Transactions are an abstraction that simplifies the programming model by grouping multiple reads and writes into a logical unit that either succeeds completely (<strong>commit</strong>) or fails completely (<strong>abort/rollback</strong>). The classic <strong>ACID</strong> properties are: <strong>Atomicity</strong> (all-or-nothing), <strong>Consistency</strong> (application invariants are maintained), <strong>Isolation</strong> (concurrent transactions don&rsquo;t interfere), and <strong>Durability</strong> (committed data survives crashes).</p><p>Isolation levels address the trade-off between correctness and performance. <strong>Read Committed</strong> prevents dirty reads and dirty writes. <strong>Snapshot Isolation</strong> (also called repeatable read in some databases) gives each transaction a consistent snapshot of the database using <strong>Multi-Version Concurrency Control (MVCC)</strong>. <strong>Serializable</strong> isolation is the strongest level, guaranteeing that transactions behave as if executed one at a time.</p><p>Serializability can be implemented three ways: <strong>actual serial execution</strong> (run transactions one at a time on a single thread — feasible for fast, in-memory transactions), <strong>two-phase locking (2PL)</strong> (readers block writers and writers block readers — correct but slow), and <strong>Serializable Snapshot Isolation (SSI)</strong> (optimistic approach that detects conflicts at commit time). Kleppmann provides deep analysis of race conditions like lost updates, write skew, and phantoms.</p>",
            keyPoints: [
                "ACID: Atomicity, Consistency, Isolation, Durability — simplify the programming model",
                "Isolation levels trade correctness for performance: read committed, snapshot, serializable",
                "MVCC provides snapshot isolation by keeping multiple versions of data",
                "Three approaches to serializability: serial execution, 2PL, and SSI",
                "Common race conditions: dirty reads, lost updates, write skew, phantoms"
            ],
            realLifeExamples: [
                {
                    title: "The Double-Booking Problem",
                    content: "<p>A hospital scheduling system allowed two doctors to book the same on-call slot simultaneously. Each transaction checked &lsquo;is the slot free?&rsquo; (yes for both), then inserted a booking. This is a classic <strong>write skew</strong> anomaly that snapshot isolation does not prevent. The fix was either serializable isolation or an explicit lock on the time slot using <code>SELECT FOR UPDATE</code>.</p>"
                }
            ],
            quotes: [
                { text: "Transactions are an abstraction layer that allows an application to pretend that certain concurrency problems and certain kinds of hardware and software faults don't exist.", source: "Martin Kleppmann" }
            ],
            insights: [
                {
                    title: "Isolation Levels Are Confusing By Design",
                    content: "<p>Database vendors use inconsistent naming for isolation levels. What PostgreSQL calls &lsquo;repeatable read&rsquo; is actually snapshot isolation, not the ANSI SQL definition of repeatable read. Oracle&rsquo;s &lsquo;serializable&rsquo; is actually snapshot isolation. Always test the actual behaviour of your database&rsquo;s isolation levels rather than relying on the documentation labels.</p>"
                }
            ],
            actionItems: [
                "Understand which isolation level your database actually provides (test it, don't trust labels)",
                "Identify operations in your system vulnerable to write skew and add appropriate locking",
                "Consider serializable isolation for critical financial or inventory operations",
                "Implement idempotent operations to safely handle transaction retries"
            ],
            quiz: [
                {
                    question: "What is write skew?",
                    options: ["Data corruption on disk", "Two transactions read the same data, make decisions based on it, then write — violating an invariant", "A slow write operation", "Writing data in the wrong format"],
                    correctIndex: 1,
                    explanation: "Write skew occurs when two transactions read overlapping data, make independent decisions based on what they read, then write — the combined result violates an invariant."
                },
                {
                    question: "What is MVCC used for?",
                    options: ["Data compression", "Providing snapshot isolation by maintaining multiple versions of data", "Network routing", "Memory management"],
                    correctIndex: 1,
                    explanation: "Multi-Version Concurrency Control (MVCC) maintains multiple versions of data items, allowing each transaction to see a consistent snapshot without blocking other transactions."
                }
            ],
            mindMap: {
                central: "Transactions",
                branches: [
                    { label: "ACID", children: ["Atomicity", "Consistency", "Isolation", "Durability"] },
                    { label: "Isolation Levels", children: ["Read committed", "Snapshot isolation", "Serializable"] },
                    { label: "Race Conditions", children: ["Dirty reads", "Lost updates", "Write skew", "Phantoms"] },
                    { label: "Serializability", children: ["Serial execution", "Two-phase locking", "SSI (optimistic)"] }
                ]
            }
        },
        {
            number: 8,
            title: "The Trouble with Distributed Systems",
            isAppendix: false,
            summary: "<p>Working with distributed systems introduces a new category of problems that do not exist on a single computer. This chapter is a reality check on everything that can go wrong. <strong>Network problems</strong>: packets can be lost, delayed, duplicated, or reordered, and you cannot distinguish a slow network from a failed node. <strong>Clock problems</strong>: each machine has its own clock, and they drift. Even NTP synchronisation only provides accuracy within tens of milliseconds, which is insufficient for ordering events.</p><p>Kleppmann introduces the concept of <strong>partial failures</strong>: in a distributed system, some parts can fail while others continue working. Unlike a single computer where things tend to either work completely or fail completely, distributed systems exist in a murky middle ground. You must design for this uncertainty, assuming that anything that can go wrong will go wrong.</p><p>The chapter covers <strong>unreliable networks</strong> (timeouts are the only way to detect failures, but you cannot distinguish slow from dead), <strong>unreliable clocks</strong> (time-of-day clocks vs monotonic clocks, clock skew, logical clocks), and the fundamental problem of <strong>truth and lies</strong> in distributed systems — a node cannot trust its own judgement alone. Consensus and quorums are introduced as the mechanism for nodes to agree on truth, setting up the next chapter.</p>",
            keyPoints: [
                "Networks are unreliable: packets can be lost, delayed, duplicated, or reordered",
                "Clocks drift — you cannot use timestamps to reliably order events across machines",
                "Partial failures: some parts of a system can fail while others work",
                "Timeouts are the only way to detect failures, but they cannot distinguish slow from dead",
                "A node cannot trust its own judgement alone — consensus requires agreement among nodes"
            ],
            realLifeExamples: [
                {
                    title: "The GitHub 2012 Outage",
                    content: "<p>GitHub experienced a major outage when a network partition caused their MySQL master to become unreachable. The automated failover promoted a replica that was behind, causing data inconsistencies. When the partition healed, the old master and new master had conflicting data. This incident illustrates the fundamental challenges of failure detection and consensus in distributed systems.</p>"
                }
            ],
            quotes: [
                { text: "In a distributed system, there is no shared memory, no shared clock, and messages traveling over the network may be delayed or lost.", source: "Martin Kleppmann" }
            ],
            insights: [
                {
                    title: "Embrace Uncertainty",
                    content: "<p>The fundamental insight is that distributed systems operate under <strong>uncertainty</strong>. You can never be sure whether a remote node has failed or is just slow. You can never be sure your clock is accurate. You can never be sure a message was received. Designing for this uncertainty &mdash; rather than pretending it does not exist &mdash; is what separates robust distributed systems from fragile ones.</p>"
                }
            ],
            actionItems: [
                "Set appropriate timeouts for all network calls — neither too short (false positives) nor too long (slow detection)",
                "Never rely on wall-clock timestamps for ordering events across machines",
                "Use monotonic clocks for measuring elapsed time within a single machine",
                "Design all distributed operations to be idempotent so they can be safely retried"
            ],
            quiz: [
                {
                    question: "Why can't you use timestamps to order events across machines?",
                    options: ["Timestamps are too large", "Each machine's clock drifts independently, making cross-machine timestamps unreliable", "Timestamps are in different formats", "Network latency prevents timestamps"],
                    correctIndex: 1,
                    explanation: "Each machine has its own clock that drifts independently. Even with NTP, accuracy is only within tens of milliseconds, which is insufficient for reliably ordering events."
                },
                {
                    question: "What is a partial failure in a distributed system?",
                    options: ["A disk that is partially corrupted", "Some parts of the system fail while others continue working normally", "A partially completed transaction", "A network that is partially connected"],
                    correctIndex: 1,
                    explanation: "Partial failure means some components of a distributed system fail while others continue working — unlike a single machine, which tends to either work completely or fail completely."
                }
            ],
            mindMap: {
                central: "Distributed Systems Trouble",
                branches: [
                    { label: "Unreliable Networks", children: ["Packet loss", "Delays", "Timeouts", "Cannot distinguish slow vs dead"] },
                    { label: "Unreliable Clocks", children: ["Clock drift", "NTP limitations", "Monotonic vs wall-clock", "Logical clocks"] },
                    { label: "Partial Failures", children: ["Some nodes fail", "Murky middle ground", "Design for uncertainty"] }
                ]
            }
        },
        {
            number: 9,
            title: "Consistency and Consensus",
            isAppendix: false,
            summary: "<p>This chapter tackles the hardest problems in distributed systems: getting nodes to agree. <strong>Linearizability</strong> (also called strong consistency) makes a distributed system behave as if there is only a single copy of the data. It guarantees that once a write is acknowledged, all subsequent reads see the new value. Linearizability is useful for leader election, uniqueness constraints, and cross-channel coordination, but comes at a cost of reduced performance and availability.</p><p><strong>Consensus</strong> is the fundamental problem: getting multiple nodes to agree on something (a value, a leader, a transaction outcome). The <strong>FLP impossibility result</strong> proves that deterministic consensus is impossible in an asynchronous system where even one node can crash. In practice, systems use <strong>partial synchrony</strong> assumptions and timeout-based failure detection to make consensus achievable. Algorithms like <strong>Paxos</strong>, <strong>Raft</strong>, and <strong>Zab</strong> (used by ZooKeeper) implement consensus with various trade-offs.</p><p>The chapter connects consensus to practical systems: <strong>total order broadcast</strong> (reliable delivery of messages in the same order to all nodes), <strong>atomic commit</strong> (two-phase commit for distributed transactions), and <strong>distributed locks and leader election</strong>. It explains why two-phase commit (2PC) is a blocking protocol &mdash; if the coordinator crashes, participants are stuck &mdash; and how three-phase commit and consensus algorithms address this limitation.</p>",
            keyPoints: [
                "Linearizability makes a distributed system appear to have a single copy of data",
                "Consensus: getting nodes to agree — impossible in purely asynchronous systems (FLP result)",
                "Practical consensus algorithms: Paxos, Raft, Zab — use timeout-based failure detection",
                "Two-phase commit (2PC) is blocking — coordinator failure stalls participants",
                "Total order broadcast ensures all nodes process messages in the same order"
            ],
            realLifeExamples: [
                {
                    title: "ZooKeeper for Leader Election",
                    content: "<p>Apache Kafka uses ZooKeeper (which implements Zab consensus) for leader election among brokers. When a broker fails, ZooKeeper&rsquo;s consensus algorithm ensures all remaining brokers agree on the new leader, preventing split-brain scenarios where two brokers think they are the leader for the same partition.</p>"
                }
            ],
            quotes: [
                { text: "The best way of building fault-tolerant systems is to find general-purpose abstractions with useful guarantees, implement them once, and then let applications rely on those guarantees.", source: "Martin Kleppmann" }
            ],
            insights: [
                {
                    title: "Consensus Is Everywhere",
                    content: "<p>Many distributed systems problems reduce to consensus: leader election (agree on who is the leader), atomic commit (agree on whether to commit), total order broadcast (agree on the order of messages), and uniqueness constraints (agree on who gets the unique value). Recognising consensus as the underlying problem helps you choose the right tools and understand their trade-offs.</p>"
                }
            ],
            actionItems: [
                "Use a proven consensus implementation (etcd, ZooKeeper, Consul) rather than building your own",
                "Understand whether your application actually needs linearizability or if eventual consistency suffices",
                "Avoid two-phase commit for high-availability systems — consider saga patterns instead",
                "Test failure scenarios: coordinator crashes, network partitions, split-brain"
            ],
            quiz: [
                {
                    question: "What does linearizability guarantee?",
                    options: ["Fastest possible reads", "The system behaves as if there is only one copy of the data — once a write is acknowledged, all reads see it", "Zero network latency", "Unlimited storage"],
                    correctIndex: 1,
                    explanation: "Linearizability makes a distributed system appear to have a single copy of data, guaranteeing that acknowledged writes are immediately visible to all subsequent reads."
                },
                {
                    question: "Why is two-phase commit (2PC) problematic?",
                    options: ["It is too fast", "If the coordinator crashes after sending prepare but before sending commit/abort, participants are blocked indefinitely", "It uses too many threads", "It does not support SQL"],
                    correctIndex: 1,
                    explanation: "2PC is a blocking protocol — if the coordinator crashes between the prepare and commit phases, all participants are stuck waiting and cannot make progress."
                }
            ],
            mindMap: {
                central: "Consistency & Consensus",
                branches: [
                    { label: "Linearizability", children: ["Single-copy illusion", "Strong consistency", "Performance cost"] },
                    { label: "Consensus Algorithms", children: ["Paxos", "Raft", "Zab", "FLP impossibility"] },
                    { label: "Atomic Commit", children: ["Two-phase commit", "Blocking problem", "Saga patterns"] },
                    { label: "Practical Tools", children: ["ZooKeeper", "etcd", "Consul", "Leader election"] }
                ]
            }
        },
        {
            number: 10,
            title: "Batch Processing",
            isAppendix: false,
            summary: "<p>Kleppmann identifies three types of systems: <strong>services</strong> (online, request/response), <strong>batch processing</strong> (offline, process bounded input), and <strong>stream processing</strong> (near-realtime, process unbounded input). This chapter focuses on batch processing, which takes a large amount of input data, processes it, and produces output. The key property is that the input is <strong>bounded</strong> &mdash; it has a known, finite size.</p><p>The chapter traces batch processing from Unix philosophy (small tools, pipes, stdin/stdout) through <strong>MapReduce</strong> to modern dataflow engines. Unix commands like <code>sort</code>, <code>uniq</code>, <code>awk</code>, and <code>grep</code> connected via pipes embody the principle of composable, single-purpose tools. MapReduce extends this idea to distributed systems: the <strong>Map</strong> phase extracts key-value pairs, the framework sorts and partitions them, and the <strong>Reduce</strong> phase aggregates them.</p><p>Beyond MapReduce, modern dataflow engines like <strong>Spark</strong>, <strong>Tez</strong>, and <strong>Flink</strong> generalise the model by allowing arbitrary DAGs (directed acyclic graphs) of operators, avoiding the overhead of writing intermediate results to disk between every stage. The chapter emphasises the value of <strong>immutable inputs</strong> and <strong>deterministic processing</strong>: if a batch job fails, you can simply re-run it on the same input without side effects, making fault tolerance straightforward.</p>",
            keyPoints: [
                "Batch processing handles bounded input data offline, producing derived output",
                "MapReduce extends Unix pipes to distributed systems: Map, Sort, Reduce",
                "Modern dataflow engines (Spark, Flink) use DAGs for more flexible processing",
                "Immutable inputs enable simple fault tolerance — just re-run on failure",
                "Unix philosophy of composable tools applies directly to big data processing"
            ],
            realLifeExamples: [
                {
                    title: "Google's Original PageRank",
                    content: "<p>Google&rsquo;s original web search indexing was a classic batch processing pipeline using MapReduce. Web pages were the bounded input. The Map phase extracted links, the Reduce phase aggregated link counts to compute PageRank. This batch job ran periodically over the entire web crawl, producing the search index as output.</p>"
                }
            ],
            quotes: [
                { text: "MapReduce is like Unix tools, but distributed across potentially thousands of machines.", source: "Martin Kleppmann" }
            ],
            insights: [
                {
                    title: "The Unix Philosophy at Scale",
                    content: "<p>The most powerful idea in batch processing is not MapReduce itself but the principle it embodies: <strong>composable, single-purpose processing steps with immutable inputs</strong>. Just as Unix pipes let you combine <code>cat | grep | sort | uniq -c | sort -rn</code> to build powerful analyses, dataflow engines let you compose transformations into complex pipelines where each step is simple, testable, and replayable.</p>"
                }
            ],
            actionItems: [
                "Identify analytics or ETL jobs in your system that could benefit from batch processing",
                "Ensure batch inputs are immutable — never modify the input data during processing",
                "Consider moving from MapReduce to a modern dataflow engine (Spark, Flink) for performance",
                "Design batch jobs to be idempotent so they can safely be re-run on failure"
            ],
            quiz: [
                {
                    question: "What is the key difference between batch and stream processing?",
                    options: ["Speed", "Batch processes bounded (finite) input; stream processes unbounded (continuous) input", "Language used", "Type of data"],
                    correctIndex: 1,
                    explanation: "Batch processing works on bounded (finite, known-size) input, while stream processing works on unbounded (continuous, never-ending) input."
                },
                {
                    question: "Why is immutability of inputs important in batch processing?",
                    options: ["It reduces storage costs", "If a job fails, you can simply re-run it on the same input without side effects", "It makes data harder to read", "It improves network speed"],
                    correctIndex: 1,
                    explanation: "With immutable inputs, a failed batch job can be re-run on the exact same data, producing the same output — making fault tolerance straightforward."
                }
            ],
            mindMap: {
                central: "Batch Processing",
                branches: [
                    { label: "Unix Roots", children: ["Composable tools", "Pipes (stdin/stdout)", "Immutable input"] },
                    { label: "MapReduce", children: ["Map phase", "Sort & partition", "Reduce phase", "HDFS"] },
                    { label: "Beyond MapReduce", children: ["Spark", "Flink", "DAG execution", "In-memory processing"] }
                ]
            }
        },
        {
            number: 11,
            title: "Stream Processing",
            isAppendix: false,
            summary: "<p>Stream processing handles <strong>unbounded</strong> data — events that arrive continuously over time. Unlike batch processing that waits for all input to be available, stream processing processes events as they arrive. The chapter introduces <strong>event logs</strong> as the foundation: an append-only, immutable sequence of events. Apache Kafka is the canonical example of a distributed event log.</p><p>Events can represent many things: user actions, sensor readings, system metrics, or database changes. <strong>Change Data Capture (CDC)</strong> turns database changes into a stream of events, enabling derived systems (caches, search indexes, data warehouses) to stay in sync with the source database. <strong>Event sourcing</strong> takes this further: instead of storing the current state, store the complete sequence of events and derive the current state from the log.</p><p>Stream processing faces unique challenges. <strong>Event time vs processing time</strong>: events may arrive out of order or late. <strong>Windowing</strong> (tumbling, hopping, sliding, session windows) groups events into time-based windows for aggregation. <strong>Joins</strong> in streams are complex: stream-stream joins, stream-table joins, and table-table joins each have different semantics. Fault tolerance in stream processing uses techniques like <strong>microbatching</strong> (Spark Streaming) or <strong>checkpointing</strong> (Flink) to ensure exactly-once processing semantics.</p>",
            keyPoints: [
                "Stream processing handles unbounded, continuous data in near-realtime",
                "Event logs (like Kafka) provide an append-only, immutable sequence of events",
                "Change Data Capture (CDC) turns database changes into event streams",
                "Event time vs processing time: events may arrive late or out of order",
                "Windowing strategies: tumbling, hopping, sliding, session windows"
            ],
            realLifeExamples: [
                {
                    title: "Real-Time Fraud Detection",
                    content: "<p>A payment processor uses stream processing to detect fraudulent transactions in real-time. Each payment event is processed against a model within 100ms. Stream-table joins correlate the transaction with the user&rsquo;s historical profile (from a table) to identify anomalies. This would be impossible with batch processing, which would only detect fraud after the fact.</p>"
                }
            ],
            quotes: [
                { text: "A log is perhaps the simplest possible storage abstraction. It is an append-only, totally ordered sequence of records ordered by time.", source: "Martin Kleppmann" }
            ],
            insights: [
                {
                    title: "The Power of the Log",
                    content: "<p>The humble append-only log is the most powerful abstraction in distributed systems. It provides total ordering, durability, and replayability. Databases use write-ahead logs, consensus algorithms use replicated logs, and stream processing uses event logs. Understanding logs helps you see the deep connections between these seemingly different systems.</p>"
                }
            ],
            actionItems: [
                "Evaluate whether your batch ETL pipelines could benefit from moving to stream processing",
                "Implement Change Data Capture to keep derived data stores (caches, search) in sync",
                "Handle late-arriving events with appropriate windowing and watermark strategies",
                "Use exactly-once processing semantics (checkpointing or idempotent writes) for critical streams"
            ],
            quiz: [
                {
                    question: "What is Change Data Capture (CDC)?",
                    options: ["Capturing screenshots of data", "Turning database changes into a stream of events", "Compressing data for transfer", "Logging user interactions"],
                    correctIndex: 1,
                    explanation: "Change Data Capture observes the changes made to a database and produces a stream of events representing those changes, enabling derived systems to stay in sync."
                },
                {
                    question: "Why is the distinction between event time and processing time important?",
                    options: ["For billing purposes", "Events may arrive late or out of order — processing time does not reflect when the event actually occurred", "To save timezone conversions", "For debugging only"],
                    correctIndex: 1,
                    explanation: "Events may be delayed by network or processing backlogs. Using processing time instead of event time can produce incorrect results, especially for time-windowed aggregations."
                },
                {
                    question: "What is event sourcing?",
                    options: ["Finding the source of an event", "Storing the complete sequence of events and deriving current state from the log", "Outsourcing event handling", "A type of error logging"],
                    correctIndex: 1,
                    explanation: "Event sourcing stores every change as an immutable event in a log. The current state is derived by replaying the events, providing a complete audit trail and the ability to reconstruct any past state."
                }
            ],
            mindMap: {
                central: "Stream Processing",
                branches: [
                    { label: "Event Logs", children: ["Append-only", "Immutable", "Kafka", "Ordered"] },
                    { label: "CDC & Event Sourcing", children: ["Database changes as events", "Derived data stores", "Full audit trail"] },
                    { label: "Challenges", children: ["Event time vs processing time", "Late arrivals", "Windowing strategies"] },
                    { label: "Fault Tolerance", children: ["Microbatching", "Checkpointing", "Exactly-once semantics"] }
                ]
            }
        },
        {
            number: 12,
            title: "The Future of Data Systems",
            isAppendix: false,
            summary: "<p>The final chapter synthesises the ideas from the entire book into a vision for how data systems should be built. Kleppmann advocates for <strong>unbundling the database</strong>: rather than relying on a single monolithic database to handle all needs, compose specialised storage and processing systems connected by dataflow. The database&rsquo;s internal components (storage engine, query optimiser, indexing, replication, transactions) can be unbundled and implemented at the application level using event logs and derived views.</p><p>The chapter introduces the idea of a <strong>total order of events</strong> as a unifying abstraction. By treating the event log as the source of truth and deriving all other representations (databases, caches, search indexes) from it, you get a system that is easier to reason about, evolve, and maintain. This approach naturally supports multiple views of the same data optimised for different access patterns.</p><p>Kleppmann concludes with a thoughtful discussion of <strong>ethics</strong> in data systems. The data we collect and process affects real people. He raises concerns about surveillance, privacy, algorithmic fairness, and the power imbalance between data collectors and data subjects. He argues that as engineers, we have a responsibility to think critically about the systems we build and their societal impact.</p>",
            keyPoints: [
                "Unbundling the database: compose specialised systems connected by dataflow",
                "Event log as the source of truth — derive all other representations from it",
                "Multiple materialised views of the same data, each optimised for different access patterns",
                "End-to-end argument: correctness guarantees must be implemented end-to-end, not just per-component",
                "Engineers have ethical responsibilities for the data systems they build"
            ],
            realLifeExamples: [
                {
                    title: "The Unbundled E-Commerce Platform",
                    content: "<p>A large e-commerce company moved from a monolithic PostgreSQL database to an event-driven architecture. Kafka served as the event log, with separate specialised systems for search (Elasticsearch), analytics (ClickHouse), caching (Redis), and transactions (PostgreSQL). Each system consumed from the same event stream, providing optimised views of the same underlying data.</p>"
                }
            ],
            quotes: [
                { text: "Just as it is important to think about the engineering aspects of building correct and reliable software, it is important to think about the ethical aspects.", source: "Martin Kleppmann" }
            ],
            insights: [
                {
                    title: "The Log as the Universal Interface",
                    content: "<p>The event log serves as a universal interface between data systems, much like Unix pipes serve as the universal interface between command-line tools. By standardising on an ordered, immutable log as the system of record, you can plug in any number of derived systems &mdash; each optimised for a specific access pattern &mdash; and maintain consistency through the shared log.</p>"
                }
            ],
            actionItems: [
                "Evaluate whether your monolithic database could benefit from unbundling into specialised systems",
                "Consider an event log as the source of truth with derived materialised views",
                "Implement end-to-end correctness guarantees (e.g., idempotency keys) rather than relying on individual component guarantees",
                "Reflect on the ethical implications of the data you collect and process"
            ],
            quiz: [
                {
                    question: "What does 'unbundling the database' mean?",
                    options: ["Removing database indexes", "Composing specialised storage and processing systems instead of relying on a single monolithic database", "Splitting a database into tables", "Converting to NoSQL"],
                    correctIndex: 1,
                    explanation: "Unbundling the database means replacing a monolithic database with specialised systems (search, analytics, caching) connected by dataflow, each optimised for its specific use case."
                },
                {
                    question: "What ethical concern does Kleppmann raise about data systems?",
                    options: ["They use too much electricity", "Engineers have a responsibility to consider privacy, fairness, and the societal impact of the systems they build", "They are too expensive", "They generate too much log data"],
                    correctIndex: 1,
                    explanation: "Kleppmann argues that data systems affect real people, and engineers must think critically about surveillance, privacy, algorithmic fairness, and power imbalances."
                }
            ],
            mindMap: {
                central: "Future of Data Systems",
                branches: [
                    { label: "Unbundling", children: ["Specialised systems", "Event log as truth", "Derived views"] },
                    { label: "Dataflow", children: ["Kafka as backbone", "Materialised views", "Multiple access patterns"] },
                    { label: "Correctness", children: ["End-to-end argument", "Idempotency", "Exactly-once semantics"] },
                    { label: "Ethics", children: ["Privacy", "Fairness", "Societal impact", "Engineer responsibility"] }
                ]
            }
        }
    ]
};
